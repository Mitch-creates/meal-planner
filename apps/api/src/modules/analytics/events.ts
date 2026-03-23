export const analyticsEvents = [
  "onboarding_started",
  "onboarding_completed",
  "diet_selected",
  "restrictions_saved",
  "weekly_plan_generate_clicked",
  "weekly_plan_generated",
  "weekly_plan_confirmed",
  "weekly_plan_randomized",
  "weekly_plan_recipe_locked",
  "daily_inspiration_viewed",
  "daily_recipe_opened",
  "grocery_list_generated",
  "grocery_item_manual_added",
  "grocery_item_checked",
  "favorite_recipe_added",
  "favorite_plan_added",
  "paywall_viewed",
  "paywall_cta_clicked",
  "subscription_started",
  "subscription_trial_started",
  "subscription_restored",
  "entitlement_activated"
] as const;

export type AnalyticsEventName = (typeof analyticsEvents)[number];
