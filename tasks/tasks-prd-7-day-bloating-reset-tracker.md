## Relevant Files

- `public/pdf/7-Day-Bloating-Reset-Tracker.pdf` - The final, downloadable PDF tracker.
- `app/components/DownloadTrackerButton.tsx` - A new UI component for the download button/link.
- `app/components/DownloadTrackerButton.test.tsx` - Unit tests for the `DownloadTrackerButton` component.
- `app/bloating-quiz/results/page.tsx` - The quiz results page where the download button will be placed.
- `lib/analytics.ts` - (Optional) A file to house analytics tracking functions if applicable.

### Notes

- The new PDF file should be placed in the `public` directory to be easily accessible via a direct link.
- Unit tests should be created for the new component to ensure it functions correctly.
- Use `npm test` or `npx jest` to run tests.

## Tasks

- [ ] 1.0 Design the Tracker Layout and Content
  - [x] 1.1 Finalize the layout, branding (logo, colors), and structure for the 7-day tracker.
  - [x] 1.2 Write all copy, including the introduction, daily logging fields (meals, symptoms, water, etc.), and unique daily tips.
  - [x] 1.3 Design the layout in a tool that can be easily converted to a high-quality PDF (e.g., Canva, Figma, or even HTML/CSS).
- [x] 2.0 Create the Fillable PDF Document
  - [x] 2.1 Convert the final design into a PDF document.
  - [x] 2.2 Use a PDF editor (like Adobe Acrobat Pro) to add interactive, fillable form fields for all text inputs.
  - [x] 2.3 Add checkboxes for the daily action steps to make them interactive.
  - [x] 2.4 Optimize the final PDF for web to ensure a small file size for quick downloads.
  - [x] 2.5 Place the final `7-Day-Bloating-Reset-Tracker.pdf` file into the `public/pdf/` directory.
- [x] 3.0 Create a New Component for the PDF Download
  - [x] 3.1 Create a new file: `app/components/DownloadTrackerButton.tsx`.
  - [x] 3.2 Implement a React component that renders a styled button or link.
  - [x] 3.3 The link's `href` should point directly to `/pdf/7-Day-Bloating-Reset-Tracker.pdf`.
  - [x] 3.4 Add the `download` attribute to the anchor tag to encourage browser download behavior.
  - [x] 3.5 Create a corresponding test file `app/components/DownloadTrackerButton.test.tsx` to verify the component renders correctly and the link is accurate.
- [x] 4.0 Integrate the Download Component into the Quiz Results Page
  - [x] 4.1 Open the quiz results page file: `app/bloating-quiz/results/page.tsx`.
  - [x] 4.2 Import the new `DownloadTrackerButton` component.
  - [x] 4.3 Add the component to the page, likely below the main quiz results, with a clear call-to-action like "Download Your Free 7-Day Bloating Reset Tracker".
- [x] 5.0 Add Analytics for Tracking Downloads (Optional)
  - [x] 5.1 If an analytics system is in place, define a new event like `track('tracker_download')`.
  - [x] 5.2 Add an `onClick` handler to the `DownloadTrackerButton` component to trigger this analytics event.
  - [x] 5.3 Test to ensure the download event is correctly captured in the analytics platform when the button is clicked.
