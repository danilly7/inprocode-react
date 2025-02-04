import { useState } from "react";
import { Competitor } from "../interface";
import { GoogleMap, Marker, LoadScript, InfoWindow } from "@react-google-maps/api";
import { useCompetitorsContext } from "../../../context/competitors-context";
import Spinner from '../../ui/spinner'

const containerStyle = {
    width: '100%',
    height: '400px',
};

const center = {
    lat: 41.41098633306224,
    lng: 2.182923509581615,
};

const CompetitorsMap = () => {
    const { competitor, loading, error } = useCompetitorsContext();
    const [selectedCompetitor, setSelectedCompetitor] = useState<Competitor | null>(null);

    const validCompetitors = Array.from(new Set(competitor.map((c) => c.id_competitor)))
    .map((id) => competitor.find((c) => c.id_competitor === id))
    .filter((c) => c !== undefined)
    .filter((c) => {
        const lat = parseFloat(c.latitude);
        const lng = parseFloat(c.longitude);
        return !isNaN(lat) && !isNaN(lng);
    });

    return (
        <>
            {loading && (
                <div className="flex items-center justify-center h-96">
                    <Spinner />
                </div>
            )}

            {error && (
                <div className="error-message">Error: {error.message}</div>
            )}

            {!loading && !error && (
                <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={16}>
                        {validCompetitors.map((competitor) => (
                            <Marker
                                key={competitor.id_competitor}
                                position={{
                                    lat: parseFloat(competitor.latitude),
                                    lng: parseFloat(competitor.longitude),
                                }}
                                onClick={() => setSelectedCompetitor(competitor)}
                            />
                        ))}

                        {selectedCompetitor && (
                            <InfoWindow
                                position={{
                                    lat: parseFloat(selectedCompetitor.latitude),
                                    lng: parseFloat(selectedCompetitor.longitude),
                                }}
                                onCloseClick={() => setSelectedCompetitor(null)}
                            >
                                <div>
                                    <h3>{selectedCompetitor.name}</h3>
                                    <p>{selectedCompetitor.address}</p>
                                </div>
                            </InfoWindow>
                        )}
                    </GoogleMap>
                </LoadScript>
            )}
        </>
    );
};

export default CompetitorsMap;