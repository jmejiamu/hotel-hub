import React, { useEffect } from "react";
import { frontendCalendar } from "../../redux/frontEndDesk/frontEndDeskSlice";
import { AppDispatch, RootState } from "../../redux/ReduxStore/store";
import { eventConfigs } from "../PredefineCalendar/eventConfig";
import { TimelineCalendar } from "@howljs/calendar-kit";
import { generateYearlyEvents } from "../../utils";
import { View, Image } from "react-native";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { styles } from "./styles";

export const FrontendCalendar = () => {
  const predefinedEvents = generateYearlyEvents(eventConfigs);
  const dispatch = useDispatch<AppDispatch>();
  const { response } = useSelector(
    (state: RootState) => state.frontEndDeskCalendar
  );

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
  const combinedEvents = [...predefinedEvents, ...mapEvent];

  useEffect(() => {
    dispatch(frontendCalendar());
  }, []);
  return (
    <View style={styles.mainContainer}>
      <Image
        source={require("../../../assets/def-cal.jpg")}
        style={styles.headerImage}
      />
      <TimelineCalendar viewMode="week" events={combinedEvents} />
    </View>
  );
};
