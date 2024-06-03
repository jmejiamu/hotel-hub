import { StyleSheet } from "react-native";
import { spacing } from "../../../theme";

export const styles = StyleSheet.create({
  btnStyle: {
    flex: 1,
  },
  divider: {
    margin: spacing.size_small,
  },
  btnContainer: {
    flexDirection: "row",
    marginHorizontal: spacing.size_small,
    marginBottom: "20%",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  mainContainer: {
    flex: 1,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
});
