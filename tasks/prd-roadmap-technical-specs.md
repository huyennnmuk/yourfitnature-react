### Bloating Recovery Roadmap - Detailed Technical Specifications

This document outlines the specific technical requirements and considerations for implementing the Bloating Recovery Roadmap.

---

### 1. New Page/Route

-   **Route:** The main roadmap dashboard will live at a protected route, such as `/roadmap` or `/my-roadmap`.
-   **Sub-routes:** Each phase could have its own sub-route (e.g., `/roadmap/phase-1`) to make the content modular and linkable.
-   **Access Control:** These routes must be protected and only accessible to logged-in users who have enrolled in the roadmap.

---

### 2. User Authentication & Data

-   **Authentication:** A robust user authentication system is required. 
    -   **Implementation:** Use a service like NextAuth.js for easy integration of social logins (Google, etc.) and traditional email/password.
-   **User Data Model:** The user model in the database will need to be extended to store roadmap-specific data.
    -   **Schema:** `user { id, name, email, roadmap_progress: { current_phase, completed_phases, phase_1_data: {...}, ... } }`

---

### 3. Component-Based Architecture

-   **Framework:** The application is built on **Next.js** and **React**.
-   **Key Components to Build:**
    -   `RoadmapDashboard`: The main container component.
    -   `PhaseCard`: A reusable component to display the status of each phase (locked, current, completed).
    -   `ContentModule`: A component to render different types of content (text, video, PDF links).
    -   `Checklist`: An interactive checklist component with a persistent state.
    -   `DigitalTracker`: An interactive version of the 7-day tracker, with form inputs and data saving capabilities.

---

### 4. State Management

-   **Requirement:** A client-side state management solution is needed to manage user progress and interactions without requiring a page reload for every action (e.g., checking an item off a list).
-   **Technology Options:**
    -   **Zustand or Jotai:** Lightweight, modern state management libraries that are simple to integrate with React.
    -   **React Context with useReducer:** A built-in React solution suitable for managing state within the roadmap feature itself.
    -   **Redux Toolkit:** A more powerful option if the roadmap state needs to be shared extensively with other parts of the application.

---

### 5. Backend & Database

-   **Backend:** A backend API is required to handle user data persistence.
    -   **Implementation:** Use **Next.js API Routes** to create the necessary endpoints (e.g., `GET /api/roadmap/progress`, `POST /api/roadmap/update`).
-   **Database:** A relational or NoSQL database to store user and roadmap data.
    -   **Technology Options:**
        -   **PostgreSQL:** A robust, open-source relational database.
        -   **Supabase or Firebase:** Backend-as-a-Service (BaaS) platforms that can accelerate development by providing a database, authentication, and APIs out of the box.

---

### 6. UI/UX

-   **Styling:** The feature will be styled using **Tailwind CSS**, consistent with the rest of the application.
-   **Design Principles:**
    -   **Clarity & Simplicity:** The user's path and next action should always be crystal clear.
    -   **Motivation & Encouragement:** Use visual cues like progress bars, checkmarks, and celebratory messages to keep users engaged.
    -   **Responsive Design:** The entire experience must be fully functional and visually appealing on all devices, from mobile to desktop.

---

### 7. Implementation Plan & Component Logic

#### A. UI & Styling Inheritance

-   **Primary Styling:** All new components will be styled using **Tailwind CSS**. The UI will strictly adhere to the design tokens (colors, fonts, spacing) defined in `tailwind.config.ts` to ensure visual consistency with the existing application.
-   **Color Palette:** Leverage the `camber-sage-*` and `perplexity-*` color palettes for backgrounds, text, buttons, and accents.
-   **Custom CSS:** Custom CSS rules, if necessary, should be added to `app/styles/blog-post.css` or a new dedicated stylesheet, using the CSS variables defined in `:root` (e.g., `var(--perplexity-primary)`).

#### B. Component Reusability & Creation

To accelerate development and maintain consistency, the roadmap will reuse existing components wherever possible. New components will only be created for functionality that does not already exist.

**Reusable Components:**

-   **Page Layout:** `Header.tsx`, `Footer.tsx`.
-   **Buttons:** `ReusableButton.tsx` for all interactive buttons and links.
-   **Content Display:** `FAQList.tsx` can be adapted for troubleshooting guides. `ContentWithImageSection.tsx` can be used for educational modules.
-   **Modals & Popups:** `AffiliatePopup.tsx`, `FeedbackModal.tsx`, and `RegistrationModal.tsx` can be repurposed for various interactions.
-   **Sidebars & Asides:** `DesktopTOC.tsx` and `NewsletterSignup.tsx` can be placed in sidebars on the roadmap pages.
-   **Direct Integrations:** `SupplementStackingCalculator.tsx` and `MealPlanTemplates.tsx` will be embedded directly into their respective phases.

**New Components to Be Created:**

-   `RoadmapDashboard.tsx`: The primary container component for the entire roadmap feature. It will manage the overall state and display the different phases.
-   `PhaseCard.tsx`: A visual component to represent each phase on the dashboard. It will show the phase's title, status (locked, current, completed), and a brief description.
-   `ContentModule.tsx`: A flexible component to render various types of content within a phase, such as articles (from markdown), embedded videos, and links to downloadable PDFs.
-   `DigitalTracker.tsx`: An interactive, form-based version of the 7-day tracker. It will include inputs for logging food, symptoms, and other metrics, and will save this data to the backend.
-   `Checklist.tsx`: A reusable component with interactive checkboxes to track user completion of tasks within each phase. Its state will be persisted in the database.
