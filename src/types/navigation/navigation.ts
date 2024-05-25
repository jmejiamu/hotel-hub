import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  CustomerEmployeeScreen: undefined;
  CompanyCodeScreen: undefined;
  SignInScreen?: { company_code: string; userType: string }; // optional
  RegisterScreen?: { company_code: string; userType: string };
  CalendarScreen: undefined;
  CustomerListScreen: undefined;
  PredefineCalendar: undefined;
};

export type RootNavigationNames = NativeStackNavigationProp<RootStackParamList>;
