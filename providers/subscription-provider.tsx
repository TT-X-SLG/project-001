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
import type { SubscriptionStatus } from "@/types/subscription";

type SubscriptionContextValue = SubscriptionStatus & {
  refresh: () => Promise<void>;
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

  const refresh = useCallback(async () => {
    setStatus((current) => ({ ...current, isLoading: true }));
    setStatus(await client.getStatus());
  }, [client]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const value = useMemo(
    () => ({
      ...status,
      refresh,
    }),
    [status],
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
