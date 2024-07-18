import NavLinks from '@/app/components/nav-links';
import { Suspense } from 'react';
import Categories from '@/app/components/home/categories';
import styles from './layout.module.scss';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='main'>
      <div className={styles.container}>
        <div>
          <nav>
            <NavLinks
              links={[
                { id: 1, href: '/', label: 'top' },
                { id: 2, href: '/latest', label: 'latest' },
                { id: 3, href: '/following', label: 'following' },
              ]}
            />
          </nav>
          <div className='mt-4'>{children}</div>
        </div>
        <aside>
          <Suspense fallback={<h2>Loading categories...</h2>}>
            <Categories />
          </Suspense>
        </aside>
      </div>
    </div>
  );
}
