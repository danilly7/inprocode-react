import { images } from "../../data/img";
import { useState } from "react";

export const Carrousel = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

    const goToPrev = (): void => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const goToNext = (): void => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <section className="w-full bg-white rounded-2xl shadow-md p-6 flex justify-center items-center mb-12 max-w-4xl">
            <div className="relative w-full">
                <img
                    src={images[currentImageIndex].src}
                    alt={images[currentImageIndex].alt}
                    className="w-full h-auto rounded-lg object-cover"
                />

                <button
                    onClick={goToPrev}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 hover:bg-gray-200 rounded-full p-2 shadow-md"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                </button>
                <button
                    onClick={goToNext}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 hover:bg-gray-200 rounded-full p-2 shadow-md"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button>
            </div>
        </section>
    )
};