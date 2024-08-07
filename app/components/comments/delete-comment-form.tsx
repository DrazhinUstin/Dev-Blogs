import { deleteComment } from '@/app/lib/actions';
import FormSubmitBtn from '@/app/components/form-submit-btn';
import { FaTrash } from 'react-icons/fa6';

export default function DeleteCommentForm({ commentId }: { commentId: string }) {
  const deleteCommentWithId = deleteComment.bind(null, commentId);
  return (
    <form action={deleteCommentWithId}>
      <FormSubmitBtn className='btn-flex text-sm bg-clr-red'>
        <FaTrash />
        delete
      </FormSubmitBtn>
    </form>
  );
}
