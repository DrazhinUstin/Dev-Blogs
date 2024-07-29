import { auth } from '@/auth';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendarDays, FaClock, FaThumbsUp, FaComments } from 'react-icons/fa6';
import { fetchBlogs } from '@/app/lib/data';
import { formatDateToNow } from '@/app/lib/utils';
import Avatar from '@/app/components/avatar';
import BlogCardMenu from '@/app/components/blogs/blog-card-menu';
import DeleteBlogForm from '@/app/components/blogs/delete-blog-form';
import type { Prisma } from '@prisma/client';
import styles from './blog-card.module.scss';

export default async function BlogCard({
  id,
  userId,
  title,
  categoryName,
  description,
  readingTime,
  imageUrl,
  createdAt,
  user,
  likesCount,
  commentsCount,
}: Prisma.PromiseReturnType<typeof fetchBlogs>[0]) {
  const currentUser = (await auth())?.user;
  return (
    <article className={styles.card}>
      <header className={styles.card_header}>
        <div className={styles.author}>
          <Link href={`/users/${userId}`}>
            <Avatar src={user.image} width={24} height={24} />
          </Link>
          <p>
            <Link href={`/users/${userId}`}>{user.name}</Link>
          </p>
        </div>
        {userId === currentUser?.id && (
          <BlogCardMenu blogId={id}>
            <DeleteBlogForm id={id} imageUrl={imageUrl} />
          </BlogCardMenu>
        )}
      </header>
      <div className={styles.card_content}>
        <div>
          <h3>
            <Link href={`/blogs/${id}`}>{title}</Link>
          </h3>
          <p className={styles.category}>{categoryName}</p>
          <p>{description}</p>
        </div>
        {imageUrl && <Image src={imageUrl} alt='blog-image' width={150} height={100} />}
      </div>
      <div className={styles.card_stats}>
        <span>
          <FaCalendarDays />
          {formatDateToNow(createdAt)}
        </span>
        <span>
          <FaClock />
          {readingTime} min read
        </span>
        <span>
          <FaThumbsUp />
          {likesCount}
        </span>
        <span>
          <FaComments />
          {commentsCount}
        </span>
      </div>
    </article>
  );
}
