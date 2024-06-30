import { auth } from '@/auth';
import { fetchProfile } from '@/app/lib/data';
import UpsertProfileForm from '@/app/components/profile/upsert-profile-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit',
};

export default async function Page() {
  const user = (await auth())?.user;
  const profile = await fetchProfile(user?.id as string);
  return (
    <main>
      <UpsertProfileForm profile={profile} />
    </main>
  );
}
