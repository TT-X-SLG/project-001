import { Stack, useRouter } from "expo-router";
import { Check, X } from "lucide-react-native";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/constants/colors";

type PlanId = "yearly" | "monthly";

type Plan = {
  id: PlanId;
  name: string;
  price: string;
  badge?: string;
};

const featureBullets = [
  "🔓 Unlock 1,000+ Guided Prayers & Audio Bibles",
  "🔔 Personalized Daily Prayer Reminders & Streaks",
  "🎵 Exclusive Offline Peaceful Christian Soundscapes",
] as const;

const plans: Plan[] = [
  {
    id: "yearly",
    name: "Yearly Access",
    price: "$59.99 / year ($4.99/mo)",
    badge: "BEST VALUE",
  },
  {
    id: "monthly",
    name: "Monthly Access",
    price: "$9.99 / month",
  },
];

export default function PaywallScreen() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<PlanId>("yearly");

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
          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              isSelected={selectedPlan === plan.id}
              onPress={() => setSelectedPlan(plan.id)}
              plan={plan}
            />
          ))}
        </View>

        <View style={styles.footer}>
          <TouchableOpacity activeOpacity={0.82} style={styles.ctaButton}>
            <Text selectable style={styles.ctaText}>
              Start 3-Day Free Trial & Subscribe
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
  plan: Plan;
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
  ctaButton: {
    alignItems: "center",
    backgroundColor: colors.text,
    borderRadius: 18,
    boxShadow: "0 18px 32px rgba(26, 26, 26, 0.18)",
    justifyContent: "center",
    minHeight: 58,
    paddingHorizontal: 18,
  },
  ctaText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: "900",
    lineHeight: 22,
    textAlign: "center",
  },
  legalText: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 17,
    textAlign: "center",
  },
});
