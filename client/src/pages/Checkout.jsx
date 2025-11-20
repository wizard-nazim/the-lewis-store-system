import React, { useContext, useState } from "react";
import { ShopContext } from "../components/context/ShopContext";
import agent from "../api/agent";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { basket, setBasket, user, delivery_fee } = useContext(ShopContext);
  const [paymentIntent, setPaymentIntent] = useState(null);
  const navigate = useNavigate();

  if (!user) return <div>Please login to checkout.</div>;

  const handleCreateIntent = async () => {
    try {
      const intent = await agent.Payments.createPaymentIntent();
      setPaymentIntent(intent);
      setBasket(intent); // Update basket with intent/clientSecret
    } catch (err) {
      console.error(err);
    }
  };

  const handleSimulatePayment = async () => {
    try {
      await agent.Payments.simulateWebhook(basket.paymentIntentId);
      const order = await agent.Orders.create({ basketId: basket.id }); // Adjust if backend requires more fields like address
      navigate("/orders");
    } catch (err) {
      console.error(err);
    }
  };

  // Add form for address if needed; for now, simple basket summary
  const subtotal = basket.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + delivery_fee;

  return (
    <div>
      <h2>Checkout</h2>
      {basket.items.map((item) => (
        <div key={item.productId}>
          <p>{item.productName} x {item.quantity} - {currency}{item.price * item.quantity}</p>
        </div>
      ))}
      <p>Subtotal: {currency}{subtotal}</p>
      <p>Delivery: {currency}{delivery_fee}</p>
      <p>Total: {currency}{total}</p>
      <button onClick={handleCreateIntent}>Create Payment Intent</button>
      {paymentIntent && (
        <div>
          <p>Client Secret: {paymentIntent.clientSecret}</p> {/* Debug; remove in prod */}
          <button onClick={handleSimulatePayment}>Simulate Successful Payment</button>
        </div>
      )}
    </div>
  );
};

export default Checkout;