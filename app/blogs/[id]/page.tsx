import { fetchBlogById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/app/components/breadcrumbs';
import BlogDetails from '@/app/components/blogs/blog-details';

interface Props {
  params: { id: string };
}

export default async function Page({ params: { id } }: Props) {
  const blog = await fetchBlogById(id);

  if (!blog) notFound();

  return (
    <main className='main'>
      <Breadcrumbs
        items={[
          { id: 1, label: 'home', href: '/' },
          { id: 2, label: 'blogs', href: '/blogs' },
          { id: 3, label: blog.title },
        ]}
      />
      <BlogDetails {...blog} />
    </main>
  );
}
