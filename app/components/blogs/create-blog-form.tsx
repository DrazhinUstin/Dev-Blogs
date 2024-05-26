'use client';

import { useFormState } from 'react-dom';
import { createBlog } from '@/app/lib/actions';
import FormSubmitBtn from '@/app/components/form-submit-btn';
import type { Category } from '@prisma/client';

export default function CreateBlogForm({ categories }: { categories: Category[] }) {
  const [state, dispatch] = useFormState(createBlog, {});
  return (
    <form action={dispatch}>
      <h2>Create a Blog</h2>
      <div>
        <label htmlFor='categoryName'>category name:</label>
        <select name='categoryName' id='categoryName'>
          {categories.map(({ id, name }) => (
            <option key={id} value={name}>
              {name}
            </option>
          ))}
        </select>
        {state.fieldErrors?.categoryName && <p>{state.fieldErrors.categoryName}</p>}
      </div>
      <div>
        <label htmlFor='title'>title:</label>
        <input type='text' name='title' id='title' />
        {state.fieldErrors?.title && <p>{state.fieldErrors.title}</p>}
      </div>
      <div>
        <label htmlFor='description'>description:</label>
        <textarea name='description' id='description' cols={30} rows={10}></textarea>
        {state.fieldErrors?.description && <p>{state.fieldErrors.description}</p>}
      </div>
      <div>
        <label htmlFor='image'>Preview image:</label>
        <input type='file' name='image' id='image' accept='image/*' />
        {state.fieldErrors?.image && <p>{state.fieldErrors.image}</p>}
      </div>
      <div>
        <label htmlFor='content'>content:</label>
        <textarea name='content' id='content' cols={30} rows={10}></textarea>
        {state.fieldErrors?.content && <p>{state.fieldErrors.content}</p>}
      </div>
      {state.errorMsg && <p>{state.errorMsg}</p>}
      <FormSubmitBtn>create</FormSubmitBtn>
    </form>
  );
}
