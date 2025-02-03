import { useState, useEffect } from 'react';

export function useFetchAll<T>(url: string) {
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
                setData({ data: Array.isArray(json.data) ? json.data : [] });
            })
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }, [url]);

    return { data, loading, error };
};