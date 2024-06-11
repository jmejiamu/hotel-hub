import { EventItem } from "@howljs/calendar-kit";
import {
  addDays,
  startOfYear,
  endOfYear,
  setHours,
  setMinutes,
  nextDay,
  Day,
} from "date-fns";

export interface EventConfig {
  title: string;
  intervalDays: number;
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  color: string;
  dayOfWeek: Day;
  description?: string;
}

export const generateYearlyEvents = (configs: EventConfig[]): EventItem[] => {
  const events: EventItem[] = [];
  const start = startOfYear(new Date());
  const end = endOfYear(new Date());

  let id = 1;

  configs.forEach((config) => {
    let currentDate = nextDay(start, config.dayOfWeek);
    while (currentDate <= end) {
      const eventStart = setMinutes(
        setHours(currentDate, config.startHour),
        config.startMinute
      );

      const eventEnd = setMinutes(
        setHours(currentDate, config.endHour),
        config.endMinute
      );

      events.push({
        id: id.toString(),
        title: config.title,
        start: eventStart.toISOString(),
        end: eventEnd.toISOString(),
        color: config.color,
        description: config.description,
      });

      currentDate = addDays(currentDate, config.intervalDays);
      id++;
    }
  });

  return events;
};
