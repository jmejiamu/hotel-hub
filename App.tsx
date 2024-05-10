import { Image, StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import { Provider as ReduxProvider } from "react-redux";
import store from "./src/redux/ReduxStore/store";
import { TestCompnoent } from "./src/component/TestCompnoent";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { StackNav } from "./src/navigation";

function App() {
  return (
    <NavigationContainer>
      <ReduxProvider store={store}>
        {/* <TestCompnoent /> */}
        <StackNav />
      </ReduxProvider>
    </NavigationContainer>
  );
}

let AppEntryPoint = App;

if (Constants!.expoConfig!.extra!.storybookEnabled === "true") {
  AppEntryPoint = require("./.storybook").default;
}

const styles = StyleSheet.create({});
export default AppEntryPoint;
