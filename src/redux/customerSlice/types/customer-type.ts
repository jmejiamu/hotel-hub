export interface Customer {
  id: number;
  username: string;
  user_id: string;
  email: string;
}

export interface InitialState {
  customers: Customer[];
  loading: boolean;
  error: boolean;
}
