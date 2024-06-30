import NavLinks from '../components/nav-links';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Dashboard',
    default: 'Dashboard',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <aside>
        <NavLinks
          links={[
            { id: 1, href: '/dashboard', label: 'overview' },
            { id: 2, href: '/dashboard/blogs', label: 'manage blogs' },
            { id: 3, href: '/dashboard/blogs/create', label: 'create blog' },
          ]}
        />
      </aside>
      <div>{children}</div>
    </div>
  );
}
