import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
/* Self-hosted Noto Sans SC font via @fontsource (licensed under SIL Open Font License, free for commercial use) /
 * / 自托管 Noto Sans SC 字体（SIL 开源许可，可商用），替换 Google Fonts CDN，在中国无墙问题可正常加载 */
import "@fontsource/noto-sans-sc/chinese-simplified-400.css";
import "@fontsource/noto-sans-sc/chinese-simplified-500.css";
import "@fontsource/noto-sans-sc/chinese-simplified-600.css";
import "@fontsource/noto-sans-sc/chinese-simplified-700.css";
import "./main.css";
import "./theme.css";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
