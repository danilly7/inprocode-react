import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useRevenueContext } from "../../../../context/revenue-context";

export const StackedAreaChart = () => {
    const { dayrev } = useRevenueContext();
    const data = dayrev.map((revenue) => ({
        title: revenue.title,
        totalSales: revenue.total_sales,
        totalClients: revenue.total_clients,
        ticketMedio: revenue.total_clients > 0 
            ? parseFloat((revenue.total_sales / revenue.total_clients).toFixed(2))
            : 0,
    }));

    return (
        <ResponsiveContainer width="100%" aspect={2}>
            <AreaChart
                width={500}
                height={400}
                data={data}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="title" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="totalSales" stackId="1" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="totalClients" stackId="1" stroke="#82caed" fill="#fad3cf" />
                <Area type="monotone" dataKey="ticketMedio" stackId="1" stroke="#81c784" fill="#a5d6a7" />
            </AreaChart>
        </ResponsiveContainer>
    )
};