import { Carrousel } from "../../components/business/carrousel-img";
import { InfoTeca } from "../../components/business/info";

const Home = () => {

    return (
        <div className="p-8 flex flex-col items-center">
            <div className="text-center mb-12">
                <h1 className="text-5xl font-extrabold text-gray-800 mb-2">Rosticería Insight</h1>
                <h2 className="text-2xl text-gray-600 italic">Business Case: La Teca de l'Àvia</h2>
            </div>

            <Carrousel />
            <InfoTeca />
            
        </div>
    )
};

export default Home;