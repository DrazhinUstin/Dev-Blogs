'use server';

import { auth } from '@/auth';
import { prisma } from '@/client';
import { put, del, BlobAccessError, BlobStoreSuspendedError } from '@vercel/blob';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { BlogFormSchema, ProfileFormSchema, requiredString } from '@/app/lib/schemas';
import type { Prisma, Blog } from '@prisma/client';
import type { BlogFormState, CommentFormState, ProfileFormState } from './types';

export async function createBlog(
  prevState: BlogFormState,
  formData: FormData
): Promise<BlogFormState> {
  const validatedFields = BlogFormSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!validatedFields.success) {
    return {
      errorMsg: 'Invalid fields: Fix the errors and click the submit button again',
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const user = (await auth())?.user;
  if (!user?.id) {
    throw Error('Not authorized access: Failed to create a blog');
  }
  const { image, ...rest } = validatedFields.data;
  let imageUrl: Blog['imageUrl'] = null;
  try {
    if (image) {
      const blob = await put(`blogs/${image.name}`, image, { access: 'public' });
      imageUrl = blob.url;
    }
    await prisma.blog.create({ data: { userId: user.id, imageUrl, ...rest } });
  } catch (error) {
    if (error instanceof BlobAccessError) {
      return {
        errorMsg: 'Storage error: Failed to upload an image',
      };
    }
    if (error instanceof BlobStoreSuspendedError) {
      return { errorMsg: 'Storage error: The store has been suspended' };
    }
    return {
      errorMsg: 'Database error: Failed to create a blog ',
    };
  }
  revalidatePath('/');
  redirect('/dashboard/blogs');
}

export async function editBlog(
  id: string,
  existingImageUrl: Blog['imageUrl'],
  prevState: BlogFormState,
  formData: FormData
): Promise<BlogFormState> {
  const validatedFields = BlogFormSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!validatedFields.success) {
    return {
      errorMsg: 'Invalid fields: Fix the errors and click the submit button again',
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const user = (await auth())?.user;
  if (!user?.id) {
    throw Error('Not authorized access: Failed to edit a blog');
  }
  const { image, ...rest } = validatedFields.data;
  let imageUrl: Blog['imageUrl'] = null;
  try {
    if (image) {
      if (existingImageUrl) {
        await del(existingImageUrl);
      }
      const blob = await put(`blogs/${image.name}`, image, { access: 'public' });
      imageUrl = blob.url;
    }
    await prisma.blog.update({
      where: { id },
      data: { ...rest, ...(imageUrl && { imageUrl }) },
    });
  } catch (error) {
    if (error instanceof BlobAccessError) {
      return {
        errorMsg: 'Storage error: Failed to upload an image',
      };
    }
    if (error instanceof BlobStoreSuspendedError) {
      return { errorMsg: 'Storage error: The store has been suspended' };
    }
    return {
      errorMsg: 'Database error: Failed to edit a blog ',
    };
  }
  revalidatePath('/');
  redirect('/dashboard/blogs');
}

export async function deleteBlog(id: string, imageUrl: Blog['imageUrl'], formData: FormData) {
  const user = (await auth())?.user;
  if (!user) {
    throw Error('Not authorized access: Failed to delete a blog');
  }
  if (imageUrl) {
    await del(imageUrl);
  }
  try {
    await prisma.blog.delete({ where: { id } });
    revalidatePath('/');
  } catch (error) {
    throw Error('Database error: Failed to delete a blog');
  }
}

export async function addComment(
  blogId: string,
  prevState: CommentFormState,
  formData: FormData
): Promise<CommentFormState> {
  const validatedField = requiredString.safeParse(formData.get('text'));
  if (!validatedField.success) {
    return { error: { message: validatedField.error.errors[0].message } };
  }
  const user = (await auth())?.user;
  if (!user?.id) {
    throw Error('Not authorized access: Failed to add a comment');
  }
  try {
    await prisma.comment.create({ data: { text: validatedField.data, userId: user.id, blogId } });
    revalidatePath('/');
    return { success: {} };
  } catch (error) {
    return { error: { message: 'Database error: Failed to add a comment' } };
  }
}

export async function editComment(
  commentId: string,
  prevState: string | undefined,
  formData: FormData
): Promise<string | undefined> {
  const validatedField = requiredString.safeParse(formData.get('text'));
  if (!validatedField.success) {
    return validatedField.error.errors[0].message;
  }
  const user = (await auth())?.user;
  if (!user) {
    throw Error('Not authorized access: Failed to edit a comment');
  }
  try {
    await prisma.comment.update({ where: { id: commentId }, data: { text: validatedField.data } });
    revalidatePath('/');
  } catch (error) {
    return 'Database error: Failed to edit a comment';
  }
}

export async function replyOnComment(
  commentId: string,
  blogId: string,
  prevState: string | undefined,
  formData: FormData
): Promise<string | undefined> {
  const validatedField = requiredString.safeParse(formData.get('text'));
  if (!validatedField.success) {
    return validatedField.error.errors[0].message;
  }
  const user = (await auth())?.user;
  if (!user?.id) {
    throw Error('Not authorized access: Failed to reply on a comment');
  }
  try {
    await prisma.comment.create({
      data: { text: validatedField.data, userId: user.id, blogId, replyOnId: commentId },
    });
    revalidatePath('/');
  } catch (error) {
    return 'Database error: Failed to reply on a comment';
  }
}

export async function deleteComment(id: string) {
  const user = (await auth())?.user;
  if (!user) {
    throw Error('Not authorized access: Failed to delete a comment');
  }
  try {
    await prisma.comment.delete({ where: { id } });
    revalidatePath('/');
  } catch (error) {
    throw Error('Database error: Failed to delete a comment');
  }
}

export async function upsertProfile(
  prevState: ProfileFormState,
  formData: FormData
): Promise<ProfileFormState> {
  const validatedFields = ProfileFormSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!validatedFields.success) {
    return {
      errorMsg: 'Invalid fields: Fix the errors and click the submit button again',
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const user = (await auth())?.user;
  if (!user?.id) {
    throw Error('Not authorized access: Failed to upsert a profile');
  }
  const { gender, ...rest } = validatedFields.data;
  const data = { ...rest, gender: gender || null };
  try {
    await prisma.profile.upsert({
      where: { userId: user.id },
      update: data,
      create: { userId: user.id, ...data },
    });
  } catch (error) {
    return {
      errorMsg: 'Database error: Failed to upsert a profile ',
    };
  }
  revalidatePath('/');
  redirect('/profile');
}

export async function fetchBlogsForInfiniteScroll({
  followerId,
  orderBy,
  page,
  blogsPerPage = 10,
}: {
  followerId?: string;
  orderBy: Prisma.BlogOrderByWithRelationInput;
  page: number;
  blogsPerPage?: number;
}) {
  try {
    const blogs = await prisma.blog.findMany({
      where: {
        ...(followerId ? { user: { followedBy: { some: { id: followerId } } } } : {}),
      },
      orderBy,
      skip: blogsPerPage * (page - 1),
      take: blogsPerPage,
      select: {
        id: true,
        userId: true,
        categoryName: true,
        title: true,
        description: true,
        readingTime: true,
        imageUrl: true,
        createdAt: true,
        user: {
          select: {
            name: true,
            image: true,
          },
        },
        _count: { select: { likes: true, comments: true } },
      },
    });
    return blogs.map(({ _count, ...blog }) => ({
      ...blog,
      likesCount: _count.likes,
      commentsCount: _count.comments,
    }));
  } catch (error) {
    console.error('Database Error:', error);
    throw Error('Database Error: Failed to fetch blogs');
  }
}
