'use client';

import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { fetchBlogsForInfiniteScroll as fetchBlogs } from '@/app/lib/actions';
import type { Prisma } from '@prisma/client';
import Link from 'next/link';
import Avatar from '@/app/components/avatar';
import Image from 'next/image';
import { formatDateToNow } from '@/app/lib/utils';
import { FaCalendarDays, FaClock, FaThumbsUp, FaComments } from 'react-icons/fa6';
import styles from '@/app/components/blogs/blog-card.module.scss';

export default function InfiniteScrollBlogs({
  followerId,
  orderBy,
  blogsPerPage = 10,
}: {
  followerId?: string;
  orderBy: Prisma.BlogOrderByWithRelationInput;
  blogsPerPage?: number;
}) {
  const [showLoader, setShowLoader] = useState<boolean>(true);
  const [blogs, setBlogs] = useState<Prisma.PromiseReturnType<typeof fetchBlogs>>([]);
  const [page, setPage] = useState<number>(1);
  const [ref, inView] = useInView();

  const loadBlogs = async () => {
    const blogs = await fetchBlogs({ followerId, orderBy, page, blogsPerPage });
    if (blogs.length < blogsPerPage) setShowLoader(false);
    setBlogs((prev) => [...prev, ...blogs]);
    setPage(page + 1);
  };

  useEffect(() => {
    if (inView) loadBlogs();
  }, [inView]);

  return (
    <div>
      {blogs.map(({ user, ...blog }) => (
        <article key={blog.id} className={styles.card}>
          <header className={styles.card_header}>
            <div className={styles.author}>
              <Link href={`/users/${blog.userId}`}>
                <Avatar src={user.image} width={24} height={24} />
              </Link>
              <p>
                <Link href={`/users/${blog.userId}`}>{user.name}</Link>
              </p>
            </div>
          </header>
          <div className={styles.card_content}>
            <div>
              <h3>
                <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
              </h3>
              <p className={styles.category}>{blog.categoryName}</p>
              <p>{blog.description}</p>
            </div>
            {blog.imageUrl && (
              <Image src={blog.imageUrl} alt='blog-image' width={150} height={100} />
            )}
          </div>
          <div className={styles.card_stats}>
            <span>
              <FaCalendarDays />
              {formatDateToNow(blog.createdAt)}
            </span>
            <span>
              <FaClock />
              {blog.readingTime} min read
            </span>
            <span>
              <FaThumbsUp />
              {blog.likesCount}
            </span>
            <span>
              <FaComments />
              {blog.commentsCount}
            </span>
          </div>
        </article>
      ))}
      {showLoader && (
        <div className='mt-4 text-center' ref={ref}>
          <h2>LOADING BLOGS...</h2>
        </div>
      )}
      {!showLoader && blogs.length === 0 && <p>No blogs to display...</p>}
    </div>
  );
}
