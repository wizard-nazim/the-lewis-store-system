import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
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
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent text-nav-foreground placeholder:text-nav-foreground/50 px-2 py-2 outline-none"
        />

        {/* Search button */}
        <button className="bg-nav-foreground text-nav px-6 py-2 text-sm font-medium hover:bg-nav-foreground/90 transition-colors">
          Search
        </button>
      </div>

      {/* Close icon */}
      {assets.cross_icon && (
        <img
          onClick={() => setShowSearch(false)}
          className="inline w-3 cursor-pointer mt-2"
          src={assets.cross_icon}
          alt="Close search"
        />
      )}
    </div>
  );
};

export default SearchBar;
