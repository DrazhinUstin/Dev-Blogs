import { auth } from '@/auth';
import type { User } from 'next-auth';
import Avatar from '@/app/components/avatar';
import { Suspense } from 'react';
import { ProfileInfo } from '@/app/components/profile/profile-info';
import styles from './page.module.scss';

export default async function Page() {
  const user = (await auth())?.user as User;
  return (
    <main>
      <ul className={styles.list}>
        <li>
          <span>Avatar:</span>
          <Avatar src={user.image} width={32} height={32} />
        </li>
        <li>
          <span>Name:</span>
          <span>{user.name}</span>
        </li>
        <li>
          <span>Email:</span>
          <span>{user.email}</span>
        </li>
      </ul>
      <Suspense fallback={<h2>LOADING PROFILE...</h2>}>
        <ProfileInfo />
      </Suspense>
    </main>
  );
}
