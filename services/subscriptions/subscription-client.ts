import type {
  PurchaseResult,
  SubscriptionPlan,
  SubscriptionPlanId,
  SubscriptionStatus,
} from "@/types/subscription";

export type SubscriptionClient = {
  getStatus: () => Promise<SubscriptionStatus>;
  getOfferings: () => Promise<SubscriptionPlan[]>;
  purchase: (planId: SubscriptionPlanId) => Promise<PurchaseResult>;
  restorePurchases: () => Promise<SubscriptionStatus>;
};

const mockPlans: SubscriptionPlan[] = [
  {
    badge: "BEST VALUE",
    description: "$4.99/mo after trial",
    id: "yearly",
    name: "Yearly Access",
    price: "$59.99 / year",
    trialDays: 3,
  },
  {
    description: "Flexible monthly access",
    id: "monthly",
    name: "Monthly Access",
    price: "$9.99 / month",
    trialDays: 3,
  },
];

let mockStatus: SubscriptionStatus = {
  entitlements: {
    premium: false,
  },
  isLoading: false,
};

export const placeholderSubscriptionClient: SubscriptionClient = {
  async getStatus() {
    return mockStatus;
  },
  async getOfferings() {
    return mockPlans;
  },
  async purchase(_planId) {
    mockStatus = {
      entitlements: {
        premium: true,
      },
      isLoading: false,
    };

    return {
      status: "purchased",
      subscriptionStatus: mockStatus,
    };
  },
  async restorePurchases() {
    return mockStatus;
  },
};
