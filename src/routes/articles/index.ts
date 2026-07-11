import { lazy, createElement } from "react";
import type { RouteObject } from "react-router";

const View = lazy(() => import("../../views/articles/list").then(m => ({ default: m.Component })));

const routes: RouteObject[] = [
  { index: true, element: createElement(View) },
];

export { routes };
