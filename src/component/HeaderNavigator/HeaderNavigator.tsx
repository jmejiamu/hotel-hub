import React, { ReactNode } from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

interface HeaderNavigatorProps {
  title?: string | ReactNode;
  rightElement?: ReactNode;
  leftElement?: JSX.Element;
  containerStyle?: StyleProp<ViewStyle>;
}

export const HeaderNavigator = (props: HeaderNavigatorProps) => {
  const { title, rightElement, leftElement, containerStyle } = props;

  const leftElem = !!leftElement && leftElement;

  const text =
    typeof title === "string" ? (
      <Text style={{ color: "#FFF" }}>{title}</Text>
    ) : (
      title
    );

  const rightElem = !!rightElement && rightElement;

  return (
    <View style={[styles.container, containerStyle]}>
      <View>{leftElem}</View>
      <View>{text}</View>
      <View>{rightElem}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
