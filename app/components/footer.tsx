import React from "react";
import { FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* About Section */}
        <div className="text-center md:text-left max-w-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            About This Project
          </h3>
          <p className="text-sm text-gray-500 leading-6">
            A fictional photography booking experience created to showcase
            front-end creativity and design skills. Built with React and
            TailwindCSS.
          </p>
        </div>

        {/* Social / Connect */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Connect</h3>
          <div className="flex justify-center gap-6 text-gray-600 text-2xl">
            <a
              href="https://www.linkedin.com/in/your-profile"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-sky-600 transition"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.instagram.com/your-profile"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-pink-500 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="mailto:your.email@example.com"
              aria-label="Email"
              className="hover:text-[#6001D2] transition-colors duration-200"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-10 pt-6 border-t border-gray-100 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Your Name. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
