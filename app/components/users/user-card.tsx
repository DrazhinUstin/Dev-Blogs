import type { Prisma } from '@prisma/client';
import { fetchUsers } from '@/app/lib/data';
import Avatar from '@/app/components/avatar';
import Link from 'next/link';
import { FaUsers, FaFilePen, FaEye } from 'react-icons/fa6';
import styles from './user-card.module.scss';

export default function UserCard({
  id,
  name,
  image,
  profile,
  blogsCount,
  followersCount,
}: Prisma.PromiseReturnType<typeof fetchUsers>[0]) {
  return (
    <article className={styles.card}>
      <Avatar src={image} />
      <div>
        <h4>{name}</h4>
        <p>{profile?.bio}</p>
        <p className={styles.stats}>
          <Link href={`/users/${id}/followers`} title='followers'>
            <FaUsers /> {followersCount}
          </Link>
          <Link href={`/users/${id}/blogs`} title='blogs'>
            <FaFilePen /> {blogsCount}
          </Link>
        </p>
      </div>
      <Link href={`/users/${id}`} className='btn-flex'>
        <FaEye /> view
      </Link>
    </article>
  );
}
