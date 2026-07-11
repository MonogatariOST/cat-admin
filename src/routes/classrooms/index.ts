import type { RouteObject } from "react-router";

const classroomsRoutes: RouteObject[] = [
  { index: true, lazy: () => import("../../views/classrooms/list") },
];

export { classroomsRoutes };
