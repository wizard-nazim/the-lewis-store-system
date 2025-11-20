// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import ShopContextProvider from "./context/ShopContext";

import Navbar from "./components/common/Navbar";
import SearchBar from "./components/common/SearchBar";
import Footer from "./components/common/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import Orders from "./pages/Orders";
import PlaceOrders from "./pages/PlaceOrders";
import Collection from "./pages/Collection";
import Contact from "./pages/Contact";
import Partners from "./components/common/Partners";

const AppContent = () => {
  return (
    <>
      <div className="px-4 sm:px-[-5vw] md:px-[7vw] lg:px-[9vw]">
        <Navbar />
        <SearchBar />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Product/:ProductId" element={<Product />} />
          <Route path="/Orders" element={<Orders />} />
          <Route path="/Place-Order" element={<PlaceOrders />} />
          <Route path="/Collection" element={<Collection />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Partners" element={<Partners />} />
        </Routes>

        <Footer />
      </div>
    </>
  );
};

const App = () => {
  return (
    <ShopContextProvider>
      <AppContent />
    </ShopContextProvider>
  );
};

export default App;
