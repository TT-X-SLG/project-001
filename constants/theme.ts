import { colors } from "@/constants/colors";

export const appTheme = {
  colors,
  radius: {
    sm: 8,
    md: 14,
    lg: 22,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  typography: {
    headerFamily: "serif",
    bodyFamily: "sans-serif",
  },
} as const;
