import { Hono } from "hono";
import { z } from "zod";

const startSchema = z.object({
  email: z.string().email(),
  provider: z.enum(["magic_link", "google", "apple"])
});

export const authRoutes = new Hono();

authRoutes.post("/start", async (c) => {
  const parsed = startSchema.safeParse(await c.req.json());
  if (!parsed.success) {
    return c.json({ error: "Invalid payload" }, 400);
  }

  return c.json({
    provisionalSession: {
      userId: `prov_${parsed.data.email}`,
      isVerified: false,
      provider: parsed.data.provider
    }
  });
});
