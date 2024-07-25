import { fetchUserById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { FaEnvelope } from 'react-icons/fa6';
import { FaFemale, FaMale, FaCalendar } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import styles from './page.module.scss';

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const user = await fetchUserById(id);

  if (!user) {
    notFound();
  }

  const { email, createdAt, profile } = user;
  return (
    <main>
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
          Joined {createdAt.toLocaleDateString()}
        </li>
      </ul>
      {profile?.bio && (
        <div className='mt-2'>
          <h4 className='mb'>Bio:</h4>
          <p>{profile.bio}</p>
        </div>
      )}
    </main>
  );
}
