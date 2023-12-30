import { MD3LightTheme } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export const COLORS = {
  pureBlack: "#000",
  pureWhite: "#fff",
  red: "#E6767F",
  lightGreen: "#4F9B90",
  backgroundGrey: "#ECEEF0",
  lightBlue: "#00659B",
  lightGrey: "#707070",
};

export const SMALL_ICON = wp("4%");
export const MEDIUM_ICON = wp("6%");
export const LARGE_ICON = wp("7%");

export const THEME = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    secondaryContainer: COLORS.lightGrey,
    primary: COLORS.lightBlue,
    primaryContainer: COLORS.backgroundGrey,
    surface: COLORS.pureWhite,
    surfaceVariant: COLORS.pureWhite,
    onSurfaceVariant: COLORS.backgroundGrey,
    onSurface: COLORS.pureBlack,
  },
};
