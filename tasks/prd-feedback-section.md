
# Product Requirements Document: Workshop Feedback Section

## 1. Introduction/Overview

This document outlines the requirements for the `FeedbackSection` component. This feature provides a dedicated space for users to submit feedback, ratings, and testimonials after completing a workshop session or viewing a replay. The goal is to gather user insights for content improvement and to collect social proof, while strictly adhering to the project's core ethos of creating a safe, private, and supportive community for users.

## 2. Goals

*   **Gather Actionable Insights:** Collect quantitative (ratings) and qualitative (text feedback) data to measure workshop success and identify areas for improvement.
*   **Collect Social Proof:** Source powerful, authentic testimonials that can be used in marketing materials to build trust and encourage new sign-ups.
*   **Reinforce Community & Trust:** Provide a final, positive point of engagement that makes users feel heard and valued, while giving them full control over their privacy.

## 3. User Stories

*   **As a workshop attendee, I want to easily provide feedback on the session** so that I can help improve future content and feel that my experience is valued.
*   **As a workshop attendee, I want to share my positive experience as a testimonial, with the option to remain anonymous or keep it private,** so that I can support the community while protecting my privacy.

## 4. Functional Requirements

1.  **Rating Input:** The system must display a 5-star rating input. This is a required field.
2.  **Testimonial Input:** The system must provide a multi-line text area for users to write their feedback. This is a required field.
3.  **Name Input:** The system must provide an optional text input for the user to enter a name or initials for public display.
4.  **Privacy Control:** The system must provide a checkbox allowing the user to mark their feedback as completely private and for internal use only.
5.  **Submission Logic:** The "Submit" button must be disabled until all required fields (rating, testimonial) are filled.
6.  **API Integration:** On submission, the component must send the following data to a backend API (`/api/feedback/workshop`):
    *   `workshopId` (string)
    *   `rating` (number)
    *   `message` (string)
    *   `name` (string, or null if empty)
    *   `isPrivate` (boolean)
7.  **State Handling:** The component must visually indicate its state to the user:
    *   **Loading:** A loading state must be shown while the form is submitting.
    *   **Success:** On success, the form must be replaced with a thank-you message and a CTA to the community.
    *   **Error:** On failure, a clear error message must be displayed, allowing the user to try again.

## 5. Non-Goals (Out of Scope)

*   This feature will **not** include functionality for administrators to reply to feedback directly within the UI.
*   This feature will **not** publicly display submitted feedback on the website in this iteration. The collected testimonials will be used in manually curated marketing content.
*   The form will **not** support file uploads (e.g., user profile pictures).

## 6. Design & UI/UX Considerations

*   The UI must be clean, inviting, and align with the workshop's branding (soft, safe, supportive).
*   Styling will be implemented using **Tailwind CSS**, adhering to the project's `tailwind.config.ts`.
*   The component must be fully responsive, providing an excellent experience on both desktop and mobile devices.
*   All interactive elements (stars, inputs, buttons) must have clear `hover`, `focus`, and `active` states as defined in the project's design system.
*   For specific headings, labels, and placeholder text, refer to the `FeedbackSection.spec.md` document.

## 7. Technical Considerations

*   **Component Props:** The component will accept a `workshopId: string` prop to associate the feedback with the correct workshop.
*   **State Management:** Component-level state (e.g., `useState`) is sufficient to manage form inputs and submission status.
*   **API Endpoint:** A `POST` request will be made to an endpoint like `/api/feedback/workshop`.
*   **Accessibility (A11y):** All requirements from the specification must be met, including proper labels for inputs, keyboard accessibility for the star rating, and clear focus indicators.

## 8. Success Metrics

*   **Submission Rate:** Achieve a feedback submission rate of >15% of workshop attendees.
*   **Average Rating:** Maintain an average workshop rating of >4.5 stars.
*   **Testimonial Collection:** Collect at least 5 high-quality, non-private testimonials per workshop for potential use in marketing.

## 9. Open Questions

*   What is the final API endpoint for feedback submission?
*   What is the destination URL for the "Join the Community" CTA?
*   What are the backend requirements for storing and reviewing the submitted feedback?
