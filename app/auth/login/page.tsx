import ProvidersWrapper from '@/app/components/auth/providers-wrapper';
import Providers from '@/app/components/auth/providers';

export default function Page() {
  return (
    <main>
      <ProvidersWrapper>
        <Providers />
      </ProvidersWrapper>
    </main>
  );
}
