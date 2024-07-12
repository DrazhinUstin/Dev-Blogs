import { auth } from '@/auth';
import { prisma } from '@/client';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import FormSubmitBtn from '@/app/components/form-submit-btn';
import { FaUserPlus, FaUserMinus } from 'react-icons/fa6';
import clsx from 'clsx';

export default async function ToggleFollowingForm({ userId: id }: { userId: string }) {
  const currentUser = (await auth())?.user;
  const isFollower = !!(
    await prisma.user.findUnique({
      where: { id: currentUser?.id },
      select: { following: { where: { id } } },
    })
  )?.following[0];

  async function toggleFollowing() {
    'use server';
    if (!currentUser) {
      redirect('/auth/login');
    }
    if (currentUser.id === id) {
      throw Error('Failed to follow: You can not follow yourself');
    }
    try {
      await prisma.user.update({
        where: { id: currentUser.id },
        data: {
          following: isFollower ? { disconnect: { id } } : { connect: { id } },
        },
      });
      revalidatePath('/');
    } catch (error) {
      console.log(error);
      throw Error(isFollower ? 'Failed to unfollow' : 'Failed to follow');
    }
  }

  return (
    <form action={toggleFollowing}>
      <FormSubmitBtn className={clsx('btn-flex', isFollower && 'bg-clr-red')}>
        {isFollower ? (
          <>
            <FaUserMinus />
            unfollow
          </>
        ) : (
          <>
            <FaUserPlus />
            follow
          </>
        )}
      </FormSubmitBtn>
    </form>
  );
}
