import ProvidersWrapper from '@/app/components/auth/providers-wrapper';
import Providers from '@/app/components/auth/providers';

export default function Page() {
  return (
    <main className='main grid-center'>
      <ProvidersWrapper>
        <Providers />
      </ProvidersWrapper>
    </main>
  );
}
