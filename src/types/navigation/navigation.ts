import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  CustomerEmployeeScreen: undefined;
  CompanyCodeScreen: undefined;
  SignInScreen: undefined;
  RegisterScreen: undefined;
  CalendarScreen: undefined;
  CustomerListScreen: undefined;
  PredefineCalendar: undefined;
};

export type RootNavigationNames = NativeStackNavigationProp<RootStackParamList>;
