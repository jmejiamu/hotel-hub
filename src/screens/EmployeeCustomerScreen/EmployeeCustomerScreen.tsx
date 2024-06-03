import React from "react";
import { CustomButton } from "../../../.storybook/stories/CustomButton/CustomButton";
import { RootNavigationNames, UserType } from "../../types";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ImageBackground, View } from "react-native";
import { colors } from "../../theme";
import { styles } from "./styles";

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
              onPress={() =>
                navigate.navigate("SignInScreen", {
                  company_code: "",
                  userType: UserType.CUSTOMER,
                })
              }
              size="medium"
            />
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};
