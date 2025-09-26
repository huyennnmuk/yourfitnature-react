## Relevant Files

- `app/bloating-sos-toolkit/page.tsx` - The main page for the Bloating SOS Emergency Toolkit.
- `app/components/BloatingSOSToolkit.tsx` - The React component containing the content and logic for the toolkit.
- `app/components/BloatingSOSToolkit.test.tsx` - Unit tests for the `BloatingSOSToolkit` component.
- `app/meal-planning-templates/page.tsx` - The main page for the Bloating-Free Meal Planning Templates.
- `app/components/MealPlanTemplates.tsx` - The React component for displaying the meal plan download links.
- `app/components/MealPlanTemplates.test.tsx` - Unit tests for the `MealPlanTemplates` component.
- `app/resources/page.tsx` - The dedicated page for affiliate resources linked from the meal plans.
- `app/components/ResourcesPage.tsx` - The React component for the affiliate resources page.
- `app/components/ResourcesPage.test.tsx` - Unit tests for the `ResourcesPage` component.
- `public/pdf/Bloating-SOS-Emergency-Toolkit.pdf` - The downloadable PDF version of the toolkit.
- `public/pdf/3-Day-Bloating-Free-Meal-Plan.pdf` - The downloadable 3-day meal plan.
- `public/pdf/7-Day-Bloating-Free-Meal-Plan.pdf` - The downloadable 7-day meal plan.

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.

## Tasks

- [x] 1.0 Create Bloating SOS Emergency Toolkit Webpage and PDF
  - [x] 1.1 Create the new route and page file at `app/bloating-sos-toolkit/page.tsx`.
  - [x] 1.2 Develop the `BloatingSOSToolkit.tsx` component.
  - [x] 1.3 Populate the component with content for "Fast Relief Strategies" as per the PRD.
  - [x] 1.4 Add content for "Meal Swaps" and "Supplement Protocols," including necessary disclaimers.
  - [x] 1.5 Create the downloadable `Bloating-SOS-Emergency-Toolkit.pdf` with all the content from the webpage.
  - [x] 1.6 Add a prominent CTA button on the webpage to download the PDF.
  - [x] 1.7 Write unit tests for the `BloatingSOSToolkit.tsx` component.
- [x] 2.0 Create Bloating-Free Meal Planning Templates and Resources Page
  - [x] 2.1 Create the new route and page file at `app/meal-planning-templates/page.tsx`.
  - [x] 2.2 Develop the `MealPlanTemplates.tsx` component.
  - [x] 2.3 Design and create the `3-Day-Bloating-Free-Meal-Plan.pdf` including all recipe details as per the PRD.
  - [x] 2.4 Design and create the `7-Day-Bloating-Free-Meal-Plan.pdf` including all recipe details as per the PRD.
  - [x] 2.5 Add download links for the PDFs within the `MealPlanTemplates.tsx` component.
  - [x] 2.6 Create the new route and page file at `app/resources/page.tsx`.
  - [x] 2.7 Develop the `ResourcesPage.tsx` component and populate it with affiliate links and recommendations.
  - [x] 2.8 Write unit tests for the `MealPlanTemplates.tsx` and `ResourcesPage.tsx` components.
- [x] 3.0 Implement Design and UI Across New Components
  - [x] 3.1 Apply FitNature's branding (colors, typography, etc.) to the new pages and components.
  - [x] 3.2 Ensure the layout of all new pages is clean, readable, and visually appealing.
  - [x] 3.3 Verify that all new pages and components are fully mobile-responsive.
  - [x] 3.4 Use clear headings, bullet points, and high-quality images as specified in the PRD.
- [x] 4.0 Set Up Analytics and Tracking for Success Metrics
  - [x] 4.1 Integrate analytics events to track downloads of the SOS Toolkit PDF.
  - [x] 4.2 Integrate analytics events to track downloads of the 3-day and 7-day meal plan PDFs.
  - [x] 4.3 Track clicks on all affiliate links on the new pages.
  - [x] 4.4 Set up tracking for page views and time spent on the new pages.
- [x] 5.4 Merge the feature branch and deploy to production.
  - [x] 5.1 Conduct a final review of all content for accuracy and clarity.
  - [x] 5.2 Perform cross-browser and cross-device testing.
  - [x] 5.3 Run all unit tests and end-to-end tests.

