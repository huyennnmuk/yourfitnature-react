Front-End Plan:

   1. Component Creation: I will create a new file
      app/components/ReportAnswerModal.tsx to house the modal component.
      This component will include the title, category selection, a textarea
      for optional feedback, and Submit/Cancel buttons, all styled with
      Tailwind CSS.
   2. Entry Point: I will add a "Report" button to the existing answer
      action bar, which will trigger the modal.
   3. State Management: I will use React's useState hook to manage the
      modal's state, including its visibility and form inputs.
   4. User Feedback: After a user submits a report, a toast notification
      will appear to confirm the submission and will include a simple "Was
      reporting helpful?" survey.
   5. Testing: I will create ReportAnswerModal.test.tsx to test the
      component's functionality, including the modal's opening/closing and
      the submit button's state.

Back-End Plan:

  1. API Endpoint: I will create a new API route at
     app/api/reporting/route.ts to handle the submission of report data
     via POST requests.
  2. Data Model: I will define a TypeScript interface for the report
     payload, which will include fields like report_id, user_id,
     categories, and free_text.
  3. Submission Handling: The back-end will validate the incoming data and
     save it. For this initial implementation, I will log the reports to
     logs/reporting.log.
  4. Rate Limiting: I will implement a basic rate-limiting mechanism to
     prevent spam.
  5. Triage and Safety: Reports marked as "Harmful or offensive" will be
     flagged for immediate review.

  **Database Storage:**

  1.  **Database Setup:**
      *   Create a new database table named `answer_reports` to store the feedback reports.
      *   The table schema will be based on the `Data Model (Report)` section of `ReportFeedback.md` and will include the following fields:
          *   `report_id` (Primary Key, Auto-increment)
          *   `user_id`
          *   `session_id`
          *   `thread_id`
          *   `answer_id`
          *   `categories` (JSON)
          *   `free_text` (TEXT)
          *   `created_at` (DATETIME)
          *   `context` (JSON)
          *   `safety_flag` (BOOLEAN)
          *   `triage_status`
          *   `reviewer_notes` (TEXT)
          *   `resolution_code`
      *   A setup script will be created at `app/api/reporting/setup/route.ts` to create the table.

  2.  **API Endpoint Modification:**
      *   The existing API route at `app/api/reporting/route.ts` will be modified to connect to the new database and insert the report data into the `answer_reports` table instead of logging to a file.

  3.  **Enhanced Submission Handling:**
      *   The back-end will perform robust validation on the incoming data against the defined database schema before insertion.

  4.  **Rate Limiting (unchanged):**
      *   The rate-limiting mechanism will remain in place.

  5.  **Triage and Safety (unchanged):**
      *   Reports marked as "Harmful or offensive" will continue to be flagged for immediate review, potentially with an additional flag in the database.