### Image Display Specifications

#### 1. Overview

This document outlines the specifications for how images are implemented and displayed within the "Bloating Breakthrough Blueprint" page (`app/bloating-breakthrough-blueprint/page.tsx`) and its child components, specifically `ContentWithImageSection.tsx`.

#### 2. General Approach

The project prioritizes using the Next.js `<Image>` component for optimized, responsive, and accessible images. For large background images where optimization is less critical or more complex, CSS `background-image` is used.

#### 3. Component-Specific Implementations

##### A. `app/bloating-breakthrough-blueprint/page.tsx`

-   **Hero Section Image:**
    -   **Implementation:** The main hero image is implemented as a CSS `background-image` on the `HeroSection` component.
    -   **Source:** The image is loaded from an external URL (`images.unsplash.com`).
    -   **Styling:** The background image is styled to `cover` the entire section and uses `background-attachment: fixed` to create a parallax-like effect on scroll. An overlay `div` is used to add a color gradient for depth and text readability.

##### B. `app/components/ContentWithImageSection.tsx`

-   **Image Carousel:**
    -   **Implementation:** This component displays a series of images in a touch-friendly carousel using the `keen-slider` library in conjunction with the Next.js `<Image>` component.
    -   **Image Component:** The `next/image` component is used for each slide.
    -   **Props Used:**
        -   `src`: The path to the image. In this case, local images from the `/public/img/` directory are used (e.g., `/img/roadmap-1.jpg`).
        -   `alt`: Dynamically generated alt text for accessibility (e.g., "Your Bloating Recovery Roadmap slide 1").
        -   `fill`: Used to make the image fill its parent container, which has a defined aspect ratio.
        -   `sizes`: Provides information about how the image will be displayed at different breakpoints, allowing Next.js to serve the appropriately sized image.
        -   `className="object-cover"`: Ensures the image covers the entire area of its container without being distorted.
    -   **Responsiveness:** The `sizes` prop and the `object-cover` class ensure that the images are responsive and look good on all screen sizes. The carousel itself is also responsive.
    -   **Optimization:** By using the Next.js `<Image>` component, images are automatically optimized, lazy-loaded, and served in modern formats like WebP.

#### 4. Best Practices & Guidelines

-   **Use Next.js `<Image>`:** For all foreground images, the `next/image` component should be used to leverage its performance benefits.
-   **Provide `alt` Text:** All images must have descriptive `alt` text for accessibility.
-   **Responsive Images:** Use `fill`, `sizes`, and `object-cover` to create responsive images that adapt to different screen sizes.
-   **Local vs. Remote:** Store project-specific images locally in the `/public` directory. Use external URLs for content that may be dynamic or from a CMS.
