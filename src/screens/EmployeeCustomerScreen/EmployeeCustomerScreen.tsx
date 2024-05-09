import React from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { CustomButton } from "../../../.storybook/stories/CustomButton/CustomButton";
import { colors } from "../../theme";
import { spacing } from "../../theme/spacing";

export const EmployeeCustomerScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        resizeMode="cover"
        source={require("../../../assets/hotel.jpg")}
        style={styles.imageContainer}
      >
        <View style={styles.btnContainer}>
          <CustomButton
            text="Employee"
            mainContainerStyles={styles.btnStyle}
            size="medium"
          />
          <View style={styles.divider} />
          <CustomButton
            text="Customer"
            mainContainerStyles={[
              styles.btnStyle,
              { backgroundColor: colors.color_200 },
            ]}
            size="medium"
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
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
});
