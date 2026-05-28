export const colors = {
  background: "#FDFBF7",
  surface: "#FFFFFF",
  surfaceMuted: "#F5EFE6",
  text: "#1A1A1A",
  textMuted: "#6F6A63",
  border: "#E7DED2",
  olive: "#4A5D4E",
  burgundy: "#6B2D5C",
  gold: "#C6A15B",
  error: "#9D2D2D",
} as const;

export type AppColor = keyof typeof colors;
