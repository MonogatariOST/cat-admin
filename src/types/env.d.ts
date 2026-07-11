/// <reference types="vite/client" />

/** Environment variable type declarations / 环境变量类型声明 */
interface ImportMetaEnv {
  /** API base URL / API 基础地址 */
  readonly VITE_API_BASE_URL: string;
  /** Request timeout in ms / 请求超时时间(毫秒) */
  readonly VITE_API_TIMEOUT: string;
  /** Application display name / 应用显示名称 */
  readonly VITE_APP_TITLE: string;
  /** localStorage key for auth token / 认证令牌的 localStorage 键名 */
  readonly VITE_AUTH_TOKEN_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
