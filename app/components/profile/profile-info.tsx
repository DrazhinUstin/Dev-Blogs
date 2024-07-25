import { auth } from '@/auth';
import { fetchProfile } from '@/app/lib/data';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaGlobe } from 'react-icons/fa6';
import { FaFemale, FaMale } from 'react-icons/fa';
import styles from './profile-info.module.scss';

export async function ProfileInfo() {
  const user = (await auth())?.user;
  const profile = await fetchProfile(user?.id as string);

  if (!profile) {
    return (
      <div className='mt-4 text-center'>
        <Link href='/profile/edit' className='btn'>
          Add more about yourself
        </Link>
      </div>
    );
  }

  const { websiteUrl, githubUrl, linkedinUrl, gender, location, bio } = profile;
  const socialsExist = !!(websiteUrl || githubUrl || linkedinUrl);
  return (
    <section className='mt-4'>
      <h3 className='mb-4'>Additional info:</h3>
      <ul className={styles.list}>
        {socialsExist && (
          <li>
            <span>Socials:</span>
            <span className={styles.socials}>
              {websiteUrl && (
                <Link href={websiteUrl}>
                  <FaGlobe />
                </Link>
              )}
              {githubUrl && (
                <Link href={githubUrl}>
                  <FaGithub />
                </Link>
              )}
              {linkedinUrl && (
                <Link href={linkedinUrl}>
                  <FaLinkedin />
                </Link>
              )}
            </span>
          </li>
        )}
        {gender && (
          <li>
            <span>Gender:</span>
            <span className={styles.gender}>
              {gender === 'male' ? <FaMale /> : <FaFemale />} {gender}
            </span>
          </li>
        )}
        {location && (
          <li>
            <span>Location:</span>
            <span>{location}</span>
          </li>
        )}
        {bio && (
          <li>
            <span>Bio:</span>
            <p>{bio}</p>
          </li>
        )}
      </ul>
    </section>
  );
}
