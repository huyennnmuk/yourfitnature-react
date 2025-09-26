## Perplexity PRD: Helpful & Not Helpful Button

A Product Requirements Document (PRD) for a Helpful/Not Helpful button on Perplexity would outline the goals, features, user experience flow, and acceptance criteria for collecting user feedback on AI-generated answers within the platform. While no direct PRD from Perplexity is public, best practices and platform-specific insights allow for a synthesized outline:

***

### 1. **Objective/Goal**
- **Purpose:** Enable users to rate the usefulness of Perplexity’s answers, improving answer quality via direct feedback.
- **Outcome:** Gather actionable data to refine algorithms and UI/UX, raising user satisfaction and trust in results.

***

### 2. **Core Functional Requirements**
- **Button Placement:** Display *Helpful* and *Not Helpful* buttons at the end (or near) every answer provided by the AI.[1]
- **Feedback Capture:** Clicking either button should instantly log the user’s response, tied to the specific answer/thread.
- **Optional Comments:** After clicking "Not Helpful," prompt users (optionally) to specify what was missing or incorrect.
- **Immediate Feedback:** Optionally, display a confirmation message (e.g., “Thank you for your feedback!”) once a button is clicked.

***

### 3. **Use Case / User Flow**
1. **User reads AI-generated answer.**
2. **User selects if the answer was Helpful or Not Helpful.**
3. *If Not Helpful*: Optionally, user can provide additional context—such as relevance, accuracy, or depth issues.
4. **Feedback is submitted, acknowledged, and stored for further analysis.**
5. **(Internal)**: Product and engineering teams review aggregate feedback to prioritize updates.

***

### 4. **Design & Usability Criteria**
- **UI Consistency:** Buttons should be large enough for easy tapping/clicking (esp. on mobile), with accessible labels.
- **Visibility:** Buttons must be clearly visible, not hidden behind dropdowns or extra clicks.
- **Performance:** Feedback submission should be instant and non-blocking—no page reloads.[2]
- **Accessibility:** Buttons must be keyboard- and screen-reader friendly according to WCAG guidelines.
- **Responsive:** Works on desktop, tablet, and mobile screen sizes.

***

### 5. **Non-Functional Requirements**
- **Reliability:** Users should always see the feedback buttons after each answer, regardless of device or plan.
- **Speed:** Feedback submission and confirmation must occur within 300ms.
- **Security:** Feedback must be logged without exposing user identity (unless logged-in user consent is given).

***

### 6. **Acceptance Criteria**
- Buttons are present after every answer.
- Clicking a button records feedback and shows a confirmation.
- "Not Helpful" optionally prompts for additional explanation.
- Feedback is stored in a secure, structured format for analysis by Perplexity product/internal teams.

***

### 7. **Impact & Monitoring**
- **Analytics dashboard** (for admins/product managers): Track Helpful/Not Helpful rates per answer, by topic, time, and user segment.
- **Continuous improvement:** Feedback informs product decisions and AI training to increase helpfulness and reduce cases where answers are unsatisfactory.[1][2]

***

This PRD structure is designed for clarity, rapid iteration, and actionable insight. It reflects the importance of two-way communication between the user and Perplexity’s platform, fostering a more accurate, user-centric product.

[1] https://www.g2.com/products/perplexity/reviews?qs=pros-and-cons
[2] https://techpoint.africa/guide/my-perplexity-ai-review/
[3] https://www.perplexity.ai/search/how-table-of-content-display-o-YZiypQKyR.SZAUdoZazgSQ?1=d
[4] https://www.perplexity.ai
[5] https://www.reddit.com/r/perplexity_ai/comments/1cltxyr/thoughts_on_perplexity_the_pros_and_cons/
[6] https://www.perplexity.ai/hub/blog/introducing-perplexity-deep-research
[7] https://learnprompting.org/blog/guide-perplexity
[8] https://www.youtube.com/watch?v=O1UTAiigrx4
[9] https://www.productplan.com/glossary/product-requirements-document/
[10] https://team-gpt.com/blog/perplexity-review/
[11] https://www.perplexity.ai/help-center/en/articles/10352971-practical-tips-for-using-perplexity
[12] https://www.youtube.com/watch?v=zK3KlDOnpn4
[13] https://kodytechnolab.com/blog/product-requirement-document/
[14] https://em360tech.com/tech-articles/perplexity-ai-better-chatgpt-comparison
[15] https://www.perplexity.ai/help-center/en/articles/10354769-what-is-a-thread
[16] https://userback.io/guide/guide-to-user-feedback-for-product-managers/
[17] https://alitu.com/creator/tool/what-is-perplexity/
[18] https://www.xda-developers.com/perplexity-features-to-help-study-smarter/
[19] https://docs.perplexity.ai/llms-full.txt
[20] https://mttmr.com/2024/01/10/perplexitys-high-bar-for-ux-in-the-age-of-ai/
[21] https://www.cnet.com/tech/services-and-software/what-is-perplexity-heres-everything-you-need-to-know-about-this-ai-chatbot/