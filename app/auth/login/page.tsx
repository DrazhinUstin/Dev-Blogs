import ProvidersWrapper from '@/app/components/auth/providers-wrapper';
import Providers from '@/app/components/auth/providers';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
};

export default function Page() {
  return (
    <main className='main grid-center'>
      <ProvidersWrapper>
        <Providers />
      </ProvidersWrapper>
    </main>
  );
}
