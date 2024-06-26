'use client';

import { useFormState } from 'react-dom';
import { editBlog } from '@/app/lib/actions';
import FormSubmitBtn from '@/app/components/form-submit-btn';
import type { Blog, Category } from '@prisma/client';

export default function EditBlogForm({ blog, categories }: { blog: Blog; categories: Category[] }) {
  const editBlogWithId = editBlog.bind(null, blog.id, blog.imageUrl);
  const [state, dispatch] = useFormState(editBlogWithId, {});
  return (
    <form action={dispatch}>
      <h2>Edit a Blog</h2>
      <div>
        <label htmlFor='categoryName'>Category name:</label>
        <select name='categoryName' id='categoryName' defaultValue={blog.categoryName}>
          {categories.map(({ id, name }) => (
            <option key={id} value={name}>
              {name}
            </option>
          ))}
        </select>
        {state.fieldErrors?.categoryName && <p>{state.fieldErrors.categoryName}</p>}
      </div>
      <div>
        <label htmlFor='title'>Title:</label>
        <input type='text' name='title' id='title' defaultValue={blog.title} />
        {state.fieldErrors?.title && <p>{state.fieldErrors.title}</p>}
      </div>
      <div>
        <label htmlFor='description'>Description:</label>
        <textarea
          name='description'
          id='description'
          cols={30}
          rows={10}
          defaultValue={blog.description || undefined}
        ></textarea>
        {state.fieldErrors?.description && <p>{state.fieldErrors.description}</p>}
      </div>
      <div>
        <label htmlFor='image'>Preview image:</label>
        <input type='file' name='image' id='image' accept='image/*' />
        {state.fieldErrors?.image && <p>{state.fieldErrors.image}</p>}
      </div>
      <div>
        <label htmlFor='content'>Content:</label>
        <textarea
          name='content'
          id='content'
          cols={30}
          rows={10}
          defaultValue={blog.content}
        ></textarea>
        {state.fieldErrors?.content && <p>{state.fieldErrors.content}</p>}
      </div>
      {state.errorMsg && <p>{state.errorMsg}</p>}
      <FormSubmitBtn>edit</FormSubmitBtn>
    </form>
  );
}
