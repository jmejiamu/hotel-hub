import {
  ColorValue,
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
} from "react-native";
import React from "react";
import { spacing } from "../../../src/theme/spacing";
import { colors } from "../../../src/theme/colors";
export type InputSize = "small" | "medium" | "large";
export type CustomInputProps = {
  size: InputSize;
  placeholder: string;
  mainContainerStyles?: StyleProp<TextStyle>;
  placeholderTextColor?: ColorValue;
  onChangeText: (text: string) => void;
  textValue: string;
};

export const CustomInput = (prop: CustomInputProps) => {
  const {
    mainContainerStyles,
    placeholder = "Code",
    placeholderTextColor = "#FFF",
    onChangeText,
    textValue,
  } = prop;

  let sizeInput = {
    small: spacing.size_small,
    medium: spacing.size_medium,
    large: spacing.size_large,
  }[prop.size || "small"];

  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      onChangeText={onChangeText}
      value={textValue}
      style={[
        styles.inputStyle,
        mainContainerStyles,
        { paddingVertical: sizeInput },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    backgroundColor: colors.color_200,
    borderRadius: 40,
    paddingHorizontal: spacing.size_medium,
    paddingVertical: spacing.size_small,
    color: colors.color_400,
  },
});
