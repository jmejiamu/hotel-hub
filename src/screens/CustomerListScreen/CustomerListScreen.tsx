import React, { useEffect } from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CustomInput } from "../../../.storybook/stories/CustomInput/CustomInput";
import { AppDispatch, RootState } from "../../redux/ReduxStore/store";
import { Avatar } from "../../../.storybook/stories/Avatar/Avatar";
import { useNavigation } from "@react-navigation/native";
import { customerList, logoutUser } from "../../redux";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { HeaderNavigator } from "../../component";
import { RootNavigationNames } from "../../types";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { colors } from "../../theme";
import { styles } from "./styles";

export const CustomerListScreen = (props) => {
  const navigate = useNavigation<RootNavigationNames>();
  const dispatch = useDispatch<AppDispatch>();
  const { customers, error, loading } = useSelector(
    (state: RootState) => state.customers
  );

  const { setLogged } = props;

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
    dispatch(customerList());
  }, [dispatch]);

  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Error...</Text>;
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
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
      <View style={styles.inputContainer}>
        <CustomInput
          size="medium"
          placeholder="Customer Name"
          onChangeText={() => {}}
        />
      </View>
      <FlatList
        data={customers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigate.navigate("FrontendCalendar", {
                id: item.id,
                user_id: item.user_id,
              })
            }
            activeOpacity={0.5}
          >
            <View style={styles.listContainer}>
              <View>
                <Avatar imageUrl={require("../../../assets/avatar-def.jpg")} />
              </View>
              <View style={styles.textContainer}>
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={styles.titleStyle}
                >
                  {item.username}
                </Text>
                <Text style={styles.subtitleStyle}>Guest</Text>
              </View>
              <View style={styles.iconContainer}>
                <Entypo
                  name="dots-three-vertical"
                  size={24}
                  color={colors.color_500}
                />
              </View>
            </View>
            <View style={styles.lineDivider} />
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <Text style={{ color: "white" }}>No Customers yet...</Text>
        )}
      />
    </SafeAreaView>
  );
};
