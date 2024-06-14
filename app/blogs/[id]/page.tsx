import { fetchBlogById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import BlogDetails from '@/app/components/blogs/blog-details';
import BlogLikes from '@/app/components/blogs/blog-likes';
import { FaComments } from 'react-icons/fa6';

interface Props {
  params: { id: string };
}

export default async function Page({ params: { id } }: Props) {
  const blog = await fetchBlogById(id);

  if (!blog) notFound();

  return (
    <main>
      <BlogDetails {...blog} />
      <Suspense fallback={<h2>LOADING BLOG LIKES...</h2>}>
        <BlogLikes blogId={blog.id} />
      </Suspense>
      <Link href={`/blogs/${id}/comments`}>
        <FaComments />
        {blog.commentsCount}
      </Link>
    </main>
  );
}
