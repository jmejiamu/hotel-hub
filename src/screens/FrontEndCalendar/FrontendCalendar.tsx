import React, { useEffect, useState } from "react";
import { frontendCalendar } from "../../redux/frontEndDesk/frontEndDeskSlice";
import { logoutUser, customerCalendar } from "../../redux";
import { EventItem, PackedEvent, RangeTime } from "@howljs/calendar-kit";
import { AppDispatch, RootState } from "../../redux/ReduxStore/store";
import { CalendarFooter, CustomCalendar } from "../../component";
import { eventConfigs } from "../PredefineCalendar/eventConfig";
import { CalendarModal } from "../../component/CalendarModal";
import { useNavigation } from "@react-navigation/native";
import { generateYearlyEvents } from "../../utils";
import { RootNavigationNames, UserType } from "../../types";
import { useFadeAnimation } from "../../hooks";
import { View, Image } from "react-native";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import uuid from "react-native-uuid";
import { styles } from "./styles";

export const FrontendCalendar = (props) => {
  const { user_id: customer_id } = props.route.params;
  const predefinedEvents = generateYearlyEvents(eventConfigs);
  const dispatch = useDispatch<AppDispatch>();
  const [selectedEvent, setSelectedEvent] = useState<PackedEvent>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [events, setEvents] = useState<EventItem[]>([]);
  const navigate = useNavigation<RootNavigationNames>();
  const { fadeAnim } = useFadeAnimation(1000);
  const [eventId, setEventId] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const { setLogged } = props;
  const [items, setItems] = useState([
    { label: "none", value: "none" },
    { label: "Room1", value: "room1" },
    { label: "Room2", value: "room2" },
    { label: "Room3", value: "room3" },
  ]);
  const { response: res } = useSelector(
    (state: RootState) => state.frontEndDeskCalendar
  );

  const { response, error, loading } = useSelector(
    (state: RootState) => state.userAuth
  );

  const mapEvent = res.map((event) => {
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

  const _onDragCreateEnd = (event: RangeTime) => {
    const event_id = uuid.v1();

    const newEvent = {
      id: String(event_id),
      title: response.username,
      start: event.start,
      end: event.end,
      color: "#B1AFFF",
      description: "Hello world",
      user_id: response.user_id,
      userType: response.userType,
    };
    setEvents((prev) => [...prev, newEvent]);
  };

  const _onLongPressEvent = (event: PackedEvent) => {
    setSelectedEvent(event);
  };

  const _onPressCancel = () => {
    setSelectedEvent(undefined);
  };

  const _onPressSubmit = () => {
    setEvents((prevEvents) =>
      prevEvents.map((ev) => {
        if (ev.id === selectedEvent?.id) {
          dispatch(
            customerCalendar({
              event_id: selectedEvent.id,
              user_id: response?.user_id, // Front end desk user id
              userType: UserType.CUSTOMER,
              eventTitle: selectedEvent?.title || "",
              eventDescription: selectedEvent.description,
              eventStartDate: selectedEvent.start,
              eventEndDate: selectedEvent.end,
              customer_id,
            })
          );
          return { ...ev, ...selectedEvent };
        }
        return ev;
      })
    );

    setSelectedEvent(undefined);
  };

  const onHandleLogout = async () => {
    try {
      dispatch(logoutUser()).unwrap();
      setLogged(false);
      navigate.navigate("CustomerEmployeeScreen");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (res.length > 0) {
      //TODO: check this too - maybe we need to add the customer_id?
      setEvents(
        res.map((item) => ({
          id: item.event_id,
          title: item.event_title,
          start: item.event_start,
          end: item.event_end,
          color: "#B1AFFF",
          description: item.event_description,
          user_id: item.user_id,
          userType: item.userType,
        }))
      );
    }
  }, [res]);
  useEffect(() => {
    dispatch(frontendCalendar());
  }, []);

  const headerImg = require("../../../assets/def-cal.jpg");

  return (
    <View style={styles.mainContainer}>
      <Image source={headerImg} style={styles.headerImage} />

      <CustomCalendar
        canlendarView="week"
        events={combinedEvents}
        onDragCreateEnd={_onDragCreateEnd}
        onLongPressEvent={_onLongPressEvent}
        selectedEvent={selectedEvent}
        setSelectedEvent={setSelectedEvent}
        setEventId={setEventId}
        setModalVisible={setModalVisible}
      />

      {!!selectedEvent && (
        <CalendarFooter
          onPressCancel={_onPressCancel}
          onPressSubmit={_onPressSubmit}
        />
      )}
      <CalendarModal
        animationType="fade"
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        events={events}
        eventId={eventId}
        setOpen={setOpen}
        open={open}
        value={value}
        setValue={setValue}
        items={items}
        setItems={setItems}
      />
    </View>
  );
};
