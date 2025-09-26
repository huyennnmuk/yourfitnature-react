// FitNature Workshop Presentation Application

// Session data embedded directly
const sessionsData = {
  "follicular": {
    "id": "follicular",
    "title": "Follicular Phase Workshop",
    "subtitle": "Fresh Start, Rising Energy",
    "phase_image": "https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/6f1ba961-8def-4056-af80-a62d5f39ca38.png",
    "slides": [
      {
        "id": 1,
        "title": "FOLLICULAR PHASE WORKSHOP",
        "subtitle": "Fresh Start, Rising Energy",
        "content": "Welcome to your faceless, judgment-free space\n• No cameras, ever\n• Evidence-based protocols\n• Your privacy respected\n• Interactive via chat only\n\nSession Promise: You'll leave with 3 proven protocols to support your body's natural renewal phase"
      },
      {
        "id": 2,
        "title": "TODAY'S ROADMAP",
        "content": "🌱 UNDERSTAND: Follicular Physiology 101\n🔍 IDENTIFY: Your Unique Symptom Patterns\n🛠️ IMPLEMENT: 3 Evidence-Based Protocols\n⭐ ACTION: Your Personal Next Steps\n\nInteractive Elements:\n• 2 quick polls\n• Chat sharing opportunities\n• Live Q&A (final 10 minutes)"
      },
      {
        "id": 3,
        "title": "YOUR BODY DURING FOLLICULAR PHASE",
        "subtitle": "Days 1-7: The Renewal Phase",
        "content": "HORMONES:\n• Estrogen: Low → Rising\n• Energy levels: Rebuilding\n• Mood: Stabilizing → Improving\n\nDIGESTIVE SYSTEM:\n• Motility: Normalizing after period\n• Inflammation: Naturally decreasing\n• Hydration needs: Increased for recovery\n\nWhy you might feel: Cautiously optimistic, gentle hunger returning, ready for light activity"
      },
      {
        "id": 4,
        "title": "TYPICAL BLOATING PATTERNS",
        "content": "EARLY FOLLICULAR (Days 1-3):\n• Residual period bloat fading\n• Lower belly still sensitive\n• Appetite returning gradually\n\nMID-FOLLICULAR (Days 4-7):\n• Light, shifting bloating\n• Better in morning, variable afternoon\n• Often food-timing related\n\nWHAT'S NORMAL:\n✓ Gradual improvement\n✓ Day-to-day variation\n✓ Response to gentle protocols\n\nRED FLAGS - SEEK HELP:\n❌ Severe pain preventing daily activities\n❌ Bloating worsening throughout phase\n❌ New or concerning symptoms"
      },
      {
        "id": 5,
        "title": "QUICK POLL",
        "subtitle": "How do YOU typically feel during your follicular phase?",
        "poll": [
          "🌅 Gradual improvement, gentle energy return",
          "🎢 Up and down, unpredictable day-to-day",
          "😴 Still tired and bloated most days", 
          "🤔 I've never paid attention to patterns",
          "💪 Actually feel great - best part of my cycle"
        ],
        "chat_prompt": "Share in chat: What surprises you most about this phase?"
      },
      {
        "id": 6,
        "title": "FOOD PROTOCOLS: GENTLE REACTIVATION",
        "content": "HYDRATION FOCUS:\n✓ Warm lemon water upon waking\n✓ Herbal teas throughout day\n✓ Aim for 8+ glasses, room temperature preferred\n\nGENTLE FOODS:\n✓ Fresh, seasonal fruits\n✓ Leafy greens and light vegetables\n✓ Clean proteins (fish, eggs, legumes)\n✓ Whole grains in moderation\n\nTIMING MATTERS:\n✓ Regular meal schedule helps reset\n✓ Don't skip breakfast - body needs fuel\n✓ Light dinner 3 hours before bed\n\nAVOID FOR NOW:\n❌ Heavy, rich foods while recovering\n❌ Excessive caffeine or alcohol\n❌ Large portions - start smaller",
        "image": "https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/cad049b2-6c63-4bc2-affb-b3d1f84517bc.png"
      },
      {
        "id": 7,
        "title": "MOVEMENT: REBUILDING ENERGY",
        "content": "PERFECT FOR FOLLICULAR PHASE:\n🚶 10-15 minute walks (daily if possible)\n🧘 Gentle yoga or stretching (15-20 min)\n🌊 Swimming or water-based movement\n💃 Dance or free-form movement\n\nENERGY BUILDING:\n• Start with 50% of your usual intensity\n• Focus on consistency over intensity\n• Listen to your body's 'yes' and 'no'\n• Movement should energize, not drain\n\nSELF-CARE ESSENTIALS:\n🛁 Warm baths with Epsom salts\n😴 7-8 hours sleep, consistent bedtime\n🧘‍♀️ 5-10 minutes meditation/breathing\n📚 Gentle, positive inputs (books, music, nature)"
      },
      {
        "id": 8,
        "title": "YOUR FOLLICULAR MORNING KICK-START",
        "subtitle": "⏰ Total Time: 10 Minutes",
        "content": "MINUTE 1-2:\n🍋 Prepare warm lemon water, sip slowly\n\nMINUTE 3-5:\n🧘‍♀️ Gentle stretches in bed or standing\nFocus on spine, hips, shoulders\n\nMINUTE 6-8:\n📱 Check in with your body (not your phone!)\nRate energy, mood, appetite on 1-5 scale\n\nMINUTE 9-10:\n📝 Set ONE gentle intention for the day\nWrite it down or just hold it mentally\n\nRESULT: Tuned in, gently energized, intentional start"
      },
      {
        "id": 9,
        "title": "SOS: WHEN BLOATING HITS SUDDENLY",
        "content": "IMMEDIATE RELIEF (0-5 minutes):\n🫁 4-7-8 Breathing: Inhale 4, Hold 7, Exhale 8\n🫖 Sip warm water or ginger tea\n🤸‍♀️ Gentle knee-to-chest stretches\n\nNEXT STEPS (5-15 minutes):\n🚶‍♀️ Slow walk around house/block\n🤲 Gentle belly massage: circular, clockwise\n🛋️ Rest on left side with knees up\n\nIF IT PERSISTS:\n📝 Note what you ate/did in past 2 hours\n💊 Consider digestive enzyme (if you use them)\n📞 Check in with healthcare provider if severe\n\nPREVENTION FOR NEXT TIME:\nSmaller portions, slower eating, mindful of trigger foods"
      },
      {
        "id": 10,
        "title": "CONFIDENCE CHECK",
        "subtitle": "Which protocol are you most excited to try?",
        "poll": [
          "🌅 10-minute morning kick-start routine",
          "🥗 Gentle food reactivation approach",
          "🚶‍♀️ Follicular-friendly movement plan",
          "🆘 SOS protocol for sudden symptoms",
          "🤔 I need to think about it more"
        ],
        "chat_prompt": "BONUS QUESTION in chat: What's one thing from today that surprised you or changed how you think about the follicular phase?"
      },
      {
        "id": 11,
        "title": "YOUR NEXT 7 DAYS: FOLLICULAR PHASE ACTION PLAN",
        "content": "CHOOSE 1-2 TO START:\n□ Try the 10-minute morning routine for 3 days\n□ Focus on hydration: warm lemon water daily\n□ Add one 15-minute walk to daily routine\n□ Practice the SOS protocol if bloating occurs\n□ Track energy levels daily (simple 1-5 scale)\n\nWEEK 1 SUCCESS LOOKS LIKE:\n✓ More awareness of your body's signals\n✓ One new habit feeling natural and easy\n✓ Better understanding of your patterns\n✓ Confidence to try gentle interventions\n\nSUPPORT YOURSELF:\n📱 Set phone reminders for new habits\n💬 Join our private community group\n📚 Download the tracking workbook\n🤝 Find an accountability partner"
      },
      {
        "id": 12,
        "title": "CONTINUE YOUR JOURNEY",
        "content": "IMMEDIATE ACCESS:\n📋 Download: Follicular Phase Cheat Sheet\n📖 Download: Weekly Tracking Workbook\n🎥 Access: This Session Replay\n\nNEXT SESSION PREVIEW:\n🌻 Ovulatory Phase Workshop: 'Peak Energy, Peak Potential'\n📅 [Date] at [Time]\n🎯 Focus: Managing mid-cycle bloat & energy optimization\n\nCOMMUNITY & SUPPORT:\n💬 Private Facebook Group: [Link]\n📧 Email Support: support@fitnature.com\n📱 Instagram: @FitNatureCycles\n\nTHANK YOU:\nYour commitment to understanding your body is inspiring.\nRemember: Small, consistent steps create lasting change.\nYou've got this! 💚"
      }
    ]
  },
  "ovulatory": {
    "id": "ovulatory",
    "title": "Ovulatory Phase Workshop", 
    "subtitle": "Peak Energy, Peak Potential",
    "slides": [
      {
        "id": 1,
        "title": "OVULATORY PHASE WORKSHOP",
        "subtitle": "Peak Energy, Peak Potential", 
        "content": "Welcome to your power phase session!\n• Still faceless, still private\n• Evidence-based protocols for your peak\n• Harness your natural energy surge\n• Chat participation encouraged\n\nSession Promise: Master the art of working WITH your peak energy while preventing and managing 'ovary bloat'"
      },
      {
        "id": 2,
        "title": "TODAY'S POWER-PACKED AGENDA",
        "content": "⚡ ENERGIZE: Peak Phase Physiology & Power\n🎯 OPTIMIZE: Managing Mid-Cycle Bloating\n🧰 ACTIVATE: 3 High-Energy Protocols\n🚀 AMPLIFY: Sustainable Peak Performance\n\nInteractive Power-Ups:\n• Energy assessment poll\n• Real-time protocol practice\n• Peak phase planning session\n• Community wisdom sharing\n\nLet's make the most of this natural high!"
      },
      {
        "id": 3,
        "title": "PEAK PHASE POWER: What's Happening",
        "subtitle": "Days 8-14: Your Body's Natural High",
        "content": "HORMONAL SYMPHONY:\n• Estrogen: Peak levels\n• LH/FSH: Surging for ovulation\n• Testosterone: Brief but powerful spike\n\nPEAK PERFORMANCE BENEFITS:\n• Mental clarity & focus\n• Physical strength & coordination\n• Social confidence & communication\n• Metabolism running hot\n• Pain tolerance higher\n\nTHE BLOATING PARADOX:\nPeak energy + digestive sensitivity = need for smart strategies"
      }
    ]
  },
  "luteal": {
    "id": "luteal",
    "title": "Luteal Phase Workshop",
    "subtitle": "Sustainable Strength",
    "slides": [
      {
        "id": 1,
        "title": "LUTEAL PHASE WORKSHOP",
        "subtitle": "Sustainable Strength",
        "content": "Welcome to your grounding space\n• Faceless sanctuary for PMS challenges\n• Evidence-based comfort strategies\n• Strength that doesn't require perfection\n• Compassionate protocols for tough days\n\nSession Promise: Leave with tools to navigate PMS bloating while honoring your changing needs with grace"
      }
    ]
  },
  "menstrual": {
    "id": "menstrual",
    "title": "Menstrual Phase Workshop",
    "subtitle": "Rest & Reset",
    "slides": [
      {
        "id": 1,
        "title": "MENSTRUAL PHASE WORKSHOP",
        "subtitle": "Rest & Reset",
        "content": "Welcome to your sacred rest space\n• Faceless refuge during menstruation\n• Honor your body's natural wisdom\n• Rest as productive, not lazy\n• Gentle care for your monthly renewal\n\nSession Promise: Transform how you experience menstruation - from burden to sacred pause, with practical comfort tools"
      }
    ]
  }
};

class PresentationApp {
  constructor() {
    this.currentSession = null;
    this.currentSlideIndex = 0;
    this.isFullscreen = false;
    
    this.initializeApp();
  }

  initializeApp() {
    this.bindEventListeners();
    // Start with session selection visible
    this.showSessionSelection();
  }

  bindEventListeners() {
    // Session selection
    document.querySelectorAll('.session-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const sessionId = e.currentTarget.getAttribute('data-session');
        this.selectSession(sessionId);
      });
    });

    // Navigation buttons
    document.getElementById('backToSessions').addEventListener('click', () => {
      this.showSessionSelection();
    });

    document.getElementById('prevSlide').addEventListener('click', () => {
      this.previousSlide();
    });

    document.getElementById('nextSlide').addEventListener('click', () => {
      this.nextSlide();
    });

    // Fullscreen controls
    document.getElementById('fullscreenBtn').addEventListener('click', () => {
      this.enterFullscreen();
    });

    document.getElementById('exitFullscreen').addEventListener('click', () => {
      this.exitFullscreen();
    });

    document.getElementById('fullscreenPrev').addEventListener('click', () => {
      this.previousSlide();
    });

    document.getElementById('fullscreenNext').addEventListener('click', () => {
      this.nextSlide();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (this.currentSession) {
        if (e.key === 'ArrowLeft') {
          this.previousSlide();
        } else if (e.key === 'ArrowRight') {
          this.nextSlide();
        } else if (e.key === 'Escape' && this.isFullscreen) {
          this.exitFullscreen();
        } else if (e.key === 'f' || e.key === 'F') {
          if (this.isFullscreen) {
            this.exitFullscreen();
          } else {
            this.enterFullscreen();
          }
        }
      }
    });
  }

  selectSession(sessionId) {
    this.currentSession = sessionsData[sessionId];
    this.currentSlideIndex = 0;
    
    // Apply phase-specific theme
    document.body.className = `phase-${sessionId}`;
    
    this.showPresentation();
    this.updateSlideContent();
  }

  showSessionSelection() {
    document.getElementById('sessionSelection').classList.remove('hidden');
    document.getElementById('presentationView').classList.add('hidden');
    document.getElementById('fullscreenModal').classList.add('hidden');
    document.body.className = '';
    this.currentSession = null;
    this.isFullscreen = false;
  }

  showPresentation() {
    document.getElementById('sessionSelection').classList.add('hidden');
    document.getElementById('presentationView').classList.remove('hidden');
    
    // Update session title
    document.getElementById('currentSessionTitle').textContent = this.currentSession.title;
    document.getElementById('currentSessionSubtitle').textContent = this.currentSession.subtitle;
    
    // Create slide dots
    this.createSlideDots();
  }

  createSlideDots() {
    const slideDots = document.getElementById('slideDots');
    slideDots.innerHTML = '';
    
    for (let i = 0; i < this.currentSession.slides.length; i++) {
      const dot = document.createElement('div');
      dot.className = 'slide-dot';
      if (i === this.currentSlideIndex) {
        dot.classList.add('active');
      }
      dot.addEventListener('click', () => {
        this.goToSlide(i);
      });
      slideDots.appendChild(dot);
    }
  }

  updateSlideContent() {
    if (!this.currentSession || !this.currentSession.slides[this.currentSlideIndex]) {
      console.error('No slide data available');
      return;
    }

    const slide = this.currentSession.slides[this.currentSlideIndex];
    const slideContent = document.getElementById('slideContent');
    const fullscreenSlideContent = document.getElementById('fullscreenSlideContent');
    
    // Generate slide HTML
    const slideHTML = this.generateSlideHTML(slide);
    
    // Update both normal and fullscreen content
    slideContent.innerHTML = slideHTML;
    if (fullscreenSlideContent) {
      fullscreenSlideContent.innerHTML = slideHTML;
    }
    
    // Update progress indicators
    this.updateProgress();
    this.updateNavigationButtons();
    this.updateSlideDots();

    // Trigger fade-in animation
    slideContent.style.animation = 'none';
    slideContent.offsetHeight; // Trigger reflow
    slideContent.style.animation = 'fadeIn 0.5s ease-in-out forwards';
  }

  generateSlideHTML(slide) {
    let html = '';
    
    // Title
    if (slide.title) {
      if (slide.id === 1) {
        html += `<h1>${slide.title}</h1>`;
      } else {
        html += `<h2>${slide.title}</h2>`;
      }
    }
    
    // Subtitle
    if (slide.subtitle) {
      html += `<h4 class="subtitle">${slide.subtitle}</h4>`;
    }
    
    // Content
    if (slide.content) {
      html += `<div class="content-text">${slide.content}</div>`;
    }
    
    // Poll
    if (slide.poll && slide.poll.length > 0) {
      html += `<div class="poll-container">
        <h3>Interactive Poll</h3>
        <ul class="poll-options">`;
      
      slide.poll.forEach(option => {
        html += `<li>${option}</li>`;
      });
      
      html += `</ul></div>`;
      
      if (slide.chat_prompt) {
        html += `<div class="chat-prompt">${slide.chat_prompt}</div>`;
      }
    }
    
    // Image
    if (slide.image) {
      html += `<div class="content-image">
        <img src="${slide.image}" alt="Workshop illustration" />
      </div>`;
    }
    
    return html;
  }

  updateProgress() {
    if (!this.currentSession) return;

    const progressFill = document.getElementById('progressFill');
    const currentSlideSpan = document.getElementById('currentSlide');
    const totalSlidesSpan = document.getElementById('totalSlides');
    const fullscreenCurrentSlide = document.getElementById('fullscreenCurrentSlide');
    const fullscreenTotalSlides = document.getElementById('fullscreenTotalSlides');
    
    const progress = ((this.currentSlideIndex + 1) / this.currentSession.slides.length) * 100;
    progressFill.style.width = `${progress}%`;
    
    currentSlideSpan.textContent = this.currentSlideIndex + 1;
    totalSlidesSpan.textContent = this.currentSession.slides.length;
    
    if (fullscreenCurrentSlide) {
      fullscreenCurrentSlide.textContent = this.currentSlideIndex + 1;
    }
    if (fullscreenTotalSlides) {
      fullscreenTotalSlides.textContent = this.currentSession.slides.length;
    }
    
    // Update fullscreen session title
    const fullscreenTitle = document.getElementById('fullscreenSessionTitle');
    if (fullscreenTitle) {
      fullscreenTitle.textContent = this.currentSession.title;
    }
  }

  updateNavigationButtons() {
    if (!this.currentSession) return;

    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    const fullscreenPrevBtn = document.getElementById('fullscreenPrev');
    const fullscreenNextBtn = document.getElementById('fullscreenNext');
    
    // Previous buttons
    if (this.currentSlideIndex === 0) {
      prevBtn.disabled = true;
      if (fullscreenPrevBtn) fullscreenPrevBtn.disabled = true;
    } else {
      prevBtn.disabled = false;
      if (fullscreenPrevBtn) fullscreenPrevBtn.disabled = false;
    }
    
    // Next buttons
    if (this.currentSlideIndex === this.currentSession.slides.length - 1) {
      nextBtn.textContent = 'Complete Session';
      if (fullscreenNextBtn) fullscreenNextBtn.textContent = 'Complete Session';
    } else {
      nextBtn.textContent = 'Next →';
      if (fullscreenNextBtn) fullscreenNextBtn.textContent = 'Next →';
    }
  }

  updateSlideDots() {
    const dots = document.querySelectorAll('.slide-dot');
    dots.forEach((dot, index) => {
      if (index === this.currentSlideIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  previousSlide() {
    if (this.currentSlideIndex > 0) {
      this.currentSlideIndex--;
      this.updateSlideContent();
    }
  }

  nextSlide() {
    if (this.currentSlideIndex < this.currentSession.slides.length - 1) {
      this.currentSlideIndex++;
      this.updateSlideContent();
    } else {
      // Session complete - return to session selection
      this.showSessionSelection();
    }
  }

  goToSlide(index) {
    if (index >= 0 && index < this.currentSession.slides.length) {
      this.currentSlideIndex = index;
      this.updateSlideContent();
    }
  }

  enterFullscreen() {
    if (!this.currentSession) return;
    
    this.isFullscreen = true;
    document.getElementById('fullscreenModal').classList.remove('hidden');
    this.updateSlideContent();
  }

  exitFullscreen() {
    this.isFullscreen = false;
    document.getElementById('fullscreenModal').classList.add('hidden');
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PresentationApp();
});