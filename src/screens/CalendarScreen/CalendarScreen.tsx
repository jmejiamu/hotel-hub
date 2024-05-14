import React, { useState } from "react";
import { CustomButton } from "../../../.storybook/stories/CustomButton/CustomButton";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { colors, spacing } from "../../theme";
import {
  EventItem,
  PackedEvent,
  RangeTime,
  TimelineCalendar,
} from "@howljs/calendar-kit";
import { HeaderNavigator } from "../../component";
import { useNavigation } from "@react-navigation/native";
import { RootNavigationNames } from "../../types";

export const CalendarScreen = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<PackedEvent>();
  const navigate = useNavigation<RootNavigationNames>();

  const _onDragCreateEnd = (event: RangeTime) => {
    const randomId = Math.random().toString(36).slice(2, 10);
    const newEvent = {
      id: randomId,
      title: randomId,
      start: event.start,
      end: event.end,
      color: "#B1AFFF",
      description: "Hello world",
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
          return { ...ev, ...selectedEvent };
        }
        return ev;
      })
    );
    setSelectedEvent(undefined);
  };
  const _renderEditFooter = () => {
    return (
      <View style={styles.footer}>
        <View style={{ flex: 1 }}>
          <CustomButton text="cancel" onPress={_onPressCancel} />
        </View>
        <View style={{ margin: spacing.size_small }} />
        <View style={{ flex: 1 }}>
          <CustomButton text="Save" onPress={_onPressSubmit} />
        </View>
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <HeaderNavigator
          leftElement={
            <AntDesign
              onPress={() => navigate.goBack()}
              name="arrowleft"
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
      <TimelineCalendar
        viewMode="week"
        events={events}
        allowDragToCreate
        onDragCreateEnd={_onDragCreateEnd}
        onLongPressEvent={_onLongPressEvent}
        renderEventContent={(event) => (
          <View>
            <Text>{event.title}</Text>
            <Text>{event.description}</Text>
          </View>
        )}
        selectedEvent={selectedEvent}
        onEndDragSelectedEvent={setSelectedEvent}
        // Optional
        dragStep={20}
        dragCreateInterval={120}
        theme={{
          dragHourContainer: {
            backgroundColor: "#FFF",
            borderColor: "#001253",
          },
          dragHourText: { color: "#001253" },
          editIndicatorColor: "#FFF",
        }}
        // End Optional
        // TODO:implement a modal with the room number.
        onPressEvent={
          (event) => console.log("onPressEvent", event)
          // Do something with the event
        }
        // Custom edit indicator
        EditIndicatorComponent={
          <View style={styles.footerEventStyle}>
            <Ionicons name="reorder-two-outline" size={24} color="black" />
          </View>
        }
      />
      {!!selectedEvent && _renderEditFooter()}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: "absolute",
    marginTop: spacing.size_medium,
    top: spacing.size_medium,
    left: spacing.size_small,
    zIndex: 1,
  },
  footerEventStyle: {
    width: "100%",
    backgroundColor: colors.color_400,
    alignItems: "center",
    justifyContent: "center",
  },
  headerImage: {
    height: "35%",
    width: "100%",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFF",
    height: 85,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    flexDirection: "row",
    paddingHorizontal: spacing.size_small,
    alignItems: "center",
  },
  button: {
    height: 45,
    paddingHorizontal: 24,
    backgroundColor: "#1973E7",
    justifyContent: "center",
    borderRadius: 24,
    marginHorizontal: 8,
    marginVertical: 8,
  },
  btnText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
  },
});
