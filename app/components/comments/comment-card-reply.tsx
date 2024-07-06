'use client';

import { useState } from 'react';
import { useFormState } from 'react-dom';
import { useParams } from 'next/navigation';
import { FaReply } from 'react-icons/fa6';
import { replyOnComment } from '@/app/lib/actions';
import FormSubmitBtn from '@/app/components/form-submit-btn';

export default function CommentCardReply({ commentId }: { commentId: string }) {
  const [isReplyFormOpen, setIsReplyFormOpen] = useState<boolean>(false);

  return (
    <div>
      <button onClick={() => setIsReplyFormOpen(!isReplyFormOpen)} className='btn-flex text-sm'>
        <FaReply /> reply
      </button>
      {isReplyFormOpen && <ReplyForm commentId={commentId} />}
    </div>
  );
}

function ReplyForm({ commentId }: { commentId: string }) {
  const { id: blogId } = useParams();
  const replyOnCommentWithId = replyOnComment.bind(null, commentId, blogId as string);
  const [error, dispatch] = useFormState(replyOnCommentWithId, undefined);
  return (
    <form action={dispatch} className='form mt-2'>
      <textarea name='text' placeholder='Start writing your reply...' rows={3} autoFocus></textarea>
      {error && <p>{error}</p>}
      <div className='text-end'>
        <FormSubmitBtn className='btn text-sm'>submit</FormSubmitBtn>
      </div>
    </form>
  );
}
