import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DownloadTrackerButton from './DownloadTrackerButton';

describe('DownloadTrackerButton', () => {
  beforeAll(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => Promise.resolve({}),
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('renders the download button', () => {
    render(<DownloadTrackerButton />);
    expect(screen.getByText(/Download Your Free 7-Day Bloating Reset Tracker/i)).toBeInTheDocument();
  });

  it('calls the analytics API when the download link is clicked', async () => {
    render(<DownloadTrackerButton />);
    const linkElement = screen.getByRole('link', { name: /Download Your Free 7-Day Bloating Reset Tracker/i });
    fireEvent.click(linkElement);
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/analytics',
      expect.objectContaining({
        method: 'POST',
        body: expect.stringContaining('"event":"tracker_download"'),
      })
    );
  });
});
