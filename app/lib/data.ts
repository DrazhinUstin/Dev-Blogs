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
    const { query, categoryName, withLikes, userId } = filters;
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
    const withLikesWhereInput: Prisma.BlogWhereInput = {
      likes: { some: {} },
    };
    const where: Prisma.BlogWhereInput = {
      AND: [
        query ? queryWhereInput : {},
        categoryName ? categoryWhereInput : {},
        withLikes ? withLikesWhereInput : {},
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
        _count: { select: { likes: true } },
      },
    });
    return blogs.map(({ _count, ...blog }) => ({ ...blog, likesCount: _count.likes }));
  } catch (error) {
    console.error('Database Error:', error);
    throw Error('Failed to fetch blogs');
  }
}

export async function fetchBlogsTotalPages(filters: BlogFilters) {
  try {
    const { query, categoryName, withLikes, userId } = filters;
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
    const withLikesWhereInput: Prisma.BlogWhereInput = {
      likes: { some: {} },
    };
    const where: Prisma.BlogWhereInput = {
      AND: [
        query ? queryWhereInput : {},
        categoryName ? categoryWhereInput : {},
        withLikes ? withLikesWhereInput : {},
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

export async function fetchUserLikedBlogs(
  userId: string,
  orderBy: Prisma.UsersOnBlogsOrderByWithRelationInput,
  page: number
) {
  try {
    const blogs = (
      await prisma.usersOnBlogs.findMany({
        where: { userId },
        orderBy,
        skip: (page - 1) * blogsPerPage,
        take: blogsPerPage,
        select: {
          blog: {
            select: {
              id: true,
              userId: true,
              categoryName: true,
              title: true,
              description: true,
              imageUrl: true,
              _count: { select: { likes: true } },
            },
          },
        },
      })
    ).map(({ blog: { _count, ...blog } }) => ({ ...blog, likesCount: _count.likes }));
    return blogs;
  } catch (error) {
    console.error('Database Error:', error);
    throw Error('Failed to fetch user liked blogs');
  }
}

export async function fetchUserLikedBlogsTotalPages(userId: string) {
  try {
    const count = await prisma.usersOnBlogs.count({
      where: { userId },
    });
    return Math.ceil(count / blogsPerPage);
  } catch (error) {
    console.error('Database Error:', error);
    throw Error('Failed to fetch user liked blogs total pages');
  }
}
