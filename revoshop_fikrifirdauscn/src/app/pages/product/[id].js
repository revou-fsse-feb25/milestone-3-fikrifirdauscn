import { useState } from 'react';

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
    if (!res.ok) {
      return { notFound: true };
    }
    const product = await res.json();

    return { props: { product } };
  } catch {
    return { notFound: true };
  }
}

export default function ProductDetail({ product }) {
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    setAdded(true);
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex-1">
          <img
            src={product.images[0]}
            alt={product.title}
            className="rounded-lg object-cover w-full h-96"
            loading="lazy"
          />
        </div>
        <div className="flex-1 flex flex-col">
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <p className="text-3xl font-extrabold text-blue-700 mb-8">${product.price}</p>
          <button
            onClick={handleAddToCart}
            disabled={added}
            className={`px-6 py-3 rounded text-white font-semibold transition ${
              added ? 'bg-green-500 cursor-default' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {added ? 'Added to Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </main>
  );
}
