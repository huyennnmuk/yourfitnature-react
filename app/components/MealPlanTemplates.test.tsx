import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MealPlanTemplates from './MealPlanTemplates';

// Mock the analytics module
jest.mock('../../lib/analytics', () => ({
  track: jest.fn()
}));

describe('MealPlanTemplates', () => {
  it('renders the component', () => {
    render(<MealPlanTemplates />);
    expect(screen.getByText('Bloating-Free Meal Planning Templates')).toBeInTheDocument();
  });

  it('renders download links for meal plans', () => {
    render(<MealPlanTemplates />);
    expect(screen.getByText('3-Day Bloating-Free Meal Plan')).toBeInTheDocument();
    expect(screen.getByText('7-Day Bloating-Free Meal Plan')).toBeInTheDocument();
  });

  it('has correct download links', () => {
    render(<MealPlanTemplates />);
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', '/pdf/3-Day-Bloating-Free-Meal-Plan.html');
    expect(links[1]).toHaveAttribute('href', '/pdf/7-Day-Bloating-Free-Meal-Plan.html');
  });
});
