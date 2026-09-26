export const lightTheme = {
  background: "#FAF9FC",
  surface: "#FFFFFF",

  primary: "#6D28D9",
  primaryLight: "#F3E8FF",

  accent: "#F59E0B",
  accentLight: "#FEF3C7",

  text: "#18181B",
  textSecondary: "#625D6B",

  border: "#E7E2ED",
  muted: "#817A89",

  inputBackground: "#FFFFFF",

  danger: "#D64545",
};

export const darkTheme = {
  background: "#110E15",
  surface: "#1B1720",

  primary: "#A78BFA",
  primaryLight: "#302044",

  accent: "#FBBF24",
  accentLight: "#453515",

  text: "#F7F5F9",
  textSecondary: "#B9B1C2",

  border: "#342D3A",
  muted: "#918897",

  inputBackground: "#211C27",

  danger: "#FF6B6B",
};

export type AppTheme =
  | typeof lightTheme
  | typeof darkTheme;