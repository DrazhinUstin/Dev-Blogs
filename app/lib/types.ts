import { Role } from '@prisma/client';

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
    image?: string[];
    content?: string[];
  };
};

export type BlogFilters = {
  query?: string;
  categoryName?: string;
  userId?: string;
};

export type BlogsPageSearchParams = Omit<BlogFilters, 'userId'> & {
  orderBy?: string;
  page?: string;
};

export type ProfileFormState = {
  errorMsg?: string;
  fieldErrors?: {
    fullName?: string[];
    gender?: string[];
    email?: string[];
    websiteUrl?: string[];
    githubUrl?: string[];
    linkedinUrl?: string[];
    avatar?: string[];
    bio?: string[];
  };
};
