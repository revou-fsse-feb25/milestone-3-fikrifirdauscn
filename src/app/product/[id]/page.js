export default async function ProductPage({ params }) {
  const { id } = params;
  const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, { cache: 'no-store' });
  const product = await res.json();

  return (
    <div>
      <img src={product.images?.[0]} alt={product.title} className="w-full h-60 object-cover rounded mb-4" />
      <h1 className="text-2xl font-bold text-teal-600 mb-2">{product.title}</h1>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <p className="text-xl font-semibold">${product.price}</p>
    </div>
  );
}