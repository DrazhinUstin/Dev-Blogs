'use client';

import { useFormState } from 'react-dom';
import { editBlog } from '@/app/lib/actions';
import WYSIWYGFormField from '@/app/components/wysiwyg-form-field';
import FormSubmitBtn from '@/app/components/form-submit-btn';
import type { Blog, Category } from '@prisma/client';

export default function EditBlogForm({ blog, categories }: { blog: Blog; categories: Category[] }) {
  const editBlogWithId = editBlog.bind(null, blog.id, blog.imageUrl);
  const [state, dispatch] = useFormState(editBlogWithId, {});
  return (
    <form action={dispatch} className='form'>
      <h2>Edit "{blog.title}"</h2>
      <div>
        <label htmlFor='categoryName'>Category name:</label>
        <select name='categoryName' id='categoryName' defaultValue={blog.categoryName}>
          {categories.map(({ id, name }) => (
            <option key={id} value={name}>
              {name}
            </option>
          ))}
        </select>
        {state.fieldErrors?.categoryName && (
          <p className='form-error'>{state.fieldErrors.categoryName}</p>
        )}
      </div>
      <div>
        <label htmlFor='title'>Title:</label>
        <input type='text' name='title' id='title' defaultValue={blog.title} />
        {state.fieldErrors?.title && <p className='form-error'>{state.fieldErrors.title}</p>}
      </div>
      <div>
        <label htmlFor='description'>Description:</label>
        <textarea
          name='description'
          id='description'
          rows={5}
          defaultValue={blog.description || undefined}
        ></textarea>
        {state.fieldErrors?.description && (
          <p className='form-error'>{state.fieldErrors.description}</p>
        )}
      </div>
      <div>
        <label htmlFor='readingTime'>approximate reading time (in minutes):</label>
        <input
          type='number'
          name='readingTime'
          id='readingTime'
          min={1}
          step={1}
          defaultValue={blog.readingTime}
        />
        {state.fieldErrors?.readingTime && (
          <p className='form-error'>{state.fieldErrors.readingTime}</p>
        )}
      </div>
      <div>
        <label htmlFor='image'>Preview image:</label>
        <input type='file' name='image' id='image' accept='image/*' />
        {state.fieldErrors?.image && <p className='form-error'>{state.fieldErrors.image}</p>}
      </div>
      <div>
        <WYSIWYGFormField name='content' label='content:' initialValue={blog.content} />
        {state.fieldErrors?.content && <p className='form-error'>{state.fieldErrors.content}</p>}
      </div>
      {state.errorMsg && <p className='form-error'>{state.errorMsg}</p>}
      <FormSubmitBtn className='btn w-100'>edit</FormSubmitBtn>
    </form>
  );
}
