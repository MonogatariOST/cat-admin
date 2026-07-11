import type { RouteObject } from "react-router";

const teachersRoutes: RouteObject[] = [
  { index: true, lazy: () => import("../../views/teachers/list") },
];

export { teachersRoutes };
