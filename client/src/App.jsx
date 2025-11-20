// src/App.jsx

import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import SearchBar from "./components/common/SearchBar";
import Footer from "./components/common/Footer";


// *** FIX: Corrected import path ***
import { ShopContext } from "../components/context/ShopContext";
// **********************************

import Home from "./pages/Home";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Collection from "./pages/Collection";
import ProductDetails from "./pages/ProductDetails";
import Contact from "./pages/Contact";
// Add other page imports as needed (e.g., Checkout, Orders)

function App() {
  // You might want to wrap your application logic with a Provider 
  // if ShopContext is exported as a Provider component (e.g., ShopContextProvider)
  // but for now, we just fix the import of the context object itself.
  
  return (
    // Assuming you have a wrapper component or layout here
    <div className="flex flex-col min-h-screen">
        <Navbar />
        <SearchBar />
        
        {/* Main Content Area */}
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/collection" element={<Collection />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/contact" element={<Contact />} />
                {/* Add other routes here */}
            </Routes>
        </main>

        <Footer />
    </div>
  );
}

export default App;