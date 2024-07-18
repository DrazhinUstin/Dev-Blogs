import InfiniteScrollBlogs from '@/app/components/home/infinite-scroll-blogs';
import type { Prisma } from '@prisma/client';

export default function Page() {
  const orderBy: Prisma.BlogOrderByWithRelationInput = { likes: { _count: 'desc' } };
  return (
    <main>
      <InfiniteScrollBlogs orderBy={orderBy} />
    </main>
  );
}
