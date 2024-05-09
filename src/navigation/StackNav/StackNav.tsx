import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { EmployeeCustomerScreen } from "../../screens";

const Stack = createStackNavigator();

export const StackNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CustomerEmployeeScreen"
        component={EmployeeCustomerScreen}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
