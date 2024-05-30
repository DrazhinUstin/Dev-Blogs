import { fetchBlogById, fetchCategories } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import EditBlogForm from '@/app/components/blogs/edit-blog-form';
import type { Metadata } from 'next';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params: { id } }: Props): Promise<Metadata> {
  const blog = await fetchBlogById(id);

  if (!blog) notFound();

  return {
    title: `Edit | ${blog.title}`,
  };
}

export default async function Page({ params: { id } }: Props) {
  const [blog, categories] = await Promise.all([fetchBlogById(id), fetchCategories()]);

  if (!blog) notFound();

  return (
    <main>
      <EditBlogForm blog={blog} categories={categories} />
    </main>
  );
}
