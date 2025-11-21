// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/cartContext";

export default function Navbar() {
  const { cart, user, setUser, setCart } = useCart();
  const navigate = useNavigate();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setCart([]);
    navigate("/");
  };

  return (
    <nav className="p-4 bg-zinc-900 flex justify-between items-center relative">
      <div className="flex gap-4 items-center">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/test" className="hover:underline">
          System Test
        </Link>

        {user ? (
          <>
            <span className="text-green-400">Hello, {user.email}</span>
            <button
              onClick={handleLogout}
              className="ml-4 px-3 py-1 bg-red-600 hover:bg-red-700 rounded-lg"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </>
        )}
      </div>

      <div>
        <Link to="/cart" className="relative hover:underline">
          <FaShoppingCart size={24} />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
