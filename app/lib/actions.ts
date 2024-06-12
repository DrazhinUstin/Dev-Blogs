'use server';

import { auth } from '@/auth';
import { prisma } from '@/client';
import { put, del, BlobAccessError, BlobStoreSuspendedError } from '@vercel/blob';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { BlogFormSchema, ProfileFormSchema, requiredString } from '@/app/lib/schemas';
import type { Blog, Profile } from '@prisma/client';
import type { BlogFormState, ProfileFormState } from './types';

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
  prevState: string | undefined,
  formData: FormData
): Promise<string | undefined> {
  const validatedField = requiredString.safeParse(formData.get('text'));
  if (!validatedField.success) {
    return validatedField.error.errors[0].message;
  }
  const user = (await auth())?.user;
  if (!user?.id) {
    throw Error('Not authorized access: Failed to add a comment');
  }
  try {
    await prisma.comment.create({ data: { text: validatedField.data, userId: user.id, blogId } });
    revalidatePath('/');
  } catch (error) {
    return 'Database error: Failed to add a comment';
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
      data: { text: validatedField.data, userId: user.id, blogId, commentId },
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
  existingAvatarUrl: Profile['avatarUrl'],
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
  const { avatar, ...rest } = validatedFields.data;
  let avatarUrl: Profile['avatarUrl'] = null;
  try {
    if (avatar) {
      if (existingAvatarUrl) {
        await del(existingAvatarUrl);
      }
      const blob = await put(`avatars/${avatar.name}`, avatar, { access: 'public' });
      avatarUrl = blob.url;
    }
    await prisma.profile.upsert({
      where: { userId: user.id },
      update: { ...rest, ...(avatarUrl && { avatarUrl }) },
      create: { userId: user.id, avatarUrl, ...rest },
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
      errorMsg: 'Database error: Failed to upsert a profile ',
    };
  }
  revalidatePath('/');
  redirect('/profile');
}
