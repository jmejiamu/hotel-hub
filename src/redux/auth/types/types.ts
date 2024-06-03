export interface Response {
  message: string;
  status: number;
  token: string;
  username: string;
  userType: string;
  user_id: string;
}
export interface AuthState {
  response: Response;
  loading: boolean;
  error: boolean;
}

export interface UserData {
  email: string;
  username?: string;
  password: string;
  company_code?: string;
  userType: string;
  path: string;
}
