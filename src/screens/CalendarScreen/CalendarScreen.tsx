import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { EventItem, PackedEvent, RangeTime } from "@howljs/calendar-kit";
import { AppDispatch, RootState } from "../../redux/ReduxStore/store";
import { healerCalendar, healersSchedule, logoutUser } from "../../redux";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { RootNavigationNames } from "../../types";
import { AntDesign } from "@expo/vector-icons";
import { useFadeAnimation } from "../../hooks";
import { colors } from "../../theme";
import { styles } from "./styles";
import {
  CalendarFooter,
  HeaderNavigator,
  CustomCalendar,
  FadeView,
} from "../../component";
import { CalendarModal } from "../../component/CalendarModal";
import uuid from "react-native-uuid";

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  color: string;
  description: string;
  user_id: string;
  userType: string;
}

export const CalendarScreen = (props) => {
  const [selectedEvent, setSelectedEvent] = useState<PackedEvent>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [events, setEvents] = useState<EventItem[]>([]);
  const navigate = useNavigation<RootNavigationNames>();
  const { fadeAnim } = useFadeAnimation(1000);
  const [eventId, setEventId] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const { setLogged } = props;

  const dispatch = useDispatch<AppDispatch>();

  const [items, setItems] = useState([
    { label: "none", value: "none" },
    { label: "Room1", value: "room1" },
    { label: "Room2", value: "room2" },
    { label: "Room3", value: "room3" },
  ]);

  const { response, error, loading } = useSelector(
    (state: RootState) => state.userAuth
  );
  const { response: res } = useSelector(
    (state: RootState) => state.healerGetSchedule
  );

  const _onDragCreateEnd = (event: RangeTime) => {
    const event_id = uuid.v1();
    console.log("HERER", event_id);

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
            healerCalendar({
              event_id: selectedEvent.id,
              user_id: response?.user_id,
              userType: response?.userType,
              eventTitle: selectedEvent?.title || "",
              eventDescription: selectedEvent.description,
              eventStartDate: selectedEvent.start,
              eventEndDate: selectedEvent.end,
              path: "healer-calendar",
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
    if (response.user_id) {
      dispatch(
        healersSchedule({
          user_id: response.user_id,
          userType: response.userType,
        })
      );
    }
  }, [response.user_id]);

  useEffect(() => {
    if (res.length > 0) {
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
  }, []);

  return (
    <FadeView fadeAnim={fadeAnim}>
      <View style={styles.headerContainer}>
        <HeaderNavigator
          rightElement={
            <TouchableOpacity onPress={onHandleLogout}>
              <AntDesign name="logout" size={24} color={colors.color_400} />
            </TouchableOpacity>
          }
          containerStyle={{ justifyContent: "space-between" }}
        />
      </View>
      <Image
        source={require("../../../assets/def-cal.jpg")}
        style={styles.headerImage}
      />

      <CustomCalendar
        canlendarView="week"
        events={events}
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
    </FadeView>
  );
};
