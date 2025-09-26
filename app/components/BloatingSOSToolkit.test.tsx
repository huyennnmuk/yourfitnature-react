import React from 'react';
import { render, screen } from '@testing-library/react';
import BloatingSOSToolkit from './BloatingSOSToolkit';

// Mock the analytics module
jest.mock('../../lib/analytics', () => ({
  track: jest.fn()
}));

describe('BloatingSOSToolkit', () => {
  it('renders the component', () => {
    render(<BloatingSOSToolkit />);
    expect(screen.getByText('Bloating SOS Emergency Toolkit')).toBeInTheDocument();
  });

  it('renders all the sections', () => {
    render(<BloatingSOSToolkit />);
    expect(screen.getByText('Fast Relief Strategies')).toBeInTheDocument();
    expect(screen.getByText('Meal Swaps')).toBeInTheDocument();
    expect(screen.getByText('Supplement Protocols')).toBeInTheDocument();
  });

  it('has a download button', () => {
    render(<BloatingSOSToolkit />);
    const downloadButton = screen.getByText('Download PDF');
    expect(downloadButton).toBeInTheDocument();
    expect(downloadButton.closest('a')).toHaveAttribute('href', '/pdf/Bloating-SOS-Emergency-Toolkit.html');
  });
});
