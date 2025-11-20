import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import ProductItem from "./ProductItem";
// *** FIX: Changed relative path to point to the correct src/context directory ***
import { ShopContext } from "../components/context/ShopContext";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    // Sort by date (assuming 'date' is a numeric timestamp) and take the first 5
    // This logic relies on the full product object being available, which the agent.js transform ensures.
    const sortedProducts = [...products].sort((a, b) => b.date - a.date);
    setLatestProducts(sortedProducts.slice(0, 5));
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1="LATEST" text2="COLLECTION" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Latest ITEMS NOW AVAILABLE
        </p>
      </div>

      {/* Rendering Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.map((item, index) => (
          <ProductItem
            key={item.id || index} // Use item.id as key now that it's from the API
            id={item.id}
            pictureUrl={item.pictureUrl}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;