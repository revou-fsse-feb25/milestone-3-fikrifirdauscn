import Link from 'next/link';
import { useUser } from '../context/UserContext';

export default function Header() {
  const { user, logout } = useUser();

  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-50">
      <nav className="flex items-center space-x-6">
        <Link href="/"><a className="text-lg font-semibold hover:text-blue-600">RevoShop</a></Link>
        <Link href="/"><a className="hover:text-blue-600">Home</a></Link>
      </nav>
      <div>
        {user ? (
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Welcome, <b>{user.name}</b></span>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link href="/login">
            <a className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              Login
            </a>
          </Link>
        )}
      </div>
    </header>
  );
}
