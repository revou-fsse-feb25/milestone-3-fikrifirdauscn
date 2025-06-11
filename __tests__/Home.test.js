import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from '../src/app/page'; // pastikan path sesuai

test('renders homepage title', () => {
  render(<HomePage />);
  const heading = screen.getByText(/new arrivals/i);
  expect(heading).toBeInTheDocument();
});
