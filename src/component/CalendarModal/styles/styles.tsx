import { StyleSheet } from "react-native";
import { spacing } from "../../../theme";

export const styles = StyleSheet.create({
  btnInnerContainer: {
    flexDirection: "row",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: spacing.size_medium,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
    height: "45%",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  boldText: {
    fontWeight: "bold",
  },
});
