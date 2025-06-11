'use client';

import './globals.css';
import { useCartStore } from './store/cart';


export default function RootLayout({ children }) {
  const cartItems = useCartStore((state) => state.items); // ✅ pakai "items" sesuai store

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Revoshop</title>
      </head>
      <body className="bg-white text-gray-900 font-sans dark:bg-gray-900 dark:text-white">
        <header className="flex justify-between items-center py-4 border-b border-gray-200 dark:border-gray-700 px-6">
          <h1 className="text-2xl font-bold text-teal-600">Revoshop</h1>
          <nav className="flex gap-6 text-sm">
            <a href="/" className="hover:text-teal-500">Home</a>
            <a href="/cart" className="hover:text-teal-500">
              Cart <span className="ml-1 inline-block bg-teal-600 text-white px-2 py-0.5 rounded-full text-xs">{cartItems?.length ?? 0}</span>
            </a>
            <a href="/checkout" className="hover:text-teal-500">Checkout</a>
            <a href="/admin" className="hover:text-teal-500">Admin</a>
            <a href="/login" className="hover:text-teal-500">Login</a>
          </nav>
        </header>
        <div className="max-w-7xl mx-auto px-6 py-10">{children}</div>
      </body>
    </html>
  );
}
