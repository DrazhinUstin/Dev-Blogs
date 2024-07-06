import { Suspense } from 'react';
import { fetchBlogCommentsTotalPages } from '@/app/lib/data';
import { commentsOrderOptions } from '@/app/lib/order-options';
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
  const { count, totalPages } = await fetchBlogCommentsTotalPages({ blogId });
  return (
    <main className='main'>
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
