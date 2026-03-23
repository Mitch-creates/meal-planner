import { randomUUID } from "node:crypto";

type Unit = "g" | "ml" | "piece";

export type Recipe = {
  id: string;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  prepMinutes: number;
  cookMinutes: number;
  ingredients: Array<{ name: string; amount: number; unit: Unit }>;
  steps: Array<{
    order: number;
    text: string;
    ingredients: Array<{ name: string; amount: number; unit: Unit }>;
  }>;
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

type Entitlement = "free" | "pro";

export type UserState = {
  entitlement: Entitlement;
  confirmedLedgerCount: number;
  favoritesRecipeIds: Set<string>;
  favoritePlanIds: Set<string>;
  planHistory: WeeklyPlan[];
};

const recipeSeed: Recipe[] = [
  {
    id: "r1",
    title: "Lemon Garlic Salmon",
    difficulty: "easy",
    prepMinutes: 10,
    cookMinutes: 20,
    ingredients: [
      { name: "salmon fillet", amount: 2, unit: "piece" },
      { name: "lemon", amount: 1, unit: "piece" },
      { name: "garlic", amount: 10, unit: "g" }
    ],
    steps: [
      { order: 1, text: "Season salmon and preheat pan.", ingredients: [{ name: "salmon fillet", amount: 2, unit: "piece" }] },
      { order: 2, text: "Add garlic and lemon, cook until flaky.", ingredients: [{ name: "garlic", amount: 10, unit: "g" }, { name: "lemon", amount: 1, unit: "piece" }] }
    ]
  },
  {
    id: "r2",
    title: "One-Pot Tomato Pasta",
    difficulty: "easy",
    prepMinutes: 8,
    cookMinutes: 18,
    ingredients: [
      { name: "pasta", amount: 300, unit: "g" },
      { name: "tomato passata", amount: 500, unit: "ml" },
      { name: "onion", amount: 1, unit: "piece" }
    ],
    steps: [
      { order: 1, text: "Saute onion in pot.", ingredients: [{ name: "onion", amount: 1, unit: "piece" }] },
      { order: 2, text: "Add pasta and passata, simmer.", ingredients: [{ name: "pasta", amount: 300, unit: "g" }, { name: "tomato passata", amount: 500, unit: "ml" }] }
    ]
  },
  {
    id: "r3",
    title: "Chickpea Curry",
    difficulty: "medium",
    prepMinutes: 12,
    cookMinutes: 25,
    ingredients: [
      { name: "chickpeas", amount: 400, unit: "g" },
      { name: "coconut milk", amount: 400, unit: "ml" },
      { name: "spinach", amount: 120, unit: "g" }
    ],
    steps: [
      { order: 1, text: "Simmer chickpeas with coconut milk.", ingredients: [{ name: "chickpeas", amount: 400, unit: "g" }, { name: "coconut milk", amount: 400, unit: "ml" }] },
      { order: 2, text: "Stir in spinach until wilted.", ingredients: [{ name: "spinach", amount: 120, unit: "g" }] }
    ]
  }
];

const users = new Map<string, UserState>();

function ensureUser(userId: string): UserState {
  const current = users.get(userId);
  if (current) {
    return current;
  }

  const state: UserState = {
    entitlement: "free",
    confirmedLedgerCount: 0,
    favoritesRecipeIds: new Set<string>(),
    favoritePlanIds: new Set<string>(),
    planHistory: []
  };
  users.set(userId, state);
  return state;
}

export const store = {
  recipes: recipeSeed,
  getUser: ensureUser,
  newId: (): string => randomUUID(),
  pickRandomRecipeId(): string {
    const index = Math.floor(Math.random() * recipeSeed.length);
    return recipeSeed[index]?.id ?? recipeSeed[0].id;
  }
};
