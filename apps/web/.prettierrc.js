import baseConfig from "@workspace/prettier-config";

/**
 * @type {import('prettier').Config}
 */
export default {
  ...baseConfig,
  // 在这里添加额外的配置来覆盖基础配置
  // 例如：
  // printWidth: 100,
  // semi: false,
};
