export type ExperimentDefinition = {
  key: string;
  hypothesis: string;
  primaryMetric: string;
  guardrails: string[];
  variants: readonly ["A", "B"];
};

export const experimentDefinitions: ExperimentDefinition[] = [
  {
    key: "EXP-001-paywall-headline",
    hypothesis: "Benefit-first headline improves paywall conversion.",
    primaryMetric: "subscription_started / paywall_viewed",
    guardrails: ["onboarding_completion_rate", "d7_retention"],
    variants: ["A", "B"]
  },
  {
    key: "EXP-002-paywall-timing",
    hypothesis: "Timing paywall after first confirmed plan may improve quality conversion.",
    primaryMetric: "subscription_started / paywall_viewed",
    guardrails: ["first_session_dropoff", "d1_retention"],
    variants: ["A", "B"]
  },
  {
    key: "EXP-003-quota-visibility",
    hypothesis: "Clear remaining quota messaging increases pre-exhaustion confirmations.",
    primaryMetric: "weekly_plan_confirmed_before_quota_exhaustion",
    guardrails: ["negative_feedback_rate"],
    variants: ["A", "B"]
  },
  {
    key: "EXP-004-pricing-card-emphasis",
    hypothesis: "Card emphasis alters ARPPU and conversion quality.",
    primaryMetric: "arppu",
    guardrails: ["early_cancellation_rate"],
    variants: ["A", "B"]
  }
];
