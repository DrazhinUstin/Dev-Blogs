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
      <button onClick={() => setIsReplyFormOpen(!isReplyFormOpen)}>
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
    <form action={dispatch}>
      <textarea name='text' id='text' cols={30} rows={10}></textarea>
      {error && <p>{error}</p>}
      <FormSubmitBtn>submit</FormSubmitBtn>
    </form>
  );
}
