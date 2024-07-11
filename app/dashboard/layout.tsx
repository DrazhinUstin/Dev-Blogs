import Sidebar from '@/app/components/dashboard/sidebar';
import styles from './layout.module.scss';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Dashboard',
    default: 'Dashboard',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div>{children}</div>
    </div>
  );
}
