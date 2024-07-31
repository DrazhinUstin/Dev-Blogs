import { fetchUsersTotalPages } from '@/app/lib/data';
import { usersOrderOptions } from '@/app/lib/order-options';
import Filters from '@/app/components/users/filters';
import Order from '@/app/components/order';
import { Suspense } from 'react';
import Spinner from '@/app/components/spinner';
import UserList from '@/app/components/users/user-list';
import Pagination from '@/app/components/pagination';
import type { UserFilters, UsersPageSearchParams } from '@/app/lib/types';
import styles from '@/app/users/page.module.scss';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Followers',
};

interface Props {
  params: { id: string };
  searchParams: UsersPageSearchParams;
}

export default async function Page({ params, searchParams }: Props) {
  const { orderBy, page, ...rest } = searchParams;
  const filters: UserFilters = { ...rest, followingId: params.id };
  const parsedOrderBy = orderBy ? JSON.parse(orderBy) : usersOrderOptions[0].value;
  const currentPage = Number(page) || 1;
  const totalPages = await fetchUsersTotalPages(filters);
  return (
    <main>
      <div className={styles.container}>
        <aside>
          <Filters />
        </aside>
        <div>
          <Order options={usersOrderOptions} />
          <Suspense key={JSON.stringify(searchParams)} fallback={<Spinner />}>
            <UserList filters={filters} orderBy={parsedOrderBy} page={currentPage} />
          </Suspense>
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      </div>
    </main>
  );
}
