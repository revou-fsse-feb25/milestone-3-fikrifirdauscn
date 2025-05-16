import Link from 'next/link';
import { useState } from 'react';

export async function getStaticProps() {
  try {
    const res = await fetch('https://api.escuelajs.co/api/v1/products');
    const products = await res.json();

    return {
      props: { products },
      revalidate: 60,
    };
  } catch {
    return { props: { products: [] } };
  }
}

export default function Home({ products }) {
  const [hoveredProduct, setHoveredProduct] = useState(null);

  if (!products.length) return <p className="text-center mt-20 text-gray-600">No products found.</p>;

  return (
    <main className="max-w-7xl mx-auto px-4 py-10 relative">
      <h1 className="text-3xl font-bold mb-8 text-center">RevoShop Products</h1>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map(product => (
          <div
            key={product.id}
            onMouseEnter={() => setHoveredProduct(product)}
            onMouseLeave={() => setHoveredProduct(null)}
            className="relative"
          >
            <Link href={`/product/${product.id}`}>
              <a className="border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition hover:scale-105 transform duration-300 block">
                <div className="relative w-full h-56">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="object-cover w-full h-full"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 truncate">{product.title}</h3>
                  <p className="text-blue-600 font-bold text-xl">${product.price}</p>
                </div>
              </a>
            </Link>

            {/* Popup preview */}
            {hoveredProduct?.id === product.id && (
              <div className="absolute z-50 top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 p-4 bg-white rounded-lg shadow-lg border border-gray-200 pointer-events-none select-none">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-40 object-cover rounded-md mb-2"
                />
                <p className="text-sm text-gray-700 line-clamp-3">{product.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
