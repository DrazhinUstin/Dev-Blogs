import { fetchAuthorsTotalPages } from '@/app/lib/data';
import { usersOrderOptions } from '@/app/lib/order-options';
import Filters from '@/app/components/users/filters';
import Order from '@/app/components/order';
import { Suspense } from 'react';
import UserList from '@/app/components/users/user-list';
import Pagination from '@/app/components/pagination';
import type { UsersPageSearchParams } from '../lib/types';

interface Props {
  searchParams: UsersPageSearchParams;
}

export default async function Page({ searchParams }: Props) {
  const { orderBy, page, ...filters } = searchParams;
  const parsedOrderBy = orderBy ? JSON.parse(orderBy) : usersOrderOptions[0].value;
  const currentPage = Number(page) || 1;
  const totalPages = await fetchAuthorsTotalPages(filters);
  return (
    <main>
      <h2>Authors</h2>
      <div>
        <aside>
          <Filters />
        </aside>
        <div>
          <Order options={usersOrderOptions} />
          <Suspense key={JSON.stringify(searchParams)} fallback={<h2>LOADING...</h2>}>
            <UserList filters={filters} orderBy={parsedOrderBy} page={currentPage} />
          </Suspense>
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      </div>
    </main>
  );
}
