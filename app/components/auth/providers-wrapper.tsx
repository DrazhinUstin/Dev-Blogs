'use client';

import { useSearchParams } from 'next/navigation';

export default function ProvidersWrapper({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const urlError = searchParams.get('error');
  return (
    <div className='card text-center'>
      <h2 className='mb-2'>Sign in with:</h2>
      {children}
      {urlError && (
        <p className='mt-2 clr-red'>
          {urlError === 'OAuthAccountNotLinked'
            ? 'Another account already exists with the same e-mail address'
            : `${urlError} - An unexpected error occurred`}
        </p>
      )}
    </div>
  );
}
