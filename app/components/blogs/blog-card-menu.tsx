'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaEllipsis, FaPen } from 'react-icons/fa6';
import styles from './blog-card.module.scss';

export default function BlogCardMenu({
  children,
  blogId,
}: {
  children?: React.ReactNode;
  blogId: string;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  return (
    <div className={styles.card_menu}>
      <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <FaEllipsis />
      </button>
      {isMenuOpen && (
        <ul>
          <li>
            <Link href={`/dashboard/blogs/${blogId}/edit`} className='btn-flex w-100 text-sm'>
              <FaPen />
              edit
            </Link>
          </li>
          <li>{children}</li>
        </ul>
      )}
    </div>
  );
}
