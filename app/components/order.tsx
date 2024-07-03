'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import type { Prisma } from '@prisma/client';
import styles from './order.module.scss';

export default function Order({
  options,
}: {
  options: { id: number; label: string; value: Prisma.BlogOrderByWithRelationInput }[];
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const orderBy = e.target.value;
    const params = new URLSearchParams(searchParams);
    params.set('orderBy', orderBy);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={styles.container}>
      <label htmlFor='orderBy'>Order By:</label>
      <select
        name='orderBy'
        id='orderBy'
        onChange={handleChange}
        defaultValue={searchParams.get('orderBy') || undefined}
      >
        {options.map(({ id, label, value }) => (
          <option key={id} value={JSON.stringify(value)}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
