import { useRevenueContext } from "../../../context/revenue-context";
import { weekdays } from "../data";

export const ListRevenue = () => {
    const { dayrev, loading, error, loadMore, hasMore } = useRevenueContext();

    const uniqueRevenue = dayrev
        .map(dayrevenue => ({
            ...dayrevenue,
            closed: Boolean(dayrevenue.closed),
            bank_holiday: Boolean(dayrevenue.bank_holiday),
        }))
        .filter( //evitamos duplicados, importante
            (checkingRevenue, index, dayrevList) =>
                index === dayrevList.findIndex((r) => r.id_dailyrev === checkingRevenue.id_dailyrev)
        );

    return (
        <div className="p-4 rounded-lg border border-gray-300 bg-slate-400 shadow-md m-8">
            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-center text-red-500">{error.message}</p>}

            {!loading && !error && uniqueRevenue.length === 0 && (
                <p className="text-center">There is no available data of revenue at this very moment.</p>
            )}

            {!loading && !error && uniqueRevenue.length > 0 && (
                <div className="overflow-x-auto max-h-[400px] overflow-y-auto custom-scroll">
                    <table className="min-w-full table-auto border-collapse">
                        <thead>
                            <tr className="bg-gray-300">
                                <th className="border border-gray-300 p-2 text-left">ID</th>
                                <th className="border border-gray-300 p-2 text-left">Title</th>
                                <th className="border border-gray-300 p-2 text-left">Date</th>
                                <th className="border border-gray-300 p-2 text-left">Closed</th>
                                <th className="border border-gray-300 p-2 text-left">Weekday</th>
                                <th className="border border-gray-300 p-2 text-left">Bank Holiday</th>
                                <th className="border border-gray-300 p-2 text-left">Total Sales</th>
                                <th className="border border-gray-300 p-2 text-left">Total Clients</th>
                            </tr>
                        </thead>
                        <tbody>
                            {uniqueRevenue.map((dayrevenue) => {
                                let rowClass = "";
                                if (dayrevenue.bank_holiday) {
                                    rowClass = "bg-yellow-100"; //cuando es festivo
                                }
                                if (dayrevenue.closed) {
                                    rowClass = "bg-gray-200"; //resaltar cuando está cerrado
                                }

                                return (
                                    <tr key={dayrevenue.id_dailyrev} className={`bg-white ${rowClass}`}>
                                        <td className="border border-gray-300 p-2">{dayrevenue.id_dailyrev}</td>
                                        <td className="border border-gray-300 p-2">{dayrevenue.title}</td>
                                        <td className="border border-gray-300 p-2">{dayrevenue.date}</td>
                                        <td className="border border-gray-300 p-2">{dayrevenue.closed ? "Closed" : ""}</td>
                                        <td className="border border-gray-300 p-2">{weekdays[dayrevenue.weekday_id - 1]}</td>
                                        <td className="border border-gray-300 p-2">{dayrevenue.bank_holiday ? "Bank Holiday" : ""}</td>
                                        <td className="border border-gray-300 p-2">{dayrevenue.total_sales.toFixed(2)} €</td>
                                        <td className="border border-gray-300 p-2">{dayrevenue.total_clients} pax</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            {!loading && !error && !hasMore && (
                <p className="text-center text-black mt-4">All data has been loaded</p>
            )}

            {!loading && !error && uniqueRevenue.length > 0 && hasMore && (
                <div className="text-center mt-4">
                    <button
                        onClick={loadMore}
                        className="bg-gray-700 text-white p-2 rounded-lg hover:bg-green-500 hover:font-semibold"
                    >
                        Load more data
                    </button>
                </div>
            )}
        </div>
    );
};