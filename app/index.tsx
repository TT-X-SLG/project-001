import { Stack, useRouter } from "expo-router";
import {
  BookOpen,
  ChevronRight,
  Flame,
  Headphones,
  Moon,
  Share2,
  type LucideIcon,
} from "lucide-react-native";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/constants/colors";

type JourneyItem = {
  title: string;
  subtitle: string;
  icon: LucideIcon;
};

const journeyItems: JourneyItem[] = [
  {
    title: "Daily Word",
    subtitle: "5 min Read",
    icon: BookOpen,
  },
  {
    title: "Guided Prayer",
    subtitle: "10 min Audio",
    icon: Headphones,
  },
  {
    title: "Nightly Reflection",
    subtitle: "Not started",
    icon: Moon,
  },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        style={styles.container}
      >
        <View style={styles.header}>
          <View style={styles.headerCopy}>
            <Text selectable style={styles.kicker}>
              PROJECT 001
            </Text>
            <Text selectable style={styles.welcome}>
              Good morning, friend
            </Text>
          </View>

          <View style={styles.streakPill}>
            <Flame color={colors.olive} size={18} strokeWidth={2.2} />
            <Text selectable style={styles.streakText}>
              5 Days
            </Text>
          </View>
        </View>

        <View style={styles.dailyBreadCard}>
          <View style={styles.cardHeader}>
            <Text selectable style={styles.sectionLabel}>
              Daily Bread
            </Text>
            <TouchableOpacity
              accessibilityLabel="Share daily scripture"
              activeOpacity={0.72}
              style={styles.iconButton}
            >
              <Share2 color={colors.olive} size={19} strokeWidth={2} />
            </TouchableOpacity>
          </View>

          <View style={styles.scriptureWrap}>
            <Text selectable style={styles.scripture}>
              I can do all things through Christ which strengtheneth me.
            </Text>
            <Text selectable style={styles.scriptureReference}>
              Philippians 4:13
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeading}>
            <Text selectable style={styles.sectionTitle}>
              Today's Spiritual Journey
            </Text>
            <Text selectable style={styles.sectionSubtitle}>
              今日灵修流
            </Text>
          </View>

          <View style={styles.journeyList}>
            {journeyItems.map((item) => (
              <JourneyCard
                key={item.title}
                item={item}
                onPress={
                  item.title === "Guided Prayer"
                    ? () => router.push("/player")
                    : undefined
                }
              />
            ))}
          </View>
        </View>

        <TouchableOpacity activeOpacity={0.82} style={styles.premiumBanner}>
          <View style={styles.premiumTextWrap}>
            <Text selectable style={styles.premiumTitle}>
              Unlock Unlimited Prayers
            </Text>
            <Text selectable style={styles.premiumSubtitle}>
              Curated prayer paths, audio devotionals, and deeper reflection.
            </Text>
          </View>
          <ChevronRight color={colors.olive} size={21} strokeWidth={2.2} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function JourneyCard({
  item,
  onPress,
}: {
  item: JourneyItem;
  onPress?: () => void;
}) {
  const Icon = item.icon;

  return (
    <TouchableOpacity
      activeOpacity={0.76}
      onPress={onPress}
      style={styles.journeyCard}
    >
      <View style={styles.journeyIconWrap}>
        <Icon color={colors.olive} size={22} strokeWidth={2} />
      </View>

      <View style={styles.journeyCopy}>
        <Text selectable style={styles.journeyTitle}>
          {item.title}
        </Text>
        <Text selectable style={styles.journeySubtitle}>
          {item.subtitle}
        </Text>
      </View>

      <ChevronRight color={colors.textMuted} size={20} strokeWidth={2} />
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
    paddingBottom: 36,
    paddingHorizontal: 22,
    paddingTop: 18,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    gap: 16,
    justifyContent: "space-between",
  },
  headerCopy: {
    flex: 1,
    gap: 6,
  },
  kicker: {
    color: colors.olive,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0,
  },
  welcome: {
    color: colors.text,
    fontFamily: "serif",
    fontSize: 32,
    fontWeight: "600",
    lineHeight: 38,
  },
  streakPill: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: "row",
    gap: 7,
    paddingHorizontal: 13,
    paddingVertical: 9,
  },
  streakText: {
    color: colors.text,
    fontSize: 14,
    fontVariant: ["tabular-nums"],
    fontWeight: "700",
  },
  dailyBreadCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderCurve: "continuous",
    borderRadius: 24,
    borderWidth: 1,
    boxShadow: "0 16px 34px rgba(26, 26, 26, 0.08)",
    gap: 28,
    padding: 22,
  },
  cardHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sectionLabel: {
    color: colors.olive,
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 0,
  },
  iconButton: {
    alignItems: "center",
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.border,
    borderRadius: 999,
    borderWidth: 1,
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  scriptureWrap: {
    alignItems: "center",
    gap: 16,
    paddingBottom: 12,
    paddingHorizontal: 8,
  },
  scripture: {
    color: colors.text,
    fontFamily: "serif",
    fontSize: 29,
    fontWeight: "600",
    lineHeight: 38,
    textAlign: "center",
  },
  scriptureReference: {
    color: colors.textMuted,
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 22,
  },
  section: {
    gap: 14,
  },
  sectionHeading: {
    gap: 4,
  },
  sectionTitle: {
    color: colors.text,
    fontFamily: "serif",
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 30,
  },
  sectionSubtitle: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  journeyList: {
    gap: 12,
  },
  journeyCard: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderCurve: "continuous",
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: "row",
    gap: 14,
    minHeight: 82,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  journeyIconWrap: {
    alignItems: "center",
    backgroundColor: colors.surfaceMuted,
    borderRadius: 16,
    height: 50,
    justifyContent: "center",
    width: 50,
  },
  journeyCopy: {
    flex: 1,
    gap: 4,
  },
  journeyTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: "700",
    lineHeight: 23,
  },
  journeySubtitle: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  premiumBanner: {
    alignItems: "center",
    backgroundColor: "#F1E8DA",
    borderColor: "#DED0BB",
    borderCurve: "continuous",
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: "row",
    gap: 14,
    padding: 18,
  },
  premiumTextWrap: {
    flex: 1,
    gap: 5,
  },
  premiumTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "800",
    lineHeight: 22,
  },
  premiumSubtitle: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
  },
});
