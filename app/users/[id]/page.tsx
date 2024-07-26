import { fetchUserById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { FaEnvelope } from 'react-icons/fa6';
import { FaFemale, FaMale, FaCalendar } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { formatDate } from '@/app/lib/utils';
import styles from './page.module.scss';

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const user = await fetchUserById(id);

  if (!user) {
    notFound();
  }

  const { email, createdAt, profile } = user;
  return (
    <main className={styles.container}>
      {profile?.bio && (
        <div className='text-center mb-2'>
          <p>{profile.bio}</p>
        </div>
      )}
      <ul className={styles.list}>
        <li>
          <span>
            <FaEnvelope />
          </span>
          {email}
        </li>
        {profile?.gender && (
          <li>
            <span>{profile.gender === 'male' ? <FaMale /> : <FaFemale />}</span>
            {profile.gender}
          </li>
        )}
        {profile?.location && (
          <li>
            <span>
              <FaLocationDot />
            </span>
            {profile.location}
          </li>
        )}
        <li>
          <span>
            <FaCalendar />
          </span>
          Joined {formatDate(createdAt)}
        </li>
      </ul>
    </main>
  );
}
