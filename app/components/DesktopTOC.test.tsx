import React from 'react';
import { render, screen } from '@testing-library/react';
import DesktopTOC from './DesktopTOC';
import '@testing-library/jest-dom';

// Mock ReadingProgressBar since it's not relevant to this test
jest.mock('./ReadingProgressBar', () => function ReadingProgressBar() { return <div data-testid="progress-bar" />; });

describe('DesktopTOC', () => {
  it('should generate heading IDs with the element prop as a prefix', async () => {
    const contentHtml = '<h2>First Heading</h2><h3>Sub Heading</h3>';
    const element = 'my-test-element';

    render(<DesktopTOC contentHtml={contentHtml} element={element} />);

    // Wait for the component to process the HTML
    const link = await screen.findByText('1. First Heading');
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', `#${element}-first-heading`);

    const subLink = await screen.findByText('Sub Heading');
    expect(subLink).toBeInTheDocument();
    expect(subLink.closest('a')).toHaveAttribute('href', `#${element}-sub-heading`);
  });
});
