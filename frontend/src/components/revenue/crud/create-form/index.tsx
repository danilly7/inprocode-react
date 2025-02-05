import { useState } from 'react';
import { ModalAddRevenue } from '../create-modal';
import { DailyRevenue } from '../../interface';
import { useRevenueContext } from '../../../../context/revenue-context';

interface AddRevenueFormProps {
    onSuccess: (newRevenue: Omit<DailyRevenue, "id_dailyrev">) => Promise<void>;
}

export const AddRevenueForm: React.FC<AddRevenueFormProps> = ({ onSuccess }) => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(() => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    });
    const [closed, setClosed] = useState(false);
    const [bankHoliday, setBankHoliday] = useState(false);
    const [totalSales, setTotalSales] = useState<number | "">("");
    const [totalClients, setTotalClients] = useState<number | "">("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [weekdayId, setWeekdayId] = useState<number>(0);
    const [showModal, setShowModal] = useState(false);

    const { dayrev } = useRevenueContext();

    const today = new Date(); //sino da problemas a medianoche o así
    const offset = today.getTimezoneOffset();
    const localToday = new Date(today.getTime() - (offset * 60 * 1000)).toISOString().split('T')[0];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const existingEntry = dayrev.find((revenue) => revenue.date === date);
        if (existingEntry) {
            setError('Ya existe una entrada para esta fecha.');
            return;
        }

        const parsedSales = parseFloat(totalSales as string);
        const parsedClients = parseInt(totalClients as string);

        if (isNaN(parsedSales) || isNaN(parsedClients)) {
            setError('Total Sales and Total Clients must be valid numbers.');
            return;
        }

        if (parsedSales < 0 || parsedClients < 0) {
            setError('Total Sales and Total Clients cannot be negative.');
            return;
        }

        const newRevenue = {
            title,
            date,
            closed,
            bank_holiday: bankHoliday,
            total_sales: parsedSales,
            total_clients: parsedClients,
            weekday_id: weekdayId,
        };

        setLoading(true);
        setError(null);

        try {
            await onSuccess(newRevenue);
            setShowModal(true);
            setTitle('');
            setDate('');
            setClosed(false);
            setBankHoliday(false);
            setTotalSales(0);
            setTotalClients(0);
            setWeekdayId(0);
        } catch (error) {
            setError('Error adding revenue');
            console.error('Error adding revenue:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDate = e.target.value;
        setDate(selectedDate);

        const weekdayId = new Date(selectedDate).getDay() + 1;
        setWeekdayId(weekdayId);
    };

    const closeModal = () => setShowModal(false);

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
            >
                <h3 className="text-center text-2xl font-semibold mb-6 text-gray-700">Add New Revenue</h3>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <div className="mb-4">
                    <label className="block text-gray-600 font-medium mb-2">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder='Daily Revenue - '
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-600 font-medium mb-2">Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={handleDateChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                        max={localToday}
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
                        step="0.01"
                        value={totalSales !== "" ? totalSales : ""}
                        onChange={(e) => {
                            const inputValue = e.target.value;
                            setTotalSales(inputValue === "" ? "" : parseFloat(inputValue));
                        }}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                        min="0"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-600 font-medium mb-2">Total Clients</label>
                    <input
                        type="number"
                        value={totalClients !== "" ? totalClients : ""}
                        onChange={(e) => {
                            const inputValue = e.target.value;
                            setTotalClients(inputValue === "" ? "" : parseInt(inputValue));
                        }}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                        min="0"
                    />
                </div>
                <button
                    type="submit"
                    className={`w-full bg-green-500 text-white p-3 rounded-md font-semibold hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading}
                >
                    {loading ? 'Adding...' : 'Add Revenue'}
                </button>
            </form>

            {showModal && <ModalAddRevenue closeModal={closeModal} onCloseForm={() => setShowModal(false)} />}
        </div>
    );
};