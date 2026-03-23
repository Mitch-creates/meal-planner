import { Hono } from "hono";

import { store } from "../../lib/store.ts";

export const inspirationRoutes = new Hono();

inspirationRoutes.get("/:userId/daily", (c) => {
  const daily = [...store.recipes].slice(0, 3);
  return c.json({
    userId: c.req.param("userId"),
    date: new Date().toISOString().slice(0, 10),
    recipes: daily
  });
});
