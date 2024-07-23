import { Suspense } from 'react';
import { fetchBlogById, fetchBlogCommentsTotalPages } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { commentsOrderOptions } from '@/app/lib/order-options';
import Breadcrumbs from '@/app/components/breadcrumbs';
import AddCommentForm from '@/app/components/comments/add-comment-form';
import Order from '@/app/components/order';
import CommentList from '@/app/components/comments/comment-list';
import Pagination from '@/app/components/pagination';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Comments',
};

interface Props {
  params: { id: string };
  searchParams: { orderBy?: string; page?: string };
}

export default async function Page({ params: { id: blogId }, searchParams }: Props) {
  const { orderBy, page } = searchParams;
  const parsedOrderBy = orderBy ? JSON.parse(orderBy) : commentsOrderOptions[0].value;
  const currentPage = Number(page) || 1;
  const [blog, { count, totalPages }] = await Promise.all([
    fetchBlogById(blogId),
    fetchBlogCommentsTotalPages({ blogId }),
  ]);

  if (!blog) notFound();

  return (
    <main className='main'>
      <Breadcrumbs
        items={[
          { id: 1, label: 'home', href: '/' },
          { id: 2, label: 'blogs', href: '/blogs' },
          { id: 3, label: blog.title, href: `/blogs/${blogId}` },
          { id: 4, label: 'comments' },
        ]}
      />
      <h2 className='mb-4'>Comments ({count}):</h2>
      <AddCommentForm blogId={blogId} />
      <div className='mb-4'></div>
      <Order options={commentsOrderOptions} />
      <Suspense key={JSON.stringify(searchParams)} fallback={<h2>LOADING COMMENTS...</h2>}>
        <CommentList filters={{ blogId }} orderBy={parsedOrderBy} page={currentPage} />
      </Suspense>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </main>
  );
}
