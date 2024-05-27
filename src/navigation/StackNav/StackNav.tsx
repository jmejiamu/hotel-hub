import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import {
  CompanyCodeScreen,
  CustomerListScreen,
  EmployeeCustomerScreen,
  PredefineCalendar,
  RegisterScreen,
  SignInScreen,
} from "../../screens";
import { CalendarScreen } from "../../screens/CalendarScreen";
import { RootState } from "../../redux/ReduxStore/store";
import { RootStackParamList, UserType } from "../../types";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors, fontSize, spacing } from "../../theme";

const Stack = createStackNavigator<RootStackParamList>();

export const StackNav = () => {
  const { response, error, loading } = useSelector(
    (state: RootState) => state.register
  );
  const [userToken, setUserToken] = useState<string | null>("");
  const [userType, setUserType] = useState<string | null>("");

  const [isLoggedIn, setIsLoggedIn] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(false);
  const setAuth = (isAuth: boolean) => {
    setIsAuthenticated(isAuth);
  };

  const isAuth = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userType = await AsyncStorage.getItem("user-type");
      setUserToken(token);
      setUserType(userType);
      const response = await fetch("http://localhost:3000/api-v1/verify", {
        method: "GET",
        headers: {
          "Content-Type": "application",
          authorization: `Bearer ${token}`,
        },
      });
      const res = await response.json();

      res.isVerify === true
        ? setIsAuthenticated(true)
        : setIsAuthenticated(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    isAuth();
  }, []);
  useEffect(() => {
    if (response.token) {
      AsyncStorage.setItem("token", response.token);
      AsyncStorage.setItem("user-type", response.userType);
      setIsAuthenticated(true);
      setUserType(response.userType);
    }
  }, [response.token]);
  const Registration = (props) => (
    <RegisterScreen {...props} setLogged={setAuth} />
  );

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.color_100,
        }}
      >
        <ActivityIndicator size="large" color={colors.color_300} />
        <Text
          style={{
            marginTop: spacing.size_large,
            fontSize: fontSize.size_large,
            color: colors.color_300,
          }}
        >
          Loading...
        </Text>
      </View>
    );
  }
  return (
    <Stack.Navigator initialRouteName="CustomerEmployeeScreen">
      {isAuthenticated ? (
        <>
          {userType === UserType.CUSTOMER && (
            <Stack.Screen
              name="PredefineCalendar"
              component={PredefineCalendar}
              options={{ headerShown: false }}
            />
          )}
          {userType === UserType.FRONTEND_DESK && (
            <>
              <Stack.Screen
                name="CalendarScreen"
                component={CalendarScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="CustomerListScreen"
                component={CustomerListScreen}
                options={{ headerShown: false }}
              />
            </>
          )}
        </>
      ) : (
        <>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="SignInScreen"
            component={SignInScreen}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="RegisterScreen"
            component={Registration}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="CompanyCodeScreen"
            component={CompanyCodeScreen}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="CustomerEmployeeScreen"
            component={EmployeeCustomerScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
