import type { AnalyticsContext, AnalyticsEventName } from "@/types/analytics";

export interface AnalyticsClient {
  capture(event: AnalyticsEventName, props?: Record<string, unknown>): Promise<void>;
}

export class AnalyticsService {
  constructor(
    private readonly client: AnalyticsClient,
    private readonly baseContext: AnalyticsContext
  ) {}

  async track(event: AnalyticsEventName, props: Record<string, unknown> = {}): Promise<void> {
    await this.client.capture(event, {
      ...props,
      user_id: this.baseContext.userId,
      session_id: this.baseContext.sessionId,
      app_version: this.baseContext.appVersion,
      platform: this.baseContext.platform,
      experiment_assignments: this.baseContext.experimentAssignments
    });
  }
}
