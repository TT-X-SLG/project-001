import type { SubscriptionStatus } from "@/types/subscription";

export type SubscriptionClient = {
  getStatus: () => Promise<SubscriptionStatus>;
};

export const placeholderSubscriptionClient: SubscriptionClient = {
  async getStatus() {
    return {
      entitlements: {
        premium: false,
      },
      isLoading: false,
    };
  },
};
