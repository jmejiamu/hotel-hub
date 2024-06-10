import React from "react";
import { Alert, Modal, Text, View } from "react-native";
import { CustomButton } from "../../../.storybook/stories/CustomButton/CustomButton";
import DropDownPicker from "react-native-dropdown-picker";
import { EventItem } from "@howljs/calendar-kit";
import { spacing } from "../../theme";
import { styles } from "./styles";
interface CalProps {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  events: EventItem[];
  eventId: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  value: any;
  setValue: (value: any) => void;
  items: any;
  setItems: (value: any) => void;
  animationType?: "none" | "slide" | "fade" | undefined;
}
export const CalendarModal = (props: CalProps) => {
  const {
    modalVisible,
    setModalVisible,
    events,
    eventId,
    setOpen,
    open,
    value,
    setValue,
    items,
    setItems,
    animationType,
  } = props;
  return (
    <View>
      <Modal
        animationType={animationType}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Select room</Text>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
            />
            {/* TODO: Add the details data here */}
            {events.map((item: EventItem, index: number) => {
              return (
                <View style={{ marginVertical: 5 }} key={index}>
                  {item.id === eventId && (
                    <>
                      <Text>
                        <Text style={styles.boldText}>Healer:</Text> @
                        {item.title}
                      </Text>
                      <Text>
                        <Text style={styles.boldText}>Spa treatment:</Text>
                        {item.description}
                      </Text>
                      <Text>
                        <Text style={styles.boldText}>Room:</Text>{" "}
                      </Text>
                      <Text>
                        <Text style={styles.boldText}>Date & time: </Text>{" "}
                      </Text>
                    </>
                  )}
                </View>
              );
            })}
            <View style={styles.buttonContainer}>
              <View style={styles.btnInnerContainer}>
                <View style={{ flex: 1 }}>
                  <CustomButton text="Send" onPress={() => {}} />
                </View>
                <View style={{ margin: spacing.size_small }} />
                <View style={{ flex: 1 }}>
                  <CustomButton
                    text="Cancel"
                    onPress={() => setModalVisible(!modalVisible)}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
