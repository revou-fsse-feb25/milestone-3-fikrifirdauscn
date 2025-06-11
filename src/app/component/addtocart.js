'use client';
import { useCartStore } from '../store/cart';

export default function AddToCartButton({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <button
      onClick={() => {
        addToCart(product);
        alert(`${product.title} added to cart!`);
      }}
      className="mt-3 w-full bg-teal-600 hover:bg-teal-700 text-white text-sm py-1.5 rounded"
    >
      Add to Cart
    </button>
  );
}
