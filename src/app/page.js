import AddToCartButton from "./component/addtocart";

export const revalidate = 60;

async function getData() {
  const res = await fetch("https://api.escuelajs.co/api/v1/products", {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export default async function HomePage() {
  const products = await getData();

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">New Arrivals</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products.slice(0, 12).map(product => (
          <div key={product.id} className="bg-white dark:bg-gray-800 border rounded-lg p-4 shadow-sm">
            <img src={product.images?.[0]} className="w-full h-48 object-cover rounded" />
            <h3 className="mt-2 font-semibold text-gray-900 dark:text-white truncate">{product.title}</h3>
            <p className="text-sm text-gray-500">${product.price}</p>
            <AddToCartButton product={product} />
          </div>
        ))}
      </div>
    </main>
  );
}
