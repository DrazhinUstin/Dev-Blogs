import { auth } from '@/auth';
import NavLinks from '@/app/components/nav-links';
import type { User } from 'next-auth';
import Avatar from '@/app/components/avatar';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const user = (await auth())?.user as User;
  return (
    <div>
      <header>
        <Avatar src={user.image} />
        <h4>{user.name}</h4>
      </header>
      <nav>
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
