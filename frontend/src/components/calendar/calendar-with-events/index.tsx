import { useState } from 'react';
import { useCalendarContext } from '../../../context/calendar-context';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DatesSetArg, EventClickArg } from '@fullcalendar/core/index.js';

export const CalendarWithEvents = () => {
    const { event, createEvent, updateEvent, deleteEvent, refreshEvent } = useCalendarContext();
    const [currentDateRange, setCurrentDateRange] = useState<{ start: string; end: string }>({ start: '', end: '' });
    
    const handleDateRangeChange = (arg: DatesSetArg) => {
        const year = arg.start.getFullYear();
        const month = (arg.start.getMonth() + 1).toString().padStart(2, '0');
        const start = `${year}-${month}-01`;
        const end = `${year}-${month}-31`;
    
        setCurrentDateRange({ start, end });
        refreshEvent(start, end);
    };
    console.log(currentDateRange);

    const handleDateClick = async (info: { dateStr: string }) => {
        const title = prompt('Title of your event:', 'New title');
        if (title) {
            await createEvent({ title, date: info.dateStr, color: '#1e88e5' });
            refreshEvent();
        }
    };

    const handleEventClick = async (info: EventClickArg) => {
        const event = info.event;
        const id_event = event.extendedProps.id_event;
        const shouldDelete = window.confirm(`Do you want to eliminate: "${event.title}"?`);
        if (shouldDelete) {
            await deleteEvent(id_event);
        } else {
            const newTitle = prompt('Edit title of this event:', event.title);
            if (newTitle) {
                await updateEvent(id_event, { title: newTitle });
            }
        }
        refreshEvent();
    };

    return (
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={event}
            headerToolbar={{
                left: 'dayGridMonth',
                center: 'title',
                right: 'today prev,next',
            }}
            editable={true}
            selectable={true}
            datesSet={handleDateRangeChange}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
        />
    );
};