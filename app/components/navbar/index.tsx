import { auth } from '@/auth';
import Link from 'next/link';
import Logo from '@/app/components/logo';
import LinksMenu from './links-menu';
import UserMenu from './user-menu';
import SignOutForm from '@/app/components/auth/sign-out-form';
import styles from './styles.module.scss';

export default async function Navbar() {
  const user = (await auth())?.user;
  return (
    <nav className={styles.container}>
      <div className='section-center'>
        <Link href='/'>
          <Logo />
        </Link>
        <LinksMenu user={user} />
        {user ? (
          <UserMenu user={user}>
            <SignOutForm />
          </UserMenu>
        ) : (
          <Link href='/auth/login' className='btn'>
            sign in
          </Link>
        )}
      </div>
    </nav>
  );
}
