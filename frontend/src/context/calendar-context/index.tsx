import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { CalendarEvent } from '../../components/calendar/interface';
import { useFetchAll } from '../../hooks/useFetchAll';
import { apiCalendar } from '../../api';

interface CalendarContextProps {
    event: CalendarEvent[];
    loading: boolean;
    error: Error | null;
    createEvent: (newEvent: Omit<CalendarEvent, "id_event">) => Promise<void>;
    updateEvent: (id: number, updatedEvent: Partial<CalendarEvent>) => Promise<void>;
    deleteEvent: (id: number) => Promise<void>;
    refreshEvent: (start?: string, end?: string) => void;
};

const CalendarContext = createContext<CalendarContextProps | undefined>(undefined);

export const CalendarProvider = ({ children }: { children: ReactNode }) => {
    const { data, loading, error } = useFetchAll<CalendarEvent>(apiCalendar);
    const [event, setEvent] = useState<CalendarEvent[]>([]);

    useEffect(() => {
        if (data?.data) {
            setEvent(data.data);
        }
    }, [data]);

    //------------- crud en context----------------↓

    const refreshEvent = async (start?: string, end?: string) => {
        try {
            const url = start && end ? `${apiCalendar}?start=${start}&end=${end}` : apiCalendar;
            const response = await fetch(url);
            if (response.ok) {
                const json = await response.json();
                setEvent(json.data);
            }
        } catch (error) {
            console.error("Error refreshing event data:", error);
        }
    };

    const createEvent = async (newEvent: Omit<CalendarEvent, "id_event">) => {
        try {
            const response = await fetch(apiCalendar, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newEvent),
            });
            if (response.ok) {
                const createdEvent = await response.json();
                setEvent((prevEvent) => [...prevEvent, createdEvent.data]);
            } else {
                console.error('Failed to add event', response);
            }
        } catch (error) {
            console.error("Error adding event:", error);
        }
    };

    const updateEvent = async (id: number, updatedEvent: Partial<CalendarEvent>) => {
        try {
            const response = await fetch(`${apiCalendar}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedEvent),
            });
            if (response.ok) {
                const updatedData = await response.json();
                setEvent((prevEvent) =>
                    prevEvent.map((event) =>
                        event.id_event === id ? { ...event, ...updatedData.data } : event
                    )
                );
            }
        } catch (error) {
            console.error("Error updating event:", error);
        }
    };

    const deleteEvent = async (id: number) => {
        try {
            const response = await fetch(`${apiCalendar}/${id}`, { method: "DELETE" });
            if (response.ok) {
                setEvent((prevEvent) => prevEvent.filter((event) => event.id_event !== id));
            }
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    };

    return (
        <CalendarContext.Provider
            value={{
                event,
                loading,
                error,
                createEvent,
                updateEvent,
                deleteEvent,
                refreshEvent,
            }}>
            {children}
        </CalendarContext.Provider>
    );
};

export const useCalendarContext = () => {
    const context = useContext(CalendarContext);
    if (!context) {
        throw new Error('useCalendarContext must be used within a CalendarProvider');
    }
    return context;
};