import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import agent from "../api/agent";
import { ShopContext } from "../components/context/ShopContext";

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const { addToBasket } = useContext(ShopContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await agent.Catalog.details(parseInt(productId));
        setProduct(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProduct();
  }, [productId]);

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <img src={product.pictureUrl} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: R{product.price}</p>
      <button onClick={() => addToBasket(product.id)}>Add to Cart</button>
    </div>
  );
};

export default Product;