'use client';

import { FaRotateLeft } from 'react-icons/fa6';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className='main grid-center'>
      <div className='text-center'>
        <h2>Something went wrong!</h2>
        {error.message && <p className='mt-4'>{error.message}</p>}
        <button className='btn-flex mt-4' onClick={() => reset()}>
          <FaRotateLeft />
          Try again
        </button>
      </div>
    </main>
  );
}
