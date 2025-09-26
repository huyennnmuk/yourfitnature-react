## Product Requirements Document: "Not Helpful" Button for Perplexity

### Overview
The "Not Helpful" button is a user feedback mechanism for Perplexity, allowing users to quickly report when an answer does not meet their expectations in terms of accuracy, relevance, or usefulness. This feature aims to gather actionable data, improve AI response quality, and enhance the user experience.

***

### Goals
- Enable users to easily indicate unsatisfactory answers.
- Collect structured feedback for continuous model improvement.
- Minimize disruption to UX; keep feedback quick and effortless.

***

### User Stories
- As a user, I can click "Not Helpful" if the answer is wrong, partial, or irrelevant.
- As a product manager, I want to see aggregated reports on "Not Helpful" feedback per query type or topic.
- As an engineer, I need the system to log details (question context, model version, user type) for each negative feedback event.

***

### Core Requirements

| Requirement                  | Description                                                                                            |
|------------------------------|--------------------------------------------------------------------------------------------------------|
| Button Placement             | Visible near every answer, alongside "Helpful" or thumbs-up feedback.                                  |
| Button Text/Icon             | "Not Helpful" (thumbs-down icon).                                                                     |
| User Interaction             | One-tap feedback; may trigger optional dialog ("What was wrong?") with quick options (e.g., inaccurate, incomplete, irrelevant, other). |
| Logging                      | Logs: user ID/session (if signed in), query/answer text, model version, timestamp, context (thread/focus mode), and feedback type. |
| Rate Limiting                | Prevents spam; only one "Not Helpful" per answer per user.                                            |
| Privacy                      | No personal info exposed in logs for non-signed-in users; follows standard privacy policy.             |
| Analytics Dashboard          | PMs/data scientists access aggregated feedback (top weak queries, improvement trends, most common feedback type). |
| Follow-up                    | Optionally, users can provide written feedback (free text box, character-limited).                     |
| Response/Follow-up           | System may surface "Sorry, we'll review this answer—thanks for your feedback" confirmation.             |

***

### Non-Functional Requirements
- **Performance**: No delay in submitting feedback.
- **Accessibility**: Icon and text comply with a11y standards; visible on all devices/screen sizes.
- **Internationalization**: Supports translation/localization if product is localized.
- **Security**: Secure transmission of feedback data.

***

### Edge Cases & Considerations
- Feedback from rapid repeat clicks is deduplicated.
- Logged-out users can submit feedback, but with limited metadata.
- Data is periodically reviewed and used to fine-tune answer generation, but not immediately reflected in model outputs.

***

### Success Metrics
- Increase in feedback events and actionable data collected.
- Decrease in negative feedback rates over time in top categories.
- User satisfaction with feedback flow (measured via UX study).

***

### Future Extensions (Not in MVP)
- Reply to user feedback with improved answer.
- Aggregate/visualize feedback for or with the community.

***

### Example Flow
1. User reads answer, finds it unhelpful.
2. Clicks "Not Helpful" button (thumbs-down).
3. Optional: Dialog offers preset issues (e.g., "Factually wrong", "Incomplete", "Not relevant") and "Other" (with text box).
4. Feedback logged immediately.
5. System displays "Thank you—we'll use your feedback to improve."

***

This PRD provides clear functional and UX requirements, technical details, and success criteria for a robust "Not Helpful" feedback mechanism for Perplexity.

[1] https://www.perplexity.ai/search/how-table-of-content-display-o-YZiypQKyR.SZAUdoZazgSQ?1=d
[2] https://www.reddit.com/r/perplexity_ai/comments/1go7xea/disappointed_with_the_pdf_results_perplexity_pro/
[3] https://www.perplexity.ai
[4] https://www.perplexity.ai/help-center/en/articles/10354769-what-is-a-thread
[5] https://www.perplexity.ai/hub/blog/introducing-perplexity-deep-research
[6] https://learnprompting.org/blog/guide-perplexity
[7] https://www.lennysnewsletter.com/p/how-perplexity-builds-product
[8] https://1min.ai/wai-67-perplexity-ai-integration-chat-message-sharing-copy-button
[9] https://www.xda-developers.com/strategies-getting-most-out-perplexity/
[10] https://www.godofprompt.ai/blog/what-is-perplexity
[11] https://dorik.com/blog/how-to-use-perplexity-ai
[12] https://www.m1-project.com/blog/what-is-perplexity-ai-and-how-it-works
[13] https://www.reddit.com/r/perplexity_ai/comments/1cltxyr/thoughts_on_perplexity_the_pros_and_cons/
[14] https://1c.com.vn/en/news/perplexity-la-gi
[15] https://elementor.com/blog/perplexity/
[16] https://shadhinlab.com/how-to-use-perplexity-ai/
[17] https://www.youtube.com/watch?v=eqSkH_p8CZ8
[18] https://www.youtube.com/watch?v=iIHEYvRTEjc
[19] https://www.eugenelymar.pm/p/ai-in-action-transforming-my-daily-product-management-tasks
[20] https://www.perplexity.ai/hub/getting-started
[21] https://www.youtube.com/watch?v=flfF8mbwFv4