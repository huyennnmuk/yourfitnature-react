// lib/analytics.ts
export const track = (event: string, data?: Record<string, any>) => {
  const logEntry = `[${new Date().toISOString()}] ${event} ${data ? JSON.stringify(data) : ''}`;
  
  if (typeof window !== 'undefined') {
    // Client-side: log to console and potentially send to analytics service
    console.log('Analytics event:', event, data);
    
    // In production, you might want to send to an analytics service
    fetch('/api/analytics', { method: 'POST', body: JSON.stringify({ event, data }) });
  } else {
    // Server-side: use dynamic import to avoid bundling fs in client
    // This code will only run on the server
    const fs = require('fs');
    const path = require('path');
    
    const logsDir = path.resolve(process.cwd(), 'logs');
    const logFile = path.join(logsDir, 'analytics.log');
    
    try {
      if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir, { recursive: true });
      }
      fs.appendFileSync(logFile, logEntry + '\n', 'utf8');
    } catch (err) {
      console.error('Failed to write analytics log:', err);
    }
  }
};

export const trackPageView = (url: string) => {
  track('page_view', { url });
};

export const trackWorkshopConfirmationView = (sessionType: string, registrationSource: string, userType: string) => {
  track('workshop_confirmation_view', {
    session_type: sessionType,
    registration_source: registrationSource,
    user_type: userType,
  });
};

export const trackCalendarAddAttempt = (platformName: string, sessionType: string) => {
  track('calendar_add_attempt', {
    calendar_platform: platformName,
    session_type: sessionType,
  });
};

export const trackCalendarAddSuccess = (platformName: string, sessionType: string) => {
  track('calendar_add_success', {
    calendar_platform: platformName,
    session_type: sessionType,
  });
};

export const trackPreworkshopDownload = (fileName: string, sessionType: string, downloadOrder: number) => {
  track('preworkshop_download', {
    file_type: fileName,
    session_type: sessionType,
    download_order: downloadOrder,
  });
};

export const trackPollSubmission = (selectedOption: string, sessionType: string) => {
  track('poll_submission', {
    poll_answer: selectedOption,
    session_type: sessionType,
  });
};


// --- Registration Flow Analytics from PRD ---

export const trackRegisterClick = (source: string) => {
    track('register_click', { button_location: source });
};

export const trackFormView = (source: string) => {
    track('registration_form_view', { form_source: source });
};

export const trackFieldValidationError = (fieldName: string, errorMessage: string) => {
    track('form_field_validation_error', { field_name: fieldName, error_message: errorMessage });
};

export const trackFormSubmit = () => {
    track('registration_form_submit');
};

export const trackSubmissionSuccess = (data: { registration_id: string; session_type: string; }) => {
    track('registration_success', { registration_id: data.registration_id, session_type: data.session_type });
};

export const trackSubmissionError = (error: { message: string; status?: number; }) => {
    track('registration_error', { error_message: error.message, status_code: error.status });
};

export const trackRedirectToConfirmation = (data: { registration_id: string; session_type: string; }) => {
    track('redirect_to_confirmation', { registration_id: data.registration_id, session_type: data.session_type });
};