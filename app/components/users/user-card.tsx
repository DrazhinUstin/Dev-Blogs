import type { Prisma } from '@prisma/client';
import { fetchUsers } from '@/app/lib/data';
import Avatar from '@/app/components/avatar';
import Link from 'next/link';
import { cutString } from '@/app/lib/utils';
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
      <Link href={`/users/${id}`}>
        <Avatar src={image} />
      </Link>
      <div>
        <h4>
          <Link href={`/users/${id}`}>{name}</Link>
        </h4>
        <p>{profile?.bio && cutString(profile.bio)}</p>
        <p className={styles.stats}>
          <Link href={`/users/${id}/followers`} title='followers'>
            <FaUsers /> {followersCount}
          </Link>
          <Link href={`/users/${id}/blogs`} title='blogs'>
            <FaFilePen /> {blogsCount}
          </Link>
        </p>
      </div>
    </article>
  );
}
