import { CalendarWithEvents } from "../../components/calendar/calendar-with-events";
import { EventsList } from "../../components/calendar/events-list";

const Calendar = () => {
    return (
        <>
            <div className="p-8">
                <h1 className="text-4xl font-bold mb-4">Bank Holidays in BCN</h1>
                <CalendarWithEvents />
                <EventsList />
            </div>
        </>
    )
};

export default Calendar;