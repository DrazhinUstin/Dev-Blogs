'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import FormSubmitBtn from '@/app/components/form-submit-btn';
import type { Category } from '@prisma/client';
import type { BlogFilters } from '@/app/lib/types';

export default function Filters({ categories }: { categories: Category[] }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData.entries()) as Record<string, string>;
    const { withDescription } = values;
    const params = new URLSearchParams(searchParams);
    Object.entries({ ...values, ...(!withDescription && { withDescription }) }).map(
      ([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      }
    );
    params.set('page', '1');
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className='form'>
      <div>
        <label htmlFor='query'>Search:</label>
        <input
          type='text'
          name='query'
          id='query'
          placeholder='Search by title, category, author name'
          defaultValue={searchParams.get('query') || undefined}
        />
      </div>
      <div>
        <label htmlFor='categoryName'>Category:</label>
        <select
          name='categoryName'
          id='categoryName'
          defaultValue={searchParams.get('categoryName') || undefined}
        >
          <option value=''>All</option>
          {categories.map(({ id, name }) => (
            <option key={id} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <div className='flex'>
        <input
          type='checkbox'
          name='withDescription'
          id='withDescription'
          value={'true' satisfies BlogFilters['withDescription']}
          defaultChecked={Boolean(searchParams.get('withDescription'))}
        />
        <label htmlFor='withDescription'>Only with description:</label>
      </div>
      <FormSubmitBtn className='btn w-100'>apply</FormSubmitBtn>
    </form>
  );
}
