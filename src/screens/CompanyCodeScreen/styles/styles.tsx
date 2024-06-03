import { StyleSheet } from "react-native";
import { colors, fontSize, spacing } from "../../../theme";

export const styles = StyleSheet.create({
  inputStyle: {
    marginVertical: spacing.size_large,
  },
  btnStyle: {
    flex: 1,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.color_300,
  },
  divider: {
    margin: spacing.size_medium,
  },
  subTitleStyle: {
    color: colors.color_400,
    fontSize: fontSize.size_medium,
  },
  titleStyle: {
    fontSize: fontSize.size_xt_large,
    color: colors.color_400,
    marginVertical: "20%",
  },
  mainContainer: {
    backgroundColor: colors.color_100,
    flex: 1,
  },
});
