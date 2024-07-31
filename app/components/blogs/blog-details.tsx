import Link from 'next/link';
import Image from 'next/image';
import type { Prisma } from '@prisma/client';
import { fetchBlogById } from '@/app/lib/data';
import { formatDateToNow } from '@/app/lib/utils';
import Avatar from '@/app/components/avatar';
import { Suspense } from 'react';
import BlogLikes from '@/app/components/blogs/blog-likes';
import { FaRegThumbsUp, FaRegComments } from 'react-icons/fa6';
import styles from './blog-details.module.scss';

export default function BlogDetails({
  id,
  userId,
  title,
  readingTime,
  imageUrl,
  content,
  createdAt,
  commentsCount,
  user,
}: Exclude<Prisma.PromiseReturnType<typeof fetchBlogById>, null>) {
  return (
    <div>
      <h2 className='text-center mb-4'>{title}</h2>
      <div className={styles.author}>
        <Link href={`/users/${userId}`}>
          <Avatar src={user.image} width={40} height={40} />
        </Link>
        <div>
          <p>
            <Link href={`/users/${userId}`} className='clr-primary'>
              {user.name}
            </Link>
          </p>
          <p className='clr-gray-dark'>
            {readingTime} min read · Posted {formatDateToNow(createdAt)}
          </p>
        </div>
      </div>
      {imageUrl && (
        <Image src={imageUrl} alt='blog-image' width={400} height={400} className={styles.image} />
      )}
      <div className='tiptap-output' dangerouslySetInnerHTML={{ __html: content }} />
      <div className={styles.summary}>
        <Suspense
          fallback={
            <button className='btn-flex' disabled={true}>
              <FaRegThumbsUp /> 0
            </button>
          }
        >
          <BlogLikes blogId={id} />
        </Suspense>
        <Link href={`/blogs/${id}/comments`} className='btn-flex bg-clr-black'>
          <FaRegComments />
          {commentsCount}
        </Link>
      </div>
    </div>
  );
}
