import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
import { CompetitorsTable } from "../../components/competitors/competitors-table";

const containerStyle = {
    width: '100%',
    height: '400px',
};

const center = {
    lat: 41.41098633306224,
    lng: 2.182923509581615,
};

export const Map = () => {
    return (
        <>
            <div className="p-8">
                <h1 className="text-4xl font-bold mb-4">Direct Competitor Map</h1>
            </div>
            <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
                    <Marker position={center} />
                </GoogleMap>
            </LoadScript>
            <CompetitorsTable />
        </>
    )
};