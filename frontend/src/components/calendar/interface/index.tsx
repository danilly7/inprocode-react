export interface CalendarEvent {
    id_event: number;
    title: string;
    date: string;
    color: string;
};

export interface CalendarEventFullCalendar extends CalendarEvent {
    id_event: number;
    setProp: (prop: string, value: string) => void;
    remove: () => void;
  }