import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  CompanyCodeScreen,
  EmployeeCustomerScreen,
  SignInScreen,
} from "../../screens";
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
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
