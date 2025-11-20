// src/main.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// *** FIX: Changed path from "./components/context/ShopContext" to "./context/ShopContext" ***
import { ShopContext } from "./components/context/ShopContext.jsx"; 
import "./index.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* Assuming you wrap App in a Provider, not just importing Context */}
      {/* <ShopContextProvider> */} 
        <App />
      {/* </ShopContextProvider> */}
    </BrowserRouter>
  </React.StrictMode>
);