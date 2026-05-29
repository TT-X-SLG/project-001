import { Stack, useRouter } from "expo-router";
import { Check, X } from "lucide-react-native";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/constants/colors";
import { useSubscription } from "@/hooks/use-subscription";
import { trackAnalyticsEvent } from "@/services/analytics/analytics-client";
import type {
  SubscriptionPlan,
  SubscriptionPlanId,
} from "@/types/subscription";

const featureBullets = [
  "Unlock 1,000+ guided prayers and audio Bible sessions",
  "Personalized daily prayer reminders and faith streaks",
  "Offline peaceful Christian soundscapes for focus and rest",
] as const;

export default function PaywallScreen() {
  const router = useRouter();
  const {
    entitlements,
    errorMessage,
    isLoading,
    isPurchasing,
    offerings,
    purchase,
    restorePurchases,
  } = useSubscription();
  const [selectedPlan, setSelectedPlan] =
    useState<SubscriptionPlanId>("yearly");
  const hasTrackedPaywallView = useRef(false);

  const selectedOffering = useMemo(
    () => offerings.find((plan) => plan.id === selectedPlan),
    [offerings, selectedPlan],
  );
  const isBusy = isLoading || isPurchasing;

  useEffect(() => {
    if (hasTrackedPaywallView.current) {
      return;
    }

    hasTrackedPaywallView.current = true;
    void trackAnalyticsEvent("paywall_viewed", {
      default_plan_id: selectedPlan,
      has_premium: entitlements.premium,
    });
  }, [entitlements.premium, selectedPlan]);

  useEffect(() => {
    if (entitlements.premium) {
      router.back();
    }
  }, [entitlements.premium, router]);

  const handlePlanPress = (planId: SubscriptionPlanId) => {
    setSelectedPlan(planId);
    void trackAnalyticsEvent("paywall_plan_selected", {
      plan_id: planId,
    });
  };

  const handlePurchasePress = async () => {
    void trackAnalyticsEvent("paywall_purchase_started", {
      plan_id: selectedPlan,
    });
    await purchase(selectedPlan);
    void trackAnalyticsEvent("paywall_purchase_completed", {
      plan_id: selectedPlan,
    });
  };

  const handleRestorePress = async () => {
    void trackAnalyticsEvent("paywall_restore_started");
    await restorePurchases();
    void trackAnalyticsEvent("paywall_restore_completed");
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        style={styles.container}
      >
        <View style={styles.topBar}>
          <TouchableOpacity
            accessibilityLabel="Close paywall"
            activeOpacity={0.72}
            onPress={() => router.back()}
            style={styles.closeButton}
          >
            <X color={colors.text} size={22} strokeWidth={2.2} />
          </TouchableOpacity>
        </View>

        <View style={styles.hero}>
          <View style={styles.premiumMark}>
            <Text selectable style={styles.premiumMarkText}>
              001
            </Text>
          </View>
          <Text selectable style={styles.headline}>
            Unlock Your Spiritual Growth
          </Text>
          <Text selectable style={styles.subtitle}>
            Join millions deepening their faith daily.
          </Text>
        </View>

        <View style={styles.featuresCard}>
          {featureBullets.map((feature) => (
            <View key={feature} style={styles.featureRow}>
              <View style={styles.checkIcon}>
                <Check color={colors.background} size={16} strokeWidth={2.8} />
              </View>
              <Text selectable style={styles.featureText}>
                {feature}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.planStack}>
          {offerings.map((plan) => (
            <PlanCard
              key={plan.id}
              isSelected={selectedPlan === plan.id}
              onPress={() => handlePlanPress(plan.id)}
              plan={plan}
            />
          ))}
        </View>

        <View style={styles.footer}>
          {errorMessage ? (
            <Text selectable style={styles.errorText}>
              {errorMessage}
            </Text>
          ) : null}
          <TouchableOpacity
            activeOpacity={0.82}
            disabled={isBusy || !selectedOffering}
            onPress={handlePurchasePress}
            style={[styles.ctaButton, isBusy && styles.disabledButton]}
          >
            <Text selectable style={styles.ctaText}>
              {isPurchasing
                ? "Starting Trial..."
                : "Start 3-Day Free Trial & Subscribe"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.72}
            disabled={isBusy}
            onPress={handleRestorePress}
            style={styles.restoreButton}
          >
            <Text selectable style={styles.restoreText}>
              Restore Purchases
            </Text>
          </TouchableOpacity>
          <Text selectable style={styles.legalText}>
            Cancel anytime. Terms of Service & Privacy Policy.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function PlanCard({
  isSelected,
  onPress,
  plan,
}: {
  isSelected: boolean;
  onPress: () => void;
  plan: SubscriptionPlan;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.78}
      onPress={onPress}
      style={[styles.planCard, isSelected && styles.selectedPlanCard]}
    >
      <View style={styles.planCopy}>
        <Text selectable style={styles.planName}>
          {plan.name}
        </Text>
        <Text selectable style={styles.planPrice}>
          {plan.price}
        </Text>
        {plan.description ? (
          <Text selectable style={styles.planDescription}>
            {plan.description}
          </Text>
        ) : null}
      </View>

      {plan.badge ? (
        <View style={styles.badge}>
          <Text selectable style={styles.badgeText}>
            {plan.badge}
          </Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    gap: 24,
    paddingBottom: 28,
    paddingHorizontal: 22,
    paddingTop: 12,
  },
  topBar: {
    alignItems: "center",
    flexDirection: "row",
    minHeight: 44,
  },
  closeButton: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 999,
    borderWidth: 1,
    height: 44,
    justifyContent: "center",
    width: 44,
  },
  hero: {
    alignItems: "center",
    gap: 13,
    paddingHorizontal: 10,
  },
  premiumMark: {
    alignItems: "center",
    backgroundColor: "#EFE2C6",
    borderColor: "rgba(198, 161, 91, 0.46)",
    borderRadius: 999,
    borderWidth: 1,
    height: 70,
    justifyContent: "center",
    width: 70,
  },
  premiumMarkText: {
    color: colors.olive,
    fontFamily: "serif",
    fontSize: 22,
    fontWeight: "800",
  },
  headline: {
    color: colors.text,
    fontFamily: "serif",
    fontSize: 34,
    fontWeight: "600",
    lineHeight: 40,
    textAlign: "center",
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 16,
    lineHeight: 23,
    textAlign: "center",
  },
  featuresCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderCurve: "continuous",
    borderRadius: 22,
    borderWidth: 1,
    boxShadow: "0 14px 30px rgba(26, 26, 26, 0.06)",
    gap: 15,
    padding: 20,
  },
  featureRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
  },
  checkIcon: {
    alignItems: "center",
    backgroundColor: colors.gold,
    borderRadius: 999,
    height: 28,
    justifyContent: "center",
    width: 28,
  },
  featureText: {
    color: colors.text,
    flex: 1,
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 21,
  },
  planStack: {
    gap: 12,
  },
  planCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderCurve: "continuous",
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: "row",
    gap: 14,
    minHeight: 92,
    padding: 18,
  },
  selectedPlanCard: {
    borderColor: colors.olive,
    borderWidth: 2,
    boxShadow: "0 16px 28px rgba(74, 93, 78, 0.13)",
  },
  planCopy: {
    flex: 1,
    gap: 7,
    justifyContent: "center",
  },
  planName: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "800",
    lineHeight: 24,
  },
  planPrice: {
    color: colors.textMuted,
    fontSize: 15,
    fontVariant: ["tabular-nums"],
    fontWeight: "700",
    lineHeight: 21,
  },
  planDescription: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: colors.olive,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  badgeText: {
    color: colors.background,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 0,
  },
  footer: {
    gap: 11,
    paddingTop: 2,
  },
  errorText: {
    color: colors.error,
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18,
    textAlign: "center",
  },
  ctaButton: {
    alignItems: "center",
    backgroundColor: colors.text,
    borderRadius: 18,
    boxShadow: "0 18px 32px rgba(26, 26, 26, 0.18)",
    justifyContent: "center",
    minHeight: 58,
    paddingHorizontal: 18,
  },
  disabledButton: {
    opacity: 0.62,
  },
  ctaText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: "900",
    lineHeight: 22,
    textAlign: "center",
  },
  restoreButton: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 38,
  },
  restoreText: {
    color: colors.olive,
    fontSize: 14,
    fontWeight: "800",
    lineHeight: 20,
    textAlign: "center",
  },
  legalText: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 17,
    textAlign: "center",
  },
});
