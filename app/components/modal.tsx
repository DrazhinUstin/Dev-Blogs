'use client';

import { useRouter } from 'next/navigation';
import { FaXmark } from 'react-icons/fa6';
import styles from './modal.module.scss';

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const closeModal = () => router.back();

  return (
    <div>
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <button className={styles.close_btn} onClick={closeModal}>
            <FaXmark />
          </button>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
