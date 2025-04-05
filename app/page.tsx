import React from "react";

const page = () => {
  return (
    <div>
      <section
        className="relative w-full h-[90vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/header/header.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 h-full flex flex-col items-start justify-center text-white text-left px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-5 max-w-2xl">
            Immortalize your moments.
          </h1>
          <p className="text-lg md:text-xl mb-6 max-w-2xl">
            With an eye that hunts for beauty
          </p>
        </div>
      </section>
    </div>
  );
};

export default page;
