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
};

const RevenueContext = createContext<RevenueContextProps | undefined>(undefined);

export const RevenueProvider = ({ children }: { children: ReactNode }) => {
    const [page, setPage] = useState(1);
    const { data, loading, error, hasMore } = useFetch<DailyRevenue>(apiRevenue, page);

    const [dayrev, setDayrev] = useState<DailyRevenue[]>([]);

    useEffect(() => {
        if (data?.data) {
            setDayrev((prev) => [...prev, ...data.data]);
        }
    }, [data]);

    const loadMore = () => {
        if (hasMore) {
            setPage((prev) => prev + 1);
        }
    };

    return (
        <RevenueContext.Provider
            value={{
                dayrev,
                loading,
                error,
                loadMore,
                hasMore
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