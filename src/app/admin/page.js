'use client';
import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/products')
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Admin Dashboard</h1>
      <ul className="space-y-4">
        {products.slice(0, 10).map((p) => (
          <li key={p.id} className="border p-4 rounded shadow-sm">
            <div className="font-semibold">{p.title}</div>
            <div className="text-sm text-gray-600">${p.price}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}