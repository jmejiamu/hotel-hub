import { StyleSheet } from "react-native";
import { spacing } from "../../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  headerImage: {
    height: "35%",
    width: "100%",
  },
  headerContainer: {
    position: "absolute",
    marginTop: spacing.size_medium,
    top: spacing.size_medium,
    left: spacing.size_small,
    zIndex: 1,
  },
});
