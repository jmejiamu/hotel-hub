import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FrontendCalendar } from "../../screens/FrontEndCalendar/FrontendCalendar";

export type RootStackParamList = {
  CustomerEmployeeScreen: undefined;
  CompanyCodeScreen: undefined;
  SignInScreen?: { company_code: string; userType: string }; // optional
  RegisterScreen?: {
    company_code: string;
    userType: string;
    setLogged: (isAuth: boolean) => void;
  };
  CalendarScreen: undefined;
  CustomerListScreen: undefined;
  PredefineCalendar: undefined;
  FrontendCalendar: undefined;
};

export type RootNavigationNames = NativeStackNavigationProp<RootStackParamList>;

//TODO: Fix the props for register
export type RegisterScreenProps = {
  route: {
    params: {
      company_code: string;
      userType: string;
      setLogged: (isAuth: boolean) => void;
    };
  };
  navigation: RootNavigationNames;
};
