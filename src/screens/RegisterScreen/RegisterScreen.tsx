import React, { useCallback, useState } from "react";
import { Animated, StyleSheet, Text, TouchableOpacity } from "react-native";
import { CustomButton } from "../../../.storybook/stories/CustomButton/CustomButton";
import { CustomInput } from "../../../.storybook/stories/CustomInput/CustomInput";
import { RootNavigationNames, RootStackParamList } from "../../types";
import { AppDispatch, RootState } from "../../redux/ReduxStore/store";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { registerUser } from "../../redux/auth/authSlice";
import { colors, fontSize, spacing } from "../../theme";
import { HeaderNavigator } from "../../component";
import { AntDesign } from "@expo/vector-icons";
import { useFadeAnimation } from "../../hooks";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

type RegisterScreenRouteProp = RouteProp<RootStackParamList, "RegisterScreen">;

interface RegisterScreenProps {
  route: RegisterScreenRouteProp;
}

export const RegisterScreen = ({ route }: RegisterScreenProps) => {
  const company_code = route.params!.company_code;
  const userType = route.params!.userType;
  const navigate = useNavigation<RootNavigationNames>();
  const { fadeAnim } = useFadeAnimation(1000);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  const { response, error, loading } = useSelector(
    (state: RootState) => state.register
  );

  const onHandleSubmit = () => {
    dispatch(
      registerUser({ email, username, password, company_code, userType })
    );
  };

  const storeData = async () => {
    try {
      await AsyncStorage.setItem("token", response.token);
    } catch (error) {
      console.log(error);
    }
  };

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
          onChangeText={setEmail}
          textValue={email}
          mainContainerStyles={{
            marginVertical: spacing.size_large,
          }}
          placeholderTextColor={colors.color_400}
        />
        <CustomInput
          size="medium"
          placeholder="Name"
          onChangeText={setUsername}
          textValue={username}
          mainContainerStyles={{
            marginBottom: spacing.size_large,
          }}
          placeholderTextColor={colors.color_400}
        />
        <CustomInput
          secureTextEntry={true}
          size="medium"
          placeholder="Password"
          onChangeText={setPassword}
          textValue={password}
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
          // onPress={() => navigate.navigate("CalendarScreen")}
          onPress={() => {
            onHandleSubmit();
            storeData();
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
