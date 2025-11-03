# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 在此代码仓库中工作时提供指导。

1.總是以中文回答我

## 项目概览

这是一个使用 pnpm workspaces 的 Turborepo monorepo 项目，集成了 Next.js 16、React 19 和自定义 shadcn/ui 配置。架构强调跨应用程序的共享 UI 组件和集中式配置包。

## Monorepo 结构

```
monorepo/
├── apps/
│   └── web/                    # Next.js 16 应用 (React 19, App Router)
├── packages/
│   ├── ui/                     # 共享的 shadcn/ui 组件
│   ├── eslint-config/          # 共享的 ESLint 配置
│   ├── typescript-config/      # 共享的 TypeScript 配置
│   └── prettier-config/        # 共享的 Prettier 配置
```

**关键架构决策：**

- **集中式 UI 包**：所有 shadcn/ui 组件都存放在 `packages/ui`，应用通过 `@workspace/ui` 导入
- **工作区引用**：应用通过 `workspace:*` 协议导入共享配置
- **Turbo 流水线**：通过 Turborepo 编排构建/开发任务，具有适当的依赖链

## 常用命令

### 开发

```bash
# 启动开发服务器（从 monorepo 根目录或 web 应用）
pnpm dev                        # Turborepo：启动所有应用
cd apps/web && pnpm dev         # 使用 Turbopack 启动单个应用

# 构建
pnpm build                      # 构建所有包/应用
cd apps/web && pnpm build       # 构建特定应用

# 代码检查
pnpm lint                       # 检查所有工作区
pnpm lint:fix                   # 自动修复问题（仅 web 应用）

# 类型检查
pnpm typecheck                  # 运行 TypeScript 编译器（web 应用）

# 代码格式化
pnpm format                     # 使用 Prettier 格式化所有 .ts/.tsx/.md 文件
```

### GraphQL 代码生成

`web` 应用使用 **Genql** 进行类型安全的 GraphQL 查询（无需手写查询字符串）：

```bash
# 从 GraphQL 端点生成 Genql 客户端
cd apps/web
pnpm genql                      # 生成到 src/genql/

# 需要：GraphQL 服务器运行在 http://localhost:3002/graphql
```

**Genql 使用模式**（参见 `src/lib/genql-client.ts`）：

```typescript
import { client } from "@/lib/genql-client";

const result = await client.query({
  publishedPosts: {
    edges: { node: { id: true, title: true } },
    totalCount: true,
  },
});
```

**可复用的查询配置**：定义在 `src/lib/genql-helpers.ts` 中（例如 `queryConfigs.userBasic`、`queryConfigs.postNode`）

### 添加 shadcn/ui 组件

```bash
# 添加组件到 UI 包（从 monorepo 根目录运行）
pnpm dlx shadcn@latest add button -c apps/web

# 组件将被放置在：packages/ui/src/components/
# 在应用中导入：import { Button } from "@workspace/ui/components/button"
```

**已配置的自定义注册表：**

- `@shadcn` - 官方 shadcn/ui 组件
- `@aceternity` - Aceternity UI 动画组件 (https://ui.aceternity.com)

## 配置文件

### TypeScript 路径别名 (apps/web/tsconfig.json)

```json
{
  "@/*": ["./src/*"],
  "@workspace/ui/*": ["../../packages/ui/src/*"]
}
```

### shadcn/ui 配置 (apps/web/components.json)

- **样式**：`new-york`
- **组件输出路径**：`packages/ui/src/components/`（通过别名 `@workspace/ui/components`）
- **工具函数位置**：`@workspace/ui/lib/utils`
- **Tailwind CSS**：`packages/ui/src/styles/globals.css` (v4.0.8)

### Next.js 配置 (apps/web/next.config.mjs)

```javascript
transpilePackages: ["@workspace/ui"]; // monorepo UI 包所需
```

## GraphQL 架构

### Schema 和类型安全

- **GraphQL LSP**：已启用 `@0no-co/graphqlsp` 插件用于 VSCode IntelliSense
- **Schema 位置**：`apps/web/schema.graphql`
- **生成的类型**：`apps/web/src/genql/`（自动生成，请勿手动编辑）

### 客户端配置

**Genql 客户端**（`src/lib/genql-client.ts`）：

- 从 localStorage 自动注入认证 token（`Bearer {token}`）
- 启用批量请求（最多 10 个查询，20ms 间隔）
- 默认端点：`http://localhost:3002/graphql`

### 认证辅助函数

```typescript
// src/lib/genql-client.ts 导出：
saveAuthToken(accessToken, refreshToken); // 存储 tokens
clearAuthToken(); // 清除 tokens
```

## 构建和流水线

**Turborepo 任务**（turbo.json）：

- `build`：依赖上游包（`^build`），输出到 `.next/`
- `dev`：无缓存，持久进程
- `lint`：依赖上游 lint 任务

**包管理器**：pnpm 10.4.1（必需）
**Node 版本**：>=20

## 已配置的 MCP 服务器

web 应用已启用 MCP 集成（`.mcp.json`）：

- `shadcn` - shadcn/ui CLI 集成
- `MCP_DOCKER` - Docker 网关
- `next-devtools` - Next.js 开发工具

## 样式和 UI

- **Tailwind CSS**：v4（`@tailwindcss/postcss`）
- **CSS 变量**：已启用主题支持
- **基础颜色**：`neutral`
- **主题提供者**：在 `src/components/providers.tsx` 中配置
- **深色模式**：通过 `next-themes` 支持

## 重要说明

1. **始终通过 CLI 添加 shadcn 组件**（不要手动创建），以确保正确放置在 `packages/ui` 中
2. **GraphQL schema 更改后需要重新生成 Genql**
3. **工作区依赖使用 `workspace:*` 语法**（而非特定版本）
4. **开发时 GraphQL 端点必须运行**在 3002 端口
5. **路径别名遵循 monorepo 结构** - 使用 `@workspace/ui` 访问共享组件，使用 `@/*` 访问应用本地文件
6. **Turbo 缓存** - 如需绕过缓存，使用 `--force` 标志：`pnpm build --force`
