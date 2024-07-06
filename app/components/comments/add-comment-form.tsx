'use client';

import { useFormState } from 'react-dom';
import { addComment } from '@/app/lib/actions';
import FormSubmitBtn from '@/app/components/form-submit-btn';
import { FaPlus } from 'react-icons/fa6';

export default function AddCommentForm({ blogId }: { blogId: string }) {
  const addCommentWithBlogId = addComment.bind(null, blogId);
  const [error, dispatch] = useFormState(addCommentWithBlogId, undefined);
  return (
    <form action={dispatch} className='form'>
      <div>
        <textarea
          name='text'
          id='text'
          placeholder='Start writing a comment...'
          rows={3}
        ></textarea>
        {error && <p>{error}</p>}
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
