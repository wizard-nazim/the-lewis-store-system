import React from "react";
import { assets } from "../../assets/assets";

const partners = [
  {
    src: assets.partner6,
    alt: "Partner 1 Logo",
    link: "https://www.lewisgroup.co.za",
  },
  {
    src: assets.partner2,
    alt: "Partner 2 Logo",
    link: "https://www.bestelectric.co.za",
  },
  { src: assets.partner3, alt: "Partner 3 Logo", link: "https://beares.co.za" },
  {
    src: assets.partner4,
    alt: "Partner 4 Logo",
    link: "https://www.unitedfurnitureoutlets.co.za",
  },
  {
    src: assets.partner5,
    alt: "Partner 5 Logo",
    link: "https://shop.bedzone.co.za",
  },
];

const PartnerLogo = ({ src, alt, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer" className="block">
    <div className="flex items-center justify-center bg-white rounded-lg border border-gray-300 shadow-md p-6 h-32 overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105">
      <img
        src={src}
        alt={alt}
        className="w-[80px] animation-move"
        style={{ animation: "move 4s ease-in-out infinite alternate" }}
      />
    </div>
  </a>
);

const Partners = () => {
  return (
    <>
      <style>{`
        @keyframes move {
          0% { transform: translateX(0); }
          100% { transform: translateY(10px); }
        }
      `}</style>

      <div className="bg-white shadow-md rounded-xl p-6 border border-gray-300">
        <div className="container mx-auto px-4">
          <div className="flex justify-around items-center">
            {partners.map((partner, index) => (
              <PartnerLogo key={index} {...partner} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Partners;
