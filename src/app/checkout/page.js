'use client';
import { useCartStore } from '../store/cart';

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const total = items.reduce((sum, i) => sum + i.price, 0);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {items.map((item, idx) => (
            <li key={idx} className="border p-4 rounded shadow">
              <div className="font-semibold">{item.title}</div>
              <div className="text-sm text-gray-600">${item.price}</div>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-6 text-xl font-semibold">Total: ${total.toFixed(2)}</div>
    </div>
  );
}
