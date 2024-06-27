import { fetchBlogComments } from '@/app/lib/data';
import CommentCard from './comment-card';
import type { Prisma } from '@prisma/client';
import type { CommentsFilters } from '@/app/lib/types';

export default async function CommentList({
  filters,
  orderBy,
  page,
}: {
  filters: CommentsFilters;
  orderBy: Prisma.CommentOrderByWithRelationInput;
  page: number;
}) {
  const comments = await fetchBlogComments(filters, orderBy, page);
  return (
    <div>
      {comments.map(({ blog, ...rest }) => (
        <CommentCard key={rest.id} {...{ ...rest, ...(filters.userId && { blog }) }} />
      ))}
    </div>
  );
}
