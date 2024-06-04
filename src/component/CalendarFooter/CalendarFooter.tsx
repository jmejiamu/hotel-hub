import React from "react";
import { CustomButton } from "../../../.storybook/stories/CustomButton/CustomButton";
import { StyleSheet, View } from "react-native";
import { spacing } from "../../theme";

interface CalendarProps {
  onPressCancel: () => void;
  onPressSubmit: () => void;
}

export const CalendarFooter = (props: CalendarProps) => {
  const { onPressCancel, onPressSubmit } = props;
  return (
    <View style={styles.footer}>
      <View style={styles.innerContainer}>
        <CustomButton text="cancel" onPress={onPressCancel} />
      </View>
      <View style={{ margin: spacing.size_small }} />
      <View style={styles.innerContainer}>
        <CustomButton text="Save" onPress={onPressSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  innerContainer: {
    flex: 1,
  },
});
