import { useCompetitorsContext } from "../../../context/competitors-context";

export const CompetitorsTable: React.FC = () => {
    const { competitor, loading, error } = useCompetitorsContext();

    return (
        <div className="overflow-x-auto mb-6">

            {loading && (
                <div className="p-4 bg-yellow-100 text-yellow-700 rounded-md mb-4">
                    Loading competitors...
                </div>
            )}

            {error && (
                <div className="p-4 bg-red-100 text-red-700 rounded-md mb-4">
                    Error loading competitors: {error.message}
                </div>
            )}

            <div className="hidden lg:block lg:mx-8 mt-6">
                <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
                    <thead className="bg-gray-100 text-gray-600 text-sm">
                        <tr>
                            <th className="px-6 py-3 text-left">Competitor</th>
                            <th className="px-6 py-3 text-left">Address</th>
                            <th className="px-6 py-3 text-left">Distance</th>
                            <th className="px-6 py-3 text-left">Offers</th>
                            <th className="px-6 py-3 text-left">Price</th>
                            <th className="px-6 py-3 text-left">Hours</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-gray-700">
                        {competitor.map((competitor, index) => (
                            <tr
                                key={index}
                                className={`border-b ${competitor.name === 'La Teca de l\'Àvia' ? 'bg-yellow-100' : ''}`}
                            >
                                <td className="px-6 py-4">{competitor.name}</td>
                                <td className="px-6 py-4">{competitor.address}</td>
                                <td className="px-6 py-4">{competitor.distance}</td>
                                <td className="px-6 py-4">{competitor.offers}</td>
                                <td className="px-6 py-4">{competitor.price}</td>
                                <td className="px-6 py-4">{competitor.hours}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid lg:hidden mt-6">
                {competitor.map((competitor, index) => (
                    <div
                        key={index}
                        className={`bg-white border border-gray-200 shadow-md rounded-lg p-4 space-y-2 ${competitor.color}`}
                    >
                        <h3 className="text-lg font-semibold">{competitor.name}</h3>
                        <p><strong>Address:</strong> {competitor.address}</p>
                        <p><strong>Distance:</strong> {competitor.distance}</p>
                        <p><strong>Offers:</strong> {competitor.offers}</p>
                        <p><strong>Price:</strong> {competitor.price}</p>
                        <p><strong>Hours:</strong> {competitor.hours}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};