import React from "react";

const About = () => {
  return (
    <section className="w-full py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-zinc-500 text-xl sm:text-xl my-6">
          I am Photographer
        </p>
        <h2 className="text-zinc-700 text-4xl sm:text-5xl md:text-6xl my-6 border-b-2 border-black w-fit mx-auto pb-2">
          Alice Newlade
        </h2>
        <p className="text-zinc-700 my-6 text-base sm:text-lg md:text-xl">
          I am a passionate photographer with over 6 years of experience
          capturing moments from various events. My portfolio spans weddings,
          portraits, landscapes, and editorial photography. My goal is to tell
          stories through the lens of my camera and Create memorable images for
          my clients.
        </p>
      </div>
    </section>
  );
};

export default About;
