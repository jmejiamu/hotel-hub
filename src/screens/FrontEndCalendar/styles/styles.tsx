import { StyleSheet } from "react-native";
import { colors, spacing } from "../../../theme";

export const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.color_100,
    flex: 1,
  },
  container: {
    marginHorizontal: spacing.size_small,
  },
  headerImage: {
    height: "35%",
    width: "100%",
  },
});
