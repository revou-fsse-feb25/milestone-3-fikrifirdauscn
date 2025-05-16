import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useUser();
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('https://api.escuelajs.co/api/v1/users');
      const users = await res.json();

      const matchedUser = users.find(u => u.email === email);

      if (matchedUser && password === 'password123') {
        login(matchedUser);
        router.push('/');
      } else {
        setError('Invalid email or password');
      }
    } catch {
      setError('Login failed, try again');
    }
  }

  return (
    <main className="max-w-md mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 font-semibold" htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold" htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition"
        >
          Login
        </button>
        {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
      </form>
      <p className="mt-6 text-center text-gray-500 text-sm">
        Use any email from API, password is <b>"password123"</b>
      </p>
    </main>
  );
}
