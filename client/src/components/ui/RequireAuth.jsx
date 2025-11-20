import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ShopContext } from "../components/context/ShopContext";

const RequireAuth = ({ children }) => {
  const { user } = useContext(ShopContext);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/" state={{ from: location }} />; // Redirect to home or login page
  }

  return children;
};

export default RequireAuth;