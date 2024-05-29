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
];
