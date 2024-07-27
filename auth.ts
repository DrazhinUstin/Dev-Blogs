import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/client';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import type { Provider } from 'next-auth/providers';
import type { Role } from '@prisma/client';

const protectedRoutes = ['/profile', '/dashboard', '/following'];

export const providers: Provider[] = [
  GitHub({
    async profile(profile) {
      const user = await prisma.user.findUnique({ where: { email: profile.email as string } });
      const role: Role = user?.role || 'USER';
      return {
        id: profile.node_id,
        name: profile.name,
        email: profile.email,
        image: profile.avatar_url,
        role,
      };
    },
  }),
  Google({
    async profile(profile) {
      const user = await prisma.user.findUnique({ where: { email: profile.email as string } });
      const role: Role = user?.role || 'USER';
      return {
        id: profile.sub,
        name: profile.name,
        email: profile.email,
        image: profile.picture,
        role,
      };
    },
  }),
];

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  providers,
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnPrivate = protectedRoutes.some((route) => nextUrl.pathname.startsWith(route));
      const isOnAuth = nextUrl.pathname.startsWith('/auth');
      if (isOnPrivate) {
        if (isLoggedIn) {
          return true;
        }
        return false;
      }
      if (isOnAuth && isLoggedIn) {
        return Response.redirect(new URL('/profile', nextUrl));
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as Role;
      return session;
    },
  },
});
