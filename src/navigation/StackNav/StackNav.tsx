import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
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
import { RootStackParamList } from "../../types";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator<RootStackParamList>();

export const StackNav = () => {
  const { response, error, loading } = useSelector(
    (state: RootState) => state.register
  );
  const [userToken, setUserToken] = useState<string | null>("");
  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log("🚀 ~ getData ~ token:", token);
      setUserToken(token);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, [userToken, response.token]);

  return (
    <Stack.Navigator initialRouteName="CustomerEmployeeScreen">
      {userToken !== null && userToken.length > 0 ? (
        <>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="CalendarScreen"
            component={CalendarScreen}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="CustomerListScreen"
            component={CustomerListScreen}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="PredefineCalendar"
            component={PredefineCalendar}
          />
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
            component={RegisterScreen}
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
