import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../components/context/ShopContext";

import agent from "../api/agent";

const Orders = () => {
  const { user } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchOrders = async () => {
        try {
          const data = await agent.Orders.list();
          setOrders(data);
        } catch (err) {
          console.error(err);
        }
      };
      fetchOrders();
    }
  }, [user]);

  if (!user) return <div>Please login to view orders.</div>;

  return (
    <div>
      <h2>My Orders</h2>
      {orders.map((order) => (
        <div key={order.id}>
          <p>Order #{order.id} - Status: {order.orderStatus}</p>
          {/* Add more details like items, total, etc. */}
        </div>
      ))}
    </div>
  );
};

export default Orders;