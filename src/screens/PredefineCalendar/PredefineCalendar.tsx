import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { TimelineCalendar } from "@howljs/calendar-kit";
import { generateYearlyEvents } from "../../utils";
import { HeaderNavigator } from "../../component";
import { RootNavigationNames } from "../../types";
import { AntDesign } from "@expo/vector-icons";
import { colors, spacing } from "../../theme";
import { eventConfigs } from "./eventConfig";

export const PredefineCalendar = (props) => {
  const { setLogged } = props;

  const predefinedEvents = generateYearlyEvents(eventConfigs);
  const navigate = useNavigation<RootNavigationNames>();

  const onHandleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user-type");
      setLogged(false);
      navigate.navigate("CustomerEmployeeScreen");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.headerContainer]}>
        <HeaderNavigator
          leftElement={
            <TouchableOpacity onPress={onHandleLogout}>
              <AntDesign name="logout" size={24} color={colors.color_400} />
            </TouchableOpacity>
          }
        />
      </View>
      <Image
        source={require("../../../assets/def-cal.jpg")}
        style={styles.headerImage}
      />
      <TimelineCalendar viewMode="week" events={predefinedEvents} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  headerImage: {
    height: "35%",
    width: "100%",
  },
  headerContainer: {
    position: "absolute",
    marginTop: spacing.size_medium,
    top: spacing.size_medium,
    left: spacing.size_small,
    zIndex: 1,
  },
});
