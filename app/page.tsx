import Categories from '@/app/components/home/categories';
import { Suspense } from 'react';

export default function Page() {
  return (
    <main>
      <Suspense fallback={<h2>Loading categories...</h2>}>
        <Categories />
      </Suspense>
    </main>
  );
}
