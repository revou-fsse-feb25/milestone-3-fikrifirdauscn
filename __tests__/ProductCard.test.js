import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductCard from '../components/ProductCard';

describe('ProductCard Component', () => {
  const product = {
    title: 'Sample Product',
    description: 'This is a sample product.',
    price: 19.99,
    images: ['https://example.com/sample-image.jpg'],
  };

  it('should render the product title', () => {
    render(<ProductCard product={product} />);
    expect(screen.getByText(/Sample Product/i)).toBeInTheDocument();
  });

  it('should render the product description', () => {
    render(<ProductCard product={product} />);
    expect(screen.getByText(/This is a sample product./i)).toBeInTheDocument();
  });

  it('should render the product price', () => {
    render(<ProductCard product={product} />);
    expect(screen.getByText(/Price: \$19.99/i)).toBeInTheDocument();
  });

  it('should display the correct image URL', () => {
    render(<ProductCard product={product} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://example.com/sample-image.jpg');
  });

  it('should handle incorrect image URL (starts with "hhttps")', () => {
    const productWithInvalidImage = {
      ...product,
      images: ['hhttps://example.com/sample-image.jpg'],
    };

    render(<ProductCard product={productWithInvalidImage} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://example.com/sample-image.jpg'); 
  });

  it('should handle image URL without "http" prefix', () => {
    const productWithNoHttpPrefix = {
      ...product,
      images: ['example.com/sample-image.jpg'],
    };

    render(<ProductCard product={productWithNoHttpPrefix} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://example.com/sample-image.jpg'); 
  });
});
