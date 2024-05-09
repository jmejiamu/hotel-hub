import React from "react";
import { StyleSheet, View, Image, ImageSourcePropType } from "react-native";

export type AvatarProps = {
  onPress?: () => void;
  imageUrl: ImageSourcePropType;
};

export const Avatar = (props: AvatarProps) => {
  const { imageUrl = require("../../../assets/adaptive-icon.png") } = props;
  return (
    <View style={{ flex: 1 }}>
      <Image source={imageUrl} style={styles.imageStyle} />
    </View>
  );
};
const styles = StyleSheet.create({
  imageStyle: {
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
  },
});
