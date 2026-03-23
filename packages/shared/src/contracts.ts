export type EntitlementStatus = "active" | "inactive" | "grace" | "expired";

export type SubscriptionEntitlement = {
  entitlement: "pro";
  status: EntitlementStatus;
  expiresAt?: string;
};

export type WeeklyPlanQuota = {
  freeCap: number;
  consumed: number;
  remaining: number;
};

export type Unit = "g" | "ml" | "piece";

export type Recipe = {
  id: string;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  prepMinutes: number;
  cookMinutes: number;
  ingredients: Array<{ name: string; amount: number; unit: Unit }>;
};

export type WeeklyPlanItem = {
  id: string;
  dayOfWeek: number;
  mealType: "dinner";
  recipeId: string;
  isLocked: boolean;
};

export type WeeklyPlan = {
  id: string;
  userId: string;
  isCurrent: boolean;
  confirmedAt?: string;
  createdAt: string;
  items: WeeklyPlanItem[];
};
