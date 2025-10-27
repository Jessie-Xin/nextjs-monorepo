/**
 * Genql 使用示例 - 无需手写 GraphQL 查询！
 *
 * 使用 genql，你只需要用 TypeScript 对象描述你想要的数据，
 * 无需写 `graphql()` 字符串，完全类型安全！
 */

"use client";

import { useState } from "react";
import { client, saveAuthToken, clearAuthToken } from "@/lib/genql-client";
import type { FieldsSelection, Query } from "@/genql";

/**
 * 示例 1: 用户登录（无需手写查询！）
 */
export function GenqlLoginExample() {
  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      // 🎉 无需手写 GraphQL 查询字符串！
      // 只需要描述你想要的数据结构
      const result = await client.mutation({
        login: {
          __args: {
            data: {
              email,
              password,
            },
          },
          // 选择你需要的字段（完全类型安全！）
          accessToken: true,
          refreshToken: true,
          user: {
            id: true,
            email: true,
            firstname: true,
            lastname: true,
            role: true,
          },
        },
      });

      // 保存 token
      saveAuthToken(result.login.accessToken, result.login.refreshToken);

      console.log("登录成功:", result.login.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : "登录失败");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ padding: "20px", border: "1px solid #ccc", margin: "10px 0" }}
    >
      <h3>登录示例（Genql - 无需手写查询）</h3>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="邮箱"
        style={{ display: "block", margin: "10px 0", padding: "5px" }}
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="密码"
        style={{ display: "block", margin: "10px 0", padding: "5px" }}
      />

      <button
        onClick={handleLogin}
        disabled={loading}
        style={{ padding: "5px 15px" }}
      >
        {loading ? "登录中..." : "登录"}
      </button>

      {error && <p style={{ color: "red" }}>错误: {error}</p>}
    </div>
  );
}

/**
 * 示例 2: 获取当前用户信息
 */
export function GenqlUserProfileExample() {
  // ✨ 定义查询字段选择（可复用的查询片段）
  const userFields = {
    id: true,
    email: true,
    firstname: true,
    lastname: true,
    role: true,
    createdAt: true,
    updatedAt: true,
  } as const;

  // ✨ 使用 genql 的 FieldsSelection 工具类型自动推断类型
  // 这样类型会与查询字段完全匹配，并且有正确的类型定义
  type UserResult = FieldsSelection<Query["me"], typeof userFields>;

  const [user, setUser] = useState<UserResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);

    try {
      // 🎉 完全类型安全的查询构建
      const result = await client.query({
        me: userFields,
      });

      setUser(result.me);
    } catch (err) {
      setError(err instanceof Error ? err.message : "获取失败");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ padding: "20px", border: "1px solid #ccc", margin: "10px 0" }}
    >
      <h3>用户信息示例</h3>

      <button
        onClick={fetchProfile}
        disabled={loading}
        style={{ padding: "5px 15px" }}
      >
        {loading ? "加载中..." : "获取用户信息"}
      </button>

      {error && <p style={{ color: "red" }}>错误: {error}</p>}

      {user && (
        <div style={{ marginTop: "10px" }}>
          <p>Email: {user.email}</p>
          <p>
            姓名: {user.firstname} {user.lastname}
          </p>
          <p>角色: {user.role}</p>
          <p>创建于: {new Date(user.createdAt).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}

/**
 * 示例 3: 获取已发布的文章列表（Relay 分页）
 */
export function GenqlPostsListExample() {
  const [posts, setPosts] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);

    try {
      // 🎉 类型安全的复杂查询
      const result = await client.query({
        publishedPosts: {
          __args: {
            orderBy: {
              field: "createdAt",
              direction: "desc",
            },
          },
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
        },
      });

      setPosts(result.publishedPosts);
    } catch (err) {
      setError(err instanceof Error ? err.message : "获取失败");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ padding: "20px", border: "1px solid #ccc", margin: "10px 0" }}
    >
      <h3>文章列表示例（Relay 分页）</h3>

      <button
        onClick={fetchPosts}
        disabled={loading}
        style={{ padding: "5px 15px" }}
      >
        {loading ? "加载中..." : "获取文章列表"}
      </button>

      {error && <p style={{ color: "red" }}>错误: {error}</p>}

      {posts && (
        <>
          <p style={{ marginTop: "10px" }}>共 {posts.totalCount} 篇文章</p>

          {posts.edges.map((edge: any) => (
            <div
              key={edge.node.id}
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                margin: "10px 0",
                backgroundColor: "#f9f9f9",
              }}
            >
              <h4>{edge.node.title}</h4>
              <p>{edge.node.content}</p>
              <small>
                作者: {edge.node.author?.firstname} {edge.node.author?.lastname}{" "}
                ({edge.node.author?.email})
              </small>
              <br />
              <small>
                发布于: {new Date(edge.node.createdAt).toLocaleString()}
              </small>
            </div>
          ))}

          {posts.pageInfo.hasNextPage && (
            <button style={{ padding: "5px 15px" }}>加载更多</button>
          )}
        </>
      )}
    </div>
  );
}

/**
 * 示例 4: 创建文章
 */
export function GenqlCreatePostExample() {
  const [title, setTitle] = useState("新文章标题");
  const [content, setContent] = useState("这是文章内容...");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleCreate = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // 🎉 类型安全的 mutation
      const result = await client.mutation({
        createPost: {
          __args: {
            data: {
              title,
              content,
            },
          },
          id: true,
          title: true,
          content: true,
          published: true,
          createdAt: true,
        },
      });

      console.log("文章创建成功:", result.createPost);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "创建失败");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ padding: "20px", border: "1px solid #ccc", margin: "10px 0" }}
    >
      <h3>创建文章示例</h3>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="标题"
        style={{
          display: "block",
          margin: "10px 0",
          padding: "5px",
          width: "300px",
        }}
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="内容"
        style={{
          display: "block",
          margin: "10px 0",
          padding: "5px",
          width: "300px",
          height: "100px",
        }}
      />

      <button
        onClick={handleCreate}
        disabled={loading}
        style={{ padding: "5px 15px" }}
      >
        {loading ? "创建中..." : "创建文章"}
      </button>

      {error && <p style={{ color: "red" }}>错误: {error}</p>}
      {success && <p style={{ color: "green" }}>创建成功！</p>}
    </div>
  );
}

/**
 * 完整示例页面
 */
export function GenqlExamplesPage() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>Genql 使用示例 - 无需手写 GraphQL 查询！</h1>
      <p>使用 genql，你只需要用 TypeScript 对象描述数据结构，完全类型安全！</p>

      <GenqlLoginExample />
      <GenqlUserProfileExample />
      <GenqlPostsListExample />
      <GenqlCreatePostExample />
    </div>
  );
}
