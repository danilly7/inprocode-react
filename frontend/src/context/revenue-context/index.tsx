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
            const response = await fetch(apiRevenue);
            if (response.ok) {
                const json = await response.json();
                setDayrev(json.data);
            }
        } catch (error) {
            console.error("Error refreshing revenue data:", error);
        }
    };

    const createRevenue = async (newRevenue: Omit<DailyRevenue, "id_dailyrev">) => {
        try {
            const response = await fetch(apiRevenue, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newRevenue),
            });
            if (response.ok) {
                const createdRevenue = await response.json();
                setDayrev((prevDayrev) => [...prevDayrev, createdRevenue.data]);
            } else {
                console.error('Failed to add revenue', response);
            }
        } catch (error) {
            console.error("Error adding revenue:", error);
        }
    };

    const updateRevenue = async (id: number, updatedRevenue: Partial<DailyRevenue>) => {
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
            }
        } catch (error) {
            console.error("Error updating revenue:", error);
        }
    };

    const deleteRevenue = async (id: number) => {
        try {
            const response = await fetch(`${apiRevenue}/${id}`, { method: "DELETE" });
            if (response.ok) {
                setDayrev((prevDayrev) => prevDayrev.filter((revenue) => revenue.id_dailyrev !== id));
                // Recalcular hasMore después de eliminar un elemento
                setHasMore(dayrev.length > 10 && dayrev.length % 10 === 0);
            }
        } catch (error) {
            console.error("Error deleting revenue:", error);
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