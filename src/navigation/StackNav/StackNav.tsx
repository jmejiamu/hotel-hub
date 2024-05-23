import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
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
import { RootStackParamList } from "../../types";

const Stack = createStackNavigator<RootStackParamList>();

export const StackNav = () => {
  return (
    <Stack.Navigator initialRouteName="CustomerEmployeeScreen">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="CustomerEmployeeScreen"
        component={EmployeeCustomerScreen}
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
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
