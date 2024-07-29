import { auth } from '@/auth';
import { fetchUsersTotalPages } from '@/app/lib/data';
import { usersOrderOptions } from '@/app/lib/order-options';
import Filters from '@/app/components/users/filters';
import Order from '@/app/components/order';
import { Suspense } from 'react';
import UserList from '@/app/components/users/user-list';
import Pagination from '@/app/components/pagination';
import type { UserFilters, UsersPageSearchParams } from '@/app/lib/types';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Following',
};

interface Props {
  searchParams: UsersPageSearchParams;
}

export default async function Page({ searchParams }: Props) {
  const { orderBy, page, ...rest } = searchParams;
  const currentUser = (await auth())?.user;
  const filters: UserFilters = { ...rest, followedById: currentUser?.id };
  const parsedOrderBy = orderBy ? JSON.parse(orderBy) : usersOrderOptions[0].value;
  const currentPage = Number(page) || 1;
  const totalPages = await fetchUsersTotalPages(filters);
  return (
    <main>
      <h2 className='mb-4 text-center'>Following</h2>
      <Filters />
      <div className='mb-4'></div>
      <Order options={usersOrderOptions} />
      <Suspense key={JSON.stringify(searchParams)} fallback={<h2>LOADING...</h2>}>
        <UserList filters={filters} orderBy={parsedOrderBy} page={currentPage} />
      </Suspense>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </main>
  );
}
