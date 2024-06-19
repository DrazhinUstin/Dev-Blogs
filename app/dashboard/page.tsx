import { Suspense } from 'react';
import Overview from '@/app/components/dashboard/overview';

export default function Page() {
  return (
    <main>
      <Suspense fallback={<h2>Loading overview...</h2>}>
        <Overview />
      </Suspense>
    </main>
  );
}
