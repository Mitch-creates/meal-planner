import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

import type { Recipe, WeeklyPlan } from "@meal-planner/shared";
import { api } from "@/services/api";

type Tab = "meals" | "groceries" | "favorites" | "settings";

function TabButton(props: { active: boolean; label: string; onPress: () => void }): React.JSX.Element {
  return (
    <Pressable
      onPress={props.onPress}
      style={{
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderWidth: 2,
        borderColor: "#111",
        backgroundColor: props.active ? "#F8F22A" : "#FFF"
      }}
    >
      <Text style={{ fontWeight: "700" }}>{props.label}</Text>
    </Pressable>
  );
}

export function MvpShell(): React.JSX.Element {
  const [tab, setTab] = React.useState<Tab>("meals");
  const [daily, setDaily] = React.useState<Recipe[]>([]);
  const [candidate, setCandidate] = React.useState<WeeklyPlan | null>(null);
  const [history, setHistory] = React.useState<WeeklyPlan[]>([]);
  const [groceries, setGroceries] = React.useState<Array<{ name: string; unit: string; amount: number }>>([]);
  const [favorites, setFavorites] = React.useState<{ recipeIds: string[]; planIds: string[] }>({
    recipeIds: [],
    planIds: []
  });
  const [quotaRemaining, setQuotaRemaining] = React.useState<number>(3);
  const [error, setError] = React.useState<string>("");

  const loadMeals = React.useCallback(async () => {
    try {
      setError("");
      const [inspiration, plan, plans] = await Promise.all([
        api.getDailyInspiration(),
        api.generateWeeklyCandidate(),
        api.getPlanHistory()
      ]);
      setDaily(inspiration);
      setCandidate(plan);
      setHistory(plans);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load meals.");
    }
  }, []);

  const loadGroceries = React.useCallback(async () => {
    try {
      setError("");
      setGroceries(await api.getCurrentGroceries());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load groceries.");
    }
  }, []);

  const loadFavorites = React.useCallback(async () => {
    try {
      setError("");
      setFavorites(await api.getFavorites());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load favorites.");
    }
  }, []);

  React.useEffect(() => {
    void loadMeals();
  }, [loadMeals]);

  const randomize = async (): Promise<void> => {
    if (!candidate) {
      return;
    }
    const locks = candidate.items.map((item) => (item.isLocked ? item.recipeId : ""));
    setCandidate(await api.randomizeWeeklyCandidate(locks));
  };

  const toggleLock = (day: number): void => {
    if (!candidate) {
      return;
    }
    setCandidate({
      ...candidate,
      items: candidate.items.map((item) =>
        item.dayOfWeek === day ? { ...item, isLocked: !item.isLocked } : item
      )
    });
  };

  const confirm = async (): Promise<void> => {
    if (!candidate) {
      return;
    }
    try {
      const result = await api.confirmWeeklyPlan(candidate);
      setQuotaRemaining(result.quota.remaining);
      setHistory(await api.getPlanHistory());
      await loadGroceries();
    } catch {
      setError("Could not confirm plan. Free quota may be exhausted.");
    }
  };

  const favoriteFirstInspiration = async (): Promise<void> => {
    const first = daily[0];
    if (!first) {
      return;
    }
    await api.addFavoriteRecipe(first.id);
    await loadFavorites();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF", paddingTop: 54 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-around", paddingHorizontal: 8 }}>
        <TabButton active={tab === "meals"} label="Meals" onPress={() => setTab("meals")} />
        <TabButton
          active={tab === "groceries"}
          label="Groceries"
          onPress={() => {
            setTab("groceries");
            void loadGroceries();
          }}
        />
        <TabButton
          active={tab === "favorites"}
          label="Favorites"
          onPress={() => {
            setTab("favorites");
            void loadFavorites();
          }}
        />
        <TabButton active={tab === "settings"} label="Settings" onPress={() => setTab("settings")} />
      </View>

      <ScrollView style={{ flex: 1, padding: 14 }} contentContainerStyle={{ gap: 12, paddingBottom: 40 }}>
        {error ? <Text style={{ color: "#B00020", fontWeight: "600" }}>{error}</Text> : null}

        {tab === "meals" ? (
          <>
            <Text style={{ fontWeight: "800", fontSize: 22 }}>Weekly planning</Text>
            <Text>Free plan confirmations left: {quotaRemaining}</Text>
            <Pressable onPress={() => void randomize()} style={{ borderWidth: 2, borderColor: "#111", padding: 12 }}>
              <Text style={{ fontWeight: "700" }}>Randomize unlocked days</Text>
            </Pressable>
            <Pressable onPress={() => void confirm()} style={{ borderWidth: 2, borderColor: "#111", padding: 12, backgroundColor: "#F8F22A" }}>
              <Text style={{ fontWeight: "700" }}>Confirm weekly plan</Text>
            </Pressable>
            {candidate?.items.map((item) => (
              <Pressable key={item.id} onPress={() => toggleLock(item.dayOfWeek)} style={{ borderWidth: 2, borderColor: "#111", padding: 10 }}>
                <Text>
                  Day {item.dayOfWeek} - {item.recipeId} ({item.isLocked ? "locked" : "unlocked"})
                </Text>
              </Pressable>
            ))}
            <Text style={{ fontWeight: "800", fontSize: 20, marginTop: 8 }}>Daily inspiration</Text>
            {daily.map((recipe) => (
              <View key={recipe.id} style={{ borderWidth: 2, borderColor: "#111", padding: 10 }}>
                <Text style={{ fontWeight: "700" }}>{recipe.title}</Text>
                <Text>
                  {recipe.prepMinutes + recipe.cookMinutes} min - {recipe.difficulty}
                </Text>
              </View>
            ))}
            <Pressable onPress={() => void favoriteFirstInspiration()} style={{ borderWidth: 2, borderColor: "#111", padding: 12 }}>
              <Text style={{ fontWeight: "700" }}>Favorite first inspiration recipe</Text>
            </Pressable>
            <Text style={{ fontWeight: "800", fontSize: 20, marginTop: 8 }}>Plan history</Text>
            {history.map((plan) => (
              <Text key={plan.id}>
                {plan.id.slice(0, 8)}... {plan.isCurrent ? "(current)" : ""}
              </Text>
            ))}
          </>
        ) : null}

        {tab === "groceries" ? (
          <>
            <Text style={{ fontWeight: "800", fontSize: 22 }}>Groceries</Text>
            {groceries.length === 0 ? <Text>No items yet. Confirm a weekly plan first.</Text> : null}
            {groceries.map((item) => (
              <Text key={`${item.name}:${item.unit}`}>
                {item.name}: {item.amount} {item.unit}
              </Text>
            ))}
          </>
        ) : null}

        {tab === "favorites" ? (
          <>
            <Text style={{ fontWeight: "800", fontSize: 22 }}>Favorites</Text>
            <Text>Recipes: {favorites.recipeIds.join(", ") || "none"}</Text>
            <Text>Plans: {favorites.planIds.join(", ") || "none"}</Text>
          </>
        ) : null}

        {tab === "settings" ? (
          <>
            <Text style={{ fontWeight: "800", fontSize: 22 }}>Settings</Text>
            <Text>Restore purchases entry point is reserved here (RevenueCat integration next).</Text>
            <Text>Verification gating for share/subscription actions is API-enforced path.</Text>
          </>
        ) : null}
      </ScrollView>
    </View>
  );
}
