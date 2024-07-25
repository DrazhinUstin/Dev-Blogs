'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';
import styles from './nav-links.module.scss';

export default function NavLinks({
  links,
  style = 'base',
}: {
  links: { id: number; href: string; label: string; icon?: React.ReactElement }[];
  style?: 'base' | 'alternative';
}) {
  const pathname = usePathname();
  return (
    <>
      {links.map(({ id, href, label, icon }) => (
        <Link
          key={id}
          href={href}
          className={clsx(styles[`link_${style}`], href === pathname && styles.active)}
        >
          {icon}
          {label}
        </Link>
      ))}
    </>
  );
}
