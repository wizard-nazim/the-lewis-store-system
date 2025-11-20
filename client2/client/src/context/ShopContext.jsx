import { createContext, useState } from "react";
import { products } from "../assets/assets";

// Create the context
export const ShopContext = createContext();

// Provider component
const ShopContextProvider = ({ children }) => {
  const currency = "R";
  const delivery_fee = 10;

  // Search state
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  // Context value
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
