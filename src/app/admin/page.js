"use client";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ title: "", price: "", image: "", categoryId: "" });
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products")
      .then((res) => res.json())
      .then(setProducts)
      .catch(() => setError("Failed to load products."));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.title.trim() || !form.price.trim()) {
      setError("Title dan Price tidak boleh kosong.");
      return;
    }

    if (isNaN(form.price)) {
      setError("Price harus berupa angka.");
      return;
    }

    const payload = {
      title: form.title.trim(),
      price: parseFloat(form.price),
      description: "Updated via admin panel",
      categoryId: Number(form.categoryId || 1),
      images: [form.image || "https://placehold.co/300x300"]
    };

    try {
      const endpoint = editId
        ? `https://api.escuelajs.co/api/v1/products/${editId}`
        : "https://api.escuelajs.co/api/v1/products";

      const method = editId ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        const message = data?.message || "Gagal menyimpan produk.";
        throw new Error(message);
      }

      if (editId) {
        setProducts(products.map(p => (p.id === editId ? data : p)));
      } else {
        setProducts([data, ...products]);
      }

      setForm({ title: "", price: "", image: "", categoryId: "" });
      setEditId(null);
    } catch (err) {
      setError(err.message || "Terjadi kesalahan saat mengirim data.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setProducts(products.filter(prod => prod.id !== id));
      } else {
        setError("Gagal menghapus produk.");
      }
    } catch {
      setError("Network error saat menghapus.");
    }
  };

  const handleEdit = (product) => {
    setForm({
      title: product.title,
      price: product.price,
      image: product.images?.[0] || "",
      categoryId: product.category?.id || ""
    });
    setEditId(product.id);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Admin Dashboard</h1>

      <form onSubmit={handleSubmit} className="mb-8 space-y-4 bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
        <div>
          <label htmlFor="title" className="block mb-1 font-medium text-gray-800 dark:text-gray-200">Product Title</label>
          <input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Coffee Mug"
            className="border p-3 w-full rounded text-black focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
        <div>
          <label htmlFor="price" className="block mb-1 font-medium text-gray-800 dark:text-gray-200">Price</label>
          <input
            id="price"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="e.g. 19.99"
            className="border p-3 w-full rounded text-black focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
        <div>
          <label htmlFor="image" className="block mb-1 font-medium text-gray-800 dark:text-gray-200">Image URL</label>
          <input
            id="image"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="https://..."
            className="border p-3 w-full rounded text-black focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
        <div>
          <label htmlFor="categoryId" className="block mb-1 font-medium text-gray-800 dark:text-gray-200">Category ID</label>
          <input
            id="categoryId"
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
            placeholder="e.g. 1"
            className="border p-3 w-full rounded text-black focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <div className="flex gap-4">
          <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            {editId ? "Update Product" : "Add Product"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={() => {
                setEditId(null);
                setForm({ title: "", price: "", image: "", categoryId: "" });
              }}
              className="px-5 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <hr className="mb-6 border-gray-300 dark:border-gray-700" />

      <ul className="grid grid-cols-1 gap-4">
        {products.slice(0, 10).map((p) => (
          <li key={p.id} className="border p-4 rounded shadow-sm flex justify-between items-center bg-white dark:bg-gray-800">
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">{p.title}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">${p.price}</div>
            </div>
            <div className="space-x-3">
              <button onClick={() => handleEdit(p)} className="text-blue-600 hover:underline text-sm">Edit</button>
              <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:underline text-sm">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
