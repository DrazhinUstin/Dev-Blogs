import type { Prisma } from '@prisma/client';

export const blogsOrderOptions: {
  id: number;
  label: string;
  value: Prisma.BlogOrderByWithRelationInput;
}[] = [
  { id: 1, label: 'Creation date (desc)', value: { createdAt: 'desc' } },
  { id: 2, label: 'Creation date (asc)', value: { createdAt: 'asc' } },
  { id: 3, label: 'Title (desc)', value: { title: 'desc' } },
  { id: 4, label: 'Title (asc)', value: { title: 'asc' } },
  { id: 5, label: 'Likes (desc)', value: { likes: { _count: 'desc' } } },
  { id: 6, label: 'Likes (asc)', value: { likes: { _count: 'asc' } } },
];

export const usersOnBlogsOrderOptions: {
  id: number;
  label: string;
  value: Prisma.UsersOnBlogsOrderByWithRelationInput;
}[] = [
  { id: 1, label: 'Liked at (desc)', value: { likedAt: 'desc' } },
  { id: 2, label: 'Liked at (asc)', value: { likedAt: 'asc' } },
];

export const commentsOrderOptions: {
  id: number;
  label: string;
  value: Prisma.CommentOrderByWithRelationInput;
}[] = [
  { id: 1, label: 'Creation date (desc)', value: { createdAt: 'desc' } },
  { id: 2, label: 'Creation date (asc)', value: { createdAt: 'asc' } },
];
