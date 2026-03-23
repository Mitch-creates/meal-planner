import test from "node:test";
import assert from "node:assert/strict";

import { assignExperiments } from "./service.ts";

test("experiment assignments are deterministic for same user", () => {
  const first = assignExperiments("user_123");
  const second = assignExperiments("user_123");

  assert.deepEqual(first, second);
});

test("assignment map includes expected experiment keys", () => {
  const map = assignExperiments("user_456");

  assert.equal(Object.keys(map).length, 4);
});
