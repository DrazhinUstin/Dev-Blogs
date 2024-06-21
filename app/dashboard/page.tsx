import { Suspense } from 'react';
import Overview from '@/app/components/dashboard/overview';
import Charts from '@/app/components/dashboard/charts';

export default function Page() {
  return (
    <main>
      <Suspense fallback={<h2>Loading overview...</h2>}>
        <Overview />
      </Suspense>
      <Suspense fallback={<h2>Loading charts...</h2>}>
        <Charts />
      </Suspense>
    </main>
  );
}
