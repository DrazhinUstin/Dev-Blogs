import { Suspense } from 'react';
import { fetchCategories, fetchBlogsTotalPages } from '@/app/lib/data';
import Filters from '@/app/components/blogs/filters';
import Order from '@/app/components/order';
import { blogsOrderOptions } from '@/app/lib/order-options';
import BlogList from '@/app/components/blogs/blog-list';
import Pagination from '@/app/components/pagination';
import type { BlogsPageSearchParams } from '@/app/lib/types';
import styles from './page.module.scss';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blogs',
};

interface Props {
  searchParams: BlogsPageSearchParams;
}

export default async function Page({ searchParams }: Props) {
  const { orderBy, page, ...filters } = searchParams;
  const parsedOrderBy = orderBy ? JSON.parse(orderBy) : blogsOrderOptions[0].value;
  const currentPage = Number(page) || 1;
  const [categories, totalPages] = await Promise.all([
    fetchCategories(),
    fetchBlogsTotalPages(filters),
  ]);
  return (
    <main className='main'>
      <h2 className='text-center mb-4'>Blogs</h2>
      <div className={styles.container}>
        <aside>
          <Filters categories={categories} />
        </aside>
        <div>
          <Order options={blogsOrderOptions} />
          <Suspense key={JSON.stringify(searchParams)} fallback={<h2>LOADING...</h2>}>
            <BlogList filters={filters} orderBy={parsedOrderBy} page={currentPage} />
          </Suspense>
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      </div>
    </main>
  );
}
