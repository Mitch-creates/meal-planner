export const FREE_WEEKLY_CONFIRMATION_CAP = 3;

export function canConfirmWeeklyPlan(input: {
  entitlement: "pro" | "free";
  confirmedLedgerCount: number;
}): boolean {
  if (input.entitlement === "pro") {
    return true;
  }

  return input.confirmedLedgerCount < FREE_WEEKLY_CONFIRMATION_CAP;
}
