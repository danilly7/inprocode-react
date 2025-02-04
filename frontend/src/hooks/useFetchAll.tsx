import { useState, useEffect } from 'react';

export function useFetchAll<T>(url: string, isCompetitors: boolean = false) {
    const [data, setData] = useState<{ data: T[] }>({ data: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        setLoading(true);
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((json) => {
                if (isCompetitors) {
                    // Si es para competidores, accede a rows
                    setData({ data: Array.isArray(json.data?.rows) ? json.data.rows : [] });
                } else {
                    // Si es para eventos, accede a data
                    setData({ data: Array.isArray(json.data) ? json.data : [] });
                }
            })
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    },  [url, isCompetitors]);

    return { data, loading, error };
};