## PRD: Perplexity "Helpful" Button

### Overview
The "Helpful" button is a core feedback feature for Perplexity, enabling users to positively rate answers that meet their needs. This simple mechanism generates valuable feedback for evaluating answer quality and guides future product and model improvements.

***

### Objectives
- Allow users to easily provide positive feedback on answers.
- Enable tracking of response quality to reinforce best practices in AI.
- Keep the feedback flow frictionless and consistent across all devices.

***

### User Stories
- As a user, I can quickly indicate an answer was helpful by clicking a "Helpful" (thumbs-up) button.
- As a product manager, I can analyze which answers, topics, and models receive the most positive feedback.
- As a data scientist, I can use positive feedback data to steer future training and response benchmarks.

***

### Functional Requirements

| Feature                | Details                                                                                                   |
|------------------------|-----------------------------------------------------------------------------------------------------------|
| Placement              | Button displayed near every answer, alongside "Not Helpful" button.                                       |
| Label/Icon             | "Helpful" text label and/or thumbs-up icon, visually clear.                                               |
| Interaction            | One-click action immediately logs positive feedback, with optional dialog for category/tag.                |
| Logging                | Store session/user ID, query, answer, model version, timestamp, and context with each feedback event.      |
| Rate Limiting          | Limit: one "Helpful" feedback per answer, per user; rapid repeat clicks are ignored or deduplicated.       |
| Privacy                | Anonymized data if user not logged in; all storage/processing follows privacy policy.                      |
| Confirmation           | Display "Thanks for your feedback!" confirmation after submission.                                         |
| Analytics Dashboard    | Internal dashboards for aggregate totals, trending queries/topics, user engagement, and feature success.   |

***

### Non-Functional Requirements
- **Performance**: Instantaneous feedback submission with no lag.
- **Accessibility**: All elements are accessible to screen readers, keyboard, and meet visual accessibility standards.
- **Internationalization**: Supports translated/localized labels and messages.
- **Security**: All feedback data transmitted and stored securely.

***

### Success Metrics
- Volume of "Helpful" feedback submitted daily/weekly.
- Diversity of topics receiving positive ratings.
- Documented increases in answer quality associated with positive feedback.
- Positive user satisfaction scores on overall platform experience.

***

### Example Flow
1. User reads an answer and finds it helpful.
2. Clicks the "Helpful" button (thumbs-up icon).
3. Positive feedback logged instantly; "Thanks for your feedback!" message appears.

***

### Future Enhancements
- Users can see aggregate helpful scores for answers or threads.
- Weight "Helpful" feedback in ranking, surfacing, and training future model iterations.

***

This PRD establishes the requirements and workflow for the Perplexity "Helpful" button, ensuring seamless positive feedback collection and actionable insights for continuous improvement.

[1] https://www.perplexity.ai/search/how-table-of-content-display-o-YZiypQKyR.SZAUdoZazgSQ?1=d