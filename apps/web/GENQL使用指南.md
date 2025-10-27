# Genql 使用指南 - 无需手写 GraphQL 查询！

## 什么是 Genql？

Genql 是一个 GraphQL 客户端代码生成器，它从你的 GraphQL schema 自动生成**类型安全的查询构建器**。

**核心优势**：
- ✅ **无需手写 GraphQL 查询字符串**
- ✅ **完全类型安全**（TypeScript 智能提示）
- ✅ **自动补全**（编辑器自动建议可用字段）
- ✅ **重构友好**（字段重命名时会报错）

## 对比传统方式

### ❌ 传统方式（需要手写查询）

```typescript
import { graphql } from '@/gql'

// 需要手写 GraphQL 查询字符串
const LoginMutation = graphql(`
  mutation Login($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      accessToken
      refreshToken
      user {
        id
        email
      }
    }
  }
`)

const [result, login] = useMutation(LoginMutation)
await login({ email, password })
```

### ✅ Genql 方式（无需手写查询！）

```typescript
import { client } from '@/lib/genql-client'

// 直接用 TypeScript 对象描述数据结构
const result = await client.mutation({
  login: {
    __args: {
      data: { email, password }
    },
    accessToken: true,
    refreshToken: true,
    user: {
      id: true,
      email: true,
    }
  }
})

// 完全类型安全！
console.log(result.login.user.email)
```

## 快速开始

### 1. 生成 Genql 客户端

当 GraphQL schema 发生变化时，重新生成客户端：

```bash
npm run genql
```

这会从 `http://localhost:3002/graphql` 获取 schema，并生成到 `src/genql/` 目录。

### 2. 导入客户端

```typescript
import { client } from '@/lib/genql-client'
```

### 3. 开始使用！

## 使用示例

### 示例 1: 查询（Query）

```typescript
import { client } from '@/lib/genql-client'

// 获取当前用户信息
const result = await client.query({
  me: {
    id: true,
    email: true,
    firstname: true,
    lastname: true,
    role: true,
  }
})

console.log(result.me.email)
```

### 示例 2: 变更（Mutation）

```typescript
// 用户登录
const result = await client.mutation({
  login: {
    __args: {
      data: {
        email: 'user@example.com',
        password: 'password123',
      }
    },
    accessToken: true,
    refreshToken: true,
    user: {
      id: true,
      email: true,
    }
  }
})

// 保存 token
localStorage.setItem('accessToken', result.login.accessToken)
```

### 示例 3: 带参数的查询

```typescript
// 获取已发布的文章（带排序）
const result = await client.query({
  publishedPosts: {
    __args: {
      orderBy: {
        field: 'createdAt',
        direction: 'desc',
      },
      query: '搜索关键词',  // 可选
    },
    edges: {
      node: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        author: {
          id: true,
          email: true,
          firstname: true,
        }
      }
    },
    pageInfo: {
      hasNextPage: true,
      endCursor: true,
    },
    totalCount: true,
  }
})

console.log(`共 ${result.publishedPosts.totalCount} 篇文章`)
```

### 示例 4: 嵌套查询

```typescript
// 获取用户及其文章
const result = await client.query({
  me: {
    id: true,
    email: true,
    // 嵌套查询用户的文章
    posts: {
      id: true,
      title: true,
      content: true,
      published: true,
    }
  }
})

// 完全类型安全
result.me.posts?.forEach(post => {
  console.log(post.title)
})
```

### 示例 5: 创建文章

```typescript
const result = await client.mutation({
  createPost: {
    __args: {
      data: {
        title: '新文章标题',
        content: '文章内容...',
      }
    },
    id: true,
    title: true,
    content: true,
    published: true,
    createdAt: true,
  }
})

console.log('文章创建成功:', result.createPost.id)
```

## 认证处理

客户端已经配置好自动添加 JWT token：

```typescript
import { client, saveAuthToken, clearAuthToken } from '@/lib/genql-client'

// 登录后保存 token
const result = await client.mutation({
  login: {
    __args: { data: { email, password } },
    accessToken: true,
    refreshToken: true,
  }
})

saveAuthToken(result.login.accessToken, result.login.refreshToken)

// 之后的所有请求会自动带上 Authorization 头

// 登出时清除 token
clearAuthToken()
```

## 完整示例组件

查看 `src/components/examples/GenqlExamples.tsx` 获取更多示例：

- `GenqlLoginExample` - 登录示例
- `GenqlUserProfileExample` - 用户信息示例
- `GenqlPostsListExample` - 文章列表示例（Relay 分页）
- `GenqlCreatePostExample` - 创建文章示例

## 类型安全优势

### 自动补全

编辑器会自动提示可用的字段：

```typescript
const result = await client.query({
  me: {
    // 输入时会自动提示: id, email, firstname, lastname, role, posts...
    id: true,
  }
})
```

### 编译时错误检查

拼写错误会在编译时被捕获：

```typescript
const result = await client.query({
  me: {
    emial: true,  // ❌ 编译错误：'emial' 不存在，你是不是想要 'email'？
  }
})
```

### 返回类型推断

返回的数据类型会自动推断：

```typescript
const result = await client.query({
  me: {
    id: true,
    email: true,
  }
})

// TypeScript 知道 result.me 的类型：
// { id: string, email: string }

// 未选择的字段不会出现在类型中
result.me.firstname  // ❌ 编译错误：'firstname' 不存在
```

## 高级用法

### 批量请求

客户端已配置批量请求，20ms 内的多个请求会自动合并：

```typescript
// 这两个请求会被合并成一个
const [user, posts] = await Promise.all([
  client.query({ me: { id: true } }),
  client.query({ publishedPosts: { totalCount: true } }),
])
```

### 自定义请求头

```typescript
import { createClient } from '@/genql'

const customClient = createClient({
  url: 'http://localhost:3002/graphql',
  headers: {
    'X-Custom-Header': 'value',
  },
})
```

### 错误处理

```typescript
try {
  const result = await client.query({
    me: { id: true }
  })
} catch (error) {
  if (error instanceof Error) {
    console.error('GraphQL 错误:', error.message)
  }
}
```

## 常见问题

### Q: Schema 更新后怎么办？

重新运行生成命令：

```bash
npm run genql
```

### Q: 为什么字段需要设置为 `true`？

这是 genql 的语法，表示"我想要这个字段"。

```typescript
{
  me: {
    id: true,        // ✅ 我要 id
    email: true,     // ✅ 我要 email
    firstname: false, // ❌ 错误：false 无效，要么 true 要么不写
  }
}
```

### Q: 如何选择所有字段？

你需要明确列出每个字段。这是 GraphQL 的核心理念——按需查询。

```typescript
{
  me: {
    id: true,
    email: true,
    firstname: true,
    lastname: true,
    role: true,
    // ...
  }
}
```

### Q: Genql 和 urql/Apollo 有什么区别？

- **urql/Apollo**：传统 GraphQL 客户端，需要手写查询字符串
- **Genql**：类型安全的查询构建器，无需手写查询

你可以根据团队偏好选择其中一个。

## 参考资源

- Genql 官方文档：https://genql.dev
- 示例代码：`src/components/examples/GenqlExamples.tsx`
- 客户端配置：`src/lib/genql-client.ts`
- 生成的类型：`src/genql/`

---

**总结**：使用 Genql，你再也不需要手写 GraphQL 查询字符串了！只需用 TypeScript 对象描述数据结构，享受完全的类型安全。
