import { auth } from '@/auth';
import Avatar from '@/app/components/avatar';
import CommentCardReply from './comment-card-reply';
import type { Prisma } from '@prisma/client';
import { fetchBlogComments } from '@/app/lib/data';
import DeleteCommentForm from './delete-comment-form';
import CommentCardEdit from './comment-card-edit';

export default async function CommentCard({
  id,
  blogId,
  userId,
  text,
  createdAt,
  replyOn,
  user: { image, name },
}: Prisma.PromiseReturnType<typeof fetchBlogComments>[0]) {
  const user = (await auth())?.user;
  return (
    <div>
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
    </div>
  );
}
