import { auth } from '@/auth';
import InfiniteScrollBlogs from '@/app/components/home/infinite-scroll-blogs';
import type { Prisma } from '@prisma/client';

export default async function Page() {
  const currentUser = (await auth())?.user;
  const orderBy: Prisma.BlogOrderByWithRelationInput = { createdAt: 'desc' };
  return (
    <main>
      <InfiniteScrollBlogs followerId={currentUser?.id} orderBy={orderBy} />
    </main>
  );
}
