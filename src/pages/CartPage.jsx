import { useCart } from "../context/cartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cart, addToCart, setCart } = useCart(); // ✅ include setCart here
  const navigate = useNavigate();

  const handleQtyChange = (item, newQty) => {
    if (newQty < 1) {
      // remove item if qty < 1
      setCart(cart.filter((c) => c.id !== item.id));
      return;
    }
    const updatedCart = cart.map((c) =>
      c.id === item.id ? { ...c, quantity: newQty } : c
    );
    setCart(updatedCart);
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cart.length === 0)
    return <p className="p-10 text-gray-400">Your cart is empty.</p>;

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="space-y-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 bg-zinc-900 p-4 rounded-lg"
          >
            <img
              src={`http://localhost:5000${item.pictureUrl}`}
              alt={item.name}
              className="w-24 h-24 object-cover rounded"
            />
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-green-400 font-bold">
                R {(item.price / 100).toFixed(2)}
              </p>

              <label className="block mt-2">Quantity:</label>
              <input
                type="number"
                value={item.quantity}
                min={1}
                className="w-20 px-2 py-1 rounded bg-zinc-800 border border-zinc-700"
                onChange={(e) =>
                  handleQtyChange(item, parseInt(e.target.value))
                }
              />
            </div>

            <button
              className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
              onClick={() => handleQtyChange(item, 0)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <p className="text-right mt-6 text-2xl font-bold">
        Total: R {(totalPrice / 100).toFixed(2)}
      </p>

      <div className="text-right mt-4">
        <button
          className="px-5 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg"
          onClick={() => navigate("/test")}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default CartPage;
