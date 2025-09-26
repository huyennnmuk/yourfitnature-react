import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResourcesPage from './ResourcesPage';

// Mock the analytics module
jest.mock('../../lib/analytics', () => ({
  track: jest.fn()
}));

describe('ResourcesPage', () => {
  it('renders the component', () => {
    render(<ResourcesPage />);
    expect(screen.getByText('Resources')).toBeInTheDocument();
  });

  it('renders both resource sections', () => {
    render(<ResourcesPage />);
    expect(screen.getByText('Meal Delivery Services')).toBeInTheDocument();
    expect(screen.getByText('Specialty Foods')).toBeInTheDocument();
  });

  it('has external links with proper attributes', () => {
    render(<ResourcesPage />);
    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('matches the snapshot', () => {
    const { asFragment } = render(<ResourcesPage />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('has the correct container classes for single-column layout', () => {
    const { container } = render(<ResourcesPage />);
    expect(container.firstChild).toHaveClass('p-6 max-w-4xl mx-auto');
  });
});
