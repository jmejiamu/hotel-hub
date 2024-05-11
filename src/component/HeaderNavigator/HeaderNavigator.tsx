import React, { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

interface HeaderNavigatorProps {
  title?: string | ReactNode;
  rightElement?: ReactNode;
  leftElement?: JSX.Element;
}

export const HeaderNavigator = (props: HeaderNavigatorProps) => {
  const { title, rightElement, leftElement } = props;

  const leftElem = !!leftElement && leftElement;

  const text =
    typeof title === "string" ? (
      <Text style={{ color: "#FFF" }}>{title}</Text>
    ) : (
      title
    );

  const rightElem = !!rightElement && leftElement;

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <View>{leftElem}</View>
      <View>{text}</View>
      <View>{rightElem}</View>
    </View>
  );
};

const styles = StyleSheet.create({});
