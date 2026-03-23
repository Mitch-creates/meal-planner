import { Hono } from "hono";
import { z } from "zod";

import { store } from "../../lib/store.ts";
import { FREE_WEEKLY_CONFIRMATION_CAP } from "./quota.ts";

const entitlementBody = z.object({
  entitlement: z.enum(["free", "pro"])
});

export const subscriptionsRoutes = new Hono();

subscriptionsRoutes.get("/:userId", (c) => {
  const user = store.getUser(c.req.param("userId"));
  return c.json({
    entitlement: user.entitlement,
    quota: {
      cap: FREE_WEEKLY_CONFIRMATION_CAP,
      consumed: user.confirmedLedgerCount,
      remaining: Math.max(0, FREE_WEEKLY_CONFIRMATION_CAP - user.confirmedLedgerCount)
    }
  });
});

subscriptionsRoutes.post("/:userId/entitlement", async (c) => {
  const parsed = entitlementBody.safeParse(await c.req.json());
  if (!parsed.success) {
    return c.json({ error: "Invalid payload" }, 400);
  }
  const user = store.getUser(c.req.param("userId"));
  user.entitlement = parsed.data.entitlement;
  return c.json({ entitlement: user.entitlement });
});
