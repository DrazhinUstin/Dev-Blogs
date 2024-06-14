import AddCommentForm from '@/app/components/comments/add-comment-form';
import CommentList from '@/app/components/comments/comment-list';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Comments',
};

export default async function Page({ params: { id } }: { params: { id: string } }) {
  return (
    <div>
      <h2>Comments:</h2>
      <AddCommentForm blogId={id} />
      <CommentList blogId={id} />
    </div>
  );
}
