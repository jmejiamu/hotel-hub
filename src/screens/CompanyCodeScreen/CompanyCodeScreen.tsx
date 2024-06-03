import React, { useState } from "react";
import { CustomButton } from "../../../.storybook/stories/CustomButton/CustomButton";
import { CustomInput } from "../../../.storybook/stories/CustomInput/CustomInput";
import { Animated, SafeAreaView, Text, View } from "react-native";
import { RootNavigationNames, UserType } from "../../types";
import { useNavigation } from "@react-navigation/native";
import { HeaderNavigator } from "../../component";
import { AntDesign } from "@expo/vector-icons";
import { useFadeAnimation } from "../../hooks";
import { colors, spacing } from "../../theme";
import { styles } from "./styles";

export const CompanyCodeScreen = () => {
  const navigate = useNavigation<RootNavigationNames>();
  const [companyCode, setCompanyCode] = useState("");
  const { fadeAnim } = useFadeAnimation(1000);

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
            mainContainerStyles={styles.inputStyle}
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
              mainContainerStyles={styles.btnStyle}
              textStyles={{ color: colors.color_300 }}
            />
          </View>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
};
