## Relevant Files

- `app/components/workshop-component/FeedbackSection.tsx` - The main component file for the feedback form.
- `app/components/workshop-component/FeedbackSection.test.tsx` - Unit tests for the `FeedbackSection` component.
- `app/api/feedback/workshop/route.ts` - **New File:** The backend API route handler for processing and storing workshop feedback.
- `lib/db.ts` - Provides the `workshopPool` database connection. This file will be imported by the new API route.

### Notes

- Unit tests should be created alongside the component file.
- Use `npm run test` to run tests for the project.

## Tasks

- [x] 1.0 **Backend: Set up Database and API Route**
  - [x] 1.1 Design a new database table schema for `workshop_feedback`. It should include columns for `id`, `workshopId`, `rating`, `message`, `name`, `isPrivate`, and `created_at`.
  - [x] 1.2 Write and execute an SQL script to create the new `workshop_feedback` table in the database managed by `workshopPool`.
  - [x] 1.3 Create the new API route file at `app/api/feedback/workshop/route.ts`.
  - [x] 1.4 In the new route, import `workshopPool` from `lib/db.ts` to handle the database connection.
  - [x] 1.5 Implement the `POST` handler to receive, validate, and insert feedback data into the `workshop_feedback` table using the `workshopPool` connection.
  - [x] 1.6 Ensure the API handler returns appropriate success or error responses and releases the database connection.

- [x] 2.0 **Frontend: Create the Component UI and Styling**
  - [x] 2.1 Set up the main `<section>` container with appropriate background and padding.
  - [x] 2.2 Add the `h2` heading ("Share Your Experience & Help Us Grow") and `p` subheading.
  - [x] 2.3 Implement the 5-star rating component, ensuring stars are stylable for hover and selected states.
  - [x] 2.4 Add the `textarea` for the main feedback message with its corresponding `<label>` and placeholder text.
  - [x] 2.5 Add the optional `input` field for the display name with its corresponding `<label>` and helper text.
  - [x] 2.6 Add the privacy checkbox with its `<label>`.
  - [x] 2.7 Add the "Submit My Feedback" button with initial styling.
  - [x] 2.8 Ensure the entire component is responsive using Tailwind CSS utility classes.

- [x] 3.0 **Frontend: Implement State Management and Interactivity**
  - [x] 3.1 Use `useState` hooks to manage the state for `rating`, `message`, `name`, `isPrivate`, and `status`.
  - [x] 3.2 Create a handler function for the star rating component to update the `rating` state on click.
  - [x] 3.3 Implement `onChange` handlers for the `textarea` and `name` input to update their respective states.
  - [x] 3.4 Implement an `onChange` handler for the privacy checkbox to update the `isPrivate` state.
  - [x] 3.5 Implement logic to enable/disable the submit button based on whether the required fields (`rating`, `message`) are filled.

- [x] 4.0 **Frontend: Develop Form Submission Logic**
  - [x] 4.1 Create an asynchronous `handleSubmit` function.
  - [x] 4.2 Set the component's `status` to `'submitting'` to trigger the loading UI.
  - [x] 4.3 Construct the JSON payload with `workshopId`, `rating`, `message`, `name`, and `isPrivate`.
  - [x] 4.4 Use `fetch` to make a `POST` request to the new `/api/feedback/workshop` endpoint.

- [x] 5.0 **Frontend: Implement API Response Handling**
  - [x] 5.1 Based on the API response, set the `status` state to `'success'` or `'error'`.
  - [x] 5.2 Conditionally render the UI based on the `status` state.
  - [x] 5.3 If `status` is `'success'`, display the "Thank You" message and community CTA.
  - [x] 5.4 If `status` is `'error'`, display the "Sorry, something went wrong" message.

- [ ] 6.0 **Testing and Final Review**
  - [ ] 6.1 Create the test file `FeedbackSection.test.tsx`.
  - [ ] 6.2 Write a test to ensure the component renders correctly.
  - [ ] 6.3 Write tests to simulate user input and verify state updates.
  - [ ] 6.4 Write a test to verify the submit button's disabled/enabled logic.
  - [ ] 6.5 Mock the `fetch` API and test the submission process, including payload construction and handling of success, loading, and error states.
  - [ ] 6.6 Manually review the component in the browser to check for any UI/UX issues.
