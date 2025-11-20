import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { assets } from "../../assets/assets";
import AuthPopup from "../AuthPopup";

const Navbar = () => {
  const [visible, setVisible] = useState(false); // Mobile menu
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // "login" or "register"

  const openAuthPopup = (mode) => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-nav text-nav-foreground">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-5">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img
                src={assets.LewisStore_Logo}
                className="w-32"
                alt="Lewis Store Logo"
              />
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden sm:flex items-center justify-center flex-1 mx-8">
              <div className="border border-nav-pill rounded-full px-6 py-2">
                <ul className="flex gap-8 text-sm">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      cn(
                        "hover:text-nav-foreground/80 transition-colors",
                        isActive && "text-nav-foreground font-medium"
                      )
                    }
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/About"
                    className={({ isActive }) =>
                      cn(
                        "hover:text-nav-foreground/80 transition-colors",
                        isActive && "text-nav-foreground font-medium"
                      )
                    }
                  >
                    About
                  </NavLink>
                  <NavLink
                    to="/Collection"
                    className={({ isActive }) =>
                      cn(
                        "hover:text-nav-foreground/80 transition-colors",
                        isActive && "text-nav-foreground font-medium"
                      )
                    }
                  >
                    Collection
                  </NavLink>
                  <NavLink
                    to="/Contact"
                    className={({ isActive }) =>
                      cn(
                        "hover:text-nav-foreground/80 transition-colors",
                        isActive && "text-nav-foreground font-medium"
                      )
                    }
                  >
                    Contact
                  </NavLink>
                </ul>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-6">
              {/* User Icon with Professional Dropdown */}
              <div className="relative hidden sm:flex items-center">
                <div className="group relative cursor-pointer">
                  <img src={assets.user_icon} alt="User" className="w-6 h-6" />

                  {/* Dropdown */}
                  <div
                    className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-md opacity-0 invisible
                               group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
                  >
                    <button
                      onClick={() => openAuthPopup("login")}
                      className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100 rounded-md transition-colors duration-150"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => openAuthPopup("register")}
                      className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100 rounded-md transition-colors duration-150 mt-1"
                    >
                      Register
                    </button>
                  </div>
                </div>
              </div>

              {/* Cart */}
              <Link to="/cart" className="relative hidden sm:block">
                <img
                  src={assets.cart_icon}
                  className="w-5 min-w-5"
                  alt="Cart"
                />
                <span className="absolute -right-1 -bottom-1 w-4 h-4 text-center leading-4 bg-nav-accent text-white rounded-full text-[10px] font-medium">
                  3
                </span>
              </Link>

              {/* Mobile Menu Icon */}
              <button
                onClick={() => setVisible(true)}
                className="sm:hidden"
                aria-label="Open menu"
              >
                <img
                  src={assets.menu_icon}
                  className="w-5 cursor-pointer"
                  alt="Menu"
                />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="pb-5">
            <div className="bg-search-input rounded-full flex items-center px-6 py-3 max-w-2xl mx-auto bg-gray-300">
              <img src={assets.search_icon} className="w-5 mr-3" alt="Search" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent text-nav-foreground placeholder:text-nav-foreground/50 outline-none flex-1"
              />
              <button className="bg-nav-foreground text-nav px-6 py-1.5 rounded-full text-sm font-medium hover:bg-nav-foreground/90 transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={cn(
          "fixed top-0 right-0 bottom-0 z-50 bg-background overflow-hidden transition-all duration-300",
          visible ? "w-full" : "w-0"
        )}
      >
        <div className="flex flex-col text-foreground">
          <button
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-6 cursor-pointer hover:bg-muted/50 rounded-none border-none"
          >
            <img
              src={assets.dropdown_icon}
              className="h-4 rotate-90"
              alt="Back"
            />
            <span>Back</span>
          </button>

          <NavLink
            onClick={() => setVisible(false)}
            className="py-4 px-6 border-b hover:bg-muted/50 transition-colors"
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-4 px-6 border-b hover:bg-muted/50 transition-colors"
            to="/Collection"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-4 px-6 border-b hover:bg-muted/50 transition-colors"
            to="/About"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-4 px-6 border-b hover:bg-muted/50 transition-colors"
            to="/Contact"
          >
            CONTACT
          </NavLink>

          {/* Mobile Login/Register Buttons */}
          <div className="mt-6 px-6 flex flex-col gap-3">
            <button
              onClick={() => {
                setAuthMode("login");
                setAuthOpen(true);
                setVisible(false);
              }}
              className="py-3 text-center bg-black text-white rounded-lg hover:bg-black/90 hover:shadow-[0_0_8px_#FF0000] transition-all duration-200"
            >
              Login
            </button>
            <button
              onClick={() => {
                setAuthMode("register");
                setAuthOpen(true);
                setVisible(false);
              }}
              className="py-3 text-center bg-red-600 text-white rounded-lg hover:bg-red-700 hover:shadow-[0_0_8px_#000000] transition-all duration-200"
            >
              Register
            </button>
          </div>
        </div>
      </div>

      {/* Auth Popup */}
      <AuthPopup
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        mode={authMode}
      />
    </>
  );
};

export default Navbar;
