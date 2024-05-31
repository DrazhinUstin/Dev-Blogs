import { z } from 'zod';
import { Gender } from '@prisma/client';

const maxStrLength = 1000;

const requiredString = z
  .string()
  .refine((val) => val.trim().length >= 1, { message: 'Required' })
  .refine((val) => val.length <= maxStrLength, {
    message: `String cannot be longer than ${maxStrLength} characters`,
  });

const optionalString = z.string().max(maxStrLength).optional();

const optionalEmail = z.string().email().max(maxStrLength).optional().or(z.literal(''));

const optionalUrl = z.string().url().max(maxStrLength).optional().or(z.literal(''));

const ImageSchema = z
  .custom<File | undefined>()
  .transform((val) => (val?.type === 'application/octet-stream' && !val.size ? undefined : val))
  .refine((val) => !val || (val instanceof File && val.type.startsWith('image/')), {
    message: 'Only images are valid',
  })
  .refine((val) => !val || val.size <= 1024 * 1024 * 2, {
    message: 'The image size must be equal to or less than 2 MB.',
  });

export const BlogFormSchema = z.object({
  title: requiredString,
  categoryName: requiredString,
  description: optionalString,
  image: ImageSchema,
  content: requiredString,
});

export const ProfileFormSchema = z.object({
  fullName: requiredString,
  gender: z.nativeEnum(Gender).optional(),
  avatar: ImageSchema,
  email: optionalEmail,
  websiteUrl: optionalUrl,
  githubUrl: optionalUrl,
  linkedinUrl: optionalUrl,
  bio: optionalString,
});
