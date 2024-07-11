'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

enum Error {
  Configuration = 'Configuration',
  AccessDenied = 'AccessDenied',
  Verification = 'Verification',
  Default = 'Default',
}

const errorMap = {
  [Error.Configuration]:
    'There is a problem with the server configuration. Check if your options are correct.',
  [Error.AccessDenied]: 'Access is restricted through the signIn callback, or redirect callback.',
  [Error.Verification]: 'Email provider token has expired or has already been used.',
  [Error.Default]: 'The was an error. Try to sign in again.',
};

export default function Page() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error') as Error;
  return (
    <main className='main grid-center'>
      <div className='text-center'>
        <h2 className='mb-4'>Authentication error</h2>
        <p className='mb-4'>{errorMap[error]}</p>
        <Link href='/auth/login' className='btn'>
          back to login
        </Link>
      </div>
    </main>
  );
}
