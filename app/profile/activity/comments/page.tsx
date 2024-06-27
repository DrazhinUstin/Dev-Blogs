import { commentsOrderOptions } from '@/app/lib/order-options';
import { fetchBlogCommentsTotalPages } from '@/app/lib/data';
import { auth } from '@/auth';
import Order from '@/app/components/order';
import { Suspense } from 'react';
import CommentList from '@/app/components/comments/comment-list';
import Pagination from '@/app/components/pagination';

interface Props {
  searchParams: { orderBy?: string; page?: string };
}

export default async function Page({ searchParams }: Props) {
  const { orderBy, page } = searchParams;
  const parsedOrderBy = orderBy ? JSON.parse(orderBy) : commentsOrderOptions[0].value;
  const currentPage = Number(page) || 1;
  const userId = (await auth())?.user?.id as string;
  const { totalPages } = await fetchBlogCommentsTotalPages({ userId });
  return (
    <main>
      <Order options={commentsOrderOptions} />
      <Suspense key={JSON.stringify(searchParams)} fallback={<h2>LOADING...</h2>}>
        <CommentList filters={{ userId }} orderBy={parsedOrderBy} page={currentPage} />
      </Suspense>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </main>
  );
}
