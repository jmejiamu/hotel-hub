import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";
import { Provider as ReduxProvider } from "react-redux";
import store from "./src/redux/ReduxStore/store";
import { TestCompnoent } from "./src/component/TestCompnoent";
// const apiUrl = Constants.expoConfig.extra.storybookEnabled;

function App() {
  return (
    <View style={styles.container}>
      <ReduxProvider store={store}>
        <TestCompnoent />
      </ReduxProvider>
    </View>
  );
}

let AppEntryPoint = App;

if (Constants!.expoConfig!.extra!.storybookEnabled === "true") {
  AppEntryPoint = require("./.storybook").default;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default AppEntryPoint;
