import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";

import { colors } from "@/constants/colors";
import { SubscriptionProvider } from "@/providers/subscription-provider";

export default function RootLayout() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <SubscriptionProvider>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            animation: "fade_from_bottom",
            contentStyle: {
              backgroundColor: colors.background,
            },
            headerBackTitle: "Back",
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTintColor: colors.olive,
            headerTitleStyle: {
              color: colors.text,
              fontFamily: "serif",
              fontSize: 22,
              fontWeight: "600",
            },
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              title: "Daily Prayer",
            }}
          />
        </Stack>
      </SubscriptionProvider>
    </SafeAreaProvider>
  );
}
