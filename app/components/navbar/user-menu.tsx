'use client';

import { useState } from 'react';
import { FaCircleUser, FaFilePen } from 'react-icons/fa6';
import Link from 'next/link';
import Avatar from '@/app/components/avatar';
import type { User } from 'next-auth';
import styles from './styles.module.scss';

export default function UserMenu({ user, children }: { user: User; children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  return (
    <div className={styles.user_menu}>
      <Avatar src={user.image} onClick={toggleMenu} />
      {isMenuOpen && (
        <ul>
          <li>
            <Link href='/profile' onClick={toggleMenu}>
              <FaCircleUser />
              profile
            </Link>
          </li>
          <li>
            <Link href='/dashboard' onClick={toggleMenu}>
              <FaFilePen />
              dashboard
            </Link>
          </li>
          <li>{children}</li>
        </ul>
      )}
    </div>
  );
}
