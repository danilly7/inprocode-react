import { useRevenueContext } from "../../../../context/revenue-context";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const SimpleBarChart = () => {
    const { dayrev } = useRevenueContext();
    const data = dayrev.map((revenue) => ({
        title: revenue.title,
        totalSales: revenue.total_sales,
        totalClients: revenue.total_clients
    }));

    return (
        <ResponsiveContainer width="100%" aspect={2} >
            <BarChart
                data={data}
                width={500}
                height={300}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
            >
                <CartesianGrid strokeDasharray="4 1 2" />
                <XAxis dataKey="title" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="totalSales" fill="#6b48ff" />
                <Bar dataKey="totalClients" fill="#1ee3cf" />
            </BarChart>
        </ResponsiveContainer>
    );
};