import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { holidayEvents } from '../../data';

interface CalendarEvent {
    title: string;
    date: string;
    color: string;
}

export const Calendar = () => {
    const [events, setEvents] = useState<CalendarEvent[]>(holidayEvents);

    const isHoliday = (date: string) => holidayEvents.some(event => event.date === date);

    //tengo problemas con la actualización del fullCalendar, no encuentro DateClickArg en su biblio y typescript necesita tipado, por eso se crean estas minifunciones -------↓
    const isDateClickArg = (info: unknown): info is { dateStr: string } => {
        return typeof (info as { dateStr: string }).dateStr === 'string';
    };

    const isEventClickArg = (info: unknown): info is { event: { title: string, setProp: (prop: string, value: string) => void, remove: () => void } } => {
        return (info as { event: { title: string, setProp: (prop: string, value: string) => void, remove: () => void } }).event !== undefined;
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
                setEvents(prevEvents => [...prevEvents, newEvent]);
            }
        }
    };

    const handleEventClick = (info: unknown) => {
        if (isEventClickArg(info)) {
            const shouldDelete = window.confirm(`Do you want to eliminate: "${info.event.title}"?`);
            if (shouldDelete) {
                info.event.remove();
                setEvents(prevEvents => prevEvents.filter(event => event.title !== info.event.title));
            } else {
                const newTitle = prompt('Edit title of this event:', info.event.title);
                if (newTitle) {
                    info.event.setProp('title', newTitle);
                    setEvents(prevEvents =>
                        prevEvents.map(event =>
                            event.title === info.event.title ? { ...event, title: newTitle } : event
                        )
                    );
                }
            }
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-4xl font-bold mb-4">Bank Holidays in BCN</h1>
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
        </div>
    );
};