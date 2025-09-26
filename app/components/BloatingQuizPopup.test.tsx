import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import BloatingQuizPopup from './BloatingQuizPopup';

// Mock sessionStorage
const sessionStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock,
});

describe('BloatingQuizPopup', () => {
  beforeEach(() => {
    sessionStorage.clear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('renders the popup on first visit after a delay', () => {
    render(<BloatingQuizPopup />);
    expect(screen.queryByText('Bloating Quiz')).not.toBeInTheDocument();
    
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(screen.getByText('Bloating Quiz')).toBeInTheDocument();
  });

  test('does not render the popup on subsequent visits', () => {
    sessionStorage.setItem('hasSeenBloatingQuizPopup', 'true');
    render(<BloatingQuizPopup />);
    
    act(() => {
        jest.advanceTimersByTime(5000);
    });

    expect(screen.queryByText('Bloating Quiz')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Open bloating quiz')).toBeInTheDocument();
  });

  test('closes the popup and shows the minimized button', () => {
    render(<BloatingQuizPopup />);
    act(() => {
        jest.advanceTimersByTime(5000);
    });
    fireEvent.click(screen.getByLabelText('Close quiz popup'));
    expect(screen.queryByText('Bloating Quiz')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Open bloating quiz')).toBeInTheDocument();
  });

  test('re-opens the popup when the minimized button is clicked', () => {
    render(<BloatingQuizPopup />);
    act(() => {
        jest.advanceTimersByTime(5000);
    });
    fireEvent.click(screen.getByLabelText('Close quiz popup'));
    fireEvent.click(screen.getByLabelText('Open bloating quiz'));
    expect(screen.getByText('Bloating Quiz')).toBeInTheDocument();
  });

  test('applies custom position class to minimized button', () => {
    const customClass = "fixed bottom-10 right-10";
    sessionStorage.setItem('hasSeenBloatingQuizPopup', 'true');
    render(<BloatingQuizPopup positionClassName={customClass} />);
    
    act(() => {
        jest.advanceTimersByTime(5000);
    });

    const minimizedButton = screen.getByLabelText('Open bloating quiz');
    expect(minimizedButton.parentElement).toHaveClass(customClass);
  });

  test('uses default position class when none is provided', () => {
    const defaultClass = "fixed bottom-24 right-4 z-40";
    sessionStorage.setItem('hasSeenBloatingQuizPopup', 'true');
    render(<BloatingQuizPopup />);
    
    act(() => {
        jest.advanceTimersByTime(5000);
    });

    const minimizedButton = screen.getByLabelText('Open bloating quiz');
    expect(minimizedButton.parentElement).toHaveClass(defaultClass);
  });
});
