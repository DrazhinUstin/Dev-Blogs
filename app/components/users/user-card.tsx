import type { Prisma } from '@prisma/client';
import { fetchAuthors } from '@/app/lib/data';
import Avatar from '@/app/components/avatar';
import Link from 'next/link';
import { FaFilePen, FaEye } from 'react-icons/fa6';
import styles from './user-card.module.scss';

export default function UserCard({
  id,
  name,
  image,
  blogsCount,
}: Prisma.PromiseReturnType<typeof fetchAuthors>[0]) {
  return (
    <article className={styles.card}>
      <Avatar src={image} />
      <h4>{name}</h4>
      <div>
        <Link href={`/users/${id}/blogs`} className='btn-flex w-100'>
          <FaFilePen /> {blogsCount} {blogsCount === 1 ? 'Blog' : 'Blogs'}
        </Link>
      </div>
      <Link href={`/users/${id}`} className='btn-flex w-100'>
        <FaEye /> view
      </Link>
    </article>
  );
}
