import { Hono } from "hono";
import { z } from "zod";

import { store } from "../../lib/store.ts";

const recipeBody = z.object({ recipeId: z.string() });
const planBody = z.object({ planId: z.string() });

export const favoritesRoutes = new Hono();

favoritesRoutes.get("/:userId", (c) => {
  const user = store.getUser(c.req.param("userId"));
  return c.json({
    recipeIds: Array.from(user.favoritesRecipeIds),
    planIds: Array.from(user.favoritePlanIds)
  });
});

favoritesRoutes.post("/:userId/recipes", async (c) => {
  const parsed = recipeBody.safeParse(await c.req.json());
  if (!parsed.success) {
    return c.json({ error: "Invalid payload" }, 400);
  }
  const user = store.getUser(c.req.param("userId"));
  user.favoritesRecipeIds.add(parsed.data.recipeId);
  return c.json({ ok: true });
});

favoritesRoutes.post("/:userId/plans", async (c) => {
  const parsed = planBody.safeParse(await c.req.json());
  if (!parsed.success) {
    return c.json({ error: "Invalid payload" }, 400);
  }
  const user = store.getUser(c.req.param("userId"));
  user.favoritePlanIds.add(parsed.data.planId);
  return c.json({ ok: true });
});
