import { Role, Blog } from '@prisma/client';

declare module 'next-auth' {
  interface User {
    role: Role;
  }
}

export type BlogFormState = {
  errorMsg?: string;
  fieldErrors?: {
    title?: string[];
    categoryName?: string[];
    description?: string[];
    readingTime?: string[];
    image?: string[];
    content?: string[];
  };
};

export type BlogFilters = {
  query?: string;
  categoryName?: string;
  withDescription?: 'true';
  userId?: Blog['userId'];
};

export type BlogsPageSearchParams = Omit<BlogFilters, 'userId'> & {
  orderBy?: string;
  page?: string;
};

export type CommentsFilters =
  | {
      blogId: string;
      userId?: never;
    }
  | {
      userId: string;
      blogId?: never;
    };

export type ProfileFormState = {
  errorMsg?: string;
  fieldErrors?: {
    gender?: string[];
    websiteUrl?: string[];
    githubUrl?: string[];
    linkedinUrl?: string[];
    location?: string[];
    bio?: string[];
  };
};

export type UserFilters = {
  query?: string;
  withBio?: 'true';
  followingId?: string;
  followedById?: string;
};

export type UsersPageSearchParams = Omit<UserFilters, 'followingId' | 'followedById'> & {
  orderBy?: string;
  page?: string;
};
