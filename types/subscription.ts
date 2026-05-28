export type EntitlementKey = "premium";

export type SubscriptionStatus = {
  entitlements: Record<EntitlementKey, boolean>;
  isLoading: boolean;
};
