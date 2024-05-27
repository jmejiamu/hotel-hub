import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import React from "react";
import { TimelineCalendar } from "@howljs/calendar-kit";
import { EventConfig, generateYearlyEvents } from "../../utils";
import { HeaderNavigator } from "../../component";
import { colors, spacing } from "../../theme";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { RootNavigationNames } from "../../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const eventConfigs: EventConfig[] = [
  {
    title: "Breathwork",
    intervalDays: 7,
    startHour: 7,
    startMinute: 0,
    endHour: 7,
    endMinute: 45,
    color: "#9eeb8f",
    dayOfWeek: 1,
  },
  {
    title: "Primal Yoga",
    intervalDays: 7,
    startHour: 8,
    startMinute: 0,
    endHour: 8,
    endMinute: 45,
    color: "#A3C7D6",
    dayOfWeek: 1,
  },
  {
    title: "Primal Fitness",
    intervalDays: 7,
    startHour: 12,
    startMinute: 0,
    endHour: 12,
    endMinute: 45,
    color: "#ff7d88",
    dayOfWeek: 1,
  },
  {
    title: "Bliss",
    intervalDays: 7,
    startHour: 15,
    startMinute: 0,
    endHour: 16,
    endMinute: 0,
    color: "#A3C7DF",
    dayOfWeek: 1,
  },
  {
    title: "Sunset shuttle- venus",
    intervalDays: 7,
    startHour: 16,
    startMinute: 0,
    endHour: 18,
    endMinute: 0,
    color: "#7ebec2",
    dayOfWeek: 1,
  },
  {
    title: "Integration Circle",
    intervalDays: 7,
    startHour: 19,
    startMinute: 30,
    endHour: 20,
    endMinute: 30,
    color: "#B1AFFF",
    dayOfWeek: 1,
  },
  {
    title: "Breathwork",
    intervalDays: 7,
    startHour: 7,
    startMinute: 0,
    endHour: 7,
    endMinute: 45,
    color: "#9eeb8f",
    dayOfWeek: 2,
  },
  {
    title: "Primal Yoga",
    intervalDays: 7,
    startHour: 8,
    startMinute: 0,
    endHour: 8,
    endMinute: 45,
    color: "#A3C7D6",
    dayOfWeek: 2,
  },
  {
    title: "Primal Fitness",
    intervalDays: 7,
    startHour: 12,
    startMinute: 0,
    endHour: 12,
    endMinute: 45,
    color: "#ff7d88",
    dayOfWeek: 2,
  },
  {
    title: "Facial Blasting - (wear swimsuit) ",
    intervalDays: 7,
    startHour: 15,
    startMinute: 0,
    endHour: 16,
    endMinute: 0,
    color: "#A3C7D6",
    dayOfWeek: 2,
  },
  {
    title: "Sunset shuttle - pitahaya",
    intervalDays: 7,
    startHour: 16,
    startMinute: 0,
    endHour: 18,
    endMinute: 0,
    color: "#7ebec2",
    dayOfWeek: 2,
  },
  {
    title: "Primary breathwork",
    intervalDays: 7,
    startHour: 7,
    startMinute: 0,
    endHour: 7,
    endMinute: 45,
    color: "#9eeb8f",
    dayOfWeek: 3,
  },
  {
    title: "Primary yoga",
    intervalDays: 7,
    startHour: 8,
    startMinute: 0,
    endHour: 8,
    endMinute: 45,
    color: "#A3C7D6",
    dayOfWeek: 3,
  },
  {
    title: "Cooking class",
    intervalDays: 7,
    startHour: 14,
    startMinute: 0,
    endHour: 14,
    endMinute: 45,
    color: "#ff7d88",
    dayOfWeek: 3,
  },
  {
    title: "Facial yoga",
    intervalDays: 7,
    startHour: 15,
    startMinute: 0,
    endHour: 16,
    endMinute: 0,
    color: "#A3C7D6",
    dayOfWeek: 3,
  },
  {
    title: "Sunset Shuttle - otianal",
    intervalDays: 7,
    startHour: 16,
    startMinute: 0,
    endHour: 18,
    endMinute: 0,
    color: "#7ebec2",
    dayOfWeek: 3,
  },
  {
    title: "Mediation",
    intervalDays: 7,
    startHour: 7,
    startMinute: 0,
    endHour: 7,
    endMinute: 45,
    color: "#9eeb8f",
    dayOfWeek: 4,
  },
  {
    title: "Primary Yoga",
    intervalDays: 7,
    startHour: 8,
    startMinute: 0,
    endHour: 8,
    endMinute: 45,
    color: "#A3C7D6",
    dayOfWeek: 4,
  },
  {
    title: "Primary Fitness",
    intervalDays: 7,
    startHour: 12,
    startMinute: 0,
    endHour: 12,
    endMinute: 45,
    color: "#ff7d88",
    dayOfWeek: 4,
  },
  {
    title: "Bliss",
    intervalDays: 7,
    startHour: 15,
    startMinute: 0,
    endHour: 16,
    endMinute: 0,
    color: "#A3C7D6",
    dayOfWeek: 4,
  },
  {
    title: "Sunset shuttle - venus",
    intervalDays: 7,
    startHour: 16,
    startMinute: 0,
    endHour: 18,
    endMinute: 0,
    color: "#7ebec2",
    dayOfWeek: 4,
  },
  {
    title: "Circle integration",
    intervalDays: 7,
    startHour: 19,
    startMinute: 30,
    endHour: 20,
    endMinute: 30,
    color: "#B1AFFF",
    dayOfWeek: 4,
  },
  {
    title: "Breathwork",
    intervalDays: 7,
    startHour: 7,
    startMinute: 0,
    endHour: 7,
    endMinute: 45,
    color: "#9eeb8f",
    dayOfWeek: 5,
  },
  {
    title: "Primary Yoga",
    intervalDays: 7,
    startHour: 8,
    startMinute: 0,
    endHour: 8,
    endMinute: 45,
    color: "#A3C7D6",
    dayOfWeek: 5,
  },
  {
    title: "Primary Fitness",
    intervalDays: 7,
    startHour: 12,
    startMinute: 0,
    endHour: 12,
    endMinute: 45,
    color: "#ff7d88",
    dayOfWeek: 5,
  },
  {
    title: "Facial Blasting",
    intervalDays: 7,
    startHour: 15,
    startMinute: 0,
    endHour: 16,
    endMinute: 0,
    color: "#A3C7D6FF",
    dayOfWeek: 5,
  },
  {
    title: "Sunset shuttle - pitajaya",
    intervalDays: 7,
    startHour: 16,
    startMinute: 0,
    endHour: 18,
    endMinute: 0,
    color: "#7ebec2",
    dayOfWeek: 5,
  },
  {
    title: "Jungle Bathing",
    intervalDays: 7,
    startHour: 7,
    startMinute: 0,
    endHour: 8,
    endMinute: 15,
    color: "#9eeb8f",
    dayOfWeek: 6,
  },
  {
    title: "Garden tour",
    intervalDays: 7,
    startHour: 8,
    startMinute: 30,
    endHour: 8,
    endMinute: 45,
    color: "#A3C7D6",
    dayOfWeek: 6,
  },
  {
    title: "Yoga Facial",
    intervalDays: 7,
    startHour: 15,
    startMinute: 0,
    endHour: 16,
    endMinute: 0,
    color: "#A3C7D6",
    dayOfWeek: 6,
  },
  {
    title: "Hike",
    intervalDays: 7,
    startHour: 7,
    startMinute: 0,
    endHour: 9,
    endMinute: 15,
    color: "#c7c7c7",
    dayOfWeek: 0,
  },
  {
    title: "Primary fitness",
    intervalDays: 7,
    startHour: 12,
    startMinute: 0,
    endHour: 12,
    endMinute: 45,
    color: "#ff7d88",
    dayOfWeek: 0,
  },
  {
    title: "Bliss",
    intervalDays: 7,
    startHour: 15,
    startMinute: 0,
    endHour: 16,
    endMinute: 0,
    color: "#A3C7D6",
    dayOfWeek: 0,
  },
];

export const PredefineCalendar = () => {
  const predefinedEvents = generateYearlyEvents(eventConfigs);
  const navigate = useNavigation<RootNavigationNames>();
  const onHandleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user-type");
      navigate.navigate("CustomerEmployeeScreen");
    } catch (e) {
      console.log(e);
    }
  };
  //TODO: fix the header
  return (
    <View style={styles.container}>
      <View style={[styles.headerContainer]}>
        <HeaderNavigator
          leftElement={
            <AntDesign
              onPress={() => navigate.goBack()}
              name="arrowleft"
              size={24}
              color={colors.color_400}
            />
          }
          rightElement={
            <AntDesign
              onPress={onHandleLogout}
              name="logout"
              size={24}
              color={colors.color_400}
            />
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
