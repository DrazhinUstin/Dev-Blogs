import { auth } from '@/auth';
import { Suspense } from 'react';
import { fetchUserLikedBlogs, fetchUserLikedBlogsTotalPages } from '@/app/lib/data';
import Order from '@/app/components/order';
import { usersOnBlogsOrderOptions } from '@/app/lib/order-options';
import Pagination from '@/app/components/pagination';
import BlogCard from '@/app/components/blogs/blog-card';
import Spinner from '@/app/components/spinner';
import type { Prisma } from '@prisma/client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Likes',
};

interface Props {
  searchParams: { orderBy?: string; page?: string };
}

export default async function Page({ searchParams }: Props) {
  const { orderBy, page } = searchParams;
  const parsedOrderBy = orderBy ? JSON.parse(orderBy) : usersOnBlogsOrderOptions[0].value;
  const currentPage = Number(page) || 1;
  const currentUser = (await auth())?.user;
  const totalPages = await fetchUserLikedBlogsTotalPages(currentUser?.id as string);
  return (
    <main>
      <div>
        <Order options={usersOnBlogsOrderOptions} />
        <Suspense key={JSON.stringify(searchParams)} fallback={<Spinner />}>
          <List userId={currentUser?.id as string} orderBy={parsedOrderBy} page={currentPage} />
        </Suspense>
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </main>
  );
}

async function List({
  userId,
  orderBy,
  page,
}: {
  userId: string;
  orderBy: Prisma.UsersOnBlogsOrderByWithRelationInput;
  page: number;
}) {
  const blogs = await fetchUserLikedBlogs(userId, orderBy, page);
  return (
    <div>
      <div>
        {blogs.map((blog) => (
          <BlogCard key={blog.id} {...blog} />
        ))}
      </div>
      {blogs.length === 0 && <p className='text-center'>You have no liked blogs...</p>}
    </div>
  );
}
