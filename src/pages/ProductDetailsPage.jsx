import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/cartContext";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const backend = "http://localhost:5000";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${backend}/api/Products/${id}`);
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p className="p-10">Loading product...</p>;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`${product.name} added to cart (${quantity})`);
  };

  return (
    <div className="p-10">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
     <div className="w-full md:w-64 h-64 flex-shrink-0 overflow-hidden rounded-md">
  <img
    src={`${backend}${product.pictureUrl}`}
    alt={product.name}
    className="w-full h-full object-cover rounded-md transition-transform duration-300 ease-in-out transform hover:scale-105"
    onError={(e) => (e.target.src = "/fallback-image.png")}
  />
</div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-zinc-300">{product.description}</p>
          <p className="text-green-400 font-bold text-2xl">
            R {(product.price / 100).toFixed(2)}
          </p>

          {/* Quantity */}
          <div className="flex items-center gap-2">
            <label>Quantity:</label>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="w-20 px-2 py-1 rounded bg-zinc-800 border border-zinc-700"
            />
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="px-5 py-2 bg-green-600 hover:bg-green-700 rounded-lg w-40 mt-4"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
