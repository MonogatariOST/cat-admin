import { lazy, createElement } from "react";
import type { RouteObject } from "react-router";

const FormBasic = lazy(() => import("../../views/forms/basic"));
const FormAdvanced = lazy(() => import("../../views/forms/advanced").then(m => ({ default: m.Component })));

const formRoutes: RouteObject[] = [
  { index: true, element: createElement(FormBasic) },
  { path: "advanced", element: createElement(FormAdvanced) },
];

export { formRoutes };
