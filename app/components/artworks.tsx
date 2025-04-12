"use client";

import React, { useState, useEffect, useRef } from "react";

const Artworks = () => {
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const galleryRef = useRef(null);

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
    setIsSliderOpen(true);
  };

  const handleClose = () => setIsSliderOpen(false);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? 7 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === 7 ? 0 : prev + 1));
  };

  useEffect(() => {
    document.body.style.overflow = isSliderOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSliderOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    if (galleryRef.current) observer.observe(galleryRef.current);

    return () => {
      if (galleryRef.current) observer.unobserve(galleryRef.current);
    };
  }, [hasAnimated]);

  return (
    <section className="w-full py-42 sm:py-20 px-4 bg-white relative">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-zinc-700 mb-4">
          Photography Artworks Examples
        </h2>
        <p className="text-zinc-500 mb-12">
          See the best shots, that we&apos;ve arranged into a portfolio
        </p>

        <div
          ref={galleryRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="w-full h-[200px] cursor-pointer transition-transform duration-500 ease-in-out transform hover:scale-105 hover:-translate-y-1 hover:z-10"
              onClick={() => handleImageClick(index)}
            >
              <img
                src={`/artwork/artwork${index + 1}.png`}
                alt={`Artwork ${index + 1}`}
                className={`w-full h-full object-cover rounded-md transition-all duration-500 ease-in-out
      ${hasAnimated ? "animate-slideIn" : ""}
    `}
                style={{
                  animationDuration: "1s",
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: "both",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {isSliderOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-opacity-5 backdrop-blur-sm z-10"></div>

          <div className="relative max-w-[80%] max-h-[80vh] bg-white p-4 rounded-lg shadow-xl z-20">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-zinc-700 text-3xl
              hover:text-white hover:bg-rose-500 hover:shadow-lg hover:rounded-full
              hover:scale-110 hover:rotate-90 transition-all duration-300 ease-in-out p-2 z-30"
            >
              &times;
            </button>

            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-700 text-3xl
              hover:text-white hover:bg-zinc-700 hover:shadow-lg hover:rounded-full
              hover:scale-110 hover:-translate-y-1 hover:ring-2 hover:ring-zinc-400
              transition-all duration-300 ease-in-out p-2 z-30"
            >
              &lt;
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-zinc-700 text-3xl
              hover:text-white hover:bg-zinc-700 hover:shadow-lg hover:rounded-full
              hover:scale-110 hover:-translate-y-1 hover:ring-2 hover:ring-zinc-400
              transition-all duration-300 ease-in-out p-2 z-30"
            >
              &gt;
            </button>

            <img
              key={currentIndex}
              src={`/artwork/artwork${currentIndex + 1}.png`}
              alt={`Artwork ${currentIndex + 1}`}
              className="w-full h-[70vh] object-contain transition-opacity duration-700 ease-in-out animate-fadeIn"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Artworks;
