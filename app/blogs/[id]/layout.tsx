import { fetchBlogById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params: { id } }: Props): Promise<Metadata> {
  const blog = await fetchBlogById(id);

  if (!blog) notFound();

  return {
    title: {
      template: `%s | ${blog.title}`,
      default: blog.title,
    },
  };
}

export default function Layout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div>
      {children}
      {modal}
    </div>
  );
}
