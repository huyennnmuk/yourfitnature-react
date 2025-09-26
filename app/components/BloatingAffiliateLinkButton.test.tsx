import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import BloatingAffiliateLinkButton from './FloatingAffiliateLinkButton';

describe('BloatingAffiliateLinkButton', () => {
  const affiliateLink = 'https://example.com/product';
  const productName = 'Test Product';

  beforeEach(() => {
    // Reset scroll position before each test
    window.pageYOffset = 0;
  });

  it('renders nothing if affiliateLink is not provided', () => {
    const { container } = render(<BloatingAffiliateLinkButton affiliateLink="" productName={productName} />);
    expect(container.firstChild).toBeNull();
  });

  it('is not visible initially', () => {
    render(<BloatingAffiliateLinkButton affiliateLink={affiliateLink} productName={productName} />);
    expect(screen.queryByLabelText(`Purchase ${productName}`)).not.toBeInTheDocument();
  });

  it('becomes visible after scrolling down', () => {
    render(<BloatingAffiliateLinkButton affiliateLink={affiliateLink} productName={productName} />);
    
    // Initial state should be hidden
    expect(screen.queryByLabelText(`Purchase ${productName}`)).not.toBeInTheDocument();

    // Simulate scrolling down
    act(() => {
      window.pageYOffset = 500;
      fireEvent.scroll(window);
    });

    expect(screen.getByLabelText(`Purchase ${productName}`)).toBeInTheDocument();
  });

  it('hides again after scrolling up', () => {
    render(<BloatingAffiliateLinkButton affiliateLink={affiliateLink} productName={productName} />);
    
    // Scroll down to show
    act(() => {
      window.pageYOffset = 500;
      fireEvent.scroll(window);
    });
    expect(screen.getByLabelText(`Purchase ${productName}`)).toBeInTheDocument();

    // Scroll back up to hide
    act(() => {
      window.pageYOffset = 100;
      fireEvent.scroll(window);
    });

    expect(screen.queryByLabelText(`Purchase ${productName}`)).not.toBeInTheDocument();
  });

  it('renders a link with the correct href and attributes', () => {
    render(<BloatingAffiliateLinkButton affiliateLink={affiliateLink} productName={productName} />);
    
    act(() => {
      window.pageYOffset = 500;
      fireEvent.scroll(window);
    });

    const linkElement = screen.getByLabelText(`Purchase ${productName}`);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', affiliateLink);
    expect(linkElement).toHaveAttribute('target', '_blank');
    expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
