import { useFetch } from "../../hooks/useFetch";
import { apiRevenue } from "../../api";
import { DailyRevenue } from "./type";

export const ListRevenue = () => {
    const { data, loading, error } = useFetch<DailyRevenue>(apiRevenue);

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>{error.message}</p>}

            {!loading && !error && data && (
                <div>
                    {data.map((dayrev) => (
                        <>
                            <div key={dayrev.id_dailyrev}>
                                <p>id_dailyrev: {dayrev.id_dailyrev}</p>
                                <p>title: {dayrev.title}</p>
                                <p>date: {dayrev.date}</p>
                                <p>closed: {dayrev.closed}</p>
                                <p>weekday_id: {dayrev.weekday_id}</p>
                                <p>bank_holiday: {dayrev.bank_holiday}</p>
                                <p>total_sales: {dayrev.total_sales}</p>
                                <p>total_clients: {dayrev.total_clients}</p>
                            </div>
                            <p>------------------------------</p>
                        </>
                    ))}
                </div>
            )}
        </div>
    )
};
