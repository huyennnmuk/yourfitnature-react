### Project Guidelines for Gemini Code Assist

This document provides rules and conventions for AI-assisted development in the `yourfitnature-react` project.

#### 1. Core Technology Stack

*   **Framework**: Next.js 14 (with App Router)
*   **Language**: TypeScript
*   **UI**: React 18
*   **Styling**: Tailwind CSS (with PostCSS)
*   **Testing**: Jest with React Testing Library
*   **Package Manager**: npm

#### 2. Development Workflow

*   **Run Development Server**: `npm run dev`
*   **Run Tests**: `npm run test`
*   **Run Linter**: `npm run lint`
*   **Build for Production**: `npm run build`

#### 3. Code Style and Conventions

*   **File Naming**:
    *   Components: `PascalCase.tsx` (e.g., `MyComponent.tsx`)
    *   Tests: `ComponentName.test.tsx` (e.g., `MyComponent.test.tsx`)
*   **Component Structure**:
    *   Create components inside `app/components/`.
    *   Use functional components with hooks.
    *   Props should be typed using TypeScript interfaces.
*   **Styling**:
    *   Primarily use **Tailwind CSS** utility classes for all styling.
    *   Refer to `tailwind.config.ts` for theme configuration.
    *   Use custom CSS files in `app/styles/` only for complex, reusable styles that are difficult to achieve with Tailwind alone.
*   **Linting**:
    *   Adhere to the rules defined in `.eslintrc.json` (extends `next/core-web-vitals`).
    *   Run `npm run lint` to check for issues before committing.
*   **TypeScript**:
    *   Leverage TypeScript's features for type safety. `strict` mode is enabled.
    *   Use path aliases `@/*` for imports from the root directory as configured in `tsconfig.json`.

#### 4. Testing

*   **Framework**: Jest and React Testing Library.
*   **Test Files**: Create test files alongside the component they are testing (e.g., `app/components/MyComponent.test.tsx`).
*   **Assertions**: Use `@testing-library/jest-dom` for DOM-based assertions.
*   **Mocks**:
    *   Static assets (`.svg`, `.png`, etc.) are mocked using `__mocks__/fileMock.js`.
    *   Use the `__mocks__` directory for any other necessary manual mocks.

#### 5. Dependencies

*   **Adding Packages**: Use `npm install <package-name>` for new dependencies.
*   **Adding Dev Packages**: Use `npm install --save-dev <package-name>` for new development dependencies.
*   **Review**: Check `package.json` to see existing libraries before adding new ones to avoid duplication.

#### 6. Page Creation

*   **Reuse Components**: When creating any new page, reuse components from the `@components` folder wherever possible to maintain consistency and reduce duplication.
*   **File Structure**:
    *   Pages should be created inside the `app/pages/` directory.
    *   Use the file name to represent the route (e.g., `app/pages/about.tsx` for the `/about` route).
*   **Linking**: Use the `next/link` component for internal links between pages to enable client-side navigation.
*   **Data Fetching**:
    *   For static generation, use `getStaticProps` and `getStaticPaths` as needed.
    *   For server-side rendering, use `getServerSideProps`.
*   **API Routes**: If the page requires data fetching from an API, create a corresponding API route in the `app/api/` directory.

By following these guidelines, Gemini can provide assistance that is consistent with your project's structure and conventions.
