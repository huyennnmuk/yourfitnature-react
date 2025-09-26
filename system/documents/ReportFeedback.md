# PRD: “Report Answer” Feedback Modal for Perplexity

## Overview
Add an in-context “Report answer” flow that lets users flag problems with an answer via a modal, capture structured categories, and submit optional improvement notes to help Perplexity triage and fix issues faster.[1][2][3]

## Problem Statement
Users encounter incorrect, outdated, harmful, or low-quality answers and need a fast way to flag them without leaving the session; Perplexity currently supports reporting via a flag icon and support channels, but a clearer, structured, in-product flow improves collection quality and turnaround.[2][1]

## Goals and Success Metrics
- Increase report submissions per 1,000 answers by 50% within 30 days.[3][1][2]
- ≥70% of reports include at least one structured category.[1]
- Median triage time from report to internal ticket creation ≤24h.[2]
- Reduce duplicate/low-signal reports by 20% through clearer category UX.[3][1]
- User satisfaction with reporting flow (thumbs-up survey after submit) ≥4.2/5.[1]

## Users and Use Cases
- General users: flag inaccuracies or out-of-date claims in normal search answers.[3][1]
- Pro power users: report subtle citation/source issues in Pro/Deep Research results.[4][3]
- Safety-conscious users: report harmful/offensive outputs for rapid review.[5][1]

## Scope
In scope:
- Answer-level “Report” entry point and modal.
- Category selection, optional free-text, and evidence capture (auto-attach answer/citations).
- Client-side telemetry and server API for ingest.
- Basic confirmation and rate limiting.

Out of scope (future):
- Inline span-level highlighting.
- On-device redaction tools.
- Public report tracking.

## Functional Requirements
1. Entry points
   - “Report” from the answer action bar; keyboard shortcut option.[6][1]
2. Modal UI
   - Title: “Help us improve”
   - Multi-select categories:
     - Inaccurate
     - Out of date
     - Too short
     - Too long
     - Wrong sources
     - Harmful or offensive
   - Optional textarea: “How can the response be improved?” with 0–1,000 chars.[1]
   - Buttons: Submit (primary), Cancel.[1]
3. Auto-captured context
   - Answer text, model/mode (e.g., Pro, Deep Research), timestamp, citations, thread URL, user ID/session, client platform+version.[4][6][3]
4. Submission handling
   - POST to reporting API with payload and evidence bundle; retries on transient failure.
   - Rate limit: max 5 reports per user per hour to deter spam.
5. Post-submit
   - Toast: “Thanks—your report was sent.”
   - Optional one-tap CSAT: “Was reporting helpful?” Yes/No.
6. Moderation and safety
   - Prioritize “Harmful or offensive” to safety queue; tag for policy review.[5]
7. Triage workflow
   - Categorize to queues: Factuality, Freshness, UX/Length, Sourcing, Safety.
   - Include auto-links to the exact answer and sources for reviewer repro.[4][3][1]
8. Accessibility and localization
   - Keyboard navigable, screen-reader labels, WCAG AA color contrast; localize strings.[2][3]
9. Privacy
   - Store minimal PII; redact sensitive user inputs in free-text; retain evidence per policy.[7]

## Non-Functional Requirements
- Latency: modal open <100ms; submit <500ms p95 on broadband.
- Reliability: ≥99.9% successful ingestion; offline queue with background flush.
- Security: authenticated API; input sanitation; abuse monitoring.[2]
- Observability: dashboards for volume by category, answer type, and model.[3][4]

## UX Details
- Category chips default unselected; require at least one to enable Submit; free-text optional.[1]
- If “Wrong sources” is selected, show hint: “We’ll attach the citations you saw” (no extra work).[1]
- If “Out of date,” show optional field for date/reference link; still optional to preserve speed.[1]
- Keep the modal lightweight to reduce friction and increase completion.[1]

## Data Model (Report)
- report_id, user_id/session_id, thread_id, answer_id, categories[], free_text, created_at.
- context: model_id, mode (Standard/Pro/Deep Research), citations[], source_urls[], client_meta.
- safety_flag (bool), triage_status, reviewer_notes, resolution_code.[5][4][3]

## Instrumentation
- Events: report_opened, category_selected, free_text_entered, report_submitted, report_failed, post_submit_csat.
- Dimensions: model/mode, platform, region, language, category mix.[4][3]

## Triage Playbooks
- Inaccurate/Wrong sources: re-run retrieval, verify citations, file correction task.[3][1]
- Out of date: schedule refresh or adjust recency bias for the query class.[3]
- Harmful/offensive: immediate policy review and model safety feedback loop.[5]

## Edge Cases
- Multiple reports on one answer: dedupe by answer_id+user_id within 15 minutes.
- Anonymous sessions: allow report; omit user_id; keep session_id.
- Very long answers: evidence capture caps at 10,000 chars plus citations.
- Modal abandonment: log open without submit to measure friction.

## Rollout Plan
- Phase 1: 10% web traffic, English only; monitor error rates and conversion to submit.[6]
- Phase 2: 100% web, add iOS/Android; localized strings.
- Phase 3: Add span-level source-specific selector if needed (post-metrics).

## Open Questions
- Should “Too long/Too short” feed a summarization-length tuning loop?
- Expose report counts to users/authors of Pages?
- Add attachment of user screenshot to correlate with UI context?[8][2]

## Dependencies
- Help Center guidance and support fallback channels remain available.[2][1]
- Deep Research answer context and export/share integration for evidence completeness.[4]

## Appendix: Rationale
- Categories align with Perplexity’s current help guidance for reporting and bug submission, ensuring users have a clear, low-friction path inside the product and that reports route to the correct internal queues.[2][1]
- Including mode/model metadata improves diagnosis across Standard, Pro, and Deep Research behaviors and supports targeted fixes and evaluation.[4][3]

[1] https://www.perplexity.ai/help-center/en/articles/10354902-how-can-i-report-incorrect-or-inaccurate-answers
[2] https://www.perplexity.ai/help-center/en/articles/10354894-how-do-i-submit-a-bug-report
[3] https://www.perplexity.ai/help-center/en/articles/10352895-how-does-perplexity-work
[4] https://www.perplexity.ai/hub/blog/introducing-perplexity-deep-research
[5] https://wandb.ai/onlineinference/genai-research/reports/LLM-evaluation-Metrics-frameworks-and-best-practices--VmlldzoxMTMxNjQ4NA
[6] https://www.perplexity.ai
[7] https://www.edpb.europa.eu/system/files/2025-04/ai-privacy-risks-and-mitigations-in-llms.pdf
[8] https://www.reddit.com/r/perplexity_ai/comments/1k2oaqk/i_may_have_just_found_the_coolest_hidden/
[9] https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/images/591/f8fe62ed-8605-4d50-be3d-5555fa838e28/screenshot.png?AWSAccessKeyId=ASIA2F3EMEYEZC2YY77R&Signature=tZVLLb8RfAGyO%2FupfNi%2B7aEQd0w%3D&x-amz-security-token=IQoJb3JpZ2luX2VjEMr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIHmaUiZV7iHVyLkBHebQZHEvz0RPsVJO4X4Ub9r5Xej0AiEA8XCHz7CSI7TxWazS63H5oAN%2FB4hDxvGsykntTcD4XBAq8QQIEhABGgw2OTk3NTMzMDk3MDUiDAAAfPIL8fxQ2UKmFirOBDAIyOMvi21D194sJByZVGQRsz58jQgFnxtYp5GeptaiP%2BlkCHXPMc3Aeaxy2O4IpET3TOs1ONjIPhf1L6uXd0zeasrj5xvqv1IA0jPgAj69b12rPw7N55lSfYSL%2FiWGe0pqdwuXG4Jh8x%2BW0zth8CdewbCGYgsU1wjWjOgW4GyrW9asK3X0qjtpT5Agj5g6L%2F%2F8w0PpeY4ao2azKWOONcqgXSZyPM73bQSHZRegpW1Zf3ue8Di6XssIoBtKkeSfhFoFgFs%2BttaroNRrVGIndi9CjPozNM8lzHONy6%2F8Is3%2FckrychUuhDYOWXvOfMMQyt%2FWEtJJtkQieueOn%2FYe0qtBzZHnSaMsM0Gx5g2OKRO4fAjyZoJPqBrsarKYEgmZqeMSIpGeXHnwREIqfhKr3lgL%2FMq6wz%2B2rA7RR8bB23vZoXRHso%2FKWnwf6EO6RKgaO3HD9nV24qKYHaFohjhzN6gpwoY9bq0nJkBk7sk7sBF%2Fx6SfgXgOjQ4ztRRbgBs5Fjc6%2FhmvPoYG1ynbfgj6YJI2JoeXWaP1K7rjgB10FIlUFVFfetGxce6tR13C09SQorKLPe1UYYJAzT1DbGKmKLgk17S59kmUF4X9ZRdpaYSS5%2FNk1oAGOgkqqwJfrRxW%2Fq700OoTFzVmgxXtpGWDm1hzOKNG2WaY4MKhHy%2BOjXvqSKcXt997aCxUFtdF%2FxJOMT6MZMOQ6QUhNKVq7BubhbxJAJFdChnE2PicJ9F0SsjXqYEP7xBe7tOHfiPI7ehgguwzHyVdH6NzcAeWPYKVMMCL7MQGOpoB50kspbjHWpywetbwVaVBFS%2FtxEOkUYPmfK5V2ZEAsvMq4zH4qtMYeP%2BjChcI36gy16HeaJ%2FqJBoXTqAqe84ALLBoQ3Tu1CX780xevnaWSWvI9PHh5y2TZlV157NfVqb5WBvQZK25iSHE%2B9sj52v4TZOAYUdYhxgTgy%2F0dGnPVcYOI1bSxpL8Xb%2FHL%2F86kgTP%2BGC8HCKU6htlrg%3D%3D&Expires=1754993052
[10] https://www.perplexity.ai/search/give-the-format-structure-1-li-o5yzM.jiQ8qovcYxVKqIGA?login-source=visitorGate&login-new=false
[11] https://www.reddit.com/r/perplexity_ai/comments/1bk89zz/perplexity_team_you_have_a_serious_user_error/
[12] https://arxiv.org/html/2409.18169v5
[13] https://www.arsturn.com/blog/importance-of-user-feedback-for-perplexitys-development
[14] https://github.com/langgenius/dify/issues/17080
[15] https://www.arsturn.com/blog/community-perspective-on-perplexity-ai-offerings
[16] https://www.chatprd.ai/resources/PRD-for-Cursor
[17] https://lamatic.ai/integrations/models/perplexity-ai
[18] https://www.news.aakashg.com/p/product-requirements-documents-prds
[19] https://arxiv.org/html/2501.04040v2
[20] https://www.appypieautomate.ai/blog/how-does-perplexity-ai-work
[21] https://www.reddit.com/r/perplexity_ai/comments/1cltxyr/thoughts_on_perplexity_the_pros_and_cons/
[22] https://www.linkedin.com/pulse/crafting-effective-product-requirements-document-prd-mba-ms-phd-deroc