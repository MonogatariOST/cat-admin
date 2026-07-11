import { lazy, createElement } from "react";
import type { RouteObject } from "react-router";

const View = lazy(() => import("../../views/advanced-table/index").then(m => ({ default: m.Component })));

const routes: RouteObject[] = [
  { index: true, element: createElement(View) },
];

export { routes };
