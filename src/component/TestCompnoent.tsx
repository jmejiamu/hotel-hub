import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/ReduxStore/store";

export const TestCompnoent = () => {
  const screenState = useSelector((state: RootState) => state.test);
  return (
    <View>
      {screenState.loading && <Text>Loading</Text>}
      {screenState.error && <Text>Error</Text>}
      {!screenState.error && !screenState.loading && <Text>THIS </Text>}
    </View>
  );
};

const styles = StyleSheet.create({});
