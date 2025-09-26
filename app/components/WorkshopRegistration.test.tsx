import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SessionSelection from './SessionSelection';
import { useRegistrationForm } from '../hooks/useRegistrationForm';
import fetchMock from 'jest-fetch-mock';

// Mock the RegistrationModal component
jest.mock('./RegistrationModal', () => {
  return function DummyRegistrationModal({ isOpen, onClose, initialSessionPreference }) {
    if (!isOpen) return null;
    return (
      <div data-testid="registration-modal">
        <button onClick={onClose}>Close</button>
        <p>Initial Session: {initialSessionPreference}</p>
        <form onSubmit={(e) => e.preventDefault()}>
          <button type="submit">Complete Registration</button>
        </form>
      </div>
    );
  };
});

// Mock the useRouter hook
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    prefetch: jest.fn(),
  }),
}));

// Mock the useRegistrationForm hook
jest.mock('../hooks/useRegistrationForm', () => ({
    useRegistrationForm: jest.fn(),
  }));

describe('Workshop Registration Flow', () => {
  const mockHandleInputChange = jest.fn();
  const mockClearGeneralError = jest.fn();

  beforeEach(() => {
    fetchMock.resetMocks();
    mockPush.mockClear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('clicking "Register for All Sessions" opens the modal with "all" pre-selected', async () => {
    useRegistrationForm.mockReturnValue({
        formData: {
          firstName: '',
          email: '',
          hearAboutUs: '',
          privacyConsent: false,
          sessionPreference: 'all',
        },
        errors: {},
        isSubmitting: false,
        isFormValid: false,
        handleInputChange: mockHandleInputChange,
        handleFormSubmission: jest.fn(),
        clearGeneralError: mockClearGeneralError,
      });

    render(<SessionSelection />);

    const registerAllButton = screen.getByRole('button', { name: /Register for All Sessions/i });
    fireEvent.click(registerAllButton);

    await waitFor(() => {
        expect(screen.getByTestId('registration-modal')).toBeInTheDocument();
    });

    expect(screen.getByText('Initial Session: all')).toBeInTheDocument();
  });

  test('successful registration redirects to the confirmation page', async () => {
    // Arrange
    const handleFormSubmission = jest.fn().mockImplementation(async (e) => {
        e.preventDefault();
        const response = await fetch('/api/workshop-registration', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        });
        const result = await response.json();
        if (result.success) {
            const params = new URLSearchParams({
                session: result.data.sessionType,
                email: encodeURIComponent(result.data.email),
                registration_id: result.data.id,
                token: result.data.confirmationToken,
            });
            mockPush(`/workshop-confirmation?${params.toString()}`);
        }
    });

    useRegistrationForm.mockReturnValue({
      formData: {
        firstName: 'John',
        email: 'john.doe@example.com',
        hearAboutUs: 'social',
        privacyConsent: true,
        sessionPreference: 'all',
      },
      errors: {},
      isSubmitting: false,
      isFormValid: true,
      handleInputChange: mockHandleInputChange,
      handleFormSubmission: handleFormSubmission,
      clearGeneralError: mockClearGeneralError,
    });

    fetchMock.mockResponseOnce(JSON.stringify({ success: true, data: { id: '123', sessionType: 'all', email: 'john.doe@example.com', confirmationToken: 'abc' } }));

    render(
        <SessionSelection />
    );

    const registerAllButton = screen.getByRole('button', { name: /Register for All Sessions/i });
    fireEvent.click(registerAllButton);

    await waitFor(() => {
        expect(screen.getByTestId('registration-modal')).toBeInTheDocument();
    });

    // Act
    const submitButton = screen.getByRole('button', { name: /Complete Registration/i });
    fireEvent.click(submitButton);

    // Assert
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith(
        '/workshop-confirmation?session=all&email=john.doe%40example.com&registration_id=123&token=abc'
      );
    });
  });
});