import { SimpleBarChart } from "../../components/revenue/graphics/simple-bar-chart";
import { StackedAreaChart } from "../../components/revenue/graphics/stacked-area-chart";

export const Graphics = () => {
    return (
        <div className="p-8">
            <h1 className="text-4xl font-bold mb-4">Revenue Overview through Graphs</h1>
            <SimpleBarChart />
            <StackedAreaChart />
        </div>
    )
};