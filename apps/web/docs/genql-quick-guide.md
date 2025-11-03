# Genql 类型推断 - 简化指南

使用 genql 内置的 `QueryResult` 进行类型推断。

## 基本模式

```typescript
import { queryConfigs, type QueryResult } from "@/lib/genql-helpers";

// 1. 定义查询配置
const userQuery = {
  me: queryConfigs.userFull,
} as const;

// 2. 使用 QueryResult 推断类型
type UserData = QueryResult<typeof userQuery>["me"];

// 3. 在 state 中使用
const [user, setUser] = useState<UserData | null>(null);

// 4. 执行查询
const result = await client.query(userQuery);
setUser(result.me);
```

## 完整示例

### 示例 1: 获取用户信息

```typescript
import { client } from '@/lib/genql-client'
import { queryConfigs, type QueryResult } from '@/lib/genql-helpers'

export function UserProfile() {
  // 定义查询
  const userQuery = {
    me: queryConfigs.userFull,
  } as const

  // 推断类型
  type UserData = QueryResult<typeof userQuery>['me']

  const [user, setUser] = useState<UserData | null>(null)

  const fetchProfile = async () => {
    const result = await client.query(userQuery)
    setUser(result.me)
  }

  return <div>{user?.email}</div>
}
```

### 示例 2: 获取文章列表

```typescript
export function PostsList() {
  // 组合使用预定义的配置
  const postsQuery = {
    publishedPosts: {
      __args: {
        orderBy: { field: "createdAt" as const, direction: "desc" as const },
      },
      edges: {
        cursor: true,
        node: queryConfigs.postNode,  // 复用配置
      },
      pageInfo: queryConfigs.pageInfo,  // 复用配置
      totalCount: true,
    },
  } as const

  // 推断类型
  type PostsData = QueryResult<typeof postsQuery>['publishedPosts']

  const [posts, setPosts] = useState<PostsData | null>(null)

  const fetchPosts = async () => {
    const result = await client.query(postsQuery)
    setPosts(result.publishedPosts)
  }

  return (
    <div>
      {posts?.edges?.map(edge => (
        <div key={edge.node.id}>{edge.node.title}</div>
      ))}
    </div>
  )
}
```

### 示例 3: Mutation 类型推断

```typescript
import { type MutationResult } from '@/lib/genql-helpers'

export function CreatePost() {
  const createPostMutation = {
    createPost: {
      __args: {
        data: { title: "标题", content: "内容" },
      },
      id: true,
      title: true,
      content: true,
      createdAt: true,
    },
  } as const

  // 推断 mutation 返回类型
  type CreatePostData = MutationResult<typeof createPostMutation>['createPost']

  const [post, setPost] = useState<CreatePostData | null>(null)

  const handleCreate = async () => {
    const result = await client.mutation(createPostMutation)
    setPost(result.createPost)
  }

  return <button onClick={handleCreate}>创建文章</button>
}
```

## 为什么选择 QueryResult？

### ✅ 优点

1. **官方推荐** - genql 内置的类型工具
2. **简洁清晰** - 一行代码完成类型推断
3. **完全类型安全** - 只包含查询的字段
4. **易于维护** - 修改查询时类型自动更新

### 🎯 核心要点

- 使用 `as const` 确保类型推断精确
- 使用 `queryConfigs` 复用常用查询配置
- 使用 `QueryResult<typeof query>['field']` 提取字段类型
- 使用 `MutationResult<typeof mutation>['field']` 提取 mutation 类型

## 项目结构

```
src/
├── lib/
│   ├── genql-client.ts       # 客户端配置
│   └── genql-helpers.ts      # queryConfigs + 类型导出
└── components/
    └── your-component.tsx    # 使用 QueryResult
```

这就是全部！简单、清晰、类型安全。
