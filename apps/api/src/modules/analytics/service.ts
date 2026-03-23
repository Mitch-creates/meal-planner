import type { AnalyticsEventName } from "./events.ts";

export type AnalyticsPayload = {
  userId?: string;
  sessionId: string;
  appVersion: string;
  platform: "ios" | "android" | "web";
  experimentAssignments: Record<string, string>;
  properties?: Record<string, unknown>;
};

export interface AnalyticsSink {
  capture(event: AnalyticsEventName, payload: AnalyticsPayload): Promise<void>;
}

export class NoopAnalyticsSink implements AnalyticsSink {
  async capture(): Promise<void> {
    return;
  }
}
