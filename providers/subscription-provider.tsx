import {
  createContext,
  use,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";

import {
  placeholderSubscriptionClient,
  type SubscriptionClient,
} from "@/services/subscriptions/subscription-client";
import type {
  SubscriptionPlan,
  SubscriptionPlanId,
  SubscriptionStatus,
} from "@/types/subscription";

type SubscriptionContextValue = SubscriptionStatus & {
  errorMessage: string | null;
  isPurchasing: boolean;
  offerings: SubscriptionPlan[];
  purchase: (planId: SubscriptionPlanId) => Promise<void>;
  refresh: () => Promise<void>;
  restorePurchases: () => Promise<void>;
};

const defaultStatus: SubscriptionStatus = {
  entitlements: {
    premium: false,
  },
  isLoading: true,
};

const SubscriptionContext = createContext<SubscriptionContextValue | null>(null);

type SubscriptionProviderProps = {
  children: ReactNode;
  client?: SubscriptionClient;
};

export function SubscriptionProvider({
  children,
  client = placeholderSubscriptionClient,
}: SubscriptionProviderProps) {
  const [status, setStatus] = useState<SubscriptionStatus>(defaultStatus);
  const [offerings, setOfferings] = useState<SubscriptionPlan[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPurchasing, setIsPurchasing] = useState(false);

  const refresh = useCallback(async () => {
    try {
      setErrorMessage(null);
      setStatus((current) => ({ ...current, isLoading: true }));

      const [nextStatus, nextOfferings] = await Promise.all([
        client.getStatus(),
        client.getOfferings(),
      ]);

      setStatus(nextStatus);
      setOfferings(nextOfferings);
    } catch (error) {
      setStatus((current) => ({ ...current, isLoading: false }));
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to refresh subscription status.",
      );
    }
  }, [client]);

  const purchase = useCallback(
    async (planId: SubscriptionPlanId) => {
      try {
        setErrorMessage(null);
        setIsPurchasing(true);

        const result = await client.purchase(planId);
        setStatus(result.subscriptionStatus);
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Unable to complete purchase.",
        );
      } finally {
        setIsPurchasing(false);
      }
    },
    [client],
  );

  const restorePurchases = useCallback(async () => {
    try {
      setErrorMessage(null);
      setIsPurchasing(true);
      setStatus(await client.restorePurchases());
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to restore purchases.",
      );
    } finally {
      setIsPurchasing(false);
    }
  }, [client]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const value = useMemo(
    () => ({
      ...status,
      errorMessage,
      isPurchasing,
      offerings,
      purchase,
      refresh,
      restorePurchases,
    }),
    [
      errorMessage,
      isPurchasing,
      offerings,
      purchase,
      refresh,
      restorePurchases,
      status,
    ],
  );

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscriptionContext() {
  const context = use(SubscriptionContext);

  if (!context) {
    throw new Error("useSubscription must be used inside SubscriptionProvider.");
  }

  return context;
}
