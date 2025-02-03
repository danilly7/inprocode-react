import { CompetitorsMap } from "../../components/competitors/competitors-map";
import { CompetitorsTable } from "../../components/competitors/competitors-table";

export const Map = () => {
    return (
        <>
            <div className="p-8">
                <h1 className="text-4xl font-bold mb-4">Direct Competitors Map</h1>
            </div>

            <CompetitorsMap />
            <CompetitorsTable />
        </>
    );
};