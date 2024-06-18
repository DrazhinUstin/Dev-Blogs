import type { Prisma } from '@prisma/client';
import { fetchAuthors } from '@/app/lib/data';
import Avatar from '@/app/components/avatar';
import Link from 'next/link';

export default function UserCard({
  id,
  name,
  image,
  blogsCount,
}: Prisma.PromiseReturnType<typeof fetchAuthors>[0]) {
  return (
    <article>
      <Avatar src={image} />
      <h4>{name}</h4>
      <Link href={`/users/${id}/blogs`}>{blogsCount} blogs</Link>
      <Link href={`/users/${id}`}>view</Link>
    </article>
  );
}
