import type { Recipe, WeeklyPlan } from "@meal-planner/shared";

const API_BASE_URL = "http://localhost:3000";
const DEMO_USER_ID = "demo_user";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "content-type": "application/json",
      ...(init?.headers ?? {})
    }
  });
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return (await response.json()) as T;
}

export const api = {
  userId: DEMO_USER_ID,
  async getDailyInspiration(): Promise<Recipe[]> {
    const data = await request<{ recipes: Recipe[] }>(`/v1/inspiration/${DEMO_USER_ID}/daily`);
    return data.recipes;
  },
  async generateWeeklyCandidate(): Promise<WeeklyPlan> {
    const data = await request<{ plan: WeeklyPlan }>(`/v1/plans/candidate/${DEMO_USER_ID}`);
    return data.plan;
  },
  async randomizeWeeklyCandidate(lockedRecipeIds: string[]): Promise<WeeklyPlan> {
    const data = await request<{ plan: WeeklyPlan }>(`/v1/plans/candidate/${DEMO_USER_ID}/randomize`, {
      method: "POST",
      body: JSON.stringify({ lockedRecipeIds })
    });
    return data.plan;
  },
  async confirmWeeklyPlan(plan: WeeklyPlan): Promise<{ plan: WeeklyPlan; quota: { remaining: number } }> {
    return request(`/v1/plans/${DEMO_USER_ID}/confirm`, {
      method: "POST",
      body: JSON.stringify({ plan })
    });
  },
  async getPlanHistory(): Promise<WeeklyPlan[]> {
    const data = await request<{ plans: WeeklyPlan[] }>(`/v1/plans/history/${DEMO_USER_ID}`);
    return data.plans;
  },
  async getCurrentGroceries(): Promise<Array<{ name: string; unit: string; amount: number }>> {
    const data = await request<{ items: Array<{ name: string; unit: string; amount: number }> }>(
      `/v1/groceries/${DEMO_USER_ID}/current`
    );
    return data.items;
  },
  async getFavorites(): Promise<{ recipeIds: string[]; planIds: string[] }> {
    return request(`/v1/favorites/${DEMO_USER_ID}`);
  },
  async addFavoriteRecipe(recipeId: string): Promise<void> {
    await request(`/v1/favorites/${DEMO_USER_ID}/recipes`, {
      method: "POST",
      body: JSON.stringify({ recipeId })
    });
  }
};
