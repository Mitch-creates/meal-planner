export type ExperimentKey =
  | "EXP-001-paywall-headline"
  | "EXP-002-paywall-timing"
  | "EXP-003-quota-visibility"
  | "EXP-004-pricing-card-emphasis";

export type VariantValue = "A" | "B";

export type ExperimentAssignments = Record<ExperimentKey, VariantValue>;

export const defaultExperimentAssignments: ExperimentAssignments = {
  "EXP-001-paywall-headline": "A",
  "EXP-002-paywall-timing": "A",
  "EXP-003-quota-visibility": "A",
  "EXP-004-pricing-card-emphasis": "A"
};
