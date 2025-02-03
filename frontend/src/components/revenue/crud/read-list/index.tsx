import { useState, useMemo } from "react";
import { useRevenueContext } from "../../../../context/revenue-context";
import { weekdays } from "../../data";
import { ModalDelete } from "../delete-modal";
import { DailyRevenue } from "../../interface";

interface ListRevenueProps {
    onEdit: (revenue: DailyRevenue) => void;
}

export const ListRevenue: React.FC<ListRevenueProps> = ({ onEdit }) => {
    const { dayrev, loading, error, loadMore, hasMore, deleteRevenue } = useRevenueContext();
    const [selectedRevenue, setSelectedRevenue] = useState<DailyRevenue | null>(null);
    const [sortConfig, setSortConfig] = useState<{ key: keyof DailyRevenue; direction: "asc" | "desc" } | null>(null);

    const uniqueRevenue = dayrev
        .map(dayrevenue => ({
            ...dayrevenue,
            closed: Boolean(dayrevenue.closed),
            bank_holiday: Boolean(dayrevenue.bank_holiday),
        }))
        .filter((checkingRevenue, index, dayrevList) =>
            index === dayrevList.findIndex((r) => r.id_dailyrev === checkingRevenue.id_dailyrev)
        );

    const sortedRevenue = useMemo(() => {
        if (!sortConfig) return uniqueRevenue;
        return [...uniqueRevenue].sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
            if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
            return 0;
        });
    }, [uniqueRevenue, sortConfig]);

    const requestSort = (key: keyof DailyRevenue) => {
        setSortConfig((prev) =>
            prev?.key === key && prev.direction === "asc"
                ? { key, direction: "desc" }
                : { key, direction: "asc" }
        );
    };

    const handleOpenDeleteModal = (revenue: DailyRevenue) => {
        setSelectedRevenue(revenue);
    };

    const handleCloseModal = () => {
        setSelectedRevenue(null);
    };

    const handleDeleteRevenue = async (id: number) => {
        await deleteRevenue(id);
        setSelectedRevenue(null);
    };

    return (
        <div className="p-4 rounded-lg border border-gray-300 bg-slate-400 shadow-md m-8">
            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-center text-red-500">{error.message}</p>}

            {!loading && !error && uniqueRevenue.length === 0 && (
                <p className="text-center">There is no available data of revenue at this very moment.</p>
            )}

            <div className="md:hidden grid grid-cols-1 sm:grid-cols-1 gap-4">
                {sortedRevenue.map((dayrevenue) => (
                    <div
                        key={dayrevenue.id_dailyrev}
                        className={`bg-white p-4 rounded-lg shadow-md ${dayrevenue.bank_holiday ? "bg-yellow-100" : dayrevenue.closed ? "bg-gray-200" : ""
                            }`}
                    >
                        <h4 className="font-semibold text-lg">{dayrevenue.title}</h4>
                        <p>Date: {dayrevenue.date}</p>
                        <p>Weekday: {weekdays[dayrevenue.weekday_id - 1]}</p>
                        <p>Total Sales: {dayrevenue.total_sales.toFixed(2)} €</p>
                        <p>Total Clients: {dayrevenue.total_clients} pax</p>
                        <p>{dayrevenue.closed ? "Closed" : ""}</p>
                        <p>{dayrevenue.bank_holiday ? "Bank Holiday" : ""}</p>
                        <div className="flex justify-center mt-4 gap-4">
                            <button onClick={() => onEdit(dayrevenue)} className="bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-700 w-full">
                                Edit
                            </button>
                            <button onClick={() => handleOpenDeleteModal(dayrevenue)} className="bg-red-500 text-white p-2 rounded-xl hover:bg-red-700 w-full">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* ------ cambio a lg ------- */}

            <div className="hidden md:block overflow-x-auto max-h-[400px] overflow-y-auto custom-scroll">
                <table className="min-w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-300">
                            {["Title", "Date", "Closed", "Weekday", "Bank Holiday", "Total Sales", "Total Clients", "Actions"].map(
                                (header, index) => (
                                    <th
                                        key={index}
                                        onClick={() => requestSort(header.toLowerCase().replace(" ", "_") as keyof DailyRevenue)}
                                        className="border border-gray-300 p-2 text-left cursor-pointer hover:bg-gray-400"
                                    >
                                        {header} {sortConfig?.key === header.toLowerCase().replace(" ", "_") && (sortConfig.direction === "asc" ? "↑" : "↓")}
                                    </th>
                                )
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedRevenue.map((dayrevenue) => (
                            <tr key={dayrevenue.id_dailyrev} className={`bg-white ${dayrevenue.bank_holiday ? "bg-yellow-100" : dayrevenue.closed ? "bg-gray-200" : ""}`}>
                                <td className="border border-gray-300 p-2">{dayrevenue.title}</td>
                                <td className="border border-gray-300 p-2">{dayrevenue.date}</td>
                                <td className="border border-gray-300 p-2">{dayrevenue.closed ? "Closed" : ""}</td>
                                <td className="border border-gray-300 p-2">{weekdays[dayrevenue.weekday_id - 1]}</td>
                                <td className="border border-gray-300 p-2">{dayrevenue.bank_holiday ? "Bank Holiday" : ""}</td>
                                <td className="border border-gray-300 p-2">{dayrevenue.total_sales.toFixed(2)} €</td>
                                <td className="border border-gray-300 p-2">{dayrevenue.total_clients} pax</td>
                                <td className="border border-gray-300 p-2 flex justify-center gap-4">
                                    <button onClick={() => onEdit(dayrevenue)} className="bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-700 w-full">
                                        Edit
                                    </button>
                                    <button onClick={() => handleOpenDeleteModal(dayrevenue)} className="bg-red-500 text-white p-2 rounded-xl hover:bg-red-700 w-full">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {!loading && !error && (
                <div className="text-center mt-4">
                    <button
                        onClick={loadMore}
                        disabled={!hasMore}
                        className={`bg-green-500 text-white p-2 rounded-lg hover:bg-green-700 ${!hasMore && "opacity-50 cursor-not-allowed"}`}
                    >
                        Load More
                    </button>
                </div>
            )}

            {selectedRevenue && (
                <ModalDelete
                    revenue={selectedRevenue}
                    closeModal={handleCloseModal}
                    onConfirmDelete={handleDeleteRevenue}
                />
            )}
        </div>
    );
};