import { useState, useEffect } from 'react';

export function useFetch<T>(url: string, page: number) {
    const [data, setData] = useState<{ data: T[]; next?: string | null }>({  data: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`${url}?page=${page}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((json) => {
                setHasMore(json.currentPage < json.pages);
                setData((prevData) => ({
                    data: [...(prevData?.data || []), ...(Array.isArray(json.data) ? json.data : [])],
                    next: json.next
                }));
            })
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }, [url, page]);

    return { data, loading, error, hasMore };
};