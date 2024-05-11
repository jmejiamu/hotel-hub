import React from "react";
import { Animated, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { CustomButton } from "../../../.storybook/stories/CustomButton/CustomButton";
import { CustomInput } from "../../../.storybook/stories/CustomInput/CustomInput";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { colors, fontSize, spacing } from "../../theme";
import { RootNavigationNames } from "../../types";
import { HeaderNavigator } from "../../component";
import { useFadeAnimation } from "../../hooks";
import { AntDesign } from "@expo/vector-icons";

export const SignInScreen = () => {
  const navigate = useNavigation<RootNavigationNames>();
  const { fadeAnim } = useFadeAnimation(1000);
  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.safeAreaViewStyle}>
        <Animated.View
          style={{
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
          <Text style={styles.titleStyle}>Hey,👋 Welcome{"\n"}Back</Text>
          <Text style={styles.subTitleStyle}>Please sign in to continue</Text>

          <CustomInput
            size="medium"
            placeholder="Email or username"
            onChangeText={() => {}}
            mainContainerStyles={{
              marginVertical: spacing.size_large,
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
            style={[
              styles.subTitleStyle,
              { marginVertical: spacing.size_large },
            ]}
          >
            Don’t have an account?
            <TouchableOpacity>
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
                Register.
              </Text>
            </TouchableOpacity>
          </Text>
          <CustomButton
            text="Log in"
            size="medium"
            onPress={() => navigate.navigate("SignInScreen")}
          />
        </Animated.View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeAreaViewStyle: {
    marginHorizontal: spacing.size_small,
  },
  mainContainer: {
    backgroundColor: colors.color_100,
    flex: 1,
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
