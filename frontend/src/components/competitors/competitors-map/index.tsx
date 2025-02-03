import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
import { useCompetitorsContext } from "../../../context/competitors-context";

const containerStyle = {
    width: '100%',
    height: '400px',
};

const center = {
    lat: 41.41098633306224,
    lng: 2.182923509581615,
};

export const CompetitorsMap = () => {
    const { competitor, loading, error } = useCompetitorsContext();

    return (
        <>
            {loading && (
                <div className="loading-message">Loading competitors...</div>
            )}

            {error && (
                <div className="error-message">Error: {error.message}</div>
            )}

            {!loading && !error && (
                <>
                    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
                            {competitor.map((competitor) => {
                                console.log("Rendering Marker for:", competitor); // Log for each marker
                                return (
                                    <Marker
                                        key={competitor.id_competitor}
                                        position={{
                                            lat: competitor.latitude,
                                            lng: competitor.longitude
                                        }}
                                    />
                                );
                            })}
                        </GoogleMap>
                    </LoadScript>
                </>
            )}
        </>
    );
};