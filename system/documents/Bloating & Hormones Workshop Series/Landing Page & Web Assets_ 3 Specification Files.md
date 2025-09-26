<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Landing Page \& Web Assets: 3 Specification Files

Based on the blueprint and healthcare landing page best practices, here are three detailed specification files for the FitNature Bloating \& Hormones Workshop Series:[^2][^4][^5]

***

## 1. Workshop Landing Page Specification

### Document Title: `workshop-landing-page-spec.md`

#### Technical Requirements

- **Platform**: WordPress + WooCommerce
- **Responsive**: Mobile-first design (45%+ mobile traffic)[^5]
- **Load Time**: Under 3 seconds
- **Accessibility**: WCAG 2.1 AA compliance
- **Privacy**: HIPAA-compliant forms, no tracking cookies without consent


#### Page Structure \& Layout

**Header Section**

- FitNature logo (left-aligned)
- Navigation: minimal (Home, About, Contact only)
- No phone number or chat (maintain faceless approach)

**Hero Section**

- **Primary Headline**: "Beat Bloat, Respect Your Cycle"
- **Secondary Headline**: "Free, Faceless Workshop for Real Women"
- **Subheading**: "Get cycle-synced relief without cameras, judgment, or generic advice"
- **Hero Image**: Illustrated cycle diagram (no photos of people)
- **Primary CTA**: "Register Free" (prominent button, contrasting color)

**Value Proposition Section**

- **Headline**: "Why This Workshop Works"
- **6 Benefit Bullets** (with icons):
    - Cycle-by-cycle guidance, never one-size-fits-all
    - 100% camera-free: slides + captions + audio only
    - Real-world fixes, not just "take this pill"
    - Flexible: join live or watch replay anytime
    - Full privacy protection, always anonymous
    - Clear, honest affiliate policies

**Trust Bar**

- "Used by 22,000+ women"
- "Ethical, ad-free affiliate model only"
- "Community-vetted protocols"

**How It Works Section** (4-step process)

1. Choose your cycle phase session
2. Join faceless (slides + audio only)
3. Download your toolkit \& cheat sheet
4. Continue with phase-specific resources

**Session Selection Grid**

- 4 cards (Follicular/Ovulatory/Luteal/Menstrual)
- Each card: phase icon, 2-3 key benefits, "Register" CTA
- Option to "Register for All Sessions"

**FAQ Section** (5 questions)

- Expandable accordion format
- Questions from blueprint micro-FAQ
- Answers maintain faceless/privacy emphasis

**Risk Reversal/Guarantee**

- "100% privacy guaranteed"
- "No sales pressure, education-first"
- "Always free access to essentials"

**Footer**

- Legal disclaimer text
- Privacy policy link
- Internal links: /quiz, /tracker, /meal-plans, /sos-toolkit


#### Content Guidelines[^2][^5]

- **Tone**: Warm, evidence-aware, practical, trustworthy
- **Language**: Plain language, short sentences (15-20 words max)
- **Benefits over features**: Focus on outcomes, not process
- **Mobile optimization**: Touch-friendly buttons (44px minimum)
- **Credibility signals**: Avoid stock photos, use custom illustrations


#### Conversion Elements[^4][^2]

- **Multiple CTAs**: Primary CTA repeated 3-4 times
- **Urgency**: "Next session starts [date]" (when applicable)
- **Social proof**: Brief testimonial quotes (text only, no photos)
- **Progress indicators**: "Step 1 of 2" in registration flow


#### Technical Specifications

- **Form fields**: Email, first name, preferred session(s)
- **Analytics**: GA4 events for workshop_view, register_click, email_submit
- **UTM parameters**: Source tracking from quiz/tracker/blog
- **Calendar integration**: .ics file generation for "Add to Calendar"

***

## 2. Replay Page Specification

### Document Title: `replay-page-spec.md`

#### Page Purpose

Post-event resource hub for workshop attendees with replay access, downloads, and next-step CTAs.

#### Access Control

- **Gated content**: Email required for first-time access
- **Cookie-based**: Returning visitors see full content
- **No passwords**: Simplified access via email verification


#### Header Section

- **Headline**: "Your Workshop Replay \& Resources"
- **Subheading**: "Everything you need to continue your bloat-free journey"
- **Session indicator**: "Follicular Phase Workshop - [Date]"


#### Video/Audio Section

- **Replay Player**: Embedded video (slides + audio only, no webcam footage)
- **Player controls**: Play, pause, speed adjustment, captions toggle
- **Chapters/Timestamps**: Clickable sections (Introduction, Protocol Demo, Q\&A, etc.)
- **Download option**: "Download audio version" for offline listening


#### Resource Download Section

- **Immediate Downloads**:
    - Cycle Cheat Sheet (PDF)
    - Mini Workbook (PDF)
    - Session slides (PDF)
- **Download buttons**: Clear labels, direct download (no additional forms)
- **File sizes**: Listed next to each download


#### Next Steps Section

- **Headline**: "Continue Your Journey"
- **3-column layout**:

1. **Other Sessions**: Register for remaining cycle phases
2. **Deep Dive**: Link to roadmap (/roadmap)
3. **Community**: Join challenge (/challenge)


#### Affiliate Bundle Section[^2]

- **Headline**: "Phase-Specific Support Stack"
- **Transparent disclosure**: "Affiliate links help fund free education"
- **Product grid**: 3-4 relevant supplements with honest descriptions
- **CTA**: "View Bundle Details" (not "Buy Now" - softer approach)
- **Link format**: All use `?tag=fitnature8888-20`


#### Feedback Section

- **Short survey**: 3-4 questions about workshop value
- **Rating scale**: 1-5 stars for content, delivery, usefulness
- **Open text**: "What was most helpful?" and "What could be improved?"
- **Incentive**: "Help us improve - your input shapes future workshops"


#### Footer

- **Related articles**: 3-4 internal blog posts about cycle-specific topics
- **Social sharing**: Share buttons for replay page (if user chooses)
- **Contact**: Support email for technical issues


#### Technical Requirements

- **Video hosting**: Vimeo or YouTube (unlisted/private)
- **Download delivery**: Direct server links (not third-party)
- **Mobile optimization**: Video player responsive, downloads work on mobile
- **Analytics**: Track replay_view, download_click, feedback_submit events

***

## 3. Registration Confirmation Page Specification

### Document Title: `registration-confirmation-spec.md`

#### Page Function

Immediate post-registration experience to confirm signup, set expectations, and provide pre-workshop resources.

#### Confirmation Messaging

- **Primary headline**: "You're Registered! Here's What Happens Next"
- **Workshop details**: Date, time, timezone, duration (45-60 minutes)
- **Access method**: "Join link will be emailed 24 hours before start time"
- **Backup plan**: "Can't make it live? Replay available immediately after"


#### Immediate Value Section

- **Headline**: "Get Started Now"
- **Pre-workshop downloads**:
    - Quick Cycle Assessment (1-page PDF)
    - "What to Expect" guide (2-page PDF)
    - Workshop agenda/outline
- **Preparation suggestions**: "Grab a notepad, water, and headphones"


#### Calendar Integration

- **Add to Calendar button**: Generates .ics file with workshop details
- **Calendar platforms**: Auto-detects user's likely calendar (Google, Outlook, Apple)
- **Reminder settings**: Suggests 24h and 2h reminders


#### Privacy Reassurance[^5]

- **Faceless confirmation**: "Remember: no cameras, ever"
- **Data protection**: "Your email stays private, no spam"
- **Participation**: "Join audio/chat as comfortable - no pressure"


#### Technical Setup Guidance

- **Platform instructions**: "We'll use [Zoom/WebinarJam] - no account needed"
- **System requirements**: Browser compatibility, audio recommendations
- **Troubleshooting**: Link to simple tech support page
- **Backup access**: Phone dial-in number provided


#### Engagement Opportunities

- **Pre-workshop poll**: "What's your biggest bloating challenge?" (optional)
- **Community connection**: "Join other registrants in our private group" (optional)
- **Resource sharing**: "Download our free bloating symptom tracker"


#### Next Steps/Cross-sell (Subtle)

- **Browse related workshops**: Links to other cycle phase sessions
- **Educational content**: "While you wait, explore these articles"
- **Affiliate transparency**: "See our recommended starter bundle" (clearly marked)


#### Email Follow-up Triggers

- **Immediate**: Confirmation email (duplicate of page content)
- **24-48h before**: Reminder with join link
- **2h before**: Final reminder
- **Post-workshop**: Replay and resources email


#### Technical Specifications

- **Form integration**: Connects to email service (Mailchimp/ConvertKit)
- **Calendar file generation**: Automated .ics creation with correct timezone
- **Social sharing**: Optional buttons for "I'm attending" posts
- **Analytics tracking**: confirmation_view, calendar_add, download_click events
- **Redirect timing**: No automatic redirect, user-controlled navigation


#### Mobile Considerations[^5]

- **Touch-friendly**: All buttons 44px+ minimum size
- **Readable fonts**: 16px minimum body text
- **Single column**: Stacked layout on mobile devices
- **Download optimization**: PDFs optimized for mobile viewing

***

These three specifications provide comprehensive technical and content requirements for implementing the core web assets of the faceless Bloating \& Hormones Workshop Series, ensuring privacy, accessibility, and conversion optimization throughout the user journey.
<span style="display:none">[^1][^10][^11][^12][^13][^14][^15][^16][^17][^18][^19][^20][^3][^6][^7][^8][^9]</span>

<div style="text-align: center">⁂</div>

[^1]: https://muffingroup.com/blog/healthcare-landing-pages/

[^2]: https://landingi.com/blog/how-to-create-the-best-healthcare-landing-page/

[^3]: https://unbounce.com/landing-page-examples/fitness/

[^4]: https://getwpfunnels.com/fitness-landing-page/

[^5]: https://health-union.com/blog/best-healthcare-landing-pages/

[^6]: https://dribbble.com/tags/health-landing-page

[^7]: https://ecosystem.hubspot.com/marketplace/website/health/landing

[^8]: https://www.buylandingpagedesign.com/landing-page-design/health-and-fitness/

[^9]: https://nicepage.com/c/medicine-science-landing-page

[^10]: https://www.e-shot.net/insights/blog/forms-landing-pages-design-best-practices

[^11]: http://hdl.handle.net/10125/41642

[^12]: https://www.tandfonline.com/doi/full/10.1080/24735132.2024.2434380

[^13]: https://www.semanticscholar.org/paper/1a95bfe72261ea3918663373d1c7c394e4153ae8

[^14]: https://formative.jmir.org/2025/1/e66966

[^15]: https://www.esa-gnc.eu/paper?paper_id=23202

[^16]: https://journals.sagepub.com/doi/10.1177/20552076231216410

[^17]: https://implementationscience.biomedcentral.com/articles/10.1186/s13012-019-0880-8

[^18]: https://ebooks.iospress.nl/doi/10.3233/SHTI210032

[^19]: https://www.tandfonline.com/doi/full/10.1080/21504857.2022.2053559

[^20]: https://www.jmir.org/2019/8/e14127/

