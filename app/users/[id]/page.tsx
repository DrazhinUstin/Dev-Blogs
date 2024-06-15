import { fetchUserById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { FaEnvelope } from 'react-icons/fa6';
import { FaFemale, FaMale } from 'react-icons/fa';

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const user = await fetchUserById(id);

  if (!user) {
    notFound();
  }

  const { email, createdAt, profile } = user;
  return (
    <main>
      {profile?.bio && <p>{profile.bio}</p>}
      <ul>
        <li>
          <FaEnvelope /> {email}
        </li>
        {profile?.gender && (
          <li>
            {profile.gender === 'male' ? <FaMale /> : <FaFemale />} {profile.gender}
          </li>
        )}
      </ul>
      <p>Member since: {createdAt.toLocaleDateString()}</p>
    </main>
  );
}
