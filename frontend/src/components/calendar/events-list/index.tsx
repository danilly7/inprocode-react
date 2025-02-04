import { useMemo } from "react";
import { useCalendarContext } from "../../../context/calendar-context";

export const EventsList = () => {
    const { event } = useCalendarContext();

    const formatDate = (dateString: string) => {
        return new Date(dateString).toISOString().split('T')[0];
    };

    const upcomingEvents = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return [...event]
            .filter((e) => new Date(e.date).getTime() >= today.getTime()) // Excluye eventos pasados
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); // Ordena por fecha
    }, [event]);

    return (
        <div className="p-4 max-w-3xl mx-auto m-5">
            <h2 className="text-2xl font-semibold mb-3 text-center">Agenda</h2>
            <div className="border rounded-lg p-4 max-h-80 overflow-y-auto custom-scroll">
                {upcomingEvents.length > 0 ? (
                    <ul className="space-y-2">
                        {upcomingEvents.map((eventItem) => (
                            <li
                                key={eventItem.id_event}
                                className="p-2 rounded-lg shadow-sm flex items-center space-x-3 text-sm"
                                style={{
                                    backgroundColor: eventItem.color || '#e5e7eb', // Si no hay color, fondo gris
                                }}
                            >
                                <div className="flex-1">
                                    <h3 className="font-medium">{eventItem.title}</h3>
                                    <p className="text-xs text-gray-600">{formatDate(eventItem.date)}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-gray-500">No upcoming events.</p>
                )}
            </div>
            <div className="mt-4 text-sm text-gray-600">
                <p><span className="inline-block w-3 h-3 mr-1 rounded-full" style={{ backgroundColor: '#fbbf24' }}></span> Bank Holidays are marked in yellow.</p>
            </div>
        </div>
    );
};