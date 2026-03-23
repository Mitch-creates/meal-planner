import { Hono } from "hono";

import { store } from "../../lib/store.ts";

type GroceryRow = {
  name: string;
  unit: "g" | "ml" | "piece";
  amount: number;
};

export const groceriesRoutes = new Hono();

groceriesRoutes.get("/:userId/current", (c) => {
  const user = store.getUser(c.req.param("userId"));
  const current = user.planHistory.find((p) => p.isCurrent);
  if (!current) {
    return c.json({ items: [] });
  }

  const map = new Map<string, GroceryRow>();
  for (const item of current.items) {
    const recipe = store.recipes.find((r) => r.id === item.recipeId);
    if (!recipe) {
      continue;
    }
    for (const ingredient of recipe.ingredients) {
      const key = `${ingredient.name}:${ingredient.unit}`;
      const existing = map.get(key);
      if (existing) {
        existing.amount += ingredient.amount;
      } else {
        map.set(key, { name: ingredient.name, unit: ingredient.unit, amount: ingredient.amount });
      }
    }
  }

  return c.json({ items: Array.from(map.values()) });
});
