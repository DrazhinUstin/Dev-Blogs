import { auth } from '@/auth';
import Image from 'next/image';
import Link from 'next/link';
import { fetchBlogs } from '@/app/lib/data';
import DeleteBlogForm from '@/app/components/blogs/delete-blog-form';
import type { Prisma } from '@prisma/client';

export default async function BlogCard({
  id,
  userId,
  title,
  categoryName,
  description,
  imageUrl,
}: Prisma.PromiseReturnType<typeof fetchBlogs>[0]) {
  const user = (await auth())?.user;
  return (
    <article>
      <Image src={imageUrl || ''} alt='blog-image' width={100} height={100} />
      <h4>{title}</h4>
      <p>{categoryName}</p>
      <p>{description}</p>
      {userId === user?.id && (
        <div>
          <Link href={`/dashboard/blogs/${id}/edit`}>edit</Link>
          <DeleteBlogForm id={id} imageUrl={imageUrl} />
        </div>
      )}
    </article>
  );
}
