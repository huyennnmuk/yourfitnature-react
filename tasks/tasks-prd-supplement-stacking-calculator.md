## Relevant Files

- `app/components/SupplementStackingCalculator.tsx` - Main React component for the calculator UI and logic.
- `app/components/SupplementStackingCalculator.test.tsx` - Unit tests for the calculator component.
- `lib/supplements/supplementData.ts` - Data source for supplement options, interactions, and affiliate links.
- `lib/supplements/supplementUtils.ts` - Utility functions for supplement logic, filtering, and validation.
- `lib/supplements/supplementUtils.test.ts` - Unit tests for supplement utility functions.
- `app/api/supplement-stack/route.ts` - API route for handling protocol downloads/emails (if needed).
- `app/api/supplement-stack/route.test.ts` - Unit tests for the API route.

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.

## Tasks


  - [ ] 1.1 Review PRD and clarify open questions with stakeholders if needed
  - [x] 1.2 Define user input fields (symptoms, medications, dietary restrictions)
  - [x] 1.0 Design and Plan Supplement Stacking Calculator
  - [x] 2.0 Build Supplement Data and Utility Functions
  - [x] 2.1 Create `supplementData.ts` with supplement options, interactions, and affiliate links
  - [x] 2.2 Implement utility functions for filtering supplements by user input
  - [x] 2.3 Add logic for detecting supplement interactions and contraindications
  - [x] 2.4 Write helper functions for generating explanations and warnings

  - [x] 3.0 Implement Calculator UI and User Input Flow
  - [x] 3.1 Build the main calculator component structure in `SupplementStackingCalculator.tsx`
  - [x] 3.2 Add form fields for user input (symptoms, medications, restrictions)
  - [x] 3.3 Implement state management for user selections and results
  - [x] 3.4 Display recommended supplements and rationale dynamically
  - [x] 3.5 Ensure responsive design for mobile and desktop

  - [x] 4.0 Integrate Affiliate Links, Explanations, and Warnings
  - [x] 4.1 Display affiliate product links with images and descriptions
  - [x] 4.2 Show rationale for each supplement recommendation
  - [x] 4.3 Display warnings for supplement interactions or contraindications
  - [x] 4.4 Add tooltips or info icons for supplement details

  - [x] 5.0 Add Download/Email, Education, and Accessibility Features
  - [x] 5.1 Implement download/email functionality for personalized protocol
  - [x] 5.2 Integrate email capture and connect to email marketing system
  - [x] 5.3 Link to advanced supplement education resources
  - [x] 5.4 Ensure accessibility (WCAG 2.1 compliance)

  - [x] 6.0 Write Unit Tests and Validate Functionality
  - [x] 6.1 Write unit tests for utility functions in `supplementUtils.test.ts`
  - [x] 6.2 Write unit tests for the calculator component in `SupplementStackingCalculator.test.tsx`
  - [x] 6.3 Write tests for API route if implemented
  - [x] 6.4 Manually test UI for usability and edge cases
  - [x] 6.5 Review and address user feedback or issues
