'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { FaHouse, FaList, FaPenToSquare, FaUsers } from 'react-icons/fa6';
import clsx from 'clsx';
import styles from './sidebar.module.scss';

const links = [
  { id: 1, href: '/dashboard', label: 'overview', icon: <FaHouse /> },
  { id: 2, href: '/dashboard/blogs', label: 'manage blogs', icon: <FaList /> },
  { id: 3, href: '/dashboard/blogs/create', label: 'create blog', icon: <FaPenToSquare /> },
  { id: 4, href: '/dashboard/followers', label: 'followers', icon: <FaUsers /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <aside
      className={clsx(styles.sidebar, isOpen && styles.open)}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div>
        <h2>Dashboard</h2>
        <nav>
          {links.map(({ id, href, label, icon }) => (
            <Link
              key={id}
              href={href}
              className={href === pathname ? styles.active : undefined}
              onClick={(e) => e.stopPropagation()}
            >
              {label}
              <span>{icon}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
