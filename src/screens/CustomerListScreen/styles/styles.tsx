import { StyleSheet } from "react-native";
import { colors, fontSize, spacing } from "../../../theme";

export const styles = StyleSheet.create({
  headerContainer: {
    marginHorizontal: spacing.size_small,
    marginVertical: spacing.size_small,
  },
  lineDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.color_500,
    width: "100%",
  },
  iconContainer: {
    justifyContent: "center",
  },
  subtitleStyle: {
    color: colors.color_300,
    fontSize: fontSize.size_small,
  },
  titleStyle: {
    color: colors.color_300,
    fontWeight: "bold",
    fontSize: fontSize.size_medium,
  },
  textContainer: {
    justifyContent: "center",
    marginLeft: spacing.size_small,
    flex: 1,
  },
  listContainer: {
    flexDirection: "row",
    marginVertical: spacing.size_small,
    marginHorizontal: spacing.size_small,
  },
  inputContainer: {
    marginHorizontal: spacing.size_small,
    marginVertical: spacing.size_small,
  },
  mainContainer: {
    backgroundColor: colors.color_100,
    flex: 1,
  },
});
