import { Stack, useRouter, type Href } from "expo-router";
import {
  Bookmark,
  ChevronDown,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  X,
} from "lucide-react-native";
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

export default function PlayerScreen() {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const PlayStateIcon = isPlaying ? Pause : Play;
  const paywallRoute = "/paywall" as Href;

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
            accessibilityLabel="Close player"
            activeOpacity={0.72}
            onPress={() => router.back()}
            style={styles.topButton}
          >
            <X color={colors.text} size={22} strokeWidth={2.2} />
          </TouchableOpacity>

          <TouchableOpacity
            accessibilityLabel="Save prayer"
            activeOpacity={0.72}
            style={styles.topButton}
          >
            <Bookmark color={colors.olive} size={21} strokeWidth={2.1} />
          </TouchableOpacity>
        </View>

        <View style={styles.artwork}>
          <View style={styles.artworkGlow} />
          <View style={styles.crossMark}>
            <View style={styles.crossVertical} />
            <View style={styles.crossHorizontal} />
          </View>
          <Text selectable style={styles.artworkLabel}>
            Guided Prayer
          </Text>
        </View>

        <View style={styles.metadata}>
          <Text selectable style={styles.title}>
            Overcoming Anxiety through Faith
          </Text>
          <Text selectable style={styles.subtitle}>
            Led by Pastor David - 12 mins
          </Text>
        </View>

        <View style={styles.progressSection}>
          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
            <View style={styles.progressThumb} />
          </View>
          <View style={styles.timestamps}>
            <Text selectable style={styles.timestampText}>
              03:45
            </Text>
            <Text selectable style={styles.timestampText}>
              -08:15
            </Text>
          </View>
        </View>

        <View style={styles.controls}>
          <TouchableOpacity
            accessibilityLabel="Skip back 15 seconds"
            activeOpacity={0.7}
            style={styles.secondaryControl}
          >
            <RotateCcw color={colors.olive} size={30} strokeWidth={2} />
            <Text selectable style={styles.skipText}>
              15
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            accessibilityLabel={isPlaying ? "Pause prayer" : "Play prayer"}
            activeOpacity={0.78}
            onPress={() => {
              if (!isPlaying) {
                router.push(paywallRoute);
                return;
              }

              setIsPlaying(false);
            }}
            style={styles.playButton}
          >
            <PlayStateIcon
              color={colors.background}
              fill={colors.background}
              size={34}
              strokeWidth={2}
            />
          </TouchableOpacity>

          <TouchableOpacity
            accessibilityLabel="Skip forward 15 seconds"
            activeOpacity={0.7}
            style={styles.secondaryControl}
          >
            <RotateCw color={colors.olive} size={30} strokeWidth={2} />
            <Text selectable style={styles.skipText}>
              15
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.transcriptCard}>
          <View style={styles.transcriptHeader}>
            <Text selectable style={styles.transcriptTitle}>
              Transcript
            </Text>
            <ChevronDown color={colors.textMuted} size={20} strokeWidth={2} />
          </View>
          <Text selectable style={styles.transcriptText}>
            Cast all your anxiety on Him because He cares for you. Breathe
            slowly, release what you cannot carry, and let faith become the
            quiet ground beneath your thoughts.
          </Text>
          <Text selectable style={styles.transcriptHint}>
            Scroll to read full script
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
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
    gap: 26,
    paddingBottom: 30,
    paddingHorizontal: 22,
    paddingTop: 12,
  },
  topBar: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  topButton: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 999,
    borderWidth: 1,
    height: 44,
    justifyContent: "center",
    width: 44,
  },
  artwork: {
    alignItems: "center",
    alignSelf: "center",
    aspectRatio: 1,
    backgroundColor: colors.olive,
    borderCurve: "continuous",
    borderRadius: 34,
    boxShadow: "0 24px 46px rgba(74, 93, 78, 0.24)",
    justifyContent: "center",
    overflow: "hidden",
    width: "88%",
  },
  artworkGlow: {
    backgroundColor: "rgba(253, 251, 247, 0.1)",
    borderRadius: 180,
    height: 260,
    position: "absolute",
    right: -86,
    top: -74,
    width: 260,
  },
  crossMark: {
    alignItems: "center",
    height: 124,
    justifyContent: "center",
    width: 124,
  },
  crossVertical: {
    backgroundColor: "rgba(253, 251, 247, 0.88)",
    borderRadius: 999,
    height: 104,
    position: "absolute",
    width: 12,
  },
  crossHorizontal: {
    backgroundColor: "rgba(253, 251, 247, 0.78)",
    borderRadius: 999,
    height: 12,
    position: "absolute",
    top: 36,
    width: 70,
  },
  artworkLabel: {
    bottom: 26,
    color: "rgba(253, 251, 247, 0.82)",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0,
    position: "absolute",
  },
  metadata: {
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 4,
  },
  title: {
    color: colors.text,
    fontFamily: "serif",
    fontSize: 30,
    fontWeight: "600",
    lineHeight: 37,
    textAlign: "center",
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 22,
    textAlign: "center",
  },
  progressSection: {
    gap: 12,
  },
  progressTrack: {
    backgroundColor: colors.border,
    borderRadius: 999,
    height: 6,
    justifyContent: "center",
  },
  progressFill: {
    backgroundColor: colors.olive,
    borderRadius: 999,
    height: 6,
    width: "31%",
  },
  progressThumb: {
    backgroundColor: colors.surface,
    borderColor: colors.olive,
    borderRadius: 999,
    borderWidth: 3,
    boxShadow: "0 5px 12px rgba(26, 26, 26, 0.14)",
    height: 22,
    left: "29%",
    position: "absolute",
    width: 22,
  },
  timestamps: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timestampText: {
    color: colors.textMuted,
    fontSize: 13,
    fontVariant: ["tabular-nums"],
    fontWeight: "700",
  },
  controls: {
    alignItems: "center",
    flexDirection: "row",
    gap: 26,
    justifyContent: "center",
  },
  secondaryControl: {
    alignItems: "center",
    height: 58,
    justifyContent: "center",
    width: 58,
  },
  skipText: {
    color: colors.olive,
    fontSize: 10,
    fontVariant: ["tabular-nums"],
    fontWeight: "800",
    position: "absolute",
  },
  playButton: {
    alignItems: "center",
    backgroundColor: colors.text,
    borderRadius: 999,
    boxShadow: "0 15px 26px rgba(26, 26, 26, 0.2)",
    height: 78,
    justifyContent: "center",
    width: 78,
  },
  transcriptCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderCurve: "continuous",
    borderRadius: 22,
    borderWidth: 1,
    gap: 13,
    padding: 20,
  },
  transcriptHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  transcriptTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: "800",
    lineHeight: 23,
  },
  transcriptText: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 25,
  },
  transcriptHint: {
    color: colors.olive,
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 19,
  },
});
