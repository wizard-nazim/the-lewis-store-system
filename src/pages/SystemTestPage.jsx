import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";

const SystemTestPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const api = "http://localhost:5000/api";
  const server = "http://localhost:5000";

  const navigate = useNavigate();
  const { addToCart } = useCart();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        `${api}/Products?pageNumber=1&pageSize=50&orderBy=priceDesc`
      );

      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">System Functionality Test</h1>

      <button
        onClick={fetchProducts}
        className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium mb-8"
        disabled={loading}
      >
        {loading ? "Loading..." : "Fetch Products"}
      </button>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map((p) => (
            <div
              key={p.id}
              className="bg-zinc-900 p-5 rounded-2xl shadow max-w-sm flex flex-col"
            >
              {/* Image container with fixed square size */}
             {p.pictureUrl && (
  <div className="w-full h-64 flex-shrink-0 mb-4 overflow-hidden rounded-md">
    <img
      src={`${server}${p.pictureUrl}`}
      alt={p.name}
      className="w-full h-full object-cover rounded-md transition-transform duration-300 ease-in-out transform hover:scale-105"
      onError={(e) => (e.target.src = "/fallback-image.png")}
    />
  </div>
)}

              <h2 className="text-xl font-semibold">{p.name}</h2>
              <p className="text-zinc-300 line-clamp-3">{p.description}</p>

              <p className="text-green-400 font-bold mt-2">
                R {(p.price / 100).toFixed(2)}
              </p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => navigate(`/products/${p.id}`)}
                  className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                  Buy Now
                </button>

                <button
                  onClick={() => addToCart(p, 1)}
                  className="flex-1 px-3 py-2 bg-green-600 hover:bg-green-700 rounded-lg"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No products loaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default SystemTestPage;
