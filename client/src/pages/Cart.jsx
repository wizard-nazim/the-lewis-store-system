import React, { useContext } from "react";
import { ShopContext } from "../components/context/ShopContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { basket, removeFromBasket, currency, delivery_fee } = useContext(ShopContext);

  if (!basket || basket.items.length === 0) return <div>Cart is empty</div>;

  const subtotal = basket.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + delivery_fee;

  return (
    <div>
      {basket.items.map((item) => (
        <div key={item.productId}>
          <p>{item.productName} x {item.quantity} - {currency}{item.price * item.quantity}</p>
          <button onClick={() => removeFromBasket(item.productId, 1)}>Remove</button>
        </div>
      ))}
      <p>Subtotal: {currency}{subtotal}</p>
      <p>Delivery: {currency}{delivery_fee}</p>
      <p>Total: {currency}{total}</p>
      <Link to="/checkout">Proceed to Checkout</Link>
    </div>
  );
};

export default Cart;