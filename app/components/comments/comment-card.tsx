import { auth } from '@/auth';
import Link from 'next/link';
import Avatar from '@/app/components/avatar';
import CommentCardReply from './comment-card-reply';
import type { Prisma } from '@prisma/client';
import { fetchBlogComments } from '@/app/lib/data';
import { formatDateToNow } from '@/app/lib/utils';
import DeleteCommentForm from './delete-comment-form';
import CommentCardEdit from './comment-card-edit';
import { FaReply } from 'react-icons/fa6';
import styles from './comment-card.module.scss';

type ReturnType = Prisma.PromiseReturnType<typeof fetchBlogComments>[0];
type Props = Omit<ReturnType, 'blog'> & { blog?: ReturnType['blog'] };

export default async function CommentCard({
  id,
  blogId,
  userId,
  text,
  createdAt,
  replyOn,
  user: { image, name },
  blog,
}: Props) {
  const user = (await auth())?.user;
  return (
    <article id={id} className={styles.card}>
      {blog && (
        <h4>
          <Link href={`/blogs/${blogId}`} className='clr-black'>
            {blog.title}
          </Link>
        </h4>
      )}
      <div className={styles.author}>
        <Link href={`/users/${userId}`}>
          <Avatar src={image} width={32} height={32} />
        </Link>
        <div>
          <p>
            <Link href={`/users/${userId}`} className='clr-primary'>
              {name}
            </Link>
          </p>
          <p className='clr-gray-dark'>{formatDateToNow(createdAt)}</p>
        </div>
      </div>
      {replyOn && (
        <div className={styles.reply}>
          <span>
            <FaReply />
          </span>
          <Link href={`#${replyOn.id}`} replace>
            <div>
              <div className={styles.author}>
                <Avatar src={replyOn.user.image} width={24} height={24} />
                <p>{replyOn.user.name}</p>
              </div>
              <p>{replyOn.text}</p>
            </div>
          </Link>
        </div>
      )}
      <p>{text}</p>
      {user?.id === userId && (
        <div className={styles.controls}>
          <DeleteCommentForm commentId={id} />
          <CommentCardEdit key={id} commentId={id} commentText={text} />
        </div>
      )}
      {user && user.id !== userId && <CommentCardReply key={id} commentId={id} />}
    </article>
  );
}
