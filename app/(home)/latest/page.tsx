import InfiniteScrollBlogs from '@/app/components/home/infinite-scroll-blogs';
import type { Prisma } from '@prisma/client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Latest',
};

export default function Page() {
  const orderBy: Prisma.BlogOrderByWithRelationInput = { createdAt: 'desc' };
  return (
    <main>
      <InfiniteScrollBlogs orderBy={orderBy} />
    </main>
  );
}
