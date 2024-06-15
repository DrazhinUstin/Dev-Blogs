import { fetchUserById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaGlobe } from 'react-icons/fa6';
import Avatar from '@/app/components/avatar';
import NavLinks from '@/app/components/nav-links';
import type { Metadata } from 'next';

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

  const { name, image, blogsCount, profile } = user;
  return (
    <div>
      <div>
        <Avatar src={image} />
        <div>
          <h2>{name}</h2>
          <div>
            {profile?.websiteUrl && (
              <Link href={profile.websiteUrl}>
                <FaGlobe />
              </Link>
            )}
            {profile?.githubUrl && (
              <Link href={profile.githubUrl}>
                <FaGithub />
              </Link>
            )}
            {profile?.linkedinUrl && (
              <Link href={profile.linkedinUrl}>
                <FaLinkedin />
              </Link>
            )}
          </div>
        </div>
      </div>
      <nav>
        <NavLinks
          links={[
            { id: 1, href: `/users/${id}`, label: 'about' },
            { id: 2, href: `/users/${id}/blogs`, label: `blogs (${blogsCount})` },
          ]}
        />
      </nav>
      <div>{children}</div>
    </div>
  );
}
