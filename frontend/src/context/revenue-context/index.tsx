import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { DailyRevenue } from '../../components/revenue/interface';
import { useFetch } from '../../hooks/useFetch';
import { apiRevenue } from '../../api';

interface RevenueContextProps {
    dayrev: DailyRevenue[];
    loading: boolean;
    error: Error | null;
    loadMore: () => void;
    hasMore: boolean;
    createRevenue: (newRevenue: Omit<DailyRevenue, "id_dailyrev">) => Promise<void>;
    updateRevenue: (id: number, updatedRevenue: Partial<DailyRevenue>) => Promise<void>;
    deleteRevenue: (id: number) => Promise<void>;
    refreshRevenue: () => void;
};

const RevenueContext = createContext<RevenueContextProps | undefined>(undefined);

export const RevenueProvider = ({ children }: { children: ReactNode }) => {
    const [page, setPage] = useState(1);
    const { data, loading, error, hasMore: fetchedHasMore } = useFetch<DailyRevenue>(apiRevenue, page);
    const [dayrev, setDayrev] = useState<DailyRevenue[]>([]);
    const [hasMore, setHasMore] = useState(fetchedHasMore);

    useEffect(() => {
        if (data?.data) {
            setDayrev((prevDayrev) => [...prevDayrev, ...data.data]);
        }
    }, [data]);

    useEffect(() => {
        if (dayrev.length % 10 === 0) {
            setHasMore(true);
        } else {
            setHasMore(false);
        }
    }, [dayrev]);

    //------------ paginación --------------------↓

    const loadMore = () => {
        if (hasMore) {
            setPage((prev) => prev + 1);
        }
    };

    //------------- crud en context----------------↓

    const refreshRevenue = async () => {
        try {
            const response = await fetch(`${apiRevenue}?page=1`);
            if (response.ok) {
                const json = await response.json();
                setDayrev(json.data);
                setPage(1);
            }
        } catch (error) {
            console.error("Error refreshing revenue data:", error);
        }
    };

    const createRevenue = async (newRevenue: Omit<DailyRevenue, "id_dailyrev">) => {
        const tempId = Date.now(); //--optimistic ui
        setDayrev((prevDayrev) => [
            ...prevDayrev,
            { ...newRevenue, id_dailyrev: tempId },
        ]);

        try { //-- conexión al back
            const response = await fetch(apiRevenue, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newRevenue),
            });
            if (response.ok) {
                const createdRevenue = await response.json();
                setDayrev((prevDayrev) =>
                    prevDayrev.map((revenue) =>
                        revenue.id_dailyrev === tempId ? createdRevenue.data : revenue
                    )
                );
            } else {
                //si la respuesta falla, revertimos el ingreso optimista
                setDayrev((prevDayrev) =>
                    prevDayrev.filter((revenue) => revenue.id_dailyrev !== tempId)
                );
            }
        } catch (error) {
            //si ocurre un error, revertimos el ingreso optimista
            console.error("Error adding revenue:", error);
            setDayrev((prevDayrev) =>
                prevDayrev.filter((revenue) => revenue.id_dailyrev !== tempId)
            );
        }
    };

    const updateRevenue = async (id: number, updatedRevenue: Partial<DailyRevenue>) => {
        setDayrev((prevDayrev) => //--optimistic ui
            prevDayrev.map((revenue) =>
                revenue.id_dailyrev === id ? { ...revenue, ...updatedRevenue } : revenue
            )
        );

        try {
            const response = await fetch(`${apiRevenue}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedRevenue),
            });
            if (response.ok) {
                const updatedData = await response.json();
                setDayrev((prevDayrev) =>
                    prevDayrev.map((revenue) =>
                        revenue.id_dailyrev === id ? { ...revenue, ...updatedData.data } : revenue
                    )
                );
            } else {
                //si la respuesta falla, revertimos el ingreso optimista
                console.error("Failed to update revenue:", response);
                setDayrev((prevDayrev) =>
                    prevDayrev.map((revenue) =>
                        revenue.id_dailyrev === id ? { ...revenue, ...updatedRevenue } : revenue
                    )
                );
            }
        } catch (error) {
            //si ocurre un error, revertimos el cambio optimista
            console.error("Error updating revenue:", error);
            setDayrev((prevDayrev) =>
                prevDayrev.map((revenue) =>
                    revenue.id_dailyrev === id ? { ...revenue, ...updatedRevenue } : revenue
                )
            );
        }
    };

    const deleteRevenue = async (id: number) => {
        setDayrev((prevDayrev) => prevDayrev.filter((revenue) => revenue.id_dailyrev !== id));

        try {
            const response = await fetch(`${apiRevenue}/${id}`, { method: "DELETE" });
            if (response.ok) {
                //si la eliminación es exitosa, recalcular el estado de hasMore
                setHasMore(dayrev.length > 10 && dayrev.length % 10 === 0);
            } else {
                console.error("Failed to delete revenue:", response);
                //si falla, restauramos el ingreso eliminado
                //puedes recuperar los datos del servidor o almacenar un ID temporal
            }
        } catch (error) {
            console.error("Error deleting revenue:", error);
            //si hay error, restaurar el ingreso eliminado
            setDayrev((prevDayrev) => [
                ...prevDayrev,
                //aquí deberías restaurar el ingreso eliminado desde una fuente segura si la necesitas
            ]);
        }
    };

    return (
        <RevenueContext.Provider
            value={{
                dayrev,
                loading,
                error,
                loadMore,
                hasMore,
                createRevenue,
                updateRevenue,
                deleteRevenue,
                refreshRevenue,
            }}>
            {children}
        </RevenueContext.Provider>
    );
};

export const useRevenueContext = () => {
    const context = useContext(RevenueContext);
    if (!context) {
        throw new Error('useRevenueContext must be used within a RevenueProvider');
    }
    return context;
};