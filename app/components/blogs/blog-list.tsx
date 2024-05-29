import { fetchBlogs } from '@/app/lib/data';
import BlogCard from '@/app/components/blogs/blog-card';
import type { BlogFilters } from '@/app/lib/types';
import type { Prisma } from '@prisma/client';

export default async function BlogList({
  filters,
  orderBy,
  page,
}: {
  filters: BlogFilters;
  orderBy: Prisma.BlogOrderByWithRelationInput;
  page: number;
}) {
  const blogs = await fetchBlogs(filters, orderBy, page);
  return (
    <div>
      <div>
        {blogs.map((blog) => (
          <BlogCard key={blog.id} {...blog} />
        ))}
      </div>
      {blogs.length === 0 && <p>No blogs were found...</p>}
    </div>
  );
}
