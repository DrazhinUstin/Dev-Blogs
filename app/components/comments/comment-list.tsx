import { fetchBlogComments } from '@/app/lib/data';
import CommentCard from './comment-card';

export default async function CommentList({ blogId }: { blogId: string }) {
  const comments = await fetchBlogComments(blogId, 1);
  return (
    <div>
      {comments.map((comment) => (
        <CommentCard key={comment.id} {...comment} />
      ))}
    </div>
  );
}
