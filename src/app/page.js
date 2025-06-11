'use client';
import Link from 'next/link';
import { useCartStore } from './store/cart';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.title} added to cart!`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productRes, categoryRes] = await Promise.all([
          fetch('https://api.escuelajs.co/api/v1/products'),
          fetch('https://api.escuelajs.co/api/v1/categories'),
        ]);

        if (!productRes.ok || !categoryRes.ok) throw new Error("Failed to fetch data.");

        const [productData, categoryData] = await Promise.all([
          productRes.json(),
          categoryRes.json(),
        ]);

        setProducts(productData);
        setCategories(categoryData);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filtered = (selected ? products.filter(p => p.category.id === selected) : products)
    .filter(p => p.title && p.title.length > 3 && p.images?.[0]?.startsWith('https'));

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-700 dark:text-gray-300">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-600 mx-auto mb-2"></div>
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-600 dark:text-red-400">
        ❌ Error: {error}
      </div>
    );
  }

  return (
    <main>
      <h1 className="text-4xl font-semibold text-gray-900 dark:text-white mb-6 tracking-tight">New Arrivals</h1>

      <div className="flex gap-3 flex-wrap mb-6">
        <button
          onClick={() => setSelected(null)}
          className={`px-4 py-1.5 rounded-full border ${!selected ? 'bg-teal-600 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelected(cat.id)}
            className={`px-4 py-1.5 rounded-full border ${selected === cat.id ? 'bg-teal-600 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
            {cat.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {filtered.slice(0, 12).map((product) => (
          <div key={product.id} className="group border rounded-xl overflow-hidden hover:shadow-md transition bg-white dark:bg-gray-800">
            <Link href={`/product/${product.id}`}>
              <img src={product.images?.[0]} alt={product.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-800 dark:text-white group-hover:text-teal-600 truncate">{product.title}</h3>
                <p className="text-sm text-gray-500 mt-1">${product.price}</p>
              </div>
            </Link>
            <button
              onClick={() => handleAddToCart(product)}
              className="w-full text-sm text-center py-2 bg-teal-500 hover:bg-teal-600 text-white font-medium"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
