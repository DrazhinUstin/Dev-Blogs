'use client';

import { useState } from 'react';
import Link from 'next/link';
import Avatar from '@/app/components/avatar';
import type { User } from 'next-auth';
import styles from './styles.module.scss';

export default function UserMenu({ user, children }: { user: User; children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className={styles.user_menu}>
      <Avatar src={user.image} onClick={() => setIsMenuOpen(!isMenuOpen)} />
      {isMenuOpen && (
        <div>
          <Link href='/profile'>profile</Link>
          {children}
        </div>
      )}
    </div>
  );
}
