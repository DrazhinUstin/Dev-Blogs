import { auth } from '@/auth';
import { fetchProfile } from '@/app/lib/data';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaGlobe } from 'react-icons/fa6';
import { FaFemale, FaMale } from 'react-icons/fa';

export async function ProfileInfo() {
  const user = (await auth())?.user;
  const profile = await fetchProfile(user?.id as string);

  if (!profile) {
    return (
      <section>
        <h2>Additional info:</h2>
        <Link href='/profile/edit'>Add more about yourself</Link>
      </section>
    );
  }

  const { websiteUrl, githubUrl, linkedinUrl, gender, bio } = profile;
  const socialsExist = !!(websiteUrl || githubUrl || linkedinUrl);
  return (
    <section>
      <h2>Additional info:</h2>
      <ul>
        {socialsExist && (
          <li>
            Socials:
            <span>
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
            Gender:
            <span>
              {gender === 'male' ? <FaMale /> : <FaFemale />} {gender}
            </span>
          </li>
        )}
        {bio && (
          <li>
            Bio:
            <p>{bio}</p>
          </li>
        )}
      </ul>
      <Link href='/profile/edit'>Edit</Link>
    </section>
  );
}
