import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import { CalendarScreen } from "../../screens/CalendarScreen";
import { RootStackParamList, UserType } from "../../types";
import { RootState } from "../../redux/ReduxStore/store";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { Loading } from "../../component";
import {
  CompanyCodeScreen,
  CustomerListScreen,
  EmployeeCustomerScreen,
  FrontendCalendar,
  PredefineCalendar,
  RegisterScreen,
  SignInScreen,
} from "../../screens";

const Stack = createStackNavigator<RootStackParamList>();

export const StackNav = () => {
  const { response, error, loading } = useSelector(
    (state: RootState) => state.userAuth
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
  const PredefineCalendarScreen = (props) => (
    <PredefineCalendar {...props} setLogged={setAuth} />
  );

  const LoginScreen = (props) => (
    <SignInScreen {...props} setLogged={setAuth} />
  );

  const CustomerList = (props) => (
    <CustomerListScreen {...props} setLogged={setAuth} />
  );

  const HealerCalendar = (props) => (
    <CalendarScreen {...props} setLogged={setAuth} />
  );

  if (loading) {
    return <Loading />;
  }
  return (
    <Stack.Navigator initialRouteName="CustomerEmployeeScreen">
      {isAuthenticated ? (
        <>
          {userType === UserType.CUSTOMER && (
            <Stack.Screen
              name="PredefineCalendar"
              component={PredefineCalendarScreen}
              options={{ headerShown: false }}
            />
          )}
          {/* TODO: change this logic  for type of users*/}
          {userType === UserType.HEALER && (
            <>
              <Stack.Screen
                name="CalendarScreen"
                component={HealerCalendar}
                options={{ headerShown: false }}
              />
            </>
          )}
          {userType === UserType.FRONTEND_DESK && (
            <>
              <Stack.Screen
                name="CustomerListScreen"
                component={CustomerList}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="FrontendCalendar"
                component={FrontendCalendar}
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
            component={LoginScreen}
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
