import React, { useEffect, useState } from "react";
import { Animated, StyleSheet, Text, TouchableOpacity } from "react-native";
import { CustomButton } from "../../../.storybook/stories/CustomButton/CustomButton";
import { CustomInput } from "../../../.storybook/stories/CustomInput/CustomInput";
import { RootNavigationNames, RootStackParamList, UserType } from "../../types";
import { AppDispatch, RootState } from "../../redux/ReduxStore/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, fontSize, spacing } from "../../theme";
import { useFadeAnimation, useForm } from "../../hooks";
import { authUser } from "../../redux/auth/authSlice";
import { HeaderNavigator } from "../../component";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

type RegisterScreenRouteProp = RouteProp<RootStackParamList, "RegisterScreen">;

interface RegisterScreenProps {
  route: RegisterScreenRouteProp;
}
//TODO: add types to this
export const RegisterScreen = (props) => {
  const company_code = props.route.params!.company_code;
  const userType = props.route.params!.userType;

  const navigate = useNavigation<RootNavigationNames>();
  const { fadeAnim } = useFadeAnimation(1000);

  const initialState = {
    email: "",
    password: "",
    username: "",
  };

  const { formData, handleChange, resetForm } = useForm(initialState);

  const dispatch = useDispatch<AppDispatch>();

  const { response, error, loading } = useSelector(
    (state: RootState) => state.userAuth
  );

  const onHandleSubmit = () => {
    try {
      dispatch(
        authUser({
          email: formData.email,
          username: formData.username,
          password: formData.password,
          company_code,
          userType,
          path: "register",
        })
      );
      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (response.token) {
      AsyncStorage.setItem("token", response.token);
      AsyncStorage.setItem("user-type", response.userType).then(() => {
        if (response.userType === UserType.CUSTOMER) {
          navigate.navigate("PredefineCalendar");
          props.setLogged(true);
        }
      });
    }
  }, [response.token]);

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
          onChangeText={(text) => handleChange("email", text)}
          textValue={formData.email}
          mainContainerStyles={{
            marginVertical: spacing.size_large,
          }}
          placeholderTextColor={colors.color_400}
        />
        <CustomInput
          size="medium"
          placeholder="Name"
          onChangeText={(text) => handleChange("username", text)}
          textValue={formData.username}
          mainContainerStyles={{
            marginBottom: spacing.size_large,
          }}
          placeholderTextColor={colors.color_400}
        />
        <CustomInput
          secureTextEntry={true}
          size="medium"
          placeholder="Password"
          onChangeText={(text) => handleChange("password", text)}
          textValue={formData.password}
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
        <CustomButton
          text="Register"
          size="medium"
          onPress={() => {
            onHandleSubmit();
          }}
        />
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
