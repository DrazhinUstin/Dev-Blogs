import { auth } from '@/auth';
import { Suspense } from 'react';
import Link from 'next/link';
import { fetchCategories, fetchBlogsTotalPages } from '@/app/lib/data';
import Filters from '@/app/components/blogs/filters';
import Order from '@/app/components/order';
import { blogsOrderOptions } from '@/app/lib/order-options';
import BlogList from '@/app/components/blogs/blog-list';
import Pagination from '@/app/components/pagination';
import styles from './page.module.scss';
import type { BlogsPageSearchParams } from '@/app/lib/types';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blogs',
};

interface Props {
  searchParams: BlogsPageSearchParams;
}

export default async function Page({ searchParams }: Props) {
  const { orderBy, page, ...rest } = searchParams;
  const parsedOrderBy = orderBy ? JSON.parse(orderBy) : blogsOrderOptions[0].value;
  const currentPage = Number(page) || 1;
  const currentUser = (await auth())?.user;
  const filters = { ...rest, userId: currentUser?.id };
  const [categories, totalPages] = await Promise.all([
    fetchCategories(),
    fetchBlogsTotalPages(filters),
  ]);
  return (
    <main>
      <h2 className='mb-4'>Manage Blogs</h2>
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
