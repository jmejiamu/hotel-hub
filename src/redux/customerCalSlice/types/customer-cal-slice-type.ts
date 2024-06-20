interface EventResponse {
  id: number;
  event_id: string;
  user_id: string;
  customer_id: string;
  event_title: string;
  event_description: string;
  event_start: string;
  event_end: string;
  userType: string;
}
export interface IInitialState {
  response: EventResponse[];
  loading: boolean;
  error: boolean;
  status: number;
  message: string;
}
