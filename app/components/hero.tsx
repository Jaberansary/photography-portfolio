import React from "react";

const Hero = () => {
  // const scrollToReserve = () => {
  //   const section = document.getElementById("reserve");
  //   section?.scrollIntoView({ behavior: "smooth" });
  // };

  return (
    <section
      className="relative w-full h-[90vh] bg-cover bg-center"
      style={{ backgroundImage: "url('/header/header.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 h-full flex flex-col items-start justify-center text-white text-left px-4 ml-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-5 max-w-2xl">
          Immortalize your moments.
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-6 max-w-2xl text-left">
          With an eye that hunts for beauty
        </p>

        <a
          href="#reserve"
          className="relative inline-block px-8 py-3 rounded-full border border-white text-white font-semibold overflow-hidden group transition-all duration-300 ease-in-out hover:bg-white hover:text-gray-800"
        >
          <span className="absolute inset-0 bg-white opacity-10 group-hover:animate-shimmer"></span>
          <span className="relative z-10">Book a Session</span>
        </a>
      </div>
    </section>
  );
};

export default Hero;
