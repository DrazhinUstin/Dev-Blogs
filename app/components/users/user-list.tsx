import { fetchUsers } from '@/app/lib/data';
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
  const users = await fetchUsers(filters, orderBy, page);
  return (
    <div>
      {users.map((user) => (
        <UserCard key={user.id} {...user} />
      ))}
      {users.length === 0 && <p className='text-center'>No users were found...</p>}
    </div>
  );
}
