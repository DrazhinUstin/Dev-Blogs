'use client';

import { useRef, useEffect } from 'react';
import { useFormState } from 'react-dom';
import { addComment } from '@/app/lib/actions';
import FormSubmitBtn from '@/app/components/form-submit-btn';
import { FaPlus } from 'react-icons/fa6';

export default function AddCommentForm({ blogId }: { blogId: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const addCommentWithBlogId = addComment.bind(null, blogId);
  const [state, dispatch] = useFormState(addCommentWithBlogId, {});

  useEffect(() => {
    if (state.success) formRef.current?.reset();
  }, [state.success]);

  return (
    <form action={dispatch} className='form' ref={formRef}>
      <div>
        <textarea
          name='text'
          id='text'
          placeholder='Start writing a comment...'
          rows={3}
        ></textarea>
        {state.error && <p className='form-error'>{state.error.message}</p>}
      </div>
      <div className='text-end'>
        <FormSubmitBtn className='btn-flex'>
          <FaPlus />
          add comment
        </FormSubmitBtn>
      </div>
    </form>
  );
}
