import { auth } from '@/auth';
import { prisma } from '@/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import FormSubmitBtn from '@/app/components/form-submit-btn';
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa6';
import type { Blog } from '@prisma/client';

export default async function BlogLikes({ blogId }: { blogId: Blog['id'] }) {
  const user = (await auth())?.user;
  const blog = await prisma.blog.findUnique({
    where: { id: blogId },
    select: {
      _count: { select: { likes: true } },
      likes: { where: { userId: user?.id } },
      userId: true,
    },
  });
  const likesCount = blog?._count.likes;
  const isBlogLikedByUser = !!blog?.likes[0];
  const blogCreatorId = blog?.userId;

  async function toggleLike() {
    'use server';
    if (!user?.id) {
      redirect('/auth/login');
    }
    try {
      await prisma.blog.update({
        where: { id: blogId },
        data: {
          likes: isBlogLikedByUser
            ? { delete: { userId_blogId: { userId: user?.id, blogId } } }
            : {
                create: { user: { connect: { id: user?.id } } },
              },
        },
      });
      revalidatePath('/');
    } catch (error) {
      throw Error('Database error: Failed to toggle like');
    }
  }

  if (user?.id === blogCreatorId) {
    return (
      <div>
        {likesCount}
        <FaRegThumbsUp />
      </div>
    );
  }

  return (
    <form action={toggleLike}>
      <FormSubmitBtn>
        {likesCount}
        {isBlogLikedByUser ? <FaThumbsUp /> : <FaRegThumbsUp />}
      </FormSubmitBtn>
    </form>
  );
}
