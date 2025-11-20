import React from "react";
import { assets } from "../../assets/assets";

// Define policy data with animation type
const policies = [
  {
    icon: assets.exchange_icon,
    alt: "Exchange Icon",
    title: "Easy Exchange Policy",
    description:
      "Our Easy Exchange Policy allows you to return or exchange any product that doesn’t meet your expectations, making the process fast, simple, and hassle-free.",
    animation: "rotate", // rotate arrows
  },
  {
    icon: assets.reliable_icon,
    alt: "Reliability Icon",
    title: "Fast and Reliable Delivery",
    description:
      "Enjoy fast and reliable delivery on every order. We ensure your products arrive promptly and safely, with real-time tracking for complete peace of mind.",
    animation: "bounce", // bounce truck/time
  },
  {
    icon: assets.secure_icon,
    alt: "Security Icon",
    title: "Secure Payment",
    description:
      "Shop with confidence knowing all transactions are protected with advanced encryption, keeping your payment details and personal information safe and private.",
    animation: "pulse", // pulse lock
  },
];

const PolicyItem = ({ icon, alt, title, description, animation }) => {
  // Map animation type to Tailwind classes
  const animationClass = {
    rotate: "group-hover:animate-spin-slow",
    bounce: "group-hover:animate-bounce-slow",
    pulse: "group-hover:animate-pulse-slow",
  }[animation];

  return (
    <div
      className={`group flex flex-col items-center text-center 
        bg-white 
        shadow-lg 
        rounded-2xl 
        p-8 
        border border-gray-300
        transition-transform duration-300 
        hover:scale-105 hover:shadow-xl cursor-pointer`}
    >
      <img
        src={icon}
        alt={alt}
        className={`w-12 h-12 mb-4 transition-transform ${animationClass}`}
      />
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

const OurPolicy = () => (
  <section className="py-16">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {policies.map((policy, idx) => (
          <PolicyItem key={idx} {...policy} />
        ))}
      </div>
    </div>
  </section>
);

export default OurPolicy;
