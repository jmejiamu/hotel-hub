import React from "react";
import { StyleSheet } from "react-native";
import { colors, spacing } from "../../../theme";

export const styles = StyleSheet.create({
  btnInnerContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  headerContainer: {
    position: "absolute",
    marginTop: spacing.size_medium,
    top: spacing.size_medium,
    left: spacing.size_small,
    zIndex: 1,
  },
  footerEventStyle: {
    width: "100%",
    backgroundColor: colors.color_400,
    alignItems: "center",
    justifyContent: "center",
  },
  headerImage: {
    height: "35%",
    width: "100%",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFF",
    height: 85,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    flexDirection: "row",
    paddingHorizontal: spacing.size_small,
    alignItems: "center",
  },
  button: {
    height: 45,
    paddingHorizontal: 24,
    backgroundColor: "#1973E7",
    justifyContent: "center",
    borderRadius: 24,
    marginHorizontal: 8,
    marginVertical: 8,
  },
  btnText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
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
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
