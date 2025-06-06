'use client';
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });
    if (!res.error) router.push("/");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-2 border mb-4 rounded bg-white text-black dark:bg-gray-900 dark:text-white"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border mb-4 rounded bg-white text-black dark:bg-gray-900 dark:text-white"
      />
      <button
        type="submit"
        className="w-full bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700"
      >
        Login
      </button>
    </form>
  );
}