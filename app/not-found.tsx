import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa6';

export default function NotFound() {
  return (
    <main className='main grid-center'>
      <div className='text-center'>
        <h2>404 Not Found</h2>
        <p className='mt-4'>Could not find the requested resource</p>
        <Link href='/' className='btn-flex mt-4'>
          <FaArrowLeft />
          Return Home
        </Link>
      </div>
    </main>
  );
}
