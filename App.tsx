import { NavigationContainer } from "@react-navigation/native";
import { Provider as ReduxProvider } from "react-redux";
import store from "./src/redux/ReduxStore/store";
import { StackNav } from "./src/navigation";
import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import "react-native-gesture-handler";

function App() {
  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <StackNav />
      </NavigationContainer>
    </ReduxProvider>
  );
}

let AppEntryPoint = App;

if (Constants!.expoConfig!.extra!.storybookEnabled === "true") {
  AppEntryPoint = require("./.storybook").default;
}

const styles = StyleSheet.create({});
export default AppEntryPoint;
