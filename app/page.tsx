"use client";

import React, { useState } from "react";
import Hero from "./components/hero";
import About from "./components/about";
import Awards from "./components/award";
import Artworks from "./components/artworks";
import ReserveModal from "./components/ReserveModal/reserveModal";
const Page = () => {
  // وضعیت برای باز و بسته کردن مودال رزرو
  const [isModalOpen, setIsModalOpen] = useState(false);

  // تابع برای باز کردن مودال
  const openModal = () => setIsModalOpen(true);

  // تابع برای بستن مودال
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <Hero />
      <About />
      <Awards />
      <Artworks />

      <section className="bg-sky-200 py-16 text-center">
        <h2 className="text-3xl font-semibold text-white mb-4">
          Book Your Photography Session Now!
        </h2>
        <p className="text-lg text-white mb-6">
          Don&apos;t miss out on capturing those precious moments. Let&apos;s
          reserve your spot!
        </p>
        <button
          onClick={openModal}
          className="bg-sky-400 text-white py-2 px-6 rounded-full hover:bg-sky-500 transition-all"
        >
          Reserve Now
        </button>
      </section>

      {isModalOpen && <ReserveModal closeModal={closeModal} />}
    </div>
  );
};

export default Page;
