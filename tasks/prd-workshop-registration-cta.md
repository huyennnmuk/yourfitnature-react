
# PRD: "Register for All Sessions" CTA & Confirmation

**Author:** Gemini
**Date:** 2025-08-26
**Status:** Draft

## 1. Overview

This document outlines the requirements for enhancing the workshop registration process. The primary goal is to encourage users to register for all four workshop sessions at once, creating a more committed user and simplifying the registration flow. This involves changes to the registration modal, the backend API, and the confirmation page.

## 2. User Stories

- As a user, I want to easily register for all workshop sessions with a single click so that I don't have to sign up for each one individually.
- As a user, after registering for all sessions, I want to see a clear confirmation that lists all the sessions I'm registered for, so I can be confident my registration was successful.
- As a developer, I need the backend to handle a registration for "all" sessions, so that it correctly records the user's intent in the database.
- As a marketer, I want to track users who sign up for all sessions, so I can analyze the effectiveness of this CTA.

## 3. Requirements

### 3.1. Registration Modal (`RegistrationModal.tsx`)

-   **UI Change:** The "All 4 Sessions (Complete Series)" option in the `sessionPreference` dropdown should be visually distinct and more prominent.
    -   **Suggestion:** Change the text to "🔥 **Register for All 4 Sessions (Recommended)**".
    -   Consider making it the default selected option if no `initialSessionPreference` is provided.
-   **Logic:** When a user selects "all", the form submission should send `sessionPreference: 'all'` to the API.

### 3.2. API Endpoint (`/api/workshop-registration/route.ts`)

-   **Validation:** The Zod schema for `sessionPreference` already accepts the value `'all'`. No changes are needed for validation.
-   **Database Interaction:**
    -   When `sessionPreference` is `'all'`, the `workshop_registrations` table should store this value.
    -   The existing check for duplicate registrations needs to be updated. If a user is already registered for an individual session (e.g., 'luteal'), and they try to register for 'all', the API should handle this gracefully.
        -   **Proposed Logic:** If a user tries to register for `'all'` and registrations for individual sessions exist for that email, either:
            1.  **Option A (Simpler):** Allow the `'all'` registration and let the backend/email system handle de-duplication of notifications.
            2.  **Option B (Cleaner):** Delete the individual session registrations and create a single new one for `'all'`.
            - **Decision:** We will proceed with **Option A** for simplicity in this iteration. The check should be modified: if a user is already registered for `'all'`, prevent another `'all'` registration.
-   **API Response:** When a user successfully registers for `'all'` sessions, the API response should reflect this.
    -   `sessionType` should be `'all'`.
    -   `workshopDetails.title` should be "The Complete Bloating Relief Workshop Series".
    -   `sessionDate` should be a descriptive string like "Multiple Dates - See Email for Details".

### 3.3. Confirmation Page (`/workshop-confirmation/page.tsx`)

-   **Dynamic Content:** The confirmation page must dynamically adapt when the `session` query parameter is `'all'`.
-   **UI Components to Update:**
    -   `ConfirmationHeroSection`:
        -   Display a title like "You're Registered for the Complete Workshop Series!".
        -   The `workshop.phase` should show "All Sessions".
        -   The `workshop.date` and `workshop.time` should be updated to reflect multiple sessions (e.g., "See Emails for Details").
    -   `CalendarIntegrationSection`:
        -   Instead of a single "Add to Calendar" button, this section should provide links to add each of the four events to their calendar.
        -   The UI should clearly list each session (Follicular, Ovulatory, Luteal, Menstrual) with its respective date, time, and an "Add to Calendar" link.
    -   `ImmediateValueSection` & `NextStepsSection`: The content should be generic enough to apply to all sessions, or it could be updated to mention the comprehensive nature of the series.
-   **Analytics:** The `trackWorkshopConfirmationView` event should correctly log `sessionParam` as `'all'`.

## 4. Success Criteria

-   A user can select the "All 4 Sessions" option in the registration modal.
-   The API successfully processes and stores the registration with `session_preference = 'all'`.
-   The user is redirected to the confirmation page with `?session=all`.
-   The confirmation page displays a confirmation for all four sessions, including separate calendar integration links for each.
-   Analytics correctly track the "all sessions" registration event.

## 5. Out of Scope

-   Complex de-duplication logic on the backend (Option B from 3.2).
-   Changes to the email notification system to bundle all session details into a single email (this will be handled in a separate task).
-   Allowing users to select a subset of sessions (e.g., 2 or 3). The choice is one or all.
