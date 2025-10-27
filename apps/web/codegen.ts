import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  // 指向你的 NestJS GraphQL API
  schema: 'http://localhost:3002/graphql',

  // 从这些文件中提取 GraphQL 查询
  documents: ['src/**/*.{ts,tsx}', '!src/graphql/**/*'],

  ignoreNoDocuments: true,

  generates: {
    // 生成类型安全的 GraphQL 客户端代码
    './src/graphql/': {
      preset: 'client',
      config: {
        documentMode: 'documentNode',
        // 生成的代码使用 TypeScript
        useTypeImports: true,
        // 添加详细的类型信息
        scalars: {
          DateTime: 'string',
        },
      },
      presetConfig: {
        // 启用 Fragment Masking 以提高类型安全
        fragmentMasking: { unmaskFunctionName: 'getFragmentData' },
      },
    },

    // 导出完整的 GraphQL Schema
    './schema.graphql': {
      plugins: ['schema-ast'],
      config: {
        includeDirectives: true,
      },
    },
  },

  // 监视模式配置
  watch: true,

  // 生成钩子 - 可以在生成前/后执行命令
  hooks: {
    afterAllFileWrite: ['prettier --write'],
  },
}

export default config