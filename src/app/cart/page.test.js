import { render, screen, fireEvent } from '@testing-library/react';
import CartPage from '../app/cart/page';
import { useCartStore } from '../app/store/cart';

jest.mock('../app/store/cart');

describe('CartPage', () => {
  it('shows empty message when cart is empty', () => {
    useCartStore.mockReturnValue({ items: [], remove: jest.fn() });
    render(<CartPage />);
    expect(screen.getByText(/no items in cart/i)).toBeInTheDocument();
  });
});