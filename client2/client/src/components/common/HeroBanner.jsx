import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";

const HeroBanner = () => {
  return (
    <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] overflow-hidden">
      {/* Background Image */}
      <img
        src={assets.landingPage_bg}
        alt="Hero Banner"
        className="w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Text Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-8 lg:px-16 text-white">
        <div className="flex items-center gap-2 mb-2">
          <p className="w-8 md:w-11 h-[2px] bg-white"></p>
          <p className="font-medium text-sm md:text-base">Our Best Seller</p>
          <p className="w-8 md:w-11 h-[2px] bg-white"></p>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
          Latest Arrivals
        </h1>

        {/* SHOP NOW Button */}
        <button>
          <Link to="/Collection" className="px-2 py-2 rounded-full">
            SHOP NOW
          </Link>
        </button>
      </div>
    </div>
  );
};

export default HeroBanner;
