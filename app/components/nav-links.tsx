'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function NavLinks({
  links,
}: {
  links: { id: number; href: string; label: string }[];
}) {
  const pathname = usePathname();
  return (
    <>
      {links.map(({ id, href, label }) => (
        <Link key={id} href={href} className={href === pathname ? 'active' : undefined}>
          {label}
        </Link>
      ))}
    </>
  );
}
