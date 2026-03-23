import { Hono } from "hono";
import { z } from "zod";

import { store, type WeeklyPlan, type WeeklyPlanItem } from "../../lib/store.ts";
import { canConfirmWeeklyPlan, FREE_WEEKLY_CONFIRMATION_CAP } from "../subscriptions/quota.ts";

const dayRange = [1, 2, 3, 4, 5, 6, 7];

const randomizeSchema = z.object({
  lockedRecipeIds: z.array(z.string()).default([])
});

function buildCandidatePlan(userId: string, lockedRecipeIds: string[]): WeeklyPlan {
  const items: WeeklyPlanItem[] = dayRange.map((day) => {
    const lockedId = lockedRecipeIds[day - 1];
    const recipeId = lockedId && store.recipes.some((r) => r.id === lockedId) ? lockedId : store.pickRandomRecipeId();
    return {
      id: store.newId(),
      dayOfWeek: day,
      mealType: "dinner",
      recipeId,
      isLocked: Boolean(lockedId)
    };
  });

  return {
    id: store.newId(),
    userId,
    isCurrent: false,
    createdAt: new Date().toISOString(),
    items
  };
}

export const plansRoutes = new Hono();

plansRoutes.get("/candidate/:userId", (c) => {
  const userId = c.req.param("userId");
  const plan = buildCandidatePlan(userId, []);
  return c.json({ plan });
});

plansRoutes.post("/candidate/:userId/randomize", async (c) => {
  const userId = c.req.param("userId");
  const parsed = randomizeSchema.safeParse(await c.req.json());
  if (!parsed.success) {
    return c.json({ error: "Invalid payload" }, 400);
  }
  const plan = buildCandidatePlan(userId, parsed.data.lockedRecipeIds);
  return c.json({ plan });
});

plansRoutes.post("/:userId/confirm", async (c) => {
  const userId = c.req.param("userId");
  const parsed = z.object({ plan: z.any() }).safeParse(await c.req.json());
  if (!parsed.success) {
    return c.json({ error: "Invalid payload" }, 400);
  }

  const user = store.getUser(userId);
  const allowed = canConfirmWeeklyPlan({
    entitlement: user.entitlement,
    confirmedLedgerCount: user.confirmedLedgerCount
  });
  if (!allowed) {
    return c.json(
      {
        error: "Weekly confirmation quota exhausted",
        quota: {
          cap: FREE_WEEKLY_CONFIRMATION_CAP,
          consumed: user.confirmedLedgerCount,
          remaining: 0
        }
      },
      402
    );
  }

  user.planHistory.forEach((p) => {
    p.isCurrent = false;
  });

  const plan = parsed.data.plan as WeeklyPlan;
  plan.id = store.newId();
  plan.userId = userId;
  plan.isCurrent = true;
  plan.confirmedAt = new Date().toISOString();
  user.planHistory.unshift(plan);

  if (user.entitlement === "free") {
    user.confirmedLedgerCount += 1;
  }

  return c.json({
    plan,
    quota: {
      cap: FREE_WEEKLY_CONFIRMATION_CAP,
      consumed: user.confirmedLedgerCount,
      remaining: Math.max(0, FREE_WEEKLY_CONFIRMATION_CAP - user.confirmedLedgerCount)
    }
  });
});

plansRoutes.get("/history/:userId", (c) => {
  const user = store.getUser(c.req.param("userId"));
  return c.json({ plans: user.planHistory });
});
