/**
 * Genql 代码生成脚本
 *
 * 使用编程方式生成 genql 客户端代码，支持自定��标量类型映射
 *
 * 运行: pnpm genql:generate
 */

import { generate } from "@genql/cli";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 项目根目录
const rootDir = path.join(__dirname, "..");

// GraphQL endpoint URL
const schemaEndpoint = "http://localhost:3002/graphql";

// 输出目录
const outputDir = path.join(rootDir, "src/genql");

console.log("🚀 开始生成 Genql 客户端代码...\n");
console.log("📡 Schema: ", schemaEndpoint);
console.log("📁 Output: ", outputDir);
console.log("");

generate({
  // 从 GraphQL endpoint 获取 schema
  schema: schemaEndpoint,

  // 输出目录
  output: outputDir,

  // Headers for schema introspection (如果需要认证)
  headers: {
    // Authorization: "Bearer your-token",
  },

  // 自定义标量类型映射
  scalarTypes: {
    // DateTime 映射为 any（因为 genql 会处理日期序列化）
    // DateTime: "any",

    // JWT token 映射为 any
    // JWT: "any",

    // 如果使用 MongoDB，可以添加 ObjectId 映射
    // MongoID: "string",
    // ObjectId: "string",
  },

  // 排序字段（可选，让生成的代码更整洁）
  sortProperties: true,

  // 启用详细日志
  verbose: false,
})
  .then(() => {
    console.log("✅ Genql 客户端代码生成成功！");
    console.log(`📦 代码已生成到: ${outputDir}`);
  })
  .catch((error) => {
    console.error("❌ Genql 代码生成失败:");
    console.error(error);
    process.exit(1);
  });
