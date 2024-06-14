import Modal from '@/app/components/modal';
import AddCommentForm from '@/app/components/comments/add-comment-form';
import CommentList from '@/app/components/comments/comment-list';

export default async function Page({ params: { id } }: { params: { id: string } }) {
  return (
    <Modal>
      <div>
        <h2>Comments:</h2>
        <AddCommentForm blogId={id} />
        <CommentList blogId={id} />
      </div>
    </Modal>
  );
}
