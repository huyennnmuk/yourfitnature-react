Here is a **Product Requirements Document (PRD) for the “Shop now, pay later” element** as seen in the hero section of the Luminous Labs Essential product page. This PRD is written for developers to guide the implementation of this UI and functional element:

***

**PRD: “Shop Now, Pay Later” Element**

***

**Objective:**  
Enable visitors to understand and access pay-later (installment) financing directly from the product hero section, increasing accessibility and conversion.

***

**1. Placement & Structure**

- **Location:**  
  - Displayed directly under the main Add to Cart button, within or alongside other purchase confidence badges (like “100-day money back”, “8-year warranty”, etc.)
  - On mobile: Clearly visible beneath the main CTA.

- **Style/Layout:**  
  - Badge-style or short text with an adjacent icon (e.g., a small clock, calendar, or credit card).
  - Text: Bold key phrase “Shop now, pay later” (matching brand typography), possibly with a lighter description on hover/focus.
  - Clickable if supporting more info/modal.

***

**2. Content Logic**

- **Core Message:**  
  - “Shop now, pay later”
  - Optional sub-label: “Split your purchase in 4 with Klarna/Afterpay/other provider” if a specific service is enabled.
  - Adapt text based on regional options and available services via backend config.

***

**3. Functional Requirements**

- **Dynamic Display:**  
  - Should only be visible if a pay-later provider is enabled (via backend or config flag).
  - Provider name and messaging should update dynamically based on user’s country/locale.

- **Interactions:**  
  - On hover/focus (desktop):  
    - Show tooltip/modal/banner with:
      - Short description of how pay-later works
      - Provider logo (e.g., Klarna, Afterpay)
      - Legal/disclaimer (“Subject to approval by provider. See terms…”)
      - Link/button: “Learn more”, opening modal or provider’s info page.
  - On click (all devices):
      - Open modal with:
          - Pay-later provider details/offers/FAQ
          - Short eligibility criteria and fees disclosure
          - Link out to full terms, or optionally, open provider’s official site in new tab.

- **Accessibility:**  
  - Keyboard accessible, focusable.
  - Screen reader label: “Shop now, pay later — learn how to finance your purchase”.

***

**4. Visual/Branding Guidelines**

- Brand-consistent badge/button border radius, shadow, color, and font.
- Provider logo shown in monochrome or brand palette if necessary.
- Tooltip/modal uses same style (rounded corners, soft shadow, legible font).

***

**5. Integration & Analytics**

- Analytics event for badge/modal view, clicks, and outclick to provider.
- Propagate affiliate parameters in all links from badge/modal (if present).
- Backend hook to display different providers/offers based on region/config.

***

**6. Content Management**

- Service provider name, logo, and info editable via CMS/config.
- Legal text and disclaimer (with links) also editable.

***

This PRD ensures the “Shop now, pay later” element is visually inviting, dynamically adaptable, and fully functional to support higher-converting, trust-building e-commerce UX.

[1] https://www.luminouslabs.health/product/essential?ref=land-book.com