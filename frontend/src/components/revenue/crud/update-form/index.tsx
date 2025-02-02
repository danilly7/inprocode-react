import { useState, useEffect } from "react";
import { useRevenueContext } from "../../../../context/revenue-context";
import { DailyRevenue } from "../../interface";

interface UpdateRevenueFormProps {
    revenue: DailyRevenue;
    onClose: () => void;
}

export const UpdateRevenueForm = ({ revenue, onClose }: UpdateRevenueFormProps) => {
    const { updateRevenue, refreshRevenue } = useRevenueContext();
    const [title, setTitle] = useState(revenue.title);
    const [date, setDate] = useState(revenue.date);
    const [closed, setClosed] = useState(revenue.closed);
    const [bankHoliday, setBankHoliday] = useState(revenue.bank_holiday);
    const [totalSales, setTotalSales] = useState(revenue.total_sales);
    const [totalClients, setTotalClients] = useState(revenue.total_clients);
    const [weekdayId, setWeekdayId] = useState(revenue.weekday_id);

    useEffect(() => {
        setTitle(revenue.title);
        setDate(revenue.date);
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
            date,
            closed,
            bank_holiday: bankHoliday,
            total_sales: totalSales,
            total_clients: totalClients,
            weekday_id: weekdayId,
        };

        try {
            await updateRevenue(revenue.id_dailyrev, updatedRevenue);
            onClose();
            setTimeout(() => {
                refreshRevenue();
            }, 300); 
        } catch (error) {
            console.error("Error updating revenue:", error);
        }
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
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
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
                        className="bg-green-500 text-white p-3 rounded-md font-semibold hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        Update Revenue
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-500 text-white p-3 rounded-md font-semibold hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};