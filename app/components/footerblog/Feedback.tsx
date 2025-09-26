'use client';
import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { getUserKey } from '../../utils/userKey';

interface FeedbackProps {
  blogId: string;
}

export interface FeedbackHandles {
  triggerNotHelpfulClick: () => void;
}

const Feedback = forwardRef<FeedbackHandles, FeedbackProps>(({ blogId }, ref) => {
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [userVote, setUserVote] = useState<'helpful' | 'not_helpful' | null>(null);
  const [counts, setCounts] = useState({ helpful: 0, not_helpful: 0 });

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await fetch(`/api/feedback/${blogId}`);
        if (res.ok) {
          const data = await res.json();
          setCounts(data);
        }
      } catch (error) {
        console.error("Failed to fetch feedback counts", error);
      }
    };
    if (blogId) fetchFeedback();
  }, [blogId]);

  const handleVote = async (vote_type: 'helpful' | 'not_helpful') => {
    if (feedbackSubmitted) return;

    if (!blogId) {
      console.error("Feedback component: blogId is undefined. Cannot submit vote.");
      return;
    }

    const user_key = getUserKey();
    try {
      const res = await fetch(`/api/feedback/${blogId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vote_type, user_key }),
      });

      if (res.ok) {
        const data = await res.json();
        setFeedbackSubmitted(true);
        setUserVote(data.data.user_vote);
        setCounts({ helpful: data.data.helpful, not_helpful: data.data.not_helpful });
      }
    } catch (error) {
      console.error("Failed to submit feedback", error);
    }
  };

  const handleHelpfulClick = () => {
    handleVote('helpful');
  };

  const handleNotHelpfulClick = () => {
    handleVote('not_helpful');
  };

  useImperativeHandle(ref, () => ({
    triggerNotHelpfulClick() {
      handleNotHelpfulClick();
    }
  }));
  
  return (
    <>
      <div className="gap-xs flex items-center border-borderMain/50 ring-borderMain/50 divide-borderMain/50 bg-transparent">
        <button aria-label="Helpful" onClick={handleHelpfulClick} disabled={feedbackSubmitted} type="button" className={`focus-visible:bg-offsetPlus hover:bg-offsetPlus text-quiet hover:text-foreground dark:hover:bg-offsetPlus font-sans focus:outline-none outline-none outline-transparent transition duration-300 ease-out font-sans select-none items-center relative group/button justify-center text-center items-center rounded-full cursor-pointer active:scale-[0.97] active:duration-150 active:ease-outExpo origin-center whitespace-nowrap inline-flex text-sm h-8 aspect-square ${feedbackSubmitted ? 'opacity-50 cursor-not-allowed' : ''} ${userVote === 'helpful' ? 'bg-green-100 text-green-800' : ''}`}>
          <div className="flex items-center min-w-0 font-medium gap-1.5 justify-center">
            <div className="flex shrink-0 items-center justify-center size-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="tabler-icon tabler-icon-thumb-up">
                <path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3"></path>
              </svg>
            </div>
            {counts.helpful > 0 && <span className="text-xs">{counts.helpful}</span>}
          </div>
        </button>
        <button aria-label="Not helpful" onClick={handleNotHelpfulClick} disabled={feedbackSubmitted} type="button" className={`focus-visible:bg-offsetPlus hover:bg-offsetPlus text-quiet hover:text-foreground dark:hover:bg-offsetPlus font-sans focus:outline-none outline-none outline-transparent transition duration-300 ease-out font-sans select-none items-center relative group/button justify-center text-center items-center rounded-full cursor-pointer active:scale-[0.97] active:duration-150 active:ease-outExpo origin-center whitespace-nowrap inline-flex text-sm h-8 aspect-square ${feedbackSubmitted ? 'opacity-50 cursor-not-allowed' : ''} ${userVote === 'not_helpful' ? 'bg-red-100 text-red-800' : ''}`}>
          <div className="flex items-center min-w-0 font-medium gap-1.5 justify-center">
            <div className="flex shrink-0 items-center justify-center size-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="tabler-icon tabler-icon-thumb-down">
                <path d="M7 13v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v7a1 1 0 0 0 1 1h3a4 4 0 0 1 4 4v1a2 2 0 0 0 4 0v-5h3a2 2 0 0 0 2 -2l-1 -5a2 3 0 0 0 -2 -2h-7a3 3 0 0 0 -3 3"></path>
              </svg>
            </div>
             {counts.not_helpful > 0 && <span className="text-xs">{counts.not_helpful}</span>}
          </div>
        </button>
      </div>
      {feedbackSubmitted && userVote && <p className="text-sm text-gray-500">Thank you for your feedback!</p>}
    </>
  );
});

Feedback.displayName = 'Feedback';

export default Feedback;