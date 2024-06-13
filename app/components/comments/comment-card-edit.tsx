'use client';

import { useState } from 'react';
import { useFormState } from 'react-dom';
import { FaPen } from 'react-icons/fa6';
import { editComment } from '@/app/lib/actions';
import FormSubmitBtn from '@/app/components/form-submit-btn';

export default function CommentCardEdit({
  commentId,
  commentText,
}: {
  commentId: string;
  commentText: string;
}) {
  const [isEditFormOpen, setIsEditFormOpen] = useState<boolean>(false);
  return (
    <>
      <button onClick={() => setIsEditFormOpen(!isEditFormOpen)}>
        <FaPen />
        edit
      </button>
      {isEditFormOpen && (
        <EditForm
          commentId={commentId}
          defaultValue={commentText}
          closeForm={() => setIsEditFormOpen(false)}
        />
      )}
    </>
  );
}

function EditForm({
  commentId,
  defaultValue,
  closeForm,
}: {
  commentId: string;
  defaultValue: string;
  closeForm: () => void;
}) {
  const editCommentWithId = editComment.bind(null, commentId);
  const [error, dispatch] = useFormState(editCommentWithId, undefined);
  return (
    <form
      action={(formData) => {
        dispatch(formData);
        closeForm();
      }}
    >
      <textarea name='text' id='text' defaultValue={defaultValue} cols={30} rows={10} />
      {error && <p>{error}</p>}
      <FormSubmitBtn>submit</FormSubmitBtn>
    </form>
  );
}
