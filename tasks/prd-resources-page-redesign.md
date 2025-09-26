# PRD: Resources Page UI Redesign (Perplexity Style)

## 1. Introduction/Overview

This document outlines the requirements for redesigning the `ResourcesPage.tsx` component to align with a modern, clean, and content-focused aesthetic inspired by the Perplexity UI. The primary goal is to enhance readability, improve user navigation, and modernize the visual presentation of our content-heavy pages, starting with the resources section. This change will make our valuable resources more accessible and engaging for users.

## 2. Goals

- **Enhance Readability:** Implement a layout that makes content easier to consume, particularly for long-form text and data.
- **Modernize Look & Feel:** Update the page with a fresh, minimalist design that feels current and trustworthy.
- **Boost User Engagement:** Encourage users to spend more time on the page and interact with the resources provided.
- **Create a Scalable Template:** Develop a design pattern that can be reapplied to other content-heavy pages (e.g., Blog, About, FAQ) in the future.

## 3. User Stories

- **As a user,** I want to view content in a clean, single-column layout so I can read without getting distracted by sidebars or complex grids.
- **As a user,** I want to easily scan the page for relevant information so I can find the specific resource I need quickly.
- **As a user,** I want the page to have a clear visual hierarchy with lots of space so the content feels organized and less overwhelming.
- **As a user,** I want to see lists and tables formatted clearly so I can digest key information at a glance.

## 4. Functional Requirements

1.  **Single-Column Layout:** The main content of the `ResourcesPage.tsx` component must be refactored to use a single-column layout.
2.  **Whitespace:** The design must incorporate generous whitespace between text blocks, headings, and other UI elements to improve scannability.
3.  **Typographic Hierarchy:** The page must use a clear and consistent hierarchy for headings (e.g., `<h1>`, `<h2>`, `<h3>`) to structure the content logically.
4.  **Scannable Elements:** All lists (`<ul>`, `<ol>`) and tables (`<table>`) must be styled for maximum readability.
5.  **Minimalist Styling:** The design should remove unnecessary visual elements like excessive borders, shadows, and backgrounds. Visual accents should be subtle and used only to structure content.
6.  **Responsive Design:** The new layout must be fully responsive and provide an excellent reading experience on both desktop and mobile devices.

## 5. Non-Goals (Out of Scope)

- **Full Site Redesign:** This project is limited to the `ResourcesPage.tsx` component and creating a template for future use. Other pages are not in scope for this phase.
- **Interactive Widget Redesign:** Interactive elements like the Supplement Stacking Calculator or quizzes are not part of this redesign. They should remain functional and receive only minor CSS tweaks if necessary to avoid visual clashes.
- **Backend or Content Changes:** This is a front-end focused task. No changes will be made to the underlying data or content being served.

## 6. Design Considerations

- **Inspiration:** The primary design inspiration is the Perplexity web interface. Key elements to replicate are its focus, clarity, and minimalist presentation of information.
- **Target Component:** `d:\projects\yourfitnature-react\app\components\ResourcesPage.tsx`
- **Styling:** Changes will primarily be implemented via CSS, potentially using CSS-in-JS or updating existing stylesheets.

## 7. Technical Considerations

- The implementation should focus on modifying the CSS and the JSX structure within `ResourcesPage.tsx`.
- Existing component functionality and props must be maintained.
- The changes should not negatively impact page load speed or performance.

## 8. Success Metrics

- **Increased User Engagement:** A measurable increase in metrics such as average time on page and a decrease in bounce rate for the Resources page.
- **Increased Resource Interaction:** An increase in clicks or downloads of the available resources (meal plans, trackers, etc.).
- **Qualitative Feedback:** Positive feedback from users regarding the new layout and improved readability.

## 9. Open Questions

- Are there specific font families, font sizes, or color palettes from the Perplexity UI that we should adopt?
- Should the mobile view be prioritized in the implementation, or should desktop and mobile experiences be developed with equal priority?
