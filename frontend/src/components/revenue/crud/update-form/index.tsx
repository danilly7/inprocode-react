import { useState, useEffect } from "react";
import { DailyRevenue } from "../../interface";
import { formatDate } from "../../../../utils/date-format";
import { ModalUpdateRevenue } from "../update-modal";

interface UpdateRevenueFormProps {
    revenue: DailyRevenue;
    onSubmit: (id: number, updatedRevenue: Omit<DailyRevenue, "id_dailyrev">) => void;
    onClose: () => void;
}

export const UpdateRevenueForm = ({ revenue, onSubmit, onClose }: UpdateRevenueFormProps) => {
    const [title, setTitle] = useState(revenue.title);
    const [closed, setClosed] = useState(revenue.closed);
    const [bankHoliday, setBankHoliday] = useState(revenue.bank_holiday);
    const [totalSales, setTotalSales] = useState<number | "">(revenue.total_sales || "");
    const [totalClients, setTotalClients] = useState<number | "">(revenue.total_clients || "");
    const [weekdayId, setWeekdayId] = useState(revenue.weekday_id);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setTitle(revenue.title);
        setClosed(revenue.closed);
        setBankHoliday(revenue.bank_holiday);
        setTotalSales(revenue.total_sales);
        setTotalClients(revenue.total_clients);
        setWeekdayId(revenue.weekday_id);
    }, [revenue]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const updatedRevenue = {
            title,
            date: revenue.date,
            closed,
            bank_holiday: bankHoliday,
            total_sales: totalSales === "" ? 0 : Number(totalSales),
            total_clients: totalClients === "" ? 0 : Number(totalClients),
            weekday_id: weekdayId,
        };

        await onSubmit(revenue.id_dailyrev, updatedRevenue);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        onClose();
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
            >
                <h3 className="text-center text-2xl font-semibold mb-6 text-gray-700">Update Revenue</h3>
                <div className="mb-4">
                    <label className="block text-gray-600 font-medium mb-2">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-600 font-medium mb-2">Date</label>
                    <p className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-600">
                        {formatDate(revenue.date)}
                    </p>
                </div>
                <div className="mb-4 flex items-center">
                    <label className="block text-gray-600 font-medium mr-4">Closed</label>
                    <input
                        type="checkbox"
                        checked={closed}
                        onChange={(e) => setClosed(e.target.checked)}
                        className="h-5 w-5"
                    />
                </div>
                <div className="mb-4 flex items-center">
                    <label className="block text-gray-600 font-medium mr-4">Bank Holiday</label>
                    <input
                        type="checkbox"
                        checked={bankHoliday}
                        onChange={(e) => setBankHoliday(e.target.checked)}
                        className="h-5 w-5"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-600 font-medium mb-2">Total Sales (€)</label>
                    <input
                        type="number"
                        value={totalSales}
                        onChange={(e) => setTotalSales(Number(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-600 font-medium mb-2">Total Clients</label>
                    <input
                        type="number"
                        value={totalClients}
                        onChange={(e) => setTotalClients(Number(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                </div>
                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="w-1/2 bg-green-500 text-white p-3 rounded-md font-semibold hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 mr-2"
                    >
                        Update Revenue
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-1/2 bg-gray-400 text-white p-3 rounded-md font-semibold hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    >
                        Cancel Update
                    </button>
                </div>
            </form>
            {showModal && <ModalUpdateRevenue closeModal={closeModal} />}
        </div>
    );
};