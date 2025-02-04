import { SimpleBarChart } from "../../components/revenue/graphics/simple-bar-chart";
import { StackedAreaChart } from "../../components/revenue/graphics/stacked-area-chart";
import { useRevenueContext } from "../../context/revenue-context";

const Graphics = () => {
    const { loadMore, hasMore } = useRevenueContext();

    return (
        <div className="p-8">
            <h1 className="text-4xl font-bold mb-4">Revenue Overview through Graphs</h1>

            <div className="text-center sm:text-end mt-5 mb-12">

                <button
                    onClick={loadMore}
                    disabled={!hasMore}
                    className={`bg-green-500 text-white p-2 rounded-lg hover:bg-green-700 ${!hasMore && "opacity-50 cursor-not-allowed"}`}
                >
                    Load More Data
                </button>
            </div>
            
            <SimpleBarChart />
            <StackedAreaChart />
        </div>
    );
};

export default Graphics;