import '../styles/globals.css';
import { UserProvider } from '../context/UserContext';
import Header from '../components/Header';

export default function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Header />
      <Component {...pageProps} />
    </UserProvider>
  );
}
