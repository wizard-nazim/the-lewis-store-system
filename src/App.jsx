import { Routes, Route } from "react-router-dom";
import SystemTestPage from "./pages/SystemTestPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { CartProvider } from "./context/cartContext";
import Navbar from "./components/Navbar";

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<SystemTestPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </CartProvider>
  );
}

function Home() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">Home Page</h1>
      <p>This is just a placeholder home page. Go to System Test to test your backend.</p>
    </div>
  );
}

export default App;
