import { useState, useEffect } from 'react';
import { useCalendarContext } from '../../../context/calendar-context';
import { CalendarEvent, CalendarEventFullCalendar} from '../interface';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

export const CalendarWithEvents = () => {
    const { event, createEvent, updateEvent, deleteEvent } = useCalendarContext();
    const [events, setEvents] = useState<CalendarEvent[]>(event);

    useEffect(() => {
        setEvents(event);
    }, [event]);

    const isHoliday = (date: string) => event.some(e => e.date === date);

    //tengo problemas con la actualización del fullCalendar, no encuentro DateClickArg en su biblio y typescript necesita tipado, por eso se crean estas minifunciones -------↓
    const isDateClickArg = (info: unknown): info is { dateStr: string } => {
        return typeof (info as { dateStr: string }).dateStr === 'string';
    };

    const isEventClickArg = (info: unknown): info is { event: CalendarEventFullCalendar } => {
        return (info as { event: CalendarEventFullCalendar }).event !== undefined;
    };
    //--------↑

    const handleDateClick = (info: unknown) => {
        if (isDateClickArg(info)) {
            const title = prompt('Title of your event:', 'New title');
            if (title) {
                const newEvent = {
                    title,
                    date: info.dateStr,
                    color: '#1e88e5',
                };
                createEvent(newEvent);
            }
        }
    };

    const handleEventClick = (info: unknown) => {
        if (isEventClickArg(info)) {
            const shouldDelete = window.confirm(`Do you want to eliminate: "${info.event.title}"?`);
            if (shouldDelete) {
                deleteEvent(info.event.id_event);
                info.event.remove();
            } else {
                const newTitle = prompt('Edit title of this event:', info.event.title);
                if (newTitle) {
                    updateEvent(info.event.id_event, { title: newTitle });
                    info.event.setProp('title', newTitle);
                }
            }
        }
    };

    return (
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events.map(event => ({
                ...event,
                color: isHoliday(event.date) ? '#fbc02d' : event.color,
            }))}
            headerToolbar={{
                left: 'dayGridMonth',
                center: 'title',
                right: 'prev,next',
            }}
            editable={true}
            selectable={true}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
        />
    );
};