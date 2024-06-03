import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { AppDispatch } from "../../redux/ReduxStore/store";
import { useNavigation } from "@react-navigation/native";
import { TimelineCalendar } from "@howljs/calendar-kit";
import { generateYearlyEvents } from "../../utils";
import { HeaderNavigator } from "../../component";
import { RootNavigationNames } from "../../types";
import { AntDesign } from "@expo/vector-icons";
import { eventConfigs } from "./eventConfig";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux";
import { colors } from "../../theme";
import { styles } from "./styles";

export const PredefineCalendar = (props) => {
  const { setLogged } = props;

  const predefinedEvents = generateYearlyEvents(eventConfigs);
  const navigate = useNavigation<RootNavigationNames>();
  const dispatch = useDispatch<AppDispatch>();

  const onHandleLogout = async () => {
    try {
      dispatch(logoutUser()).unwrap();
      setLogged(false);
      navigate.navigate("CustomerEmployeeScreen");
    } catch (e) {
      console.log("Logout failed", e);
    }
  };

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
      <TimelineCalendar viewMode="week" events={predefinedEvents} />
    </View>
  );
};
