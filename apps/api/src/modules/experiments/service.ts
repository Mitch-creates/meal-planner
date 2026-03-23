import { createHash } from "node:crypto";

import { experimentDefinitions } from "./definitions.ts";

export type AssignmentMap = Record<string, "A" | "B">;

export function assignExperiments(userId: string): AssignmentMap {
  const assignments: AssignmentMap = {};

  for (const definition of experimentDefinitions) {
    const hash = createHash("sha256").update(`${definition.key}:${userId}`).digest("hex");
    const bucket = parseInt(hash.slice(0, 8), 16) % 2;
    assignments[definition.key] = bucket === 0 ? "A" : "B";
  }

  return assignments;
}
