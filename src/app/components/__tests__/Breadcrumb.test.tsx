import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Breadcrumb from '../Breadcrumb';

// Sample data for testing
const mockItems = [
  {
    name: 'Home',
    path: '/',
    description: 'Best Camera Review home page'
  },
  {
    name: 'DSLR Cameras',
    path: '/dslr-cameras',
    description: 'DSLR camera reviews and comparisons',
    image: '/images/categories/dslr.webp'
  },
  {
    name: 'Canon EOS 90D',
    path: '/dslr-cameras/canon-eos-90d',
    isCurrent: true,
    description: 'Detailed review of Canon EOS 90D'
  }
];

describe('Breadcrumb Component Tests', () => {
  // Performance test
  test('should render component quickly', () => {
    const startTime = performance.now();
    render(<Breadcrumb items={mockItems} />);
    const endTime = performance.now();
    
    // Render time should be less than 100ms
    expect(endTime - startTime).toBeLessThan(100);
  });

  // Structural tests
  test('should render all breadcrumb items correctly', () => {
    render(<Breadcrumb items={mockItems} />);
    
    // Check home link
    expect(screen.getByTitle('Home: Home')).toBeInTheDocument();
    
    // Check middle page link
    expect(screen.getByText('DSLR Cameras')).toBeInTheDocument();
    
    // Check current page
    const currentPage = screen.getByText('Canon EOS 90D');
    expect(currentPage).toHaveAttribute('aria-current', 'page');
  });

  // SEO structure test
  test('should include proper Schema.org markup', () => {
    const { container } = render(<Breadcrumb items={mockItems} />);
    
    // Check JSON-LD script
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).toBeInTheDocument();
    
    // Check itemScope and itemType
    const nav = container.querySelector('nav');
    expect(nav).toHaveAttribute('itemScope', '');
    expect(nav).toHaveAttribute('itemType', 'https://schema.org/BreadcrumbList');
  });

  // Accessibility test
  test('should include proper ARIA attributes', () => {
    render(<Breadcrumb items={mockItems} />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Breadcrumb');
    
    // Check list structure
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  // Link structure test
  test('should have correct link structure', () => {
    render(<Breadcrumb items={mockItems} />);
    
    // Check if links have correct paths
    const homeLink = screen.getByTitle('Home: Home');
    expect(homeLink).toHaveAttribute('href', '/');
    
    const dslrLink = screen.getByText('DSLR Cameras').closest('a');
    expect(dslrLink).toHaveAttribute('href', '/dslr-cameras');
  });

  // Base URL test
  test('should handle custom base URL', () => {
    const baseUrl = 'https://bestcamerareview.com';
    render(<Breadcrumb items={mockItems} baseUrl={baseUrl} />);
    
    const jsonLd = JSON.parse(document.querySelector('script[type="application/ld+json"]')?.textContent || '{}');
    expect(jsonLd.itemListElement[0].item['@id']).toBe(`${baseUrl}/`);
  });
}); 