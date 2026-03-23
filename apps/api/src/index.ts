import { Hono } from "hono";

import { assignExperiments } from "./modules/experiments/service.ts";
import { authRoutes } from "./modules/auth/routes.ts";
import { favoritesRoutes } from "./modules/favorites/routes.ts";
import { groceriesRoutes } from "./modules/groceries/routes.ts";
import { inspirationRoutes } from "./modules/plans/inspiration-routes.ts";
import { plansRoutes } from "./modules/plans/routes.ts";
import { subscriptionsRoutes } from "./modules/subscriptions/routes.ts";

const app = new Hono();

app.get("/health", (c) => c.json({ ok: true }));

app.get("/v1/experiments/assignments/:userId", (c) => {
  const userId = c.req.param("userId");
  return c.json({ assignments: assignExperiments(userId) });
});

app.route("/v1/auth", authRoutes);
app.route("/v1/plans", plansRoutes);
app.route("/v1/inspiration", inspirationRoutes);
app.route("/v1/groceries", groceriesRoutes);
app.route("/v1/favorites", favoritesRoutes);
app.route("/v1/subscriptions", subscriptionsRoutes);

export default app;
