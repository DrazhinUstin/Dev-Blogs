import Image from 'next/image';
import type { Blog } from '@prisma/client';

export default function BlogDetails({
  id,
  userId,
  categoryName,
  title,
  description,
  imageUrl,
  content,
}: Blog) {
  return (
    <div>
      <Image src={imageUrl || ''} alt='blog-image' />
      <h2>{title}</h2>
      <p>{categoryName}</p>
      <p>{description}</p>
      <p>{content}</p>
    </div>
  );
}
