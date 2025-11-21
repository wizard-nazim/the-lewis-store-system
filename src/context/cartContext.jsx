import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const loadUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch("http://localhost:5000/api/account/currentUser", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch user");

      const data = await res.json();
      setUser({ email: data.email });
      if (data.basket?.items) {
        setCart(
          data.basket.items.map((item) => ({
            ...item.product,
            quantity: item.quantity,
          }))
        );
      }
    } catch (err) {
      console.error(err);
      localStorage.removeItem("token");
    }
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, user, setUser, logout }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
