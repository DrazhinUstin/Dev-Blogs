'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';
import styles from './nav-links.module.scss';

export default function NavLinks({
  links,
}: {
  links: { id: number; href: string; label: string }[];
}) {
  const pathname = usePathname();
  return (
    <>
      {links.map(({ id, href, label }) => (
        <Link
          key={id}
          href={href}
          className={clsx(styles.link, href === pathname && styles.active)}
        >
          {label}
        </Link>
      ))}
    </>
  );
}
