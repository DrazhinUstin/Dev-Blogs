import { fetchAuthors } from '@/app/lib/data';
import UserCard from './user-card';
import type { Prisma } from '@prisma/client';
import type { UserFilters } from '@/app/lib/types';

export default async function UserList({
  filters,
  orderBy,
  page,
}: {
  filters: UserFilters;
  orderBy: Prisma.UserOrderByWithRelationInput;
  page: number;
}) {
  const authors = await fetchAuthors(filters, orderBy, page);
  return (
    <div>
      {authors.map((author) => (
        <UserCard key={author.id} {...author} />
      ))}
    </div>
  );
}
