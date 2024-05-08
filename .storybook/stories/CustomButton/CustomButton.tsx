import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { colors } from "../../../src/theme/colors";
import { spacing } from "../../../src/theme/spacing";

export type ButtonSize = "small" | "medium" | "large";
export type CustomButtonProps = {
  onPress?: () => void;
  text: string;
  size?: ButtonSize;
  mainContainerStyles?: StyleProp<ViewStyle>;
  textStyles?: StyleProp<TextStyle>;
};

export const CustomButton = (props: CustomButtonProps) => {
  const { onPress, text, size, textStyles, mainContainerStyles } = props;

  let sizeButton = {
    small: spacing.size_small,
    medium: spacing.size_medium,
    large: spacing.size_large,
  }[size || "small"];

  return (
    <TouchableOpacity
      style={[
        ,
        styles.container,
        { paddingVertical: sizeButton },
        mainContainerStyles,
      ]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Text style={[styles.text, textStyles]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.size_small,
    paddingVertical: spacing.size_small,
    backgroundColor: colors.color_300,
    borderRadius: 40,
  },
  text: {
    color: colors.color_400,
    fontWeight: "bold",
    textAlign: "center",
  },
});
