import { fetchUserById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Breadcrumbs from '@/app/components/breadcrumbs';
import { FaGithub, FaLinkedin, FaGlobe } from 'react-icons/fa6';
import Avatar from '@/app/components/avatar';
import { Suspense } from 'react';
import ToggleFollowingForm from '@/app/components/users/toggle-following-form';
import NavLinks from '@/app/components/nav-links';
import type { Metadata } from 'next';
import styles from './layout.module.scss';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params: { id } }: Props): Promise<Metadata> {
  const user = await fetchUserById(id);

  if (!user) {
    notFound();
  }

  return {
    title: {
      template: `%s | ${user.name}`,
      default: user.name as string,
    },
  };
}

export default async function Layout({
  params: { id },
  children,
}: { children: React.ReactNode } & Props) {
  const user = await fetchUserById(id);

  if (!user) {
    notFound();
  }

  const { name, image, blogsCount, followersCount, profile } = user;
  return (
    <div className='main'>
      <Breadcrumbs
        items={[
          { id: 1, label: 'home', href: '/' },
          { id: 2, label: 'authors', href: '/users' },
          { id: 3, label: user.name as string },
        ]}
      />
      <header className={styles.header}>
        <Avatar src={image} width={100} height={100} />
        <div>
          <h2>{name}</h2>
          <p className={styles.socials}>
            {profile?.websiteUrl && (
              <Link href={profile.websiteUrl}>
                <FaGlobe className='clr-green' />
              </Link>
            )}
            {profile?.githubUrl && (
              <Link href={profile.githubUrl}>
                <FaGithub className='clr-black' />
              </Link>
            )}
            {profile?.linkedinUrl && (
              <Link href={profile.linkedinUrl}>
                <FaLinkedin className='clr-blue' />
              </Link>
            )}
          </p>
          <Suspense
            fallback={
              <button className='btn' disabled>
                follow
              </button>
            }
          >
            <ToggleFollowingForm userId={user.id} />
          </Suspense>
        </div>
      </header>
      <nav className='text-center my-4 shadow-underline'>
        <NavLinks
          links={[
            { id: 1, href: `/users/${id}`, label: 'about' },
            { id: 2, href: `/users/${id}/blogs`, label: `blogs (${blogsCount})` },
            { id: 3, href: `/users/${id}/followers`, label: `followers (${followersCount})` },
          ]}
        />
      </nav>
      <div>{children}</div>
    </div>
  );
}
