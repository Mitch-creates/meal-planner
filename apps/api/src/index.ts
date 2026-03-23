import { Hono } from "hono";

import { assignExperiments } from "./modules/experiments/service.ts";

const app = new Hono();

app.get("/health", (c) => c.json({ ok: true }));

app.get("/v1/experiments/assignments/:userId", (c) => {
  const userId = c.req.param("userId");
  return c.json({ assignments: assignExperiments(userId) });
});

export default app;
