import { fetchBlogById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import BlogDetails from '@/app/components/blogs/blog-details';
import type { Metadata } from 'next';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params: { id } }: Props): Promise<Metadata> {
  const blog = await fetchBlogById(id);

  if (!blog) notFound();

  return {
    title: blog.title,
  };
}

export default async function Page({ params: { id } }: Props) {
  const blog = await fetchBlogById(id);

  if (!blog) notFound();

  return (
    <main>
      <BlogDetails {...blog} />
    </main>
  );
}
