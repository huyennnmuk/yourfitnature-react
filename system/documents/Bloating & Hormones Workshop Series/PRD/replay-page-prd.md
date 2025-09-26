# PRD: Workshop Replay Page Experience
*FitNature Bloating & Hormones Workshop Series - Post-Event Resource Hub*

## Document Overview
**Project Name:** Workshop Replay & Resource Hub  
**Version:** 1.0  
**Date:** August 25, 2025  
**Owner:** Product Manager, FitNature  
**Status:** Requirements Definition

---

## Executive Summary
The replay page is a gated, post-event hub for workshop attendees to access session replays, downloadable materials, and next-step recommendations, all while reinforcing FitNature's faceless, privacy-first promise.

**Primary Goals:**
- Seamless access to workshop replay video/audio for verified users
- Downloadable resources: cheat sheets, workbook, slides, audio
- Clear progression to further workshops, community, and affiliate offers

---

## Problem Statement
Attendees need a frictionless, privacy-focused method to catch up on sessions, collect their take-home resources, and continue their cycle-synced learning journey, without repeat logins or camera anxiety.

## Success Metrics
- 70%+ of registrants access replay page
- 50%+ download at least one resource
- 25%+ go on to register for another session
- <3 second page load time on all devices

---

## User Stories
- As a workshop attendee, I want to watch the workshop replay at my convenience, so I never miss key content.
- As a privacy-conscious user, I want no extra login or unnecessary personal details.
- As a learner, I want to download cheat sheet, workbook, and slides, and know file sizes.
- As an action-taker, I want to see clear prompts for tangible next steps and relevant products.
- As a mobile user, I want a smooth video and download experience on any device.

---

## Functional Requirements

### Access & Authentication
- Email-based, passwordless token access; returning visitors recognized by cookie
- Session per unique email per workshop phase; no password setting

### Content Delivery
- Embedded video player (slides + audio, never live footage)
- Download buttons for PDF cheat sheet, workbook, slides, and MP3 audio
- Resource section with clear file sizes and download states
- Chapter navigation in player for major agenda items
- All text/images faceless: only diagrams, icons, product silhouettes

### Progression & Upsell Paths
- "Continue Your Journey" section with links to:
  - Other workshop replay pages (internal links)
  - Roadmap/deeper course
  - Challenge/community group
  - Affiliate bundles (each uses ?tag=fitnature8888-20)
- Feedback form (3-4 quick questions), optional
- Social sharing options for replay page (if user opts in)

### Analytics & Tracking
- GA4 events: replay_page_view, replay_play, replay_complete, resource_download, next_workshop_click
- UTM retention for source attribution
- Download and interaction events tracked per session phase and resource

---

## Non-Functional Requirements
- Load in <3 seconds on broadband and mobile
- Responsive: all elements accessible and readable at 320px width
- WCAG 2.1 AA compliance: screen-reader friendly, color contrast, captions
- Secure: HTTPS, token/cookie rotation, double opt-in for access
- All download and video hosting via CDN
- No personal photos, webcam streams, or identity exposure at any step

---

## Milestones & Dependencies
- Workshop delivery complete: Session video/audio files uploaded
- All downloadable PDF assets finalized and uploaded
- Affiliate product set live with ?tag=fitnature8888-20
- GA4/analytics tags implemented and tested
- Feedback and error handling workflows in place

---

## Glossary
- **Replay Page:** Web page containing the session recording, resources, and next actions
- **Cheat Sheet:** 1-page PDF summary per phase
- **Mini Workbook:** 6-10 page PDF activity/guide
- **Affiliate Bundle:** Product package linked for revenue share
- **GA4:** Google Analytics 4

---

## Approval
- Product Manager: [Name]
- Stakeholder: [Name]
- Tech Lead: [Name]
- Date: __/__/2025
