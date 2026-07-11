import type { RouteObject } from "react-router";

const coursesRoutes: RouteObject[] = [
  { index: true, lazy: () => import("../../views/courses/list") },
];

export { coursesRoutes };
