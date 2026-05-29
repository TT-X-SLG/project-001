export type EntitlementKey = "premium";

export type SubscriptionPlanId = "yearly" | "monthly";

export type SubscriptionPlan = {
  badge?: string;
  description?: string;
  id: SubscriptionPlanId;
  name: string;
  price: string;
  trialDays?: number;
};

export type SubscriptionStatus = {
  entitlements: Record<EntitlementKey, boolean>;
  isLoading: boolean;
};

export type PurchaseResult = {
  status: "purchased" | "cancelled";
  subscriptionStatus: SubscriptionStatus;
};
