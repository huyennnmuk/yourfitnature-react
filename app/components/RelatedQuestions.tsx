'use client';
import React from 'react';

interface RelatedQuestion {
  question: string;
  answer: string;
}

const RelatedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" color="currentColor" fill="currentColor" fillRule="evenodd">
    <path d="M16.0799 4.39998H17.9999V6.31993H19.9201V8.23993H17.9999V10.16H16.0799V8.23993H14.1601V6.31993H16.0799V4.39998Z M3.60001 6.31993H12.24V8.23993H3.60001V6.31993Z M12.24 12.08H20.8799V14H12.2399L12.24 12.08Z M12.24 12.08H3.60001V10.16H12.24V12.08Z M12.2399 15.92H3.60001V14H12.2399V15.92Z M12.2399 15.92L20.8799 15.9199V17.8399H12.2399V15.92Z"></path>
  </svg>
);

const PlusIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 4V20M4 12H20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MinusIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 12H20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface RelatedQuestionsProps {
    related_questions?: RelatedQuestion[];
}

const RelatedQuestions: React.FC<RelatedQuestionsProps> = ({ related_questions }) => {
  const [openedQuestion, setOpenedQuestion] = React.useState<number | null>(null);

  const handleQuestionClick = (index: number) => {
    setOpenedQuestion(openedQuestion === index ? null : index);
  };

  if (!related_questions || related_questions.length === 0) {
    return null;
  }

  return (
    <div className="related-questions-container">
      <div className="flex items-center">
        <RelatedIcon />
        <h3 className="ml-2">Related Questions</h3>
      </div>
      <ul className="related-questions-list">
        {related_questions.map((item, index) => (
          <li key={index} className="related-question-item">
            <a href="#" className="related-question-link" onClick={(e) => { e.preventDefault(); handleQuestionClick(index); }}>
              <span>{item.question}</span>
              {openedQuestion === index ? <MinusIcon /> : <PlusIcon />}
            </a>
            {openedQuestion === index && (
              <div className="related-question-answer">
                <p>{item.answer}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RelatedQuestions;
