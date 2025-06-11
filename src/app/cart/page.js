'use client';
import { useCartStore } from '../store/cart';

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const total = items.reduce((sum, i) => sum + i.price, 0);

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Your Cart</h1>
      {items.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {items.map((item, index) => (
              <li key={index} className="border p-4 rounded shadow-sm flex justify-between items-center">
                <div>
                  <div className="font-medium">{item.title}</div>
                  <div className="text-gray-500 text-sm">${item.price}</div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-sm text-red-500 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6 text-lg font-semibold">
            Total: ${total.toFixed(2)}
          </div>
        </>
      )}
    </div>
  );
}
