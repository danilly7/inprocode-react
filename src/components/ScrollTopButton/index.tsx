import { useEffect, useState } from "react";

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-9 right-9 w-14 h-14 bg-gray-800 text-yellow-500 font-extrabold border-2 border-yellow-400 text-2xl hover:bg-yellow-400 hover:bg-opacity-90 hover:text-gray-900 rounded-full flex items-center justify-center hover:font-bold"
        aria-label="Scroll to top"
      >
        ↑
      </button>
    )
  );
};
