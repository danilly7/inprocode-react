import { Carrousel } from "../../components/carrousel-img";

export const Home = () => {

    return (
        <div className="p-8 flex flex-col items-center">
            <div className="text-center mb-12">
                <h1 className="text-5xl font-extrabold text-gray-800 mb-2">Rosticería Insight</h1>
                <h2 className="text-2xl text-gray-600 italic">Business Case: La Teca de l'Àvia</h2>
            </div>

            <Carrousel />

            <section className="p-8 bg-white rounded-2xl shadow-md max-w-3xl w-full">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Business Info</h2>
                <hr className="mb-4" />

                <div className="text-gray-700 space-y-4">
                    <p>
                        <span className="font-medium">Cuisine:</span> Spanish and Catalan
                    </p>
                    <p>
                        <span className="font-medium">Business Model:</span> Rotisserie for Takeaway (No Delivery)
                    </p>
                    <p>
                        <span className="font-medium">Menu:</span>
                        <ul className="list-disc list-inside">
                            <li>Tuesday to Friday: Daily menu (Menú del día)</li>
                            <li>Weekends and Bank Holidays: À la carte</li>
                        </ul>
                    </p>
                    <p>
                        <span className="font-medium">Direction:</span> Carrer del Degà Bahí, 5, Sant Martí, 08026 Barcelona
                    </p>
                    <p>
                        <span className="font-medium">Neighbourhood:</span> Clot
                    </p>
                    <p>
                        <span className="font-medium">Tel:</span> 93 450 33 42
                    </p>
                </div>

                <hr className="my-6" />

                <h3 className="text-xl font-semibold text-gray-800 mb-2">Opening Hours</h3>
                <div className="text-gray-700 space-y-2">
                    <p>
                        <span className="font-medium">Mon:</span> Closed
                    </p>
                    <p>
                        <span className="font-medium">Tue - Fri:</span> 11:30h - 18:00h
                    </p>
                    <p>
                        <span className="font-medium">Sat:</span> 11:30h - 18:00h
                    </p>
                    <p>
                        <span className="font-medium">Sun:</span> 11:00h - 15:30h
                    </p>
                    <p>
                        <span className="font-medium">Bank Holidays:</span> 11:00 - 15:30h
                    </p>
                </div>
            </section>
        </div>
    )
};