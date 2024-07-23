'use client';

import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { pageLinks } from '@/app/lib/page-links';
import type { User } from 'next-auth';
import styles from './styles.module.scss';

export default function LinksMenu({ user }: { user?: User }) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuRef.current) return;
    const links = menuRef.current.querySelectorAll('a');
    if (isMenuOpen) {
      const delay = parseFloat(
        window.getComputedStyle(document.documentElement).getPropertyValue('--delay')
      );
      links.forEach(
        (link, index, arr) =>
          (link.style.animation = `appearance 0.5s ${delay + index / arr.length}s forwards`)
      );
    } else {
      links.forEach((link) => (link.style.animation = ''));
    }
  }, [isMenuOpen]);

  return (
    <>
      <div className={clsx(styles.links_menu, isMenuOpen && styles.menu_open)} ref={menuRef}>
        {pageLinks.map(
          ({ id, href, label, isProtected }) =>
            ((isProtected && user) || !isProtected) && (
              <Link key={id} href={href} onClick={() => setIsMenuOpen(false)}>
                {label}
              </Link>
            )
        )}
      </div>
      <button
        className={clsx(styles.links_menu_toggle_btn, isMenuOpen && styles.menu_open)}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span></span>
      </button>
    </>
  );
}
