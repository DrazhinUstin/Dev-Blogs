'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import FormSubmitBtn from '@/app/components/form-submit-btn';
import type { UserFilters } from '@/app/lib/types';

export default function Filters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData.entries()) as { [key: string]: string };
    const { withBio } = values;
    Object.entries({ ...values, ...(!withBio && { withBio }) }).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
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
          placeholder='Search by name, email'
          defaultValue={searchParams.get('query') || undefined}
        />
      </div>
      <div>
        <input
          type='checkbox'
          name='withBio'
          id='withBio'
          value={'true' satisfies UserFilters['withBio']}
          defaultChecked={!!searchParams.get('withBio')}
        />
        <label htmlFor='withBio'>With bio:</label>
      </div>
      <FormSubmitBtn className='btn w-100'>apply</FormSubmitBtn>
    </form>
  );
}
