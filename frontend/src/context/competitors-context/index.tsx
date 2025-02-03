import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { Competitor } from '../../components/competitors/interface';
import { useFetch } from '../../hooks/useFetch';
import { apiCompetitors } from '../../api';

interface CompetitorsContextProps {
    competitor: Competitor[];
    loading: boolean;
    error: Error | null;
};

const CompetitorsContext = createContext<CompetitorsContextProps | undefined>(undefined);

export const CompetitorsProvider = ({ children }: { children: ReactNode }) => {
    const { data, loading, error } = useFetch<Competitor>(apiCompetitors, 1);
    const [competitor, setCompetitor] = useState<Competitor[]>([]);

    useEffect(() => {
        if (data?.data) {
            const uniqueCompetitors = data.data.filter((value, index, self) =>
                index === self.findIndex((c) => c.id_competitor === value.id_competitor)
            );
            setCompetitor(uniqueCompetitors);
        }
    }, [data]);

    return (
        <CompetitorsContext.Provider
            value={{
                competitor,
                loading,
                error,
            }}>
            {children}
        </CompetitorsContext.Provider>
    );
};

export const useCompetitorsContext = () => {
    const context = useContext(CompetitorsContext);
    if (!context) {
        throw new Error('useCompetitorsContext must be used within a CompetitorsProvider');
    }
    return context;
};