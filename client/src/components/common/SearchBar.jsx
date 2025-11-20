import React, { useContext, useEffect, useState } from "react";
// *** FIX: Changed relative path to point to the correct src/context directory ***
import { ShopContext } from "../context/ShopContext";

import { assets } from "../../assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const {
    search = "",
    setSearch = () => {},
    showSearch = false,
    setShowSearch = () => {},
  } = useContext(ShopContext) || {};

  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const isCollection = location.pathname.toLowerCase().includes("collection");
    setVisible(isCollection);

    if (isCollection && showSearch) {
      const timeout = setTimeout(() => setFadeIn(true), 10);
      return () => clearTimeout(timeout);
    } else {
      setFadeIn(false);
    }
  }, [location, showSearch]);

  if (!showSearch || !visible) return null;

  return (
    <div
      className={`border-t border-b bg-gray-50 text-center transition-opacity duration-500 ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="bg-search-input flex items-center max-w-2xl mx-auto rounded-full overflow-hidden bg-gray-300">
        {/* Search icon */}
        <img
          src={assets.search_icon}
          alt="Search"
          className="w-5 h-5 ml-4 mr-3"
        />

        {/* Input */}
        <input
          type="text"
          placeholder="Search..."
          // COMPLETE THE REST OF THE INPUT TAG
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent text-gray-700 placeholder:text-gray-500 outline-none flex-1 py-2"
        />
        {/* The component you provided was missing the end of the input tag. 
            I'm assuming it should use the search state from context. */}
      </div>
    </div>
  );
};

export default SearchBar;