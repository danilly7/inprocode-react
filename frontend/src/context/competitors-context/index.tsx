import { createContext, useContext, ReactNode } from 'react';
import { Competitor } from '../../components/competitors/interface';
import { useFetchAll } from '../../hooks/useFetchAll';
import { apiCompetitors } from '../../api';

interface CompetitorsContextProps {
    competitor: Competitor[];
    loading: boolean;
    error: Error | null;
};

const CompetitorsContext = createContext<CompetitorsContextProps | undefined>(undefined);

export const CompetitorsProvider = ({ children }: { children: ReactNode }) => {
    const { data, loading, error } = useFetchAll<Competitor>(apiCompetitors, true);

    const competitors = data?.data || [];

    return (
        <CompetitorsContext.Provider
            value={{
                competitor: competitors,
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