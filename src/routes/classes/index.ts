import type { RouteObject } from "react-router";

const classesRoutes: RouteObject[] = [
  { index: true, lazy: () => import("../../views/classes/list") },
];

export { classesRoutes };
