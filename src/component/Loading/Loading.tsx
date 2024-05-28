import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { colors, fontSize, spacing } from "../../theme";

export const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.color_300} />
      <Text style={styles.textStyle}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    marginTop: spacing.size_large,
    fontSize: fontSize.size_large,
    color: colors.color_300,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.color_100,
  },
});
