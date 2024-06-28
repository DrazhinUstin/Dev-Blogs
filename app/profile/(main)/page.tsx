import { auth } from '@/auth';
import type { User } from 'next-auth';
import Avatar from '@/app/components/avatar';
import { Suspense } from 'react';
import { ProfileInfo } from '@/app/components/profile/profile-info';
import SignOutForm from '@/app/components/auth/sign-out-form';

export default async function Page() {
  const user = (await auth())?.user as User;
  return (
    <main>
      <ul>
        <li>
          Avatar: <Avatar src={user.image} width={32} height={32} />
        </li>
        <li>
          Display name: <span>{user.name}</span>
        </li>
        <li>
          Email: <span>{user.email}</span>
        </li>
      </ul>
      <Suspense fallback={<h2>LOADING PROFILE...</h2>}>
        <ProfileInfo />
      </Suspense>
      <SignOutForm />
    </main>
  );
}
