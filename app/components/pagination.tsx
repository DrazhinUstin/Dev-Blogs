'use client';

import { useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { generatePagination } from '@/app/lib/utils';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import clsx from 'clsx';
import styles from './pagination.module.scss';

export default function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const pages = generatePagination(currentPage, totalPages);

  const createPageHref = (page: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    return `${pathname}?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  return (
    <div className={styles.container}>
      <NavigationArrow
        direction='left'
        href={createPageHref(currentPage - 1)}
        disabled={currentPage <= 1}
      />
      {pages.map((page, index) => (
        <PageNumber
          key={index}
          page={page}
          href={createPageHref(page)}
          isActive={page === currentPage}
          disabled={page === '...'}
        />
      ))}
      <NavigationArrow
        direction='right'
        href={createPageHref(currentPage + 1)}
        disabled={currentPage >= totalPages}
      />
    </div>
  );
}

function PageNumber({
  page,
  href,
  isActive,
  disabled,
}: {
  page: number | string;
  href: string;
  isActive: boolean;
  disabled: boolean;
}) {
  return isActive || disabled ? (
    <span className={clsx(isActive && styles.number_active)}>{page}</span>
  ) : (
    <Link href={href} className={styles.number}>
      {page}
    </Link>
  );
}

function NavigationArrow({
  direction,
  href,
  disabled,
}: {
  direction: 'left' | 'right';
  href: string;
  disabled: boolean;
}) {
  const icon = direction === 'left' ? <FaChevronLeft /> : <FaChevronRight />;
  return disabled ? (
    <span className={styles.arrow_disabled}>{icon}</span>
  ) : (
    <Link href={href} className={styles.arrow}>
      {icon}
    </Link>
  );
}
