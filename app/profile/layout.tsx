import NavLinks from '@/app/components/nav-links';
import type { Metadata } from 'next';
import styles from './layout.module.scss';

export const metadata: Metadata = {
  title: {
    template: '%s | Profile',
    default: 'Profile',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`main ${styles.container}`}>
      <aside className={styles.sidebar}>
        <nav>
          <NavLinks
            links={[
              { id: 1, href: '/profile', label: 'me' },
              { id: 2, href: '/profile/activity/likes', label: 'activity' },
              { id: 3, href: '/profile/following', label: 'following' },
            ]}
            style='alternative'
          />
        </nav>
      </aside>
      {children}
    </div>
  );
}
