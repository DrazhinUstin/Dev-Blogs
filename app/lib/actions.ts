'use server';

import { auth } from '@/auth';
import { prisma } from '@/client';
import { put, BlobAccessError, BlobStoreSuspendedError } from '@vercel/blob';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { BlogFormSchema } from '@/app/lib/schemas';
import type { Blog } from '@prisma/client';
import type { BlogFormState } from './types';

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
  redirect('/');
}
