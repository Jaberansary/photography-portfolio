import React from "react";

import Hero from "./components/hero";
import About from "./components/about";
import Awards from "./components/award";

const page = () => {
  return (
    <div>
      <Hero />
      <About />
      <Awards />
    </div>
  );
};

export default page;
