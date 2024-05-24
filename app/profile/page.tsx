import { auth } from '@/auth';
import SignOutForm from '@/app/components/auth/sign-out-form';
import Image from 'next/image';
import type { User } from 'next-auth';

export default async function Page() {
  const user = (await auth())?.user as User;
  return (
    <div>
      <Image src={user.image || ''} alt='avatar' />
      <h4>{user.name}</h4>
      <p>{user.email}</p>
      <p>{user.role}</p>
      <SignOutForm />
    </div>
  );
}
