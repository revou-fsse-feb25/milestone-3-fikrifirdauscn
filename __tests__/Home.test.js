import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from '../src/app/page'; 

test('renders homepage title', () => {
  render(<HomePage />);
  const heading = screen.getByText(/new arrivals/i);
  expect(heading).toBeInTheDocument();
});
