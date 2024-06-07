import { auth } from '@/auth';
import Avatar from '@/app/components/avatar';
import SignOutForm from '@/app/components/auth/sign-out-form';
import type { User } from 'next-auth';

export default async function Page() {
  const user = (await auth())?.user as User;
  return (
    <div>
      <Avatar src={user.image} width={100} height={100} />
      <h4>{user.name}</h4>
      <p>{user.email}</p>
      <p>{user.role}</p>
      <SignOutForm />
    </div>
  );
}
