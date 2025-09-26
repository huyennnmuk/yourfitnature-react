# Landing Page & Web Assets: Component Flow Logic Specifications
*FitNature Bloating & Hormones Workshop Series - Inter-Component Interaction Documentation*

## Document Overview
**Document Type:** Technical Flow Specifications  
**Version:** 1.0  
**Date:** August 25, 2025  
**Purpose:** Define logical flow and button interactions between Workshop Landing Page, Replay Page, and Confirmation Page  
**Target Audience:** Developers, QA team, UX designers  

---

## System Architecture Overview

### Component Ecosystem Map
```
Entry Points → Landing Page → Confirmation Page → Workshop Experience → Replay Page
     ↓              ↓               ↓                    ↓              ↓
[Quiz/Tracker] → [Registration] → [Preparation] → [Live/Missed] → [Resources]
[Blog/Social]    [Selection]     [Calendar]      [Attendance]   [Next Steps]
[Email/Referral] [Form Submit]   [Downloads]     [Q&A]          [Upsells]
```

### Core User Journey States
1. **Discovery State** (Entry Points → Landing Page)
2. **Decision State** (Landing Page → Registration)  
3. **Preparation State** (Confirmation Page → Workshop Ready)
4. **Experience State** (Workshop Attendance → Completion)
5. **Continuation State** (Replay Page → Next Actions)

---

## Landing Page Component Logic

### Entry Point Routing Logic
**Traffic Source Detection:**
```javascript
// UTM parameter handling
const entrySource = {
  quiz: 'utm_source=quiz&utm_content=results_page',
  tracker: 'utm_source=tracker&utm_content=thank_you',
  blog: 'utm_source=blog&utm_content=article_cta',
  social: 'utm_source=social&utm_medium=organic',
  email: 'utm_source=email&utm_campaign=newsletter'
};

// Dynamic content based on source
function displayContextualMessage(source) {
  switch(source) {
    case 'quiz':
      return "Based on your bloating assessment, this workshop series is perfect for you";
    case 'tracker':
      return "Ready to understand what your cycle tracking reveals? Join the workshop";
    default:
      return "Beat Bloat, Respect Your Cycle — Free, Faceless Workshop";
  }
}
```

### Button Interaction Logic

#### Primary Registration Buttons
**Button States & Actions:**
```html
<!-- Main Registration CTA -->
<button id="registerPrimary" 
        class="btn-register-primary"
        onclick="initiateRegistration('primary_hero')"
        data-analytics="register_click_hero">
  Register Free
  <span class="btn-loading" style="display:none;">Processing...</span>
</button>

<!-- Session-Specific Registration -->
<div class="session-grid">
  <button class="btn-register-session" 
          data-session="follicular"
          onclick="selectSession('follicular')"
          data-analytics="register_click_follicular">
    Register for Follicular Phase
  </button>
  <!-- Repeat for other phases -->
</div>

<!-- Multi-Session Registration -->
<button id="registerAll" 
        class="btn-register-all"
        onclick="selectSession('all')"
        data-analytics="register_click_all_sessions">
  Register for All 4 Sessions
</button>
```

**Registration Flow Logic:**
```javascript
function initiateRegistration(clickSource) {
  // Fire analytics event
  gtag('event', 'register_click', {
    'button_location': clickSource,
    'session_interest': getSelectedSessions(),
    'page_source': getUTMSource()
  });
  
  // Show registration form or redirect
  if (document.getElementById('inlineForm').style.display === 'none') {
    showInlineRegistrationForm();
  } else {
    redirectToRegistrationPage();
  }
}

function selectSession(sessionType) {
  // Update UI to show selection
  updateSessionSelection(sessionType);
  
  // Enable registration button
  enableRegistrationButton();
  
  // Pre-populate form with session choice
  document.getElementById('sessionPreference').value = sessionType;
  
  // Scroll to registration form
  document.getElementById('registrationForm').scrollIntoView();
}
```

#### Secondary Action Buttons
**Calendar Preview & FAQ Expansion:**
```html
<!-- Add to Calendar (Preview) -->
<button class="btn-calendar-preview" 
        onclick="showCalendarPreview()"
        data-analytics="calendar_preview_click">
  Preview Calendar Event
</button>

<!-- FAQ Expansion -->
<button class="btn-faq-toggle" 
        onclick="toggleFAQSection()"
        data-analytics="faq_expand_click">
  Common Questions ↓
</button>

<!-- Download Free Resources -->
<button class="btn-free-download" 
        onclick="triggerLeadMagnet()"
        data-analytics="lead_magnet_click">
  Download Free Cycle Tracker
</button>
```

### Form Submission Logic
**Registration Form Processing:**
```javascript
function processRegistrationForm(formData) {
  // Validation
  if (!validateEmail(formData.email)) {
    showError('Please enter a valid email address');
    return false;
  }
  
  // Show loading state
  setButtonState('loading');
  
  // Submit to backend
  fetch('/api/workshop-registration', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: formData.email,
      firstName: formData.firstName,
      sessionPreference: formData.sessionPreference,
      utmData: getUTMParameters(),
      registrationSource: 'landing_page'
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      // Redirect to confirmation page
      window.location.href = `/workshop-confirmation/?session=${data.sessionType}&email=${encodeURIComponent(data.email)}&registration_id=${data.id}`;
    } else {
      showError(data.error);
      setButtonState('default');
    }
  })
  .catch(error => {
    showError('Registration failed. Please try again.');
    setButtonState('default');
  });
}
```

---

## Confirmation Page Component Logic

### Page Load & Initialization
**Confirmation State Setup:**
```javascript
function initializeConfirmationPage() {
  // Extract URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const sessionType = urlParams.get('session');
  const userEmail = urlParams.get('email');
  const registrationId = urlParams.get('registration_id');
  
  // Validate parameters
  if (!sessionType || !userEmail) {
    redirectToLandingPage();
    return;
  }
  
  // Display personalized confirmation
  displayConfirmationMessage(sessionType, userEmail);
  
  // Trigger automated emails
  triggerConfirmationEmail(registrationId);
  
  // Initialize calendar integration
  setupCalendarIntegration(sessionType);
  
  // Prepare download tokens
  generateDownloadTokens(userEmail);
}
```

### Button Interaction Logic

#### Calendar Integration Buttons
**Multi-Platform Calendar Support:**
```html
<!-- Primary Calendar Button -->
<button id="addToCalendarPrimary" 
        class="btn-calendar-primary"
        onclick="showCalendarOptions()"
        data-analytics="calendar_main_click">
  <svg class="calendar-icon">...</svg>
  Add to Calendar
</button>

<!-- Calendar Platform Options -->
<div id="calendarDropdown" class="calendar-dropdown" style="display:none;">
  <button onclick="addToCalendar('google')" data-analytics="calendar_google_click">
    Google Calendar
  </button>
  <button onclick="addToCalendar('outlook')" data-analytics="calendar_outlook_click">
    Outlook
  </button>
  <button onclick="addToCalendar('apple')" data-analytics="calendar_apple_click">
    Apple Calendar
  </button>
  <button onclick="downloadICS()" data-analytics="calendar_download_click">
    Download .ics File
  </button>
</div>
```

**Calendar Integration Logic:**
```javascript
function addToCalendar(platform) {
  const workshopDetails = getWorkshopDetails();
  
  const calendarUrls = {
    google: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(workshopDetails.title)}&dates=${workshopDetails.startDate}/${workshopDetails.endDate}&details=${encodeURIComponent(workshopDetails.description)}`,
    outlook: `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(workshopDetails.title)}&startdt=${workshopDetails.startDate}&enddt=${workshopDetails.endDate}&body=${encodeURIComponent(workshopDetails.description)}`
  };
  
  // Fire analytics
  gtag('event', 'calendar_add_attempt', {
    'calendar_platform': platform,
    'session_type': getSessionType()
  });
  
  if (platform === 'apple' || platform === 'download') {
    downloadICS();
  } else {
    window.open(calendarUrls[platform], '_blank');
  }
  
  // Update UI to show success
  showCalendarSuccess(platform);
}

function downloadICS() {
  const icsContent = generateICSFile();
  const blob = new Blob([icsContent], { type: 'text/calendar' });
  const url = window.URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `fitnature-${getSessionType()}-workshop.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Analytics
  gtag('event', 'calendar_file_download', {
    'session_type': getSessionType()
  });
}
```

#### Resource Download Buttons
**Pre-Workshop Material Downloads:**
```html
<!-- Download Grid -->
<div class="downloads-grid">
  <div class="download-item">
    <button class="btn-download" 
            data-file="cycle-assessment"
            onclick="downloadResource('cycle-assessment')"
            data-analytics="download_assessment">
      <span class="file-icon">📋</span>
      <span class="file-name">Quick Cycle Assessment</span>
      <span class="file-size">0.8MB PDF</span>
      <span class="download-status">Download</span>
    </button>
  </div>
  <!-- Repeat for other resources -->
</div>
```

**Download Logic with Token Validation:**
```javascript
function downloadResource(resourceType) {
  // Generate secure download token
  const downloadToken = generateDownloadToken(getUserEmail(), resourceType);
  
  // Update button state
  const button = document.querySelector(`[data-file="${resourceType}"]`);
  setDownloadButtonState(button, 'loading');
  
  // Fire analytics
  gtag('event', 'preworkshop_download', {
    'file_type': resourceType,
    'session_type': getSessionType(),
    'download_order': getDownloadSequence()
  });
  
  // Initiate download
  fetch(`/api/download/${resourceType}?token=${downloadToken}`)
    .then(response => {
      if (response.ok) {
        return response.blob();
      }
      throw new Error('Download failed');
    })
    .then(blob => {
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = getResourceFilename(resourceType);
      link.click();
      
      // Update button state
      setDownloadButtonState(button, 'success');
      
      // Track successful download
      trackDownloadSuccess(resourceType);
    })
    .catch(error => {
      setDownloadButtonState(button, 'error');
      showDownloadError(resourceType);
    });
}
```

### Navigation & Progression Logic
**Next Steps & Internal Linking:**
```html
<!-- Workshop Preparation Links -->
<button class="btn-prep-link" 
        onclick="navigateToPrep('tech-check')"
        data-analytics="prep_tech_click">
  Test Your Tech Setup
</button>

<!-- Cross-Session Navigation -->
<button class="btn-other-sessions" 
        onclick="navigateToLanding('other-sessions')"
        data-analytics="other_sessions_click">
  Register for Other Phases
</button>

<!-- Community Integration -->
<button class="btn-community-join" 
        onclick="joinCommunity()"
        data-analytics="community_join_click">
  Join Private Group (Optional)
</button>
```

---

## Replay Page Component Logic

### Access Control & Authentication
**Token-Based Page Access:**
```javascript
function validateReplayAccess() {
  const urlParams = new URLSearchParams(window.location.search);
  const accessToken = urlParams.get('token') || getCookie('replay_access');
  
  if (!accessToken) {
    showEmailGate();
    return false;
  }
  
  // Validate token with backend
  fetch(`/api/validate-replay-access?token=${accessToken}`)
    .then(response => response.json())
    .then(data => {
      if (data.valid) {
        initializeReplayPage(data.userInfo);
      } else {
        showEmailGate();
      }
    });
}

function showEmailGate() {
  document.getElementById('replayContent').style.display = 'none';
  document.getElementById('emailGate').style.display = 'block';
}
```

### Video Player Controls Logic
**Enhanced Player Interface:**
```html
<!-- Video Player Container -->
<div id="videoPlayerContainer">
  <video id="workshopVideo" controls>
    <source src="/videos/workshop-replay.mp4" type="video/mp4">
    <track kind="captions" src="/captions/workshop-captions.vtt" srclang="en" label="English">
  </video>
  
  <!-- Custom Controls Overlay -->
  <div class="player-controls-overlay">
    <button onclick="togglePlayPause()" class="btn-play-pause">⏯️</button>
    <button onclick="adjustSpeed()" class="btn-speed">1x</button>
    <button onclick="toggleCaptions()" class="btn-captions">CC</button>
    <button onclick="toggleFullscreen()" class="btn-fullscreen">⛶</button>
  </div>
  
  <!-- Chapter Navigation -->
  <div class="chapter-navigation">
    <button onclick="jumpToChapter('intro')" data-time="0">Introduction</button>
    <button onclick="jumpToChapter('protocol')" data-time="480">Protocol Demo</button>
    <button onclick="jumpToChapter('qa')" data-time="2100">Q&A Session</button>
  </div>
</div>
```

**Player Event Tracking:**
```javascript
function initializeVideoTracking() {
  const video = document.getElementById('workshopVideo');
  
  video.addEventListener('play', () => {
    gtag('event', 'replay_play', {
      'session_type': getSessionType(),
      'play_position': Math.floor(video.currentTime)
    });
  });
  
  video.addEventListener('pause', () => {
    gtag('event', 'replay_pause', {
      'session_type': getSessionType(),
      'pause_position': Math.floor(video.currentTime)
    });
  });
  
  video.addEventListener('ended', () => {
    gtag('event', 'replay_complete', {
      'session_type': getSessionType(),
      'watch_percentage': 100
    });
  });
  
  // Track 25%, 50%, 75% completion
  video.addEventListener('timeupdate', () => {
    const percentage = (video.currentTime / video.duration) * 100;
    trackWatchMilestones(percentage);
  });
}
```

### Resource Download & Next Actions
**Replay-Specific Downloads:**
```html
<!-- Resource Download Section -->
<div class="replay-downloads">
  <button class="btn-download-replay" 
          onclick="downloadReplayResource('cheatsheet')"
          data-analytics="replay_download_cheatsheet">
    Download Cycle Cheat Sheet
  </button>
  
  <button class="btn-download-replay" 
          onclick="downloadReplayResource('audio')"
          data-analytics="replay_download_audio">
    Download Audio Version
  </button>
</div>

<!-- Next Steps Navigation -->
<div class="next-steps-grid">
  <button class="btn-next-step" 
          onclick="navigateToNextSession()"
          data-analytics="next_session_click">
    Register for Next Phase
  </button>
  
  <button class="btn-next-step" 
          onclick="viewAffiliateBundles()"
          data-analytics="affiliate_bundle_click">
    View Phase-Specific Bundle
  </button>
  
  <button class="btn-next-step" 
          onclick="joinChallenge()"
          data-analytics="challenge_join_click">
    Join 30-Day Challenge
  </button>
</div>
```

---

## Cross-Component State Management

### Shared Data Flow
**User Session Persistence:**
```javascript
// Shared state object
const userSession = {
  email: null,
  registeredSessions: [],
  downloadedResources: [],
  attendanceStatus: {},
  utmData: {},
  lastActivity: null
};

// State management functions
function updateUserSession(key, value) {
  userSession[key] = value;
  localStorage.setItem('fitnature_session', JSON.stringify(userSession));
  
  // Sync with backend
  syncUserSession();
}

function getUserSession() {
  const stored = localStorage.getItem('fitnature_session');
  return stored ? JSON.parse(stored) : userSession;
}
```

### Inter-Component Communication
**Event Bus for Component Coordination:**
```javascript
// Custom event system
class ComponentEventBus {
  constructor() {
    this.events = {};
  }
  
  emit(eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(callback => callback(data));
    }
    
    // Analytics tracking
    gtag('event', 'component_interaction', {
      'event_name': eventName,
      'component_source': getCurrentComponent(),
      'data_payload': JSON.stringify(data)
    });
  }
  
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }
}

const eventBus = new ComponentEventBus();

// Usage examples
eventBus.on('registration_complete', (data) => {
  updateUserSession('registeredSessions', data.sessions);
  triggerConfirmationFlow(data);
});

eventBus.on('workshop_attended', (data) => {
  updateUserSession('attendanceStatus', data);
  enableReplayAccess(data.sessionType);
});
```

---

## Error Handling & Fallback Logic

### Component Error States
**Graceful Degradation Patterns:**
```javascript
function handleComponentError(componentName, errorType, fallbackAction) {
  // Log error for monitoring
  console.error(`Component Error: ${componentName} - ${errorType}`);
  
  // Analytics
  gtag('event', 'component_error', {
    'component_name': componentName,
    'error_type': errorType,
    'user_session': getUserSession().email
  });
  
  // Execute fallback
  switch(fallbackAction) {
    case 'redirect_to_landing':
      window.location.href = '/workshop-landing/';
      break;
    case 'show_email_support':
      showSupportContactForm();
      break;
    case 'retry_operation':
      retryLastOperation();
      break;
  }
}

// Button-specific error handling
function handleButtonError(buttonElement, errorMessage) {
  // Update button state
  buttonElement.innerHTML = '⚠️ Error - Try Again';
  buttonElement.classList.add('btn-error');
  
  // Show error message
  showErrorMessage(errorMessage);
  
  // Reset after 3 seconds
  setTimeout(() => {
    resetButtonState(buttonElement);
  }, 3000);
}
```

### Network & Connectivity Fallbacks
**Offline Mode & Retry Logic:**
```javascript
function checkConnectivity() {
  return navigator.onLine && window.fetch;
}

function handleOfflineMode() {
  // Show offline indicator
  document.getElementById('offlineIndicator').style.display = 'block';
  
  // Disable network-dependent buttons
  document.querySelectorAll('.btn-network-required').forEach(btn => {
    btn.disabled = true;
    btn.innerHTML += ' (Offline)';
  });
  
  // Queue actions for when online
  window.addEventListener('online', () => {
    location.reload(); // Simple approach - reload page when back online
  });
}
```

---

## Performance Optimization

### Button Response Optimization
**Immediate UI Feedback:**
```javascript
function optimizeButtonResponse(buttonElement, action) {
  // Immediate visual feedback
  buttonElement.classList.add('btn-clicked');
  
  // Haptic feedback (mobile)
  if (navigator.vibrate) {
    navigator.vibrate(50);
  }
  
  // Execute action with debouncing
  debounce(() => {
    executeButtonAction(action);
  }, 300);
  
  // Reset visual state
  setTimeout(() => {
    buttonElement.classList.remove('btn-clicked');
  }, 150);
}

// Debounce utility to prevent double-clicks
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
```

### Lazy Loading & Resource Management
**Progressive Enhancement:**
```javascript
// Load non-critical components after main content
function loadSecondaryComponents() {
  setTimeout(() => {
    // Load community integration
    loadCommunityWidget();
    
    // Load affiliate product displays
    loadAffiliateComponents();
    
    // Initialize advanced analytics
    initializeHeatmapping();
  }, 2000);
}

// Intersection observer for scroll-triggered actions
function initializeScrollTriggers() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const action = entry.target.dataset.scrollAction;
        executeScrollAction(action);
      }
    });
  });
  
  document.querySelectorAll('[data-scroll-action]').forEach(el => {
    observer.observe(el);
  });
}
```

---

## Analytics & Tracking Integration

### Button Interaction Analytics
**Comprehensive Event Tracking:**
```javascript
function trackButtonInteraction(buttonElement, action) {
  const analytics = {
    event_name: 'button_click',
    button_id: buttonElement.id,
    button_text: buttonElement.textContent.trim(),
    button_class: buttonElement.className,
    page_component: getCurrentComponent(),
    user_session_data: getUserSession(),
    click_coordinates: getClickCoordinates(event),
    time_on_page: getTimeOnPage(),
    scroll_position: getScrollPosition()
  };
  
  // Google Analytics 4
  gtag('event', analytics.event_name, analytics);
  
  // Custom analytics endpoint
  fetch('/api/analytics/button-interaction', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(analytics)
  });
}
```

### Conversion Funnel Tracking
**Cross-Component Journey Analytics:**
```javascript
function trackConversionFunnel(step, data) {
  const funnelSteps = {
    'landing_page_view': 1,
    'registration_form_view': 2,
    'registration_submit': 3,
    'confirmation_view': 4,
    'calendar_add': 5,
    'resource_download': 6,
    'workshop_attend': 7,
    'replay_access': 8,
    'next_action': 9
  };
  
  gtag('event', 'conversion_funnel', {
    'funnel_step': funnelSteps[step],
    'step_name': step,
    'step_data': data,
    'user_journey_id': getUserJourneyId()
  });
}
```

This technical specification provides the complete logical flow between all landing page and web asset components, with detailed button interaction logic, state management, and cross-component communication patterns for the FitNature workshop system.