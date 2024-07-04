import { fetchBlogById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import BlogDetails from '@/app/components/blogs/blog-details';

interface Props {
  params: { id: string };
}

export default async function Page({ params: { id } }: Props) {
  const blog = await fetchBlogById(id);

  if (!blog) notFound();

  return (
    <main className='main'>
      <BlogDetails {...blog} />
    </main>
  );
}
