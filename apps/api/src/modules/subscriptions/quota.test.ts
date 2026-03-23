import test from "node:test";
import assert from "node:assert/strict";

import { FREE_WEEKLY_CONFIRMATION_CAP, canConfirmWeeklyPlan } from "./quota.ts";

test("free users can confirm below cap", () => {
  const allowed = canConfirmWeeklyPlan({
    entitlement: "free",
    confirmedLedgerCount: FREE_WEEKLY_CONFIRMATION_CAP - 1
  });

  assert.equal(allowed, true);
});

test("free users are blocked at cap", () => {
  const allowed = canConfirmWeeklyPlan({
    entitlement: "free",
    confirmedLedgerCount: FREE_WEEKLY_CONFIRMATION_CAP
  });

  assert.equal(allowed, false);
});

test("pro users always allowed", () => {
  const allowed = canConfirmWeeklyPlan({
    entitlement: "pro",
    confirmedLedgerCount: 999
  });

  assert.equal(allowed, true);
});
