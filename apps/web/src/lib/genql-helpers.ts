/**
 * Genql 查询配置
 *
 * 定义可复用的查询字段配置
 * 使用 genql 内置的 QueryResult 和 MutationResult 进行类型推断
 */

// 重新导出 genql 的类型工具
export type { QueryResult, MutationResult } from "@/genql";

/**
 * 可复用的查询字段配置
 */
export const queryConfigs = {
  /**
   * 用户基本信息
   */
  userBasic: {
    id: true,
    email: true,
    firstname: true,
    lastname: true,
    role: true,
  },

  /**
   * 用户完整信息（包含时间戳）
   */
  userFull: {
    id: true,
    email: true,
    firstname: true,
    lastname: true,
    role: true,
    createdAt: true,
    updatedAt: true,
  },

  /**
   * 文章节点（用于列表）
   */
  postNode: {
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
    },
  },

  /**
   * 分页信息
   */
  pageInfo: {
    hasNextPage: true,
    hasPreviousPage: true,
    startCursor: true,
    endCursor: true,
  },
} as const;
