/**
 * Genql 类型辅助工具
 * 提供常用的类型定义和查询片段
 */

import type { User, Post, FieldsSelection, Query } from "@/genql";

// ============================================
// 方案 1: 使用 Pick 直接选择字段（最简单）
// ============================================

/**
 * 基础用户信息（不含关联数据）
 */
export type UserBasic = Pick<
  User,
  "id" | "email" | "firstname" | "lastname" | "role" | "createdAt" | "updatedAt"
>;

/**
 * 用户信息（含文章列表）
 */
export type UserWithPosts = Pick<
  User,
  | "id"
  | "email"
  | "firstname"
  | "lastname"
  | "role"
  | "createdAt"
  | "updatedAt"
  | "posts"
>;

/**
 * 基础文章信息（不含作者）
 */
export type PostBasic = Pick<
  Post,
  "id" | "title" | "content" | "published" | "createdAt" | "updatedAt"
>;

/**
 * 文章信息（含作者）
 */
export type PostWithAuthor = PostBasic & {
  author: UserBasic | null;
};

/**
 * 文章连接类型（用于分页查询）
 */
export type PostConnectionResult = {
  edges: Array<{
    cursor: string;
    node: PostWithAuthor;
  }> | null;
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string | null;
    endCursor: string | null;
  };
  totalCount: number;
};

// ============================================
// 方案 2: 预定义查询字段（可复用）
// ============================================

/**
 * 常用查询字段定义
 */
export const queryFields = {
  /** 基础用户字段 */
  userBasic: {
    id: true,
    email: true,
    firstname: true,
    lastname: true,
    role: true,
    createdAt: true,
    updatedAt: true,
  } as const,

  /** 用户字段（含文章） */
  userWithPosts: {
    id: true,
    email: true,
    firstname: true,
    lastname: true,
    role: true,
    createdAt: true,
    updatedAt: true,
    posts: {
      id: true,
      title: true,
      content: true,
      published: true,
      createdAt: true,
      updatedAt: true,
    },
  } as const,

  /** 基础文章字段 */
  postBasic: {
    id: true,
    title: true,
    content: true,
    published: true,
    createdAt: true,
    updatedAt: true,
  } as const,

  /** 文章字段（含作者） */
  postWithAuthor: {
    id: true,
    title: true,
    content: true,
    published: true,
    createdAt: true,
    updatedAt: true,
    author: {
      id: true,
      email: true,
      firstname: true,
      lastname: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  } as const,

  /** 文章连接（用于分页） */
  postConnection: {
    edges: {
      cursor: true,
      node: {
        id: true,
        title: true,
        content: true,
        published: true,
        createdAt: true,
        updatedAt: true,
        author: {
          id: true,
          email: true,
          firstname: true,
          lastname: true,
          role: true,
        },
      },
    },
    pageInfo: {
      hasNextPage: true,
      hasPreviousPage: true,
      startCursor: true,
      endCursor: true,
    },
    totalCount: true,
  } as const,
} as const;

// ============================================
// 方案 3: 从查询推断类型的工具类型
// ============================================

/**
 * 从查询结果推断类型的工具
 *
 * @example
 * ```typescript
 * const result = await client.query({
 *   me: queryFields.userBasic
 * });
 * type MeType = QueryResultType<typeof result, 'me'>; // UserBasic
 * ```
 */
export type QueryResultType<
  TResult,
  TField extends keyof TResult
> = TResult[TField];

/**
 * 从异步查询推断类型
 *
 * @example
 * ```typescript
 * const fetchUser = async () => {
 *   return await client.query({
 *     me: queryFields.userBasic
 *   });
 * };
 * type UserType = AsyncQueryResult<typeof fetchUser>['me'];
 * ```
 */
export type AsyncQueryResult<
  T extends (...args: never[]) => Promise<unknown>
> = Awaited<ReturnType<T>>;

// ============================================
// 方案 4: 使用 FieldsSelection 的类型别名
// ============================================

/**
 * 用户查询结果类型（使用 genql 的 FieldsSelection）
 */
export type UserQueryResult = FieldsSelection<
  Query["me"],
  typeof queryFields.userBasic
>;

/**
 * 文章查询结果类型
 */
export type PostQueryResult = FieldsSelection<
  Query["post"],
  typeof queryFields.postWithAuthor
>;
