export interface FrontEndCaledarState {
  response: [
    {
      event_id: string;
      event_title: string;
      event_start: string;
      event_end: string;
      event_description: string;
      user_id: string;
      userType: string;
    }
  ];
}

export interface UserData {
  user_id: string;
  userType: string;
}

export interface CustomerCalendar {
  event_id: string;
  user_id: string;
  userType: string;
  eventTitle: string;
  eventDescription: string;
  eventStartDate: string;
  eventEndDate: string;
  path?: string;
  customer_id?: string;
}

export interface ICustomerCalendar {
  event_id: string;
  user_id: string;
  userType: string;
  eventTitle: string;
  eventDescription: string;
  eventStartDate: string;
  eventEndDate: string;
  customer_id?: string;
}
