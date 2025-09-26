// FAQList.tsx
"use client";
import React, { useState } from 'react';
import '../styles/faq-list.css';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQListProps {
  faqs?: FAQ[];
  title?: string;
}

const FAQList: React.FC<FAQListProps> = ({ faqs = [], title = "FAQs" }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="faq-section fitnature-section-bg">
      <h2 className="faq-title">{title}</h2>
      <ul className="faq-list">
        {faqs.map((faq, idx) => (
          <li key={idx} className="faq-item">
            <button
              className="faq-question"
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              aria-expanded={openIndex === idx}
            >
              {faq.question}
              <span className="faq-toggle">{openIndex === idx ? '-' : '+'}</span>
            </button>
            {openIndex === idx && (
              <div className="faq-answer">{faq.answer}</div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FAQList;
