import React from "react";

const Awards = () => {
  return (
    <section className="w-full py-8 px-4 bg-sky-200">
      <div className="max-w-6xl mx-auto text-center">
        <h3 className="text-neutral-50 font-bold my-4 text-2xl sm:text-3xl md:text-4xl w-fit mx-auto pb-2">
          Awards
        </h3>

        {/* Logo and Text Section */}
        <div className="flex flex-col md:flex-row justify-center items-center md:items-end mt-8 space-y-14 md:space-y-0 md:gap-32">
          {/* MyWed */}
          <div className="flex flex-col items-center">
            <img
              src="/awards/mywedLogo.svg"
              alt="MyWed Logo"
              className="w-24 sm:w-33 mb-4"
            />
            <p className="font-bold text-neutral-50 text-center text-base sm:text-lg">
              Best Photo of the Year
            </p>
          </div>

          {/* WPPI */}
          <div className="flex flex-col items-center">
            <img
              src="/awards/wppiLogo.png"
              alt="WPPI Logo"
              className="w-20 sm:w-20 mb-4"
            />
            <p className="font-bold text-neutral-50 text-center text-base sm:text-lg">
              Only First Half Competition
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Awards;
