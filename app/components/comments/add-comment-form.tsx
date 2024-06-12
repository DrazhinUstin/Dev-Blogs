'use client';

import { useFormState } from 'react-dom';
import { addComment } from '@/app/lib/actions';
import FormSubmitBtn from '@/app/components/form-submit-btn';

export default function AddCommentForm({ blogId }: { blogId: string }) {
  const addCommentWithBlogId = addComment.bind(null, blogId);
  const [error, dispatch] = useFormState(addCommentWithBlogId, undefined);
  return (
    <form action={dispatch}>
      <div>
        <label htmlFor='text'>Add a comment</label>
        <textarea name='text' id='text' cols={30} rows={10}></textarea>
        {error && <p>{error}</p>}
      </div>
      <FormSubmitBtn>submit</FormSubmitBtn>
    </form>
  );
}
