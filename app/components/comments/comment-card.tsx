import { auth } from '@/auth';
import Link from 'next/link';
import Avatar from '@/app/components/avatar';
import CommentCardReply from './comment-card-reply';
import type { Prisma } from '@prisma/client';
import { fetchBlogComments } from '@/app/lib/data';
import DeleteCommentForm from './delete-comment-form';
import CommentCardEdit from './comment-card-edit';

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
    <div>
      {blog && (
        <Link href={`/blogs/${blogId}`}>
          <h4>{blog.title}</h4>
        </Link>
      )}
      <article>
        <div>
          <Avatar src={image} />
          <h4>{name}</h4>
        </div>
        {replyOn && (
          <p>
            Reply on : <em>{replyOn.text}</em>
          </p>
        )}
        <p>{text}</p>
        {user?.id === userId && (
          <>
            <DeleteCommentForm commentId={id} />
            <CommentCardEdit commentId={id} commentText={text} />
          </>
        )}
        {user && user.id !== userId && <CommentCardReply commentId={id} />}
      </article>
    </div>
  );
}
