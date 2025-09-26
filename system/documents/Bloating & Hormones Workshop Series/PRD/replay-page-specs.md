# Replay Page Technical Specifications
*FitNature Bloating & Hormones Workshop Series - Post-Event Resource Hub*

## Document Overview
**Document Type:** Technical Specifications  
**Version:** 1.0  
**Date:** August 25, 2025  
**Purpose:** Define technical implementation requirements for workshop replay page  
**Target Audience:** Developers, designers, QA team  

---

## Page Architecture & Structure

### URL Structure
- **Primary URL:** `/workshop-replay/{session-type}/`
- **Session Types:** `follicular`, `ovulatory`, `luteal`, `menstrual`
- **Example:** `/replay/follicular/`
- **SEO-friendly:** Clean URLs, no session IDs in path

### Access Control System
**Authentication Method:**
- Email-based verification (passwordless)
- Cookie-based session management (30-day expiry)
- First-time visitors: email capture form
- Returning visitors: automatic access via cookie recognition

**Security Requirements:**
- HTTPS mandatory
- Email validation via double opt-in
- Rate limiting: 5 access attempts per IP per hour
- No direct file URLs (protected downloads)

---

## Visual Design Specifications

### Layout Structure
```
Header Section (Fixed)
├── FitNature Logo (left)
├── Navigation: Home | About | Contact
└── User Status: "Welcome back, [Name]" | "Sign Out"

Hero Section
├── Workshop Title: "{Phase} Phase Workshop Replay"
├── Date Badge: "Recorded [Date]"
├── Duration: "45 minutes"
└── Completion Status: Progress bar (if tracked)

Video Player Section
├── Embedded Player (16:9 aspect ratio)
├── Player Controls: Play/Pause, Speed, Volume, Captions
├── Chapter Navigation (timestamps)
└── Download Audio Option

Resources Section
├── Immediate Downloads Grid (3-column)
├── File icons + names + sizes
└── Download counters (optional)

Next Steps Section
├── 3-column layout
├── Icon + Headline + Description + CTA
└── Internal linking to other workshops

Affiliate Section
├── Transparent disclosure header
├── Product grid (2x2 or 1x4)
├── Honest descriptions + pricing
└── Tagged affiliate links

Footer
├── Related articles (3-4 links)
├── Social sharing options
└── Support contact
```

### Design System

 Inherit from tailwind.config.js




---

## Video/Audio Player Specifications

### Hosting Platform
**Primary:** Vimeo Pro (private/unlisted videos)
- **Backup:** YouTube Private or self-hosted
- **CDN:** Global content delivery for optimal speed
- **Bandwidth:** Unlimited streaming, no throttling

### Player Features
**Core Controls:**
- Play/Pause toggle
- Scrub bar with preview thumbnails
- Volume control with mute option
- Fullscreen capability
- Speed adjustment: 0.75x, 1x, 1.25x, 1.5x, 2x

**Accessibility Features:**
- Closed captions toggle (always available)
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support

**Chapter Navigation:**
- Clickable timestamp list (sidebar or overlay)
- Chapter titles: "Introduction", "Protocol Demo", "Q&A", etc.
- Auto-generated based on workshop structure
- Visual progress indicators

### Mobile Optimization
- Touch-friendly controls (44px minimum)
- Responsive player sizing
- Portrait/landscape orientation support
- Offline download option (audio only)

---

## Download System Architecture

### File Management
**Server Setup:**
- Direct server hosting (not third-party)
- Protected directory structure
- Token-based access control
- Download attempt logging

**File Types & Sizes:**
- **Cycle Cheat Sheet:** PDF, 1-2MB, single page
- **Mini Workbook:** PDF, 3-5MB, 6-10 pages
- **Session Slides:** PDF, 2-4MB, slide export
- **Audio Version:** MP3, 45-60MB, full workshop

**File Naming Convention:**
```
fitnature-{session-type}-cheatsheet-v1.pdf
fitnature-{session-type}-workbook-v1.pdf
fitnature-{session-type}-slides-v1.pdf
fitnature-{session-type}-audio-v1.mp3
```

### Download Interface
**Grid Layout:**
```
[Icon] Cycle Cheat Sheet (1.2MB)
       Quick reference guide for daily use
       [Download PDF]

[Icon] Mini Workbook (4.1MB)  
       Complete tracking and protocol guide
       [Download PDF]

[Icon] Session Slides (2.8MB)
       Full presentation materials
       [Download PDF]

[Icon] Audio Version (52MB)
       Listen offline, full workshop
       [Download MP3]
```

**Download States:**
- Default: Blue download button
- Hover: Darker blue with icon animation
- Clicked: Gray "Downloading..." state
- Complete: Green checkmark (2 seconds)

---

## Content Management System

### Content Blocks
**Dynamic Content:**
- Workshop-specific titles and dates
- Phase-appropriate resources
- Contextual next-step recommendations
- Affiliate product matching

**Static Content:**
- Privacy policy links
- Educational disclaimers
- Support contact information
- Social sharing options

### Content Personalization
**User Data Points:**
- Registration source (quiz, tracker, blog)
- Previous workshop attendance
- Download history
- Engagement level (time spent, interactions)

**Customization Rules:**
- Show related workshops based on completion
- Hide completed downloads from main view
- Recommend phase-progression pathway
- Surface relevant blog content

---

## Analytics & Tracking Implementation

### Event Tracking (GA4)
**Core Events:**
```javascript
// Page view
gtag('event', 'replay_page_view', {
  'session_type': '{follicular|ovulatory|luteal|menstrual}',
  'user_type': '{new|returning}',
  'traffic_source': '{utm_source}'
});

// Video interactions
gtag('event', 'replay_play', {
  'session_type': '{session}',
  'play_position': '{seconds}'
});

gtag('event', 'replay_complete', {
  'session_type': '{session}',
  'watch_percentage': '{percentage}'
});

// Download events
gtag('event', 'resource_download', {
  'file_type': '{cheatsheet|workbook|slides|audio}',
  'session_type': '{session}'
});

// Next action events
gtag('event', 'next_workshop_click', {
  'current_session': '{session}',
  'target_session': '{target}'
});
```

**Custom Dimensions:**
- User Registration Date
- Workshop Attendance (Live vs Replay)
- Download Completion Rate
- Session Progression Path

### Performance Monitoring
**Core Web Vitals:**
- Largest Contentful Paint (LCP): <2.5s
- First Input Delay (FID): <100ms
- Cumulative Layout Shift (CLS): <0.1

**Video Performance:**
- Initial load time: <3s
- Buffering events: <5% of play time
- Quality adaptation: automatic based on bandwidth

---

## Technical Requirements

### Browser Support
**Primary Browsers (95% coverage):**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Mobile Browsers:**
- iOS Safari 14+
- Chrome Mobile 90+
- Samsung Internet 14+

### Performance Standards
**Page Load:**
- Initial page load: <3 seconds
- Video start: <5 seconds
- Download initiation: <1 second

**Bandwidth Optimization:**
- Progressive video loading
- Compressed image assets
- Lazy loading for below-fold content
- CDN delivery for all static assets

### Security Implementation
**Data Protection:**
- SSL certificate (TLS 1.3)
- Cookie consent compliance (GDPR)
- User data encryption at rest
- Regular security audits

**Access Control:**
- Email verification tokens (24-hour expiry)
- Session cookies (HttpOnly, Secure flags)
- CSRF protection on forms
- Rate limiting on sensitive actions

---

## Mobile-Specific Requirements

### Responsive Breakpoints
- **Desktop:** 1200px+
- **Tablet:** 768px - 1199px
- **Mobile:** 320px - 767px

### Mobile UX Considerations
**Video Player:**
- Tap controls with fade-out
- Pinch-to-zoom disabled
- Orientation change handling
- Picture-in-picture support (iOS/Android)

**Download Behavior:**
- Clear file size warnings for cellular users
- One-tap download initiation
- Download progress indicators
- Save location notification

**Navigation:**
- Hamburger menu for secondary navigation
- Sticky video player header
- Bottom-sheet style resource selection
- Thumb-friendly button sizing

---

## Integration Requirements

### Email Platform Integration
**Webhook Events:**
- Replay page access
- Resource downloads
- Video completion milestones
- Next action clicks

**Data Sync:**
- User engagement scoring
- Content preference tracking
- Abandonment triggers
- Re-engagement campaigns

### WordPress/WooCommerce Integration
**Internal Linking:**
- Dynamic menu integration
- Related content suggestions
- Cross-selling opportunities
- User journey tracking

**Content Management:**
- Workshop scheduling system
- Resource library management
- User access control
- Performance monitoring dashboard

---

## Quality Assurance Checklist

### Functional Testing
- [ ] Email verification workflow
- [ ] Video playback on all browsers
- [ ] Download functionality (all file types)
- [ ] Mobile responsiveness
- [ ] Analytics event firing
- [ ] Internal link integrity
- [ ] Form submission handling
- [ ] Error page handling

### Performance Testing
- [ ] Page load speed optimization
- [ ] Video streaming quality
- [ ] Download speed testing
- [ ] Mobile network simulation
- [ ] Concurrent user load testing

### Accessibility Testing
- [ ] Screen reader compatibility
- [ ] Keyboard navigation
- [ ] Color contrast compliance
- [ ] Focus indicator visibility
- [ ] Alt text for all images
- [ ] Captions for video content

---

## Launch & Maintenance

### Go-Live Checklist
- [ ] DNS configuration
- [ ] SSL certificate installation
- [ ] Analytics implementation
- [ ] Video upload and testing
- [ ] Resource file organization
- [ ] Email automation setup
- [ ] Performance monitoring
- [ ] User acceptance testing

### Ongoing Maintenance
**Weekly:**
- Monitor video playback analytics
- Check download success rates
- Review user feedback submissions
- Update affiliate link performance

**Monthly:**
- Performance audit and optimization
- Content freshness review
- Security patch updates
- User experience analysis

**Quarterly:**
- Feature enhancement planning
- Technology stack updates
- Comprehensive security audit
- User journey optimization review