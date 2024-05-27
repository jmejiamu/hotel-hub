import React, { useEffect, useRef, useState } from "react";
import { CustomButton } from "../../../.storybook/stories/CustomButton/CustomButton";
import { CustomInput } from "../../../.storybook/stories/CustomInput/CustomInput";
import { Animated, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors, fontSize, spacing } from "../../theme";
import { HeaderNavigator } from "../../component";
import { AntDesign } from "@expo/vector-icons";
import { RootNavigationNames, UserType } from "../../types";

export const CompanyCodeScreen = () => {
  const navigate = useNavigation<RootNavigationNames>();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [companyCode, setCompanyCode] = useState("");

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView>
        <Animated.View
          style={{
            marginHorizontal: spacing.size_small,
            opacity: fadeAnim,
            transform: [
              {
                translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0],
                }),
              },
            ],
          }}
        >
          <HeaderNavigator
            leftElement={
              <AntDesign
                onPress={() => navigate.goBack()}
                name="arrowleft"
                size={24}
                color={colors.color_400}
              />
            }
          />
          <Text style={styles.titleStyle}>Hey,👋 Welcome </Text>
          <Text style={styles.subTitleStyle}>
            Please enter the company code
          </Text>
          <CustomInput
            size="medium"
            placeholder="Company code"
            onChangeText={setCompanyCode}
            textValue={companyCode}
            mainContainerStyles={{
              marginVertical: spacing.size_large,
            }}
            placeholderTextColor={colors.color_400}
          />
          <View style={{ flexDirection: "row" }}>
            <CustomButton
              text="Healer"
              size="medium"
              mainContainerStyles={{ flex: 1 }}
              onPress={() =>
                navigate.navigate("SignInScreen", {
                  company_code: companyCode,
                  userType: UserType.HEALER,
                })
              }
            />
            <View style={styles.divider} />
            <CustomButton
              onPress={() =>
                navigate.navigate("SignInScreen", {
                  company_code: companyCode,
                  userType: UserType.FRONTEND_DESK,
                })
              }
              text="Frontend Desk"
              size="medium"
              mainContainerStyles={{
                flex: 1,
                backgroundColor: "transparent",
                borderWidth: 1,
                borderColor: colors.color_300,
              }}
              textStyles={{ color: colors.color_300 }}
            />
          </View>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  divider: {
    margin: spacing.size_medium,
  },
  subTitleStyle: {
    color: colors.color_400,
    fontSize: fontSize.size_medium,
  },
  titleStyle: {
    fontSize: fontSize.size_xt_large,
    color: colors.color_400,
    marginVertical: "20%",
  },
  mainContainer: {
    backgroundColor: colors.color_100,
    flex: 1,
  },
});
