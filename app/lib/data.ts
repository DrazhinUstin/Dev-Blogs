import { prisma } from '@/client';
import { cache } from 'react';
import type { Prisma } from '@prisma/client';
import type { BlogFilters, CommentsFilters, UserFilters } from '@/app/lib/types';

export const fetchUserById = cache(async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { profile: true, _count: { select: { blogs: true, followedBy: true } } },
    });
    if (user) {
      const { _count, ...rest } = user;
      return { ...rest, blogsCount: _count.blogs, followersCount: _count.followedBy };
    }
    return user;
  } catch (error) {
    console.error('Database Error:', error);
    throw Error('Failed to fetch user');
  }
});

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

export async function fetchCategoriesWithBlogsCount() {
  try {
    const categories = (
      await prisma.category.findMany({
        include: { _count: { select: { blogs: true } } },
        orderBy: { name: 'asc' },
      })
    ).map(({ _count: { blogs: blogsCount }, ...rest }) => ({ ...rest, blogsCount }));
    return categories;
  } catch (error) {
    console.error('Database Error:', error);
    throw Error('Failed to fetch categories with blogs count');
  }
}

const blogsPerPage = 6;

export async function fetchBlogs(
  filters: BlogFilters,
  orderBy: Prisma.BlogOrderByWithRelationInput,
  page: number
) {
  try {
    const { query, categoryName, withDescription, userId } = filters;
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
        {
          user: {
            name: {
              contains: query,
              mode: 'insensitive',
            },
          },
        },
      ],
    };
    const categoryWhereInput: Prisma.BlogWhereInput = {
      categoryName: {
        equals: categoryName,
      },
    };
    const withDescriptionWhereInput: Prisma.BlogWhereInput = {
      AND: [{ description: { not: null } }, { description: { not: '' } }],
    };
    const where: Prisma.BlogWhereInput = {
      AND: [
        query ? queryWhereInput : {},
        categoryName ? categoryWhereInput : {},
        withDescription ? withDescriptionWhereInput : {},
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
        createdAt: true,
        user: {
          select: {
            name: true,
            image: true,
          },
        },
        _count: { select: { likes: true, comments: true } },
      },
    });
    return blogs.map(({ _count, ...blog }) => ({
      ...blog,
      likesCount: _count.likes,
      commentsCount: _count.comments,
    }));
  } catch (error) {
    console.error('Database Error:', error);
    throw Error('Failed to fetch blogs');
  }
}

export async function fetchBlogsTotalPages(filters: BlogFilters) {
  try {
    const { query, categoryName, withDescription, userId } = filters;
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
        {
          user: {
            name: {
              contains: query,
              mode: 'insensitive',
            },
          },
        },
      ],
    };
    const categoryWhereInput: Prisma.BlogWhereInput = {
      categoryName: {
        equals: categoryName,
      },
    };
    const withDescriptionWhereInput: Prisma.BlogWhereInput = {
      AND: [{ description: { not: null } }, { description: { not: '' } }],
    };
    const where: Prisma.BlogWhereInput = {
      AND: [
        query ? queryWhereInput : {},
        categoryName ? categoryWhereInput : {},
        withDescription ? withDescriptionWhereInput : {},
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

export const fetchBlogById = cache(async (id: string) => {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id },
      include: {
        user: { select: { name: true, image: true } },
        _count: { select: { comments: true } },
      },
    });
    if (blog) {
      const { _count, ...rest } = blog;
      return { ...rest, commentsCount: _count.comments };
    }
    return blog;
  } catch (error) {
    console.error('Database Error:', error);
    throw Error('Failed to fetch blog');
  }
});

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
              createdAt: true,
              user: {
                select: {
                  name: true,
                  image: true,
                },
              },
              _count: { select: { likes: true, comments: true } },
            },
          },
        },
      })
    ).map(({ blog: { _count, ...blog } }) => ({
      ...blog,
      likesCount: _count.likes,
      commentsCount: _count.comments,
    }));
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

const commentsPerPage = 20;

export async function fetchBlogComments(
  filters: CommentsFilters,
  orderBy: Prisma.CommentOrderByWithRelationInput,
  page: number
) {
  const { blogId, userId } = filters;
  try {
    const comments = await prisma.comment.findMany({
      where: { blogId, userId },
      orderBy,
      skip: (page - 1) * commentsPerPage,
      take: commentsPerPage,
      include: {
        replyOn: {
          select: { id: true, text: true, user: { select: { image: true, name: true } } },
        },
        user: { select: { name: true, image: true } },
        blog: { select: { title: true } },
      },
    });
    return comments;
  } catch (error) {
    console.error('Database Error:', error);
    throw Error('Failed to fetch blog comments');
  }
}

export async function fetchBlogCommentsTotalPages(filters: CommentsFilters) {
  const { blogId, userId } = filters;
  try {
    const count = await prisma.comment.count({ where: { blogId, userId } });
    return { count, totalPages: Math.ceil(count / commentsPerPage) };
  } catch (error) {
    console.error('Database Error:', error);
    throw Error('Failed to fetch blog comments total pages');
  }
}

const usersPerPage = 6;

export async function fetchUsers(
  filters: UserFilters,
  orderBy: Prisma.UserOrderByWithRelationInput,
  page: number
) {
  try {
    const { query, withBio, followingId, followedById } = filters;
    const queryWhereInput: Prisma.UserWhereInput = {
      OR: [
        {
          name: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          email: {
            contains: query,
            mode: 'insensitive',
          },
        },
      ],
    };
    const withBioWhereInput: Prisma.UserWhereInput = {
      profile: { AND: [{ bio: { not: null } }, { bio: { not: '' } }] },
    };
    const where: Prisma.UserWhereInput = {
      AND: [
        query ? queryWhereInput : {},
        withBio ? withBioWhereInput : {},
        followingId ? { following: { some: { id: followingId } } } : {},
        followedById ? { followedBy: { some: { id: followedById } } } : {},
      ],
    };
    const users = (
      await prisma.user.findMany({
        where,
        orderBy,
        skip: (page - 1) * usersPerPage,
        take: usersPerPage,
        select: {
          id: true,
          name: true,
          image: true,
          profile: { select: { bio: true } },
          _count: { select: { blogs: true, followedBy: true } },
        },
      })
    ).map(({ _count, ...rest }) => ({
      ...rest,
      blogsCount: _count.blogs,
      followersCount: _count.followedBy,
    }));
    return users;
  } catch (error) {
    console.error('Database Error:', error);
    throw Error('Failed to fetch authors');
  }
}

export async function fetchUsersTotalPages(filters: UserFilters) {
  try {
    const { query, withBio, followingId, followedById } = filters;
    const queryWhereInput: Prisma.UserWhereInput = {
      OR: [
        {
          name: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          email: {
            contains: query,
            mode: 'insensitive',
          },
        },
      ],
    };
    const withBioWhereInput: Prisma.UserWhereInput = {
      profile: { AND: [{ bio: { not: null } }, { bio: { not: '' } }] },
    };
    const where: Prisma.UserWhereInput = {
      AND: [
        query ? queryWhereInput : {},
        withBio ? withBioWhereInput : {},
        followingId ? { following: { some: { id: followingId } } } : {},
        followedById ? { followedBy: { some: { id: followedById } } } : {},
      ],
    };
    const count = await prisma.user.count({ where });
    return Math.ceil(count / usersPerPage);
  } catch (error) {
    console.error('Database Error:', error);
    throw Error('Failed to fetch authors total pages');
  }
}

export async function fetchUserOverview(userId: string) {
  try {
    const data = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        blogs: { select: { _count: { select: { likes: true, comments: true } } } },
        _count: { select: { blogs: true, followedBy: true } },
      },
    });
    if (!data) throw Error('User does not exist');
    const {
      _count: { blogs: blogsCount, followedBy: followersCount },
      blogs,
    } = data;
    const { likesCount, commentsCount } = blogs.reduce(
      (acc, { _count: { likes, comments } }) => {
        acc.likesCount += likes;
        acc.commentsCount += comments;
        return acc;
      },
      { likesCount: 0, commentsCount: 0 }
    );
    return { blogsCount, likesCount, commentsCount, followersCount };
  } catch (error) {
    console.error('Database Error:', error);
    throw Error('Failed to fetch user overview');
  }
}

export async function fetchUserBlogsChartData(userId: string) {
  try {
    const blogs = await prisma.blog.findMany({
      where: { userId },
      orderBy: { likes: { _count: 'desc' } },
      select: { title: true, _count: { select: { likes: true } } },
    });
    const data = blogs.reduce((acc, { title, _count: { likes } }, index) => {
      if (!likes) return acc;
      if (index >= 5) acc['Others'] = (acc['Others'] || 0) + likes;
      else acc[title] = likes;
      return acc;
    }, {} as { [key: string]: number });
    return { labels: Object.keys(data), data: Object.values(data) };
  } catch (error) {
    console.error('Database Error:', error);
    throw Error('Failed to fetch likes by blogs chart data');
  }
}

export async function fetchUserCategoriesChartData(userId: string) {
  try {
    const data = (
      await prisma.category.findMany({
        where: { blogs: { some: { userId } } },
        select: { name: true, _count: { select: { blogs: { where: { userId } } } } },
      })
    )
      .sort((a, b) => b._count.blogs - a._count.blogs)
      .reduce((acc, { name, _count: { blogs } }, index) => {
        if (index >= 5) acc['Others'] = (acc['Others'] || 0) + blogs;
        else acc[name] = blogs;
        return acc;
      }, {} as { [key: string]: number });
    return { labels: Object.keys(data), data: Object.values(data) };
  } catch (error) {
    console.error('Database Error:', error);
    throw Error('Failed to fetch blogs categories chart data');
  }
}
