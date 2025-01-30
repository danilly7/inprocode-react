import { useState, useEffect } from 'react';

export function useFetch<T>(url: string) {
    const [data, setData] = useState<T[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!url) return;

        setLoading(true);
        setError(null);

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((json)=> setData(json))
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }, [url]);

    return { data, loading, error };
};