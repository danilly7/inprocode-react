import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { CalendarEvent } from '../../components/calendar/interface';
import { useFetch } from '../../hooks/useFetch';
import { apiCalendar } from '../../api';

interface CalendarContextProps {
    event: CalendarEvent[];
    loading: boolean;
    error: Error | null;
    loadMore: () => void;
    hasMore: boolean;
    createEvent: (newEvent: Omit<CalendarEvent, "id_event">) => Promise<void>;
    updateEvent: (id: number, updatedEvent: Partial<CalendarEvent>) => Promise<void>;
    deleteEvent: (id: number) => Promise<void>;
    refreshEvent: () => void;
};

const CalendarContext = createContext<CalendarContextProps | undefined>(undefined);

export const CalendarProvider = ({ children }: { children: ReactNode }) => {
    const [page, setPage] = useState(1);
    const { data, loading, error, hasMore: fetchedHasMore } = useFetch<CalendarEvent>(apiCalendar, page);
    const [event, setEvent] = useState<CalendarEvent[]>([]);
    const [hasMore, setHasMore] = useState(fetchedHasMore);

    useEffect(() => {
        if (data?.data) {
            setEvent((prevEvent) => [...prevEvent, ...data.data]);
        }
    }, [data]);

    useEffect(() => {
        if (event.length % 10 === 0) {
            setHasMore(true);
        } else {
            setHasMore(false);
        }
    }, [event]);

    //------------ paginación --------------------↓

    const loadMore = () => {
        if (hasMore) {
            setPage((prev) => prev + 1);
        }
    };

    //------------- crud en context----------------↓

    const refreshEvent = async () => {
        try {
            const response = await fetch(apiCalendar);
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
                // Recalcular hasMore después de eliminar un elemento
                setHasMore(event.length > 10 && event.length % 10 === 0);
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
                loadMore,
                hasMore,
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