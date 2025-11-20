import React from "react";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="mt-40">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-sm">
        {/* Column 1 */}
        <div className="flex flex-col">
          <img src={assets.LewisStore_Logo} className="mb-5 w-32" alt="Logo" />
        </div>

        {/* Column 2 */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <p className="text-xl font-medium mb-5">Contact Info</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+27 92 294 9455</li>
            <li>Lewis@furniture.co.za</li>
          </ul>
        </div>
      </div>

      {/* Copyright Row */}
      <hr className="mt-10" />
      <p className="py-5 text-sm text-center text-gray-600">
        © 2025 Lewis.com — All Rights Reserved
      </p>
    </div>
  );
};

export default Footer;
