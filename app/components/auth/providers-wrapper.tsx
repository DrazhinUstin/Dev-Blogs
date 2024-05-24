'use client';

import { useSearchParams } from 'next/navigation';

export default function ProvidersWrapper({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const urlError = searchParams.get('error');
  return (
    <div>
      {children}
      {urlError && (
        <p>
          {urlError === 'OAuthAccountNotLinked'
            ? 'Another account already exists with the same e-mail address'
            : `${urlError} - An unexpected error occurred`}
        </p>
      )}
    </div>
  );
}
