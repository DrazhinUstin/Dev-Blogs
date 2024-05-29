import Image from 'next/image';
import { fetchBlogs } from '@/app/lib/data';
import type { Prisma } from '@prisma/client';

export default function BlogCard({
  id,
  title,
  categoryName,
  description,
  imageUrl,
}: Prisma.PromiseReturnType<typeof fetchBlogs>[0]) {
  return (
    <article>
      <Image src={imageUrl || ''} alt='blog-image' width={100} height={100} />
      <h4>{title}</h4>
      <p>{categoryName}</p>
      <p>{description}</p>
    </article>
  );
}
