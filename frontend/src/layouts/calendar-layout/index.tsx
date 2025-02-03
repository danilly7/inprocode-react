import { Outlet } from "react-router-dom";
import { CalendarProvider } from "../../context/calendar-context";

const CalendarLayout = () => {
  return (
    <CalendarProvider>
      <Outlet />
    </CalendarProvider>
  );
};

export default CalendarLayout;