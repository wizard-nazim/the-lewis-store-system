import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import ProductItem from "./ProductItem";
// *** FIX: Changed relative path to point to the correct src/context directory ***
import { ShopContext } from "../components/context/ShopContext";


const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    // This logic now works on the products fetched and transformed by agent.js
    const bestProduct = products.filter((item) => item.bestseller); 
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1="BEST" text2="SELLERS" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Buy now before there is no more
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {/* The ProductItem component now receives the correct props thanks to agent.js transformation */}
        {bestSeller.map((item, index) => (
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

export default BestSeller;