import React, { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <div className="relative group overflow-hidden rounded-lg shadow-inner">
      {/* Image */}
      <img
        src={image[0]}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
      />

      {/* Inner Shadow */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>

      {/* Hover Overlay */}
      <Link
        to={`/product/${id}`}
        className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <button className="rounded-lg px-4 py-2 bg-white text-black font-medium rounded hover:bg-gray-200">
          View Product
        </button>
      </Link>

      {/* Product Info */}
      <div className="mt-2 text-center">
        <p className="pt-1 text-sm">{name}</p>
        <p className="text-sm font-medium">
          {currency}
          {price}
        </p>
      </div>
    </div>
  );
};

export default ProductItem;
