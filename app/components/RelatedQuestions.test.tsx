import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RelatedQuestions from './RelatedQuestions';

describe('RelatedQuestions', () => {
  const mockQuestions = [
    { question: 'Question 1', answer: 'Answer 1' },
    { question: 'Question 2', answer: 'Answer 2' },
  ];

  it('renders nothing when no questions are provided', () => {
    const { container } = render(<RelatedQuestions />);
    expect(container.firstChild).toBeNull();
  });

  it('renders the questions', () => {
    render(<RelatedQuestions related_questions={mockQuestions} />);
    expect(screen.getByText('Related Questions')).toBeInTheDocument();
    expect(screen.getByText('Question 1')).toBeInTheDocument();
    expect(screen.getByText('Question 2')).toBeInTheDocument();
  });

  it('does not show answers by default', () => {
    render(<RelatedQuestions related_questions={mockQuestions} />);
    expect(screen.queryByText('Answer 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Answer 2')).not.toBeInTheDocument();
  });

  it('shows an answer when a question is clicked', () => {
    render(<RelatedQuestions related_questions={mockQuestions} />);
    fireEvent.click(screen.getByText('Question 1'));
    expect(screen.getByText('Answer 1')).toBeInTheDocument();
    expect(screen.queryByText('Answer 2')).not.toBeInTheDocument();
  });

  it('hides an answer when the same question is clicked again', () => {
    render(<RelatedQuestions related_questions={mockQuestions} />);
    fireEvent.click(screen.getByText('Question 1'));
    expect(screen.getByText('Answer 1')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Question 1'));
    expect(screen.queryByText('Answer 1')).not.toBeInTheDocument();
  });
});
