import React, { useEffect } from "react";
import { Animated, SafeAreaView, Text, View } from "react-native";
import { CustomButton } from "../../../.storybook/stories/CustomButton/CustomButton";
import { CustomInput } from "../../../.storybook/stories/CustomInput/CustomInput";
import { RootStackParamList } from "../../types/navigation/navigation";
import { AppDispatch, RootState } from "../../redux/ReduxStore/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RootNavigationNames, UserType } from "../../types";
import { useFadeAnimation, useForm } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { HeaderNavigator } from "../../component";
import { AntDesign } from "@expo/vector-icons";
import { colors, spacing } from "../../theme";
import { authUser } from "../../redux";
import { styles } from "./styles";

type SignInScreenRouteProp = RouteProp<RootStackParamList, "SignInScreen">;
interface SignInScreenProps {
  route: SignInScreenRouteProp;
}
//TODO: add types to this
export const SignInScreen = (props) => {
  const company_code = props.route.params?.company_code;
  const userType = props.route.params?.userType;

  const navigate = useNavigation<RootNavigationNames>();
  const { fadeAnim } = useFadeAnimation(1000);

  const initialState = {
    email: "",
    password: "",
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
          password: formData.password,
          company_code,
          userType,
          path: "login",
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
            placeholder="Email"
            onChangeText={(text) => handleChange("email", text)}
            value={formData.email}
            mainContainerStyles={{
              marginVertical: spacing.size_large,
            }}
            placeholderTextColor={colors.color_400}
          />
          <CustomInput
            secureTextEntry
            size="medium"
            placeholder="Password"
            onChangeText={(text) => handleChange("password", text)}
            value={formData.password}
            placeholderTextColor={colors.color_400}
          />

          <Text
            style={[
              styles.subTitleStyle,
              { marginVertical: spacing.size_large },
            ]}
          >
            Don’t have an account?
            <TouchableOpacity
              onPress={() =>
                navigate.navigate("RegisterScreen", {
                  company_code: company_code,
                  userType: userType,
                })
              }
            >
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
          <CustomButton text="Log in" size="medium" onPress={onHandleSubmit} />
        </Animated.View>
      </SafeAreaView>
    </View>
  );
};
