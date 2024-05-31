import React, { useEffect } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { CustomInput } from "../../../.storybook/stories/CustomInput/CustomInput";
import { Avatar } from "../../../.storybook/stories/Avatar/Avatar";
import { AppDispatch, RootState } from "../../redux/ReduxStore/store";
import { useNavigation } from "@react-navigation/native";
import { colors, fontSize, spacing } from "../../theme";
import { customerList, logoutUser } from "../../redux";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { HeaderNavigator } from "../../component";
import { RootNavigationNames } from "../../types";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

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
          <View>
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
          </View>
        )}
        ListEmptyComponent={() => (
          <Text style={{ color: "white" }}>No Customers yet...</Text>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginHorizontal: spacing.size_small,
    marginVertical: spacing.size_small,
  },
  lineDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.color_500,
    width: "100%",
  },
  iconContainer: {
    justifyContent: "center",
  },
  subtitleStyle: {
    color: colors.color_300,
    fontSize: fontSize.size_small,
  },
  titleStyle: {
    color: colors.color_300,
    fontWeight: "bold",
    fontSize: fontSize.size_medium,
  },
  textContainer: {
    justifyContent: "center",
    marginLeft: spacing.size_small,
    flex: 1,
  },
  listContainer: {
    flexDirection: "row",
    marginVertical: spacing.size_small,
    marginHorizontal: spacing.size_small,
  },
  inputContainer: {
    marginHorizontal: spacing.size_small,
    marginVertical: spacing.size_small,
  },
  mainContainer: {
    backgroundColor: colors.color_100,
    flex: 1,
  },
});
