import AddCommentForm from './add-comment-form';
import CommentList from './comment-list';

export default async function BlogComments({ blogId }: { blogId: string }) {
  return (
    <div>
      <h2>Comments:</h2>
      <AddCommentForm blogId={blogId} />
      <CommentList blogId={blogId} />
    </div>
  );
}
