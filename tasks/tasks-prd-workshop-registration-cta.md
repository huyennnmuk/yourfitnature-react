## Relevant Files

- `app/components/RegistrationModal.tsx` - Contains the registration form and modal UI that needs to be updated.
- `app/components/RegistrationModal.test.tsx` - Unit tests for `RegistrationModal.tsx`.
- `app/api/workshop-registration/route.ts` - API route handler for processing the workshop registration.
- `app/api/workshop-registration/route.test.ts` - Unit tests for the registration API.
- `app/workshop-confirmation/page.tsx` - The confirmation page displayed after registration that needs to show the "all sessions" state.
- `app/workshop-confirmation/page.test.tsx` - Unit tests for the confirmation page.
- `app/components/ConfirmationHeroSection.tsx` - Component on the confirmation page that will display the main confirmation message.
- `app/components/CalendarIntegrationSection.tsx` - Component on the confirmation page that will display the individual calendar links.
- `lib/analytics.ts` - Contains analytics tracking functions to be called.
- `app/workshop/bloating-hormones/replay/all-sessions/page.tsx` - New page to handle the replay for all sessions.

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `npm run test` to run tests. You can specify a file to test, e.g. `npm test -- app/components/RegistrationModal.test.tsx`.

## Tasks

- [x] 1.0 Enhance the Registration Modal UI and Logic
  - [x] 1.1 In `RegistrationModal.tsx`, change the "All 4 Sessions (Complete Series)" option text to "🔥 **Register for All 4 Sessions (Recommended)**".
  - [x] 1.2 Make the "All 4 Sessions" option the default selected option if no `initialSessionPreference` is provided.
  - [x] 1.3 Ensure the form submission correctly sends `sessionPreference: 'all'` to the API when the new option is selected.
- [x] 2.0 Update Backend API for "All Sessions" Registration
  - [x] 2.1 In `/api/workshop-registration/route.ts`, update the duplicate registration check to prevent a new 'all' registration if one already exists for the same email.
  - [x] 2.2 Ensure the `workshop_registrations` table in the database correctly stores the value 'all' in the `session_preference` column.
  - [x] 2.3 Modify the API success response for an 'all' registration to include `sessionType: 'all'`, a relevant title, and a descriptive date string.
- [x] 3.0 Adapt Confirmation Page for "All Sessions"
  - [x] 3.1 In `/workshop-confirmation/page.tsx`, add logic to read the `session` query parameter from the URL.
  - [x] 3.2 Update the `ConfirmationHeroSection` component to display a custom title and details when the `session` parameter is 'all'.
  - [x] 3.3 Modify the `CalendarIntegrationSection` to render four separate "Add to Calendar" links (one for each workshop session) when the `session` parameter is 'all'.
  - [x] 3.4 Review the `ImmediateValueSection` & `NextStepsSection` components to ensure their content is appropriate for the "all sessions" registration context.
- [x] 4.0 Implement Analytics Tracking
  - [x] 4.1 In `/workshop-confirmation/page.tsx`, ensure the `trackWorkshopConfirmationView` analytics event is called with `sessionParam` as `'all'` when the page loads for an "all sessions" confirmation.
- [ ] 5.0 Testing and Verification
  - [ ] 5.1 Create or update unit tests for `RegistrationModal.tsx` to verify the new UI and form submission logic.
  - [ ] 5.2 Create or update integration tests for the `/api/workshop-registration/route.ts` API endpoint to cover the 'all' registration scenario, including duplicate checks.
  - [ ] 5.3 Create or update unit tests for `/workshop-confirmation/page.tsx` to verify that the correct content and components are rendered when `session=all`.
  - [ ] 5.4 Perform end-to-end manual testing of the entire registration flow to ensure a seamless user experience.
- [x] 6.0 Bug Fixes
  - [x] 6.1 Fix 404 for /workshop/bloating-hormones/replay/all-sessions
  - [x] 6.2 Fix ConfirmationHeroSection not updating for "all sessions"
  - [x] 6.3 Fix ReferenceError: allSessionDetails is not defined in CalendarIntegrationSection.tsx
  - [x] 6.4 Fix RangeError: Invalid time value in CalendarIntegrationSection.tsx