import { fetchCategories } from '@/app/lib/data';
import CreateBlogForm from '@/app/components/blogs/create-blog-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create a Blog',
};

export default async function Page() {
  const categories = await fetchCategories();
  return (
    <main>
      <CreateBlogForm categories={categories} />
    </main>
  );
}
