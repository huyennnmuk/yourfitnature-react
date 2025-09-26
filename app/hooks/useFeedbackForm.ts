"use client";

import { useState } from 'react';

export interface FeedbackFormState {
  rating: number;
  message: string;
  name: string;
  isPrivate: boolean;
}

interface UseFeedbackFormProps {
  workshopId: string;
  initialState?: Partial<FeedbackFormState>;
}

export const useFeedbackForm = ({ workshopId, initialState }: UseFeedbackFormProps) => {
  const [state, setState] = useState<FeedbackFormState>({
    rating: 0,
    message: '',
    name: '',
    isPrivate: false,
    ...initialState,
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
        const { checked } = e.target as HTMLInputElement;
        setState((prevState) => ({ ...prevState, [name]: checked }));
    } else {
        setState((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const setRating = (rating: number) => {
    setState((prevState) => ({ ...prevState, rating }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const payload = {
        workshopId,
        ...state,
        name: state.name || 'Anonymous',
      };

      const response = await fetch('/api/feedback/workshop', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Feedback submission error:', error);
      setStatus('error');
    }
  };

  const isSubmitDisabled = state.rating === 0 || state.message.trim() === '' || status === 'submitting';

  return {
    formState: state,
    status,
    handleChange,
    setRating,
    handleSubmit,
    isSubmitDisabled,
    setStatus,
  };
};
