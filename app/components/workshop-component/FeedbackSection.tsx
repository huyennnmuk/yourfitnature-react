"use client";

import React from 'react';
import { useFeedbackForm } from '../../hooks/useFeedbackForm';
import FeedbackForm from './FeedbackForm';
import FeedbackSuccess from './FeedbackSuccess';
import FeedbackError from './FeedbackError';

interface FeedbackSectionProps {
  workshopId: string;
}

const FeedbackSection: React.FC<FeedbackSectionProps> = ({ workshopId }) => {
  const {
    formState,
    status,
    handleChange,
    setRating,
    handleSubmit,
    isSubmitDisabled,
    setStatus,
  } = useFeedbackForm({ workshopId });

  if (status === 'success') {
    return <FeedbackSuccess onDone={() => setStatus('idle')} />;
  }

  if (status === 'error') {
    return <FeedbackError onRetry={() => setStatus('idle')} />;
  }

  return (
    <FeedbackForm
      formState={formState}
      status={status}
      isSubmitDisabled={isSubmitDisabled}
      handleChange={handleChange}
      setRating={setRating}
      handleSubmit={handleSubmit}
    />
  );
};

export default FeedbackSection;