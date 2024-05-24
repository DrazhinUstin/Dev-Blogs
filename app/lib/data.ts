import { prisma } from '@/client';

export async function fetchUser(email: string) {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  } catch (error) {
    console.error('Database Error:', error);
    throw Error('Failed to fetch user');
  }
}
