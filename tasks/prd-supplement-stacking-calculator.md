# Product Requirements Document (PRD): Supplement Stacking Calculator

## 1. Introduction/Overview
The Supplement Stacking Calculator is an interactive tool designed to help users build a safe, effective supplement protocol for bloating relief. It addresses the confusion and risk associated with self-selecting supplements by providing personalized, science-backed recommendations based on user symptoms, current medications, and dietary restrictions. The calculator also serves as a high-converting affiliate touchpoint and an educational resource within the FitNature ecosystem.

## 2. Goals
- Enable users to create a personalized supplement stack for bloating relief.
- Increase user confidence and safety in supplement selection.
- Drive affiliate product conversions through targeted recommendations.
- Capture user emails for advanced supplement education and follow-up.
- Educate users on supplement protocols and potential interactions.

## 3. User Stories
- As a user experiencing bloating, I want to input my symptoms and restrictions so I can get a safe, effective supplement plan.
- As a supplement-curious user, I want to see which products work well together and which combinations to avoid.
- As a user, I want to receive clear, actionable recommendations with links to purchase trusted products.
- As a user, I want to understand why each supplement is recommended for my situation.
- As a user, I want to be warned about any potential supplement interactions or contraindications.

## 4. Functional Requirements
1. The system must allow users to input their symptoms, current medications, and dietary restrictions.
2. The system must provide a list of recommended supplements tailored to the user's inputs.
3. The system must display affiliate links for recommended products.
4. The system must explain the rationale for each supplement recommendation.
5. The system must warn users about potential supplement interactions or contraindications.
6. The system must allow users to download or email their personalized protocol.
7. The system must capture user emails for follow-up education and offers.
8. The system must provide links to advanced supplement education resources.
9. The system must be mobile-friendly and accessible.

## 5. Non-Goals (Out of Scope)
- The calculator will not provide medical diagnoses or replace professional medical advice.
- The calculator will not recommend prescription medications.
- The calculator will not store user health data beyond what is needed for the session/email capture.
- The calculator will not support supplements unrelated to digestive health/bloating.

## 6. Design Considerations (Optional)
- Should match FitNature’s clean, science-backed, and trustworthy brand style.
- Use clear CTAs such as “Build Your Stack” and “Download Your Protocol.”
- Display affiliate products with images, short descriptions, and purchase links.
- Include educational tooltips or info icons for supplement details and warnings.
- Responsive design for mobile and desktop.

## 7. Technical Considerations (Optional)
- Should integrate with existing FitNature affiliate product database or API.
- Email capture should connect to the current email marketing system.
- Consider using a form library for robust input validation (e.g., Formik, React Hook Form).
- Ensure accessibility (WCAG 2.1 compliance).

## 8. Success Metrics
- Number of users completing the calculator.
- Number of affiliate link clicks and conversions.
- Number of emails captured for follow-up.
- User feedback on clarity, usefulness, and trust.
- Reduction in user confusion or support requests about supplement safety.

## 9. Open Questions
- What specific supplement brands or products should be prioritized in recommendations?
- Are there any legal disclaimers required for supplement advice?
- Should the calculator support multi-language or region-specific recommendations?
- What is the process for updating supplement data and contraindications?
