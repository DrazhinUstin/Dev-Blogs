import NavLinks from '@/app/components/nav-links';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Activity',
    default: 'Activity',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h2 className='text-center'>Activity</h2>
      <nav className='my-4 text-center shadow-underline'>
        <NavLinks
          links={[
            { id: 1, href: '/profile/activity/likes', label: 'likes' },
            { id: 2, href: '/profile/activity/comments', label: 'comments' },
          ]}
        />
      </nav>
      <div>{children}</div>
    </div>
  );
}
