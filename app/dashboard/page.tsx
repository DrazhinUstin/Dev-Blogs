import { Suspense } from 'react';
import Overview from '@/app/components/dashboard/overview';
import Charts from '@/app/components/dashboard/charts';
import Spinner from '@/app/components/spinner';

export default function Page() {
  return (
    <main>
      <Suspense fallback={<Spinner />}>
        <Overview />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <Charts />
      </Suspense>
    </main>
  );
}
