/**
 * Root application component / 根应用组件
 * Renders the RouterProvider with the configured browser router.
 * / 渲染配置好的路由提供器
 */

import { RouterProvider } from "react-router";
import { router } from "./routes";

/**
 * App - Root component that provides routing / 根组件，提供路由
 */
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
