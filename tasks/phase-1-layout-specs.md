# UI/UX Layout Specifications: Phase 1 Page

**File Path:** `d:\projects\yourfitnature-react\app\bloating-recovery-roadmap\phase-1\page.tsx`

This document outlines the UI/UX layout and components for the Phase 1 page of the Bloating Recovery Roadmap, with detailed references to the project's `tailwind.config.ts` and reusable components.

---

## 1. Overall Layout

- **Container:** The main content is wrapped in a `div` with the following Tailwind CSS classes:
  - `container`: Centers the content horizontally.
  - `mx-auto`: Provides horizontal margin auto.
  - `px-4 py-8`: Provides horizontal and vertical padding. The values `4` and `8` correspond to `1rem` and `2rem` respectively, based on Tailwind's default spacing scale.
  - `max-w-4xl`: Sets the maximum width of the content area to `56rem`.

---

## 2. Header Section

- **Structure:** A `div` with `mb-8` (margin-bottom: `2rem`).
- **Components:**
  - **Back to Dashboard Link:**
    - A `next/link` component for client-side navigation.
    - **Styling:**
      - `text-camber-sage-primary`: Uses the `camber-sage-primary` color (`#6E7C5B`) defined in `tailwind.config.ts`.
      - `font-semibold`: Sets the font-weight to `600`.
      - `hover:underline`: Underlines the text on hover.
    - **Content:** `&larr; Back to Dashboard`
  - **Page Title:**
    - An `h1` element with `typography-h1` and `mt-2`.

---

## 3. Content Modules (`@/app/components/ContentModule`)

- **Props:**
  - `type`: `'text' | 'video'`
  - `title`: `string`
  - `content?`: `string`
  - `videoId?`: `string`
  - `startOpen?`: `boolean`

- **UI/UX Enhancements:**
  - **Collapsible Sections:** Text modules are collapsible.
  - **Icons:** `PlayCircle` for video, `FileText` for text.
  - **Animation:** Uses `framer-motion` for smooth expand/collapse animations.
  - **Toggle:** The title acts as a button to toggle content visibility, with a `ChevronDown` icon indicating the state.

---

## 4. Digital Tracker Section (`@/app/components/DigitalTracker`)

- **Component:** A form for users to log daily wellness data.
- **Internal Structure:** Contains `label`, `textarea`, and `select` elements for input, and a `button` for submission.

---

## 5. Phase Completion Section (`@/app/components/PhaseCompletionButton`)

- **Component:** Handles the UI and logic for completing or un-completing a phase.
- **Props:** `phaseNumber`: `number`
- **Internal Structure:**
  - **Conditional Rendering:** Shows different content based on the phase `status`.
  - **Buttons:** Uses `@/app/components/ReusableButton`.
  - **Confirmation Modal:** A `framer-motion` animated modal for the "Mark as Incomplete" action.

---

## 6. Modern Layout Structure

### 6.1. Responsive Design

- **Mobile First:** The layout is designed with a mobile-first approach. Components stack vertically on small screens.
- **Breakpoints:** Tailwind CSS breakpoints (`sm`, `md`, `lg`, `xl`) are used to adapt the layout for different screen sizes. For example, the `DigitalTracker`'s form fields are in a single column on mobile and switch to a two-column grid on medium screens and up (`md:grid-cols-2`).
- **Fluid Typography:** The use of `rem` units and responsive typography classes (e.g., from `@tailwindcss/typography`) ensures that text scales appropriately with the viewport.

### 6.2. Accessibility (a11y)

- **Semantic HTML:** The page uses semantic HTML5 elements (`h1`, `h2`, `section`, `button`, etc.) to provide meaning and structure to the content.
- **ARIA Attributes:** Where necessary, ARIA attributes should be used to enhance accessibility. For example:
  - The collapsible content modules should use `aria-expanded` to indicate their state.
  - The confirmation modal in `PhaseCompletionButton` should use `role="dialog"`, `aria-modal="true"`, and manage focus appropriately.
- **Keyboard Navigation:** All interactive elements (links, buttons, form fields) must be focusable and operable via the keyboard.
- **Labels:** All form inputs in the `DigitalTracker` have associated `label` elements for screen readers.

### 6.3. State Management

- **Component State:** Local UI state (e.g., the open/closed state of a content module, form inputs) is managed using the `useState` hook within the respective components.
- **Shared State:** The overall state of the roadmap (which phases are complete, current, or locked) is managed globally by the `RoadmapContext` (`@/app/contexts/RoadmapContext.tsx`). This allows different components on the page to share and react to the same data source.
- **Data Flow:** The `PhaseCompletionButton` component dispatches actions (`completePhase`, `uncompletePhase`) to the `RoadmapContext`, which updates the state and persists the changes to the backend. The components then re-render to reflect the new state.