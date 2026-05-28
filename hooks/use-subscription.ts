import { useSubscriptionContext } from "@/providers/subscription-provider";

export function useSubscription() {
  return useSubscriptionContext();
}
