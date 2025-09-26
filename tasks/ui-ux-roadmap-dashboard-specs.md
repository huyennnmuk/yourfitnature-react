### UI/UX Improvement Specifications for Roadmap Dashboard

This document outlines a series of UI and UX enhancements for the `RoadmapDashboard` component to create a more engaging, intuitive, and visually appealing user experience.

---

### 1. Visual Journey Path

-   **Goal:** To transform the simple vertical list of phases into a dynamic and motivating visual journey, helping users see their progress in a more tangible way.
-   **Description:** Instead of a simple list, the phases will be laid out along a winding, S-shaped path. The path will connect the phase cards, visually representing the user's progression from one stage to the next.
-   **Implementation Details:**
    -   Use SVG to draw a dashed or solid path in the background of the dashboard.
    -   Position the `PhaseCard` components at key points along this SVG path.
    -   On mobile devices (smaller screens), the winding path will gracefully collapse into a decorated vertical timeline to maintain usability.

**Visual Concept (Desktop):**
```

  [Phase 1]------------\
                      |
                     /
        /-----------[Phase 2]
        |
        \
  [Phase 3]------------/

```

---

### 2. Enhanced `PhaseCard` Component

-   **Goal:** To make each phase card more informative and visually distinct.
-   **Description:** Add icons and a clearer call-to-action on each card.
-   **Implementation Details:**
    -   **Icons:** Assign a unique, relevant icon to each phase (e.g., a journal for Phase 1, a magnifying glass for Phase 2, a healing symbol for Phase 3).
    -   **CTA Button:** For the `current` phase, add an explicit "Start Phase" or "Continue" button within the card to guide the user to their next action.
    -   **Micro-interactions:** Add subtle hover effects or animations to the cards to make them feel more interactive.

---

### 3. Global Progress Bar

-   **Goal:** To give users an immediate sense of their overall accomplishment and motivate them to continue.
-   **Description:** A progress bar will be displayed prominently at the top of the dashboard.
-   **Implementation Details:**
    -   The progress bar's value will be calculated based on the number of completed phases (e.g., 2 phases complete = 40% progress).
    -   The bar should be animated to fill smoothly as the user completes a phase.

---

### 4. Personalized Header

-   **Goal:** To make the user feel seen and encouraged every time they visit their roadmap.
-   **Description:** Create a more dynamic header section for the dashboard.
-   **Implementation Details:**
    -   Welcome the user by name (e.g., "Welcome back, Jane!").
    -   Provide a brief, encouraging summary of their status (e.g., "You're currently on Phase 2. You've got this!" or "You've completed 3 phases. Amazing progress!").

---

### 5. Refined `RoadmapDashboard` Layout

-   **Goal:** To create a cleaner and more organized presentation for the entire page.
-   **Description:** The main `page.tsx` for the roadmap will be updated to incorporate these new elements in a structured layout.
-   **Implementation Details:**
    -   The layout will be: `Personalized Header` -> `Global Progress Bar` -> `Visual Journey Path` with `PhaseCards`.
    -   The "Sign Out" button will be moved to a more conventional location, perhaps in the main site header or a user dropdown menu, to declutter the main content area.

```