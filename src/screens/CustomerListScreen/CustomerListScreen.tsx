import React from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { colors, fontSize, spacing } from "../../theme";
import { Avatar } from "../../../.storybook/stories/Avatar/Avatar";
import { CustomInput } from "../../../.storybook/stories/CustomInput/CustomInput";
import { Entypo } from "@expo/vector-icons";

const customerDate = [
  {
    id: 1,
    name: "John Doe",
    type: "Guest",
  },
  {
    id: 2,
    name: "Maria Rodriguez",
    type: "Guest",
  },
  {
    id: 3,
    name: "Edward Cross",
    type: "Guest",
  },
  {
    id: 4,
    name: "James Doll",
    type: "Guest",
  },
];

export const CustomerListScreen = () => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.inputContainer}>
        <CustomInput
          size="medium"
          placeholder="Customer Name"
          onChangeText={() => {}}
        />
      </View>
      <FlatList
        data={customerDate}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <View style={styles.listContainer}>
              <View>
                <Avatar imageUrl={require("../../../assets/avatar-def.jpg")} />
              </View>
              <View style={styles.textContainer}>
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={styles.titleStyle}
                >
                  {item.name}
                </Text>
                <Text style={styles.subtitleStyle}>{item.type}</Text>
              </View>
              <View style={styles.iconContainer}>
                <Entypo
                  name="dots-three-vertical"
                  size={24}
                  color={colors.color_500}
                />
              </View>
            </View>
            <View style={styles.lineDivider} />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  lineDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.color_500,
    width: "100%",
  },
  iconContainer: {
    justifyContent: "center",
  },
  subtitleStyle: {
    color: colors.color_300,
    fontSize: fontSize.size_small,
  },
  titleStyle: {
    color: colors.color_300,
    fontWeight: "bold",
    fontSize: fontSize.size_medium,
  },
  textContainer: {
    justifyContent: "center",
    marginLeft: spacing.size_small,
    flex: 1,
  },
  listContainer: {
    flexDirection: "row",
    marginVertical: spacing.size_small,
    marginHorizontal: spacing.size_small,
  },
  inputContainer: {
    marginHorizontal: spacing.size_small,
    marginVertical: spacing.size_small,
  },
  mainContainer: {
    backgroundColor: colors.color_100,
    flex: 1,
  },
});
