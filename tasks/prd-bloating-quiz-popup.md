---
title: Bloating Quiz Popup and Floating Action Button
objective: >
  Create a persistent, yet unobtrusive, user engagement tool for the bloating
  quiz. It will initially appear as a popup and then transform into a floating
  action button (FAB) when closed, ensuring it remains accessible without
  disrupting the user experience.
---

### 1. Overview

The Bloating Quiz Popup is a user engagement component designed to capture the user's interest. It initially presents the first question of the bloating quiz in a modal window. When dismissed, it transforms into a Floating Action Button (FAB), providing a persistent entry point to the quiz without being intrusive.

### 2. Features

- **Time-Delayed Popup**: The component will appear as a modal overlay automatically after a short delay (e.g., 5 seconds) on the user's first visit to the page in a session.
- **Minimized State (FAB)**: When the user closes the popup, it minimizes into a FAB.
- **Persistent Access**: The FAB remains on the screen, allowing the user to re-open the quiz at any time.
- **Single Question**: The popup displays the first question from `lib/quizData.ts`.
- **Call-to-Action (CTA)**: A prominent button labeled "Take the Full Quiz" navigates the user to the `/bloating-quiz` page.
- **Dismissible**: The popup can be closed with an "X" icon or by clicking the overlay.
- **Smart Positioning**: The FAB will be positioned to avoid overlapping with other floating elements, like the "Scroll to Top" button.
- **Responsive Design**: Both the popup and the FAB are fully responsive.
- **Animated Transitions**: `framer-motion` will provide smooth transitions between the popup and FAB states.

### 3. Technical Requirements

- **Component Name**: `BloatingQuizPopup.tsx`
- **Location**: `app/components/`
- **Styling**: Must use **Tailwind CSS** and adhere to the project's design system.
- **State Management**: The component will manage its own state (`isOpen`, `isMinimized`) using React hooks.
- **Dependencies**:
  - `react`
  - `next/link`
  - `framer-motion`
  - `lucide-react`

### 4. User Flow

1.  **Initial Visit**: A user lands on the page.
2.  **Delayed Popup**: After a 5-second delay, if it's the user's first visit in the session, the `BloatingQuizPopup` automatically appears as a modal.
3.  **User Interaction with Popup**:
    - **Option A (Engage)**: The user clicks "Take the Full Quiz" and is redirected to the full quiz page.
    - **Option B (Dismiss)**: The user clicks the close icon or the background overlay.
4.  **Transformation to FAB**: Upon dismissal, the popup smoothly transitions into a compact FAB, which settles in a convenient corner of the screen (e.g., above the scroll-to-top button).
5.  **Re-engagement**: The user can click the FAB at any point during their session to make the full `BloatingQuizPopup` reappear.