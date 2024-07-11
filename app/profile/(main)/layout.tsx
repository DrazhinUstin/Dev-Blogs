import { auth } from '@/auth';
import NavLinks from '@/app/components/nav-links';
import type { User } from 'next-auth';
import Avatar from '@/app/components/avatar';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const user = (await auth())?.user as User;
  return (
    <div>
      <header className='text-center mb-2'>
        <Avatar src={user.image} width={100} height={100} className='m-auto' />
        <h3 className='mt'>{user.name}</h3>
      </header>
      <nav className='text-center mb-4'>
        <NavLinks
          links={[
            { id: 1, href: '/profile', label: 'Profile' },
            { id: 2, href: '/profile/edit', label: 'Edit' },
          ]}
        />
      </nav>
      {children}
    </div>
  );
}
