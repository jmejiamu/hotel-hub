import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  CalendarViewMode,
  EventItem,
  PackedEvent,
  RangeTime,
  TimelineCalendar,
} from "@howljs/calendar-kit";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../theme";

interface CustomCalendarProps {
  events: EventItem[];
  setEventId: (eventId: string | "") => void;
  setModalVisible: (isModalOpen: boolean) => void;
  onDragCreateEnd: (event: RangeTime) => void;
  onLongPressEvent: (event: PackedEvent) => void;
  selectedEvent: PackedEvent | undefined;
  setSelectedEvent: (event: PackedEvent) => void;
  canlendarView: CalendarViewMode;
}

export const CustomCalendar = (props: CustomCalendarProps) => {
  const {
    events,
    setEventId,
    setModalVisible,
    onDragCreateEnd,
    onLongPressEvent,
    selectedEvent,
    setSelectedEvent,
    canlendarView,
  } = props;
  return (
    <>
      <TimelineCalendar
        viewMode={canlendarView}
        events={events}
        allowDragToCreate
        onDragCreateEnd={onDragCreateEnd}
        onLongPressEvent={onLongPressEvent}
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
          (event) => {
            setEventId(event?.id);
            setModalVisible(true);
          }
          // Do something with the event
        }
        // Custom edit indicator
        EditIndicatorComponent={
          <View style={styles.footerEventStyle}>
            <Ionicons name="reorder-two-outline" size={24} color="black" />
          </View>
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  footerEventStyle: {
    width: "100%",
    backgroundColor: colors.color_400,
    alignItems: "center",
    justifyContent: "center",
  },
});
