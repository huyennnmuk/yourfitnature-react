import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SupplementStackingCalculatorPopup from './SupplementStackingCalculatorPopup';

// Mock the calculator component to avoid testing its implementation details here
jest.mock('./SupplementStackingCalculator', () => function SupplementStackingCalculator() { return <div data-testid="calculator-mock">Supplement Calculator</div>; });

describe('SupplementStackingCalculatorPopup', () => {
  test('renders the floating button', () => {
    render(<SupplementStackingCalculatorPopup />);
    expect(screen.getByLabelText('Open supplement calculator')).toBeInTheDocument();
    expect(screen.queryByTestId('calculator-mock')).not.toBeInTheDocument();
  });

  test('opens the popup when the button is clicked', () => {
    render(<SupplementStackingCalculatorPopup />);
    fireEvent.click(screen.getByLabelText('Open supplement calculator'));
    expect(screen.getByTestId('calculator-mock')).toBeInTheDocument();
  });

  test('closes the popup when the close button is clicked', () => {
    render(<SupplementStackingCalculatorPopup />);
    fireEvent.click(screen.getByLabelText('Open supplement calculator'));
    expect(screen.getByTestId('calculator-mock')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Close supplement calculator'));
    expect(screen.queryByTestId('calculator-mock')).not.toBeInTheDocument();
  });

  test('closes the popup when clicking outside', () => {
    render(<SupplementStackingCalculatorPopup />);
    fireEvent.click(screen.getByLabelText('Open supplement calculator'));
    expect(screen.getByTestId('calculator-mock')).toBeInTheDocument();
    
    // The backdrop is the first div inside the body, which is the parent of the modal content
    fireEvent.click(screen.getByTestId('calculator-mock').parentElement!.parentElement!);
    
    expect(screen.queryByTestId('calculator-mock')).not.toBeInTheDocument();
  });

  test('applies custom position class', () => {
    const customClass = "fixed bottom-10 right-10";
    render(<SupplementStackingCalculatorPopup positionClassName={customClass} />);
    const button = screen.getByLabelText('Open supplement calculator');
    expect(button.parentElement).toHaveClass(customClass);
  });
});
