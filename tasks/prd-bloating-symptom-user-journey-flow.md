
# Product Requirements Document: Bloating Symptom User Journey Flow

## 1. Introduction/Overview

This document outlines the requirements for implementing the initial phase of the "Bloating Symptom User Journey Flow" on the FitNature website. The primary goal is to engage users experiencing bloating, capture their information for marketing, and guide them towards relevant affiliate products. This initial implementation will focus on creating a "Bloating Trigger Detective Quiz" as the primary entry point for this user journey.

## 2. Goals

*   Increase affiliate revenue by recommending targeted products to users.
*   Grow the email subscriber list by capturing user emails through the quiz.
*   Establish user trust by providing immediate, personalized value.

## 3. User Stories

*   **As a user experiencing bloating,** I want to take a short quiz to understand my potential triggers so that I can receive personalized recommendations.
*   **As a user who completes the quiz,** I want to receive an email with my results and a summary of the recommendations so that I can refer back to them later.
*   **As a site administrator,** I want to be able to easily modify the quiz questions and recommendations in the future.

## 4. Functional Requirements

1.  **Bloating Trigger Detective Quiz:**
    *   A new page will be created to host the quiz.
    *   The quiz will consist of a series of multiple-choice questions related to diet, lifestyle, and symptoms.
    *   Based on the user's answers, the quiz will display a results page with personalized supplement and diet recommendations.
    *   The quiz questions and recommendation logic will be implemented in a way that is easily updatable by developers.
2.  **Email Capture:**
    *   Before displaying the results, the user will be prompted to enter their email address to receive a copy of their results.
    *   The email submission will use the same logic and backend infrastructure as the existing newsletter signup form (`/api/newsletter`).
3.  **UI/Design:**
    *   The quiz and results pages will reuse existing components from `app/components/` to maintain a consistent look and feel with the rest of the website.
    *   The design should be responsive and work seamlessly on both desktop and mobile devices.

## 5. Non-Goals (Out of Scope)

*   This initial version will **not** include the other 6 steps of the user journey outlined in the "Bloating Symptom User Journey Flow" document (e.g., 7-Day Tracker, SOS Toolkit, etc.).
*   User accounts and saving quiz results to a user profile will **not** be implemented in this phase.
*   Direct integration with affiliate partner APIs is **not** required. Recommendations can be simple text and links for the initial version.

## 6. Design Considerations (Optional)

*   The quiz should be visually engaging and easy to use.
*   Consider using existing UI components like `TwoColumnFeature` for the quiz layout and `TestimonialCards` to add social proof.

## 7. Technical Considerations (Optional)

*   The quiz logic (questions, answers, and recommendations) should be stored in a structured format (e.g., JSON) to allow for easy updates.
*   The email capture functionality will reuse the existing `app/api/newsletter/route.ts` endpoint.

## 8. Success Metrics

*   **Quiz Completion Rate:** Target a 50% completion rate for users who start the quiz.
*   **Email Sign-ups:** Achieve 1,000 new email subscribers through the quiz within the first month.
*   **Affiliate Link Click-Through Rate (CTR):** Attain a 10% CTR on the affiliate links displayed on the quiz results page.

## 9. Open Questions

*   What are the specific affiliate products and links that should be recommended for each quiz outcome?
