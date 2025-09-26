## Relevant Files

- `app/bloating-quiz/page.tsx` - The main page for the bloating trigger detective quiz.
- `app/bloating-quiz/results/page.tsx` - The results page for the quiz.
- `app/components/Quiz.tsx` - The main component for the quiz interface.
- `app/components/QuizResults.tsx` - The component to display the quiz results.
- `lib/quizData.ts` - File to store the quiz questions, answers, and recommendation logic.
- `app/api/newsletter/route.ts` - Existing API route for handling newsletter signups.

### Notes

- Unit tests should be created for new components and logic.
- Use `npm test` to run tests.

## Tasks

- [x] 1.0 Create Quiz Data Structure
  - [x] 1.1 Define the TypeScript interfaces for questions, answers, and results in `lib/quizData.ts`.
  - [x] 1.2 Create mock quiz data (3-5 questions) based on the defined interfaces in `lib/quizData.ts`.
- [x] 2.0 Develop the Bloating-Quiz Page
  - [x] 2.1 Create the file `app/bloating-quiz/page.tsx`.
  - [x] 2.2 Create a new component `Quiz.tsx` in `app/components/`.
  - [x] 2.3 Add the `Quiz` component to the `app/bloating-quiz/page.tsx` page and build the basic page layout.
- [x] 3.0 Implement Quiz Logic and State Management
  - [x] 3.1 In `Quiz.tsx`, import the quiz data from `lib/quizData.ts`.
  - [x] 3.2 Use `useState` to manage the current question index and store user answers.
  - [x] 3.3 Implement functions to handle answer selection and advance to the next question.
  - [x] 3.4 After the last question, calculate the user's result based on their answers.
  - [x] 3.5 Redirect the user to the results page, passing the calculated result as a URL query parameter.
- [x] 4.0 Create the Quiz Results Page
  - [x] 4.1 Create the file `app/bloating-quiz/results/page.tsx`.
  - [x] 4.2 Create a new component `QuizResults.tsx` in `app/components/`.
  - [x] 4.3 In `QuizResults.tsx`, read the result from the URL query parameter.
  - [x] 4.4 Display the personalized recommendations based on the result, including affiliate links.
- [x] 5.0 Add Email-Capture Functionality
  - [x] 5.1 Add a newsletter signup form to the `QuizResults.tsx` component.
  - [x] 5.2 The form should reuse the logic from the existing `NewsletterSignup.tsx` component to capture emails.
  - [x] 5.3 Ensure the `source` sent to the API is 'quiz-results'.