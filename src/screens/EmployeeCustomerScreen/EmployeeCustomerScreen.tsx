import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { CustomButton } from "../../../.storybook/stories/CustomButton/CustomButton";
import { colors } from "../../theme";
import { spacing } from "../../theme/spacing";
import { RootNavigationNames } from "../../types";

export const EmployeeCustomerScreen = () => {
  const navigate = useNavigation<RootNavigationNames>();
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        resizeMode="cover"
        source={require("../../../assets/hotel.jpg")}
        style={styles.imageContainer}
      >
        <LinearGradient
          // Background Linear Gradient
          colors={["transparent", "rgba(0,0,0,0.9)"]}
          style={styles.background}
        >
          <View style={styles.btnContainer}>
            <CustomButton
              text="Employee"
              mainContainerStyles={styles.btnStyle}
              size="medium"
              onPress={() => navigate.navigate("CompanyCodeScreen")}
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
        </LinearGradient>
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
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
});
