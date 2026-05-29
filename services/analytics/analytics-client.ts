type AnalyticsValue = boolean | number | string | null;

export type AnalyticsEventName =
  | "premium_gate_hit"
  | "paywall_viewed"
  | "paywall_plan_selected"
  | "paywall_purchase_started"
  | "paywall_purchase_completed"
  | "paywall_restore_started"
  | "paywall_restore_completed";

export type AnalyticsEventProperties = Record<string, AnalyticsValue>;

export type AnalyticsClient = {
  track: (
    eventName: AnalyticsEventName,
    properties?: AnalyticsEventProperties,
  ) => Promise<void>;
};

export const placeholderAnalyticsClient: AnalyticsClient = {
  async track(eventName, properties = {}) {
    if (process.env.NODE_ENV === "development") {
      console.info("[analytics]", eventName, properties);
    }
  },
};

export function trackAnalyticsEvent(
  eventName: AnalyticsEventName,
  properties?: AnalyticsEventProperties,
) {
  return placeholderAnalyticsClient.track(eventName, properties);
}
