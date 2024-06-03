import { colors, fontSize, spacing } from "../../../theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.color_100,
    flex: 1,
  },
  innerContainer: {
    marginHorizontal: spacing.size_small,
  },
  titleStyle: {
    fontSize: fontSize.size_xt_large,
    color: colors.color_400,
    marginVertical: "10%",
  },
  subTitleStyle: {
    color: colors.color_400,
    fontSize: fontSize.size_medium,
  },
});
