import { type RouteConfig, index, route } from "@react-router/dev/routes";

export const routes = [
  index("routes/home.tsx"),
  route("/pricing", "routes/pricing.tsx"),
];

export default routes satisfies RouteConfig;