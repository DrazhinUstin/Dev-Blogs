import { auth } from '@/auth';
import { pageLinks } from '@/app/lib/page-links';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa6';
import styles from './footer.module.scss';

export default async function Footer() {
  const user = (await auth())?.user;
  return (
    <footer className={styles.container}>
      <div className='section-center'>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} Dev-blogs{' '}
          <a
            href='https://github.com/DrazhinUstin/Dev-Blogs'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaGithub />
          </a>
        </p>
        <nav className={styles.links}>
          {pageLinks.map(
            ({ id, href, label, isProtected }) =>
              ((isProtected && user) || !isProtected) && (
                <Link key={id} href={href}>
                  {label}
                </Link>
              )
          )}
        </nav>
      </div>
    </footer>
  );
}
