import { fetchBlogComments } from '@/app/lib/data';
import CommentCard from './comment-card';
import type { Prisma } from '@prisma/client';

export default async function CommentList({
  blogId,
  orderBy,
  page,
}: {
  blogId: string;
  orderBy: Prisma.CommentOrderByWithRelationInput;
  page: number;
}) {
  const comments = await fetchBlogComments(blogId, orderBy, page);
  return (
    <div>
      {comments.map((comment) => (
        <CommentCard key={comment.id} {...comment} />
      ))}
    </div>
  );
}
