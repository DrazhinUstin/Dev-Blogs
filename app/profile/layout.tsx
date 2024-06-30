import NavLinks from '@/app/components/nav-links';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Profile',
    default: 'Profile',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <aside>
        <NavLinks
          links={[
            { id: 1, href: '/profile', label: 'profile' },
            { id: 2, href: '/profile/activity/likes', label: 'activity' },
          ]}
        />
      </aside>
      {children}
    </div>
  );
}
