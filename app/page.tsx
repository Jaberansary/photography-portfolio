import React from "react";

import Hero from "./components/hero";
import About from "./components/about";
import Awards from "./components/award";
import Artworks from "./components/artworks";

const page = () => {
  return (
    <div>
      <Hero />
      <About />
      <Awards />
      <Artworks />
    </div>
  );
};

export default page;
