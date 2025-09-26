# Feedback Section Component Specification
*FitNature Bloating & Hormones Workshop Series*

## 1. Document Overview
- **Document Type:** Component Specification
- **Version:** 1.0
- **Date:** August 31, 2025
- **Purpose:** Define the structure, content, functionality, and technical requirements for the `FeedbackSection.tsx` React component.
- **Target Audience:** Developers, UI/UX Designers, Product Managers

---

## 2. Component Overview
- **Component Name:** `FeedbackSection`
- **File Path:** `app/components/workshop-component/FeedbackSection.tsx`
- **Purpose:** To provide a dedicated space for users to submit feedback, ratings, and testimonials after completing a workshop session or viewing a replay. This component is crucial for gathering user insights to improve content and for collecting social proof while respecting user privacy.
- **Placement:** This component should be placed at the end of a workshop session page, replay page, or on a dedicated feedback page linked from the workshop materials.
- **Key Theme:** The design and copy should be encouraging, validating, and action-oriented, reinforcing the workshop's core ethos of a safe, private, and supportive community.

---

## 3. Component Structure & Content

The component will consist of a main container with a clear heading, a feedback form, and a call-to-action to join the community.

### 3.1. Main Container
- A styled `<section>` element that visually separates the feedback area from the rest of the page content.
- It should have a soft, inviting background color that aligns with the workshop's branding.

### 3.2. Heading & Subheading
- **Primary Heading (h2):** "Share Your Experience & Help Us Grow"
- **Subheading (p):** "Your feedback is invaluable. It helps us understand what works and how to better support our community. All testimonials are shared with your privacy in mind."

### 3.3. Feedback Form
The form will be the core of the component, designed for ease of use and to encourage thoughtful responses.

- **Overall Rating (Required):**
    - **UI:** A 5-star rating system.
    - **Label:** "How would you rate this workshop?"
    - **Interaction:** Users can click on a star to set the rating. Hover effects should indicate the selected rating.

- **Testimonial / Feedback (Required):**
    - **UI:** A `textarea` element with multiple rows.
    - **Label:** "Your Story Matters"
    - **Placeholder Text:** "What was your biggest 'aha' moment? How has this workshop helped you on your journey? Your story could inspire someone else."
    - **Validation:** Must not be empty.

- **Display Name (Optional):**
    - **UI:** A standard text `input` field.
    - **Label:** "Your Name / Initials (as you'd like it to appear)"
    - **Helper Text:** "Optional. If left blank, your testimonial will be attributed to 'Anonymous'."

- **Anonymity Preference:**
    - **UI:** A checkbox.
    - **Label:** "I prefer to keep my testimonial completely private and not have it shared publicly."
    - **Functionality:** If checked, the testimonial will be used for internal feedback only and will not be displayed publicly, regardless of whether a name was provided.

- **Submit Button:**
    - **UI:** A primary button styled consistently with the site's theme.
    - **Text:** "Submit My Feedback"
    - **States:** Should have disabled, enabled, and loading states.

### 3.4. Post-Submission States
- **Loading State:** After clicking submit, the form fields and button should be disabled, and a loading spinner should appear on the button or next to it.
- **Success Message:** Upon successful submission, the form is replaced with a confirmation message.
    - **Heading:** "Thank You for Your Generosity!"
    - **Message:** "We've received your feedback. Every story shared helps us build a stronger, more supportive community. We are so grateful to have you on this journey with us."
- **Error Message:** If the submission fails, an inline error message should appear.
    - **Message:** "Sorry, something went wrong. Please try again or contact support@fitnature.com."

### 3.5. Community Call-to-Action
- **UI:** A visually distinct section below the feedback form/success message.
- **Heading:** "The Conversation Doesn't End Here"
- **Text:** "Join our private, faceless community to continue learning, share your progress, and connect with others who understand."
- **Button:** A secondary button with text like "Join the Community".

---

## 4. Functional Requirements
1.  The form should not submit if the rating or testimonial fields are empty.
2.  The submit button is disabled until all required fields are filled.
3.  Clicking the submit button triggers an API call to a backend endpoint (e.g., `/api/feedback/workshop`).
4.  The API request should include `workshopId`, `rating`, `message`, `name`, and `isPrivate`.
5.  The component must handle and display `loading`, `success`, and `error` states correctly.
6.  The `name` field should be optional. If empty, the feedback is considered anonymous for public display.
7.  The `isPrivate` checkbox ensures the feedback is for internal use only.

---

## 5. Technical Implementation Notes

### 5.1. Props
```typescript
interface FeedbackSectionProps {
  // The unique identifier for the workshop session (e.g., 'follicular-session-1')
  workshopId: string;
}
```

### 5.2. State Management
```typescript
// Using React hooks to manage form state
const [rating, setRating] = useState<number>(0);
const [message, setMessage] = useState<string>('');
const [name, setName] = useState<string>('');
const [isPrivate, setIsPrivate] = useState<boolean>(false);
const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
```

### 5.3. API Interaction
- **Endpoint:** `POST /api/feedback/workshop`
- **Request Body:**
```json
{
  "workshopId": "string",
  "rating": "number",
  "message": "string",
  "name": "string | null",
  "isPrivate": "boolean"
}
```
- **Error Handling:** The `fetch` call should be wrapped in a `try...catch` block to handle network errors, and the component should check the response status to handle API errors.

### 5.4. Styling
- Implement using **Tailwind CSS** utility classes, adhering to the project's `tailwind.config.ts`.
- Component should be fully responsive and accessible.
- Interactive elements (stars, buttons, inputs) must have clear `hover`, `focus`, and `active` states.

### 5.5. Accessibility (A11y)
- All form inputs must be associated with a `<label>`.
- The star rating system should be keyboard-accessible.
- Focus indicators must be clear on all interactive elements.
- Aria attributes should be used to describe the form's status during submission (`aria-busy`).
