import type { User } from '@prisma/client';
import Avatar from '@/app/components/avatar';
import Link from 'next/link';

export default function BlogAuthor({
  author: { id, name, image },
}: {
  author: Pick<User, 'id' | 'name' | 'image'>;
}) {
  return (
    <div>
      <Avatar src={image} />
      <div>
        <h4>{name}</h4>
        <Link href={`/users/${id}`}>view</Link>
      </div>
    </div>
  );
}
