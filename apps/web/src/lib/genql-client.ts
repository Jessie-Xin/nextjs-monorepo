/**
 * Genql GraphQL 客户端配置
 *
 * Genql 提供类型安全的查询构建器，无需手写 GraphQL 查询字符串
 */

import { createClient } from '@/genql'

/**
 * GraphQL API 端点
 */
const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:3002/graphql'

/**
 * 获取认证 token
 */
function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('accessToken')
}

/**
 * Genql 客户端实例
 *
 * 使用方式：
 * ```typescript
 * import { client } from '@/lib/genql-client'
 *
 * // 无需手写查询字符串，完全类型安全！
 * const result = await client.query({
 *   publishedPosts: {
 *     edges: {
 *       node: {
 *         id: true,
 *         title: true,
 *         content: true,
 *       }
 *     },
 *     totalCount: true,
 *   }
 * })
 * ```
 */
export const client = createClient({
  url: GRAPHQL_ENDPOINT,

  // 配置请求头（每次请求前执行）
  headers: () => {
    const token = getAuthToken()
    return {
      authorization: token ? `Bearer ${token}` : '',
    }
  },

  // 批量请求配置（可选）
  batch: {
    maxBatchSize: 10,        // 最多批量 10 个请求
    batchInterval: 20,       // 20ms 内的请求会被批量
  },
})

/**
 * 保存认证 token
 */
export function saveAuthToken(accessToken: string, refreshToken: string) {
  if (typeof window === 'undefined') return
  localStorage.setItem('accessToken', accessToken)
  localStorage.setItem('refreshToken', refreshToken)
}

/**
 * 清除认证 token
 */
export function clearAuthToken() {
  if (typeof window === 'undefined') return
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}
