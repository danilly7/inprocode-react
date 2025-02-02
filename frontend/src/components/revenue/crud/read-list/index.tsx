import { useState } from "react";
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

    const uniqueRevenue = dayrev
        .map(dayrevenue => ({
            ...dayrevenue,
            closed: Boolean(dayrevenue.closed),
            bank_holiday: Boolean(dayrevenue.bank_holiday),
        }))
        .filter((checkingRevenue, index, dayrevList) =>
            index === dayrevList.findIndex((r) => r.id_dailyrev === checkingRevenue.id_dailyrev)
        );

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
                {uniqueRevenue.map((dayrevenue) => {
                    let cardClass = "";
                    if (dayrevenue.bank_holiday) {
                        cardClass = "bg-yellow-100";
                    }
                    if (dayrevenue.closed) {
                        cardClass = "bg-gray-200";
                    }

                    return (
                        <div
                            key={dayrevenue.id_dailyrev}
                            className={`bg-white p-4 rounded-lg shadow-md ${cardClass}`}
                        >
                            <h4 className="font-semibold text-lg">{dayrevenue.title}</h4>
                            <p>ID: {dayrevenue.id_dailyrev}</p>
                            <p>Date: {dayrevenue.date}</p>
                            <p>Weekday: {weekdays[dayrevenue.weekday_id - 1]}</p>
                            <p>Total Sales: {dayrevenue.total_sales.toFixed(2)} €</p>
                            <p>Total Clients: {dayrevenue.total_clients} pax</p>
                            <p>{dayrevenue.closed ? "Closed" : ""}</p>
                            <p>{dayrevenue.bank_holiday ? "Bank Holiday" : ""}</p>
                            <div className="flex justify-center mt-4 gap-4">
                                <button
                                    onClick={() => onEdit(dayrevenue)}
                                    className="bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-700 w-full"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleOpenDeleteModal(dayrevenue)}
                                    className="bg-red-500 text-white p-2 rounded-xl hover:bg-red-700 w-full"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* ------ cambio a lg ------- */}

            <div className="hidden md:block overflow-x-auto max-h-[400px] overflow-y-auto custom-scroll">
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
                            <th className="border border-gray-300 p-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {uniqueRevenue.map((dayrevenue) => {
                            let rowClass = "";
                            if (dayrevenue.bank_holiday) {
                                rowClass = "bg-yellow-100";
                            }
                            if (dayrevenue.closed) {
                                rowClass = "bg-gray-200";
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
                                    <td className="border border-gray-300 p-2 flex justify-center gap-4">
                                        <button
                                            onClick={() => onEdit(dayrevenue)}
                                            className="bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-700 w-full"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleOpenDeleteModal(dayrevenue)}
                                            className="bg-red-500 text-white p-2 rounded-xl hover:bg-red-700 w-full"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
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