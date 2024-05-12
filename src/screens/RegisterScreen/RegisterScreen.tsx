import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderNavigator } from "../../component";
import { colors, fontSize, spacing } from "../../theme";
import { CustomButton } from "../../../.storybook/stories/CustomButton/CustomButton";
import { CustomInput } from "../../../.storybook/stories/CustomInput/CustomInput";
import { RootNavigationNames } from "../../types";
import { useFadeAnimation } from "../../hooks";

export const RegisterScreen = () => {
  const navigate = useNavigation<RootNavigationNames>();
  const { fadeAnim } = useFadeAnimation(1000);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Animated.View
        style={[
          styles.innerContainer,
          {
            opacity: fadeAnim,
            transform: [
              {
                translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0],
                }),
              },
            ],
          },
        ]}
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
        <Text style={styles.titleStyle}>Let’s get started</Text>
        <Text style={styles.subTitleStyle}>Please register to sign in</Text>
        <CustomInput
          size="medium"
          placeholder="Email"
          onChangeText={() => {}}
          mainContainerStyles={{
            marginVertical: spacing.size_large,
          }}
          placeholderTextColor={colors.color_400}
        />
        <CustomInput
          size="medium"
          placeholder="Username"
          onChangeText={() => {}}
          mainContainerStyles={{
            marginBottom: spacing.size_large,
          }}
          placeholderTextColor={colors.color_400}
        />
        <CustomInput
          size="medium"
          placeholder="Password"
          onChangeText={() => {}}
          placeholderTextColor={colors.color_400}
        />

        <Text
          style={[styles.subTitleStyle, { marginVertical: spacing.size_large }]}
        >
          Already have an account?
          <TouchableOpacity onPress={() => navigate.navigate("SignInScreen")}>
            <Text
              style={[
                styles.subTitleStyle,
                {
                  color: colors.color_300,
                  fontWeight: "bold",
                },
              ]}
            >
              {" "}
              Sign In.
            </Text>
          </TouchableOpacity>
        </Text>
        <CustomButton text="Register" size="medium" onPress={() => {}} />
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.color_100,
    flex: 1,
  },
  innerContainer: {
    marginHorizontal: spacing.size_small,
  },
  titleStyle: {
    fontSize: fontSize.size_xt_large,
    color: colors.color_400,
    marginVertical: "10%",
  },
  subTitleStyle: {
    color: colors.color_400,
    fontSize: fontSize.size_medium,
  },
});
