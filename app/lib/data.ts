import { prisma } from '@/client';
import { cache } from 'react';
import type { Prisma } from '@prisma/client';
import type { BlogFilters } from '@/app/lib/types';

export async function fetchUser(email: string) {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  } catch (error) {
    console.error('Database Error:', error);
    throw Error('Failed to fetch user');
  }
}

export async function fetchProfile(userId: string) {
  try {
    const profile = await prisma.profile.findUnique({ where: { userId } });
    return profile;
  } catch (error) {
    console.error('Database Error:', error);
    throw Error('Failed to fetch profile');
  }
}

export async function fetchCategories() {
  try {
    const categories = await prisma.category.findMany();
    return categories;
  } catch (error) {
    console.error('Database Error:', error);
    throw Error('Failed to fetch categories');
  }
}

const blogsPerPage = 6;

export async function fetchBlogs(
  filters: BlogFilters,
  orderBy: Prisma.BlogOrderByWithRelationInput,
  page: number
) {
  try {
    const { query, categoryName, userId } = filters;
    const queryWhereInput: Prisma.BlogWhereInput = {
      OR: [
        {
          title: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          categoryName: {
            contains: query,
            mode: 'insensitive',
          },
        },
      ],
    };
    const categoryWhereInput: Prisma.BlogWhereInput = {
      categoryName: {
        equals: categoryName,
      },
    };
    const where: Prisma.BlogWhereInput = {
      AND: [
        query ? queryWhereInput : {},
        categoryName ? categoryWhereInput : {},
        userId ? { userId } : {},
      ],
    };
    const skip = (page - 1) * blogsPerPage;
    const blogs = await prisma.blog.findMany({
      where,
      orderBy,
      skip,
      take: blogsPerPage,
      select: {
        id: true,
        userId: true,
        categoryName: true,
        title: true,
        description: true,
        imageUrl: true,
      },
    });
    return blogs;
  } catch (error) {
    console.error('Database Error:', error);
    throw Error('Failed to fetch blogs');
  }
}

export async function fetchBlogsTotalPages(filters: BlogFilters) {
  try {
    const { query, categoryName, userId } = filters;
    const queryWhereInput: Prisma.BlogWhereInput = {
      OR: [
        {
          title: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          categoryName: {
            contains: query,
            mode: 'insensitive',
          },
        },
      ],
    };
    const categoryWhereInput: Prisma.BlogWhereInput = {
      categoryName: {
        equals: categoryName,
      },
    };
    const where: Prisma.BlogWhereInput = {
      AND: [
        query ? queryWhereInput : {},
        categoryName ? categoryWhereInput : {},
        userId ? { userId } : {},
      ],
    };
    const blogsCount = await prisma.blog.count({
      where,
    });
    return Math.ceil(blogsCount / blogsPerPage);
  } catch (error) {
    console.error('Database Error:', error);
    throw Error('Failed to fetch blogs total pages');
  }
}

export async function fetchBlogById(id: string) {
  try {
    const blog = await prisma.blog.findUnique({ where: { id } });
    return blog;
  } catch (error) {
    console.error('Database Error:', error);
    throw Error('Failed to fetch blog');
  }
}
