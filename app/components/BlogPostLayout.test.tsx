import React from 'react';
import { render, screen } from '@testing-library/react';
import BlogPostLayout from './BlogPostLayout';

describe('BlogPostLayout', () => {
  it('renders without crashing', () => {
    render(
      <BlogPostLayout
        title="Test Title"
        author="Test Author"
        date="2025-01-01"
        contentHtml="<p>Test Content</p>"
      />
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('By Test Author on 2025-01-01')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
