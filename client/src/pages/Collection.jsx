import React, { useContext } from "react";
import { ShopContext } from "../components/context/ShopContext";
import Title from "../components/common/Title";
import ProductItem from "../components/common/ProductItem";

const Collection = () => {
  const { products } = useContext(ShopContext);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1="OUR" text2="COLLECTION" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Browse our products
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {products.map((item) => (
          <ProductItem
            key={item.id}
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

export default Collection;
