import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa6';
import styles from './breadcrumbs.module.scss';

export default function Breadcrumbs({
  items,
}: {
  items: [
    ...{ id: number; label: string; href: string }[],
    { id: number; label: string; href?: undefined }
  ];
}) {
  return (
    <ul className={styles.list}>
      {items.map(({ id, label, href }, index) => (
        <li key={id}>
          {href ? <Link href={href}>{label}</Link> : <span>{label}</span>}
          {index < items.length - 1 && (
            <span>
              <FaChevronRight />
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
