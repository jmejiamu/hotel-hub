import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { AppDispatch, RootState } from "../../redux/ReduxStore/store";
import { useNavigation } from "@react-navigation/native";
import { TimelineCalendar } from "@howljs/calendar-kit";
import { generateYearlyEvents } from "../../utils";
import { HeaderNavigator } from "../../component";
import { RootNavigationNames } from "../../types";
import { AntDesign } from "@expo/vector-icons";
import { eventConfigs } from "./eventConfig";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux";
import { colors } from "../../theme";
import { styles } from "./styles";
import { customerCal } from "../../redux/customerCalSlice/customerCalSlice";

export const PredefineCalendar = (props) => {
  const { setLogged } = props;

  const predefinedEvents = generateYearlyEvents(eventConfigs);
  const navigate = useNavigation<RootNavigationNames>();
  const dispatch = useDispatch<AppDispatch>();

  const {
    response: res,
    error,
    loading,
  } = useSelector((state: RootState) => state.userAuth);
  const { response } = useSelector((state: RootState) => state.customerCal);

  const onHandleLogout = async () => {
    try {
      dispatch(logoutUser()).unwrap();
      setLogged(false);
      navigate.navigate("CustomerEmployeeScreen");
    } catch (e) {
      console.log("Logout failed", e);
    }
  };

  useEffect(() => {
    if (res.user_id) {
      dispatch(
        customerCal({
          customer_id: res.user_id,
        })
      );
    }
  }, [res.user_id]);

  const mapEvent = response.map((event) => {
    return {
      id: event.event_id,
      title: event.event_title,
      start: event.event_start,
      end: event.event_end,
      color: "#A3C7DF",
      dayOfWeek: new Date(event.event_start).getDay(),
      description: event.event_description,
    };
  });
  const combineEvents = [...predefinedEvents, ...mapEvent];
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
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
      <TimelineCalendar viewMode="week" events={combineEvents} />
    </View>
  );
};
