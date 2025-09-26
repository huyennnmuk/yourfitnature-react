'use client';
import React, { useState } from 'react';
import { getUserKey } from '../../utils/userKey';
import '../../styles/blog-post.css';

interface FeedbackModalProps {
  onClose: () => void;
  session_id?: string;
  thread_id?: string;
  answer_id?: string;
}

const categories = [
  'Inaccurate',
  'Out of date',
  'Too short',
  'Too long',
  'Wrong sources',
  'Harmful or offensive',
];

type SubmissionStatus = 'idle' | 'submitting' | 'success';

const FeedbackModal: React.FC<FeedbackModalProps> = ({ 
  onClose, 
  session_id,
  thread_id,
  answer_id,
}) => {
  const [feedbackText, setFeedbackText] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle');

  const handleCategoryClick = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleFeedbackSubmit = async () => {
    setSubmissionStatus('submitting');
    const user_id = getUserKey();
    try {
      await fetch('/api/reporting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          categories: selectedCategories,
          free_text: feedbackText,
          user_id,
          session_id,
          thread_id,
          answer_id,
        }),
      });
      setSubmissionStatus('success');
      setTimeout(() => {
        onClose();
      }, 2000); // Close after 2 seconds
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setSubmissionStatus('idle'); // Or show an error state
    }
  };

  const isSubmitDisabled = selectedCategories.length === 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 font-sans">
      <div className="bg-[var(--blog-background)] p-[var(--space-lg)] rounded-lg shadow-lg w-full max-w-md border border-[var(--perplexity-table-border)]">
        {submissionStatus === 'success' ? (
          <div className="text-center p-[var(--space-lg)]">
            <h2 className="text-xl font-bold mb-4 text-[var(--perplexity-heading)]">Thank you!</h2>
            <p className="text-[var(--perplexity-muted)]">Your feedback helps us improve.</p>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-2 text-[var(--perplexity-heading)]">Help us improve</h2>
            <p className="text-sm text-[var(--perplexity-muted)] mb-4">Please select the issues you found in the answer.</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  disabled={submissionStatus === 'submitting'}
                  className={`px-3 py-1 rounded-full text-sm border transition-colors duration-200 ${
                    selectedCategories.includes(category)
                      ? 'bg-[var(--perplexity-primary)] text-white border-[var(--perplexity-primary)]'
                      : 'bg-transparent border-[var(--perplexity-primary)] text-[var(--perplexity-primary)] hover:bg-[var(--perplexity-accent-bg)]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <textarea
              className="w-full p-2 border rounded bg-white border-[var(--perplexity-table-border)] focus:ring-1 focus:ring-[var(--perplexity-primary)] focus:border-[var(--perplexity-primary)] transition-shadow duration-200"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="How can the response be improved? (optional)"
              maxLength={1000}
              disabled={submissionStatus === 'submitting'}
            />
            <div className="flex justify-end mt-4 space-x-2">
              <button onClick={onClose} className="px-4 py-2 rounded text-[var(--perplexity-muted)] hover:bg-gray-200 transition-colors duration-200" disabled={submissionStatus === 'submitting'}>Cancel</button>
              <button
                onClick={handleFeedbackSubmit}
                disabled={submissionStatus === 'submitting' || isSubmitDisabled}
                className="px-4 py-2 rounded bg-[var(--perplexity-primary)] text-white disabled:bg-[var(--perplexity-muted)] transition-colors duration-200"
              >
                {submissionStatus === 'submitting' ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FeedbackModal;
