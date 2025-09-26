Here’s a **Product Requirements Document (PRD)** outline for a **Popup Affiliate Products Showcase Function** on a blog page:

***

## **1. Purpose**
Enable content creators to **showcase affiliate products via a popup modal** within blog articles, prompting readers to view product details and click through affiliate links without leaving the reading flow.

***

## **2. Key Objectives**
- Increase **affiliate click-through rate (CTR)** by presenting products in an attention-grabbing popup.
- Maintain **smooth reading experience** without forcing page reload.
- Make the popup **contextual** to the content for higher conversion.

***

## **3. Scope**
### **In-Scope**
- Popup modal UI for affiliate products.
- Trigger mechanisms (manual or automatic).
- Product carousel or grid within popup.
- Affiliate tracking integration.
- Mobile responsiveness and accessibility.

### **Out-of-Scope**
- Full e-commerce checkout (redirect to affiliate site instead).
- Advanced AI-based product recommendation engine (optional for v2).

***

## **4. Functional Requirements**
### **4.1 Triggers**
- **On-click** CTA (e.g., “See Recommended Products” button in blog content).
- **Scroll-based** trigger (popup appears when user reaches product-related section).
- **Exit intent** trigger (e.g., mouse moving toward tab close).
- Optional: **Timed trigger** (after X seconds on page).

### **4.2 Popup UI**
- **Layout:** Modal centered on screen, dimmed background overlay.
- **Content Structure:**
  - Product image(s) and title.
  - Short description (≤150 chars).
  - Price (optional).
  - CTA button linking to affiliate URL.
  - “Close” button (X) in top-right corner.
- **Variants:**
  - Single product showcase.
  - Multi-product carousel (with arrows).
  - Grid with up to 6 products.
- **Affiliate Link Tracking:** All CTAs use affiliate codes.

### **4.3 Behaviour**
- Clicking outside popup or “X” closes modal.
- Smooth open/close animations.
- Mobile: Fullscreen modal with swipe-to-close.
- Prevent multiple triggers per session unless refreshed.

***

## **5. Non-Functional Requirements**
- **Performance:** Load popup resources asynchronously to avoid slowing page load.
- **Accessibility:** ARIA roles, keyboard navigation (ESC to close).
- **Analytics:** Track impressions, clicks, conversions.
- **Compliance:** Include affiliate disclosure inside popup.

***

## **6. Technical Specifications**
- **Frontend Stack:** React/Next.js modal component.
- **Styling:** TailwindCSS or SCSS with theme adaptability.
- **Data Source:** Affiliate products fetched via JSON API or static config.
- **Tracking:** Google Analytics + affiliate network tracking pixels.

***

## **7. Example User Stories**
- *As a blog reader*, I want to see related products without leaving the article so I can decide quickly if I’m interested.
- *As a site owner*, I want to track how many people view and click on the popup so I can optimize placement.
- *As a marketer*, I want the popup to match site branding so it feels integrated.

***

## **8. Wireframe Concept**
**Trigger Placement**: Inside product review section → Click → Popup with product carousel → CTA sends user to Amazon with affiliate ID.

***

If you want, I can also **design the UX wireframe for this popup** and include ready-to-implement HTML/CSS/JS code for your blog.  
Do you want me to prepare that?

[1] http://localhost:3000/blog/sample-post#user-content-1-permanent-sidebar-placement
[2] http://localhost:3000/blog/sample-post#user-content-1-permanent-sidebar-placement




-----------

Here is a complete, implementation-ready package for a Popup Affiliate Products Showcase on a blog page, including UX wireframe description, HTML/JS/CSS code, event triggers, tracking hooks, accessibility, and configuration structure.

# What will be delivered
A responsive modal popup that showcases one or more affiliate products in a carousel or grid, with configurable triggers (click, scroll-depth, exit-intent, timer), ARIA-accessible controls, affiliate disclosure, impression/click tracking hooks, and brand-themable styles.

# UX wireframe
The popup is a centered modal over a dimmed overlay, with a header containing a short title and affiliate disclosure badge, the content area with either a carousel or grid of product cards, and a footer with an optional secondary CTA and a close button. On mobile, it becomes a full-screen sheet with a swipe-down gesture and a large, persistent close control. The entry animation is a subtle scale-and-fade to avoid startling, and the modal focuses the first interactive element while trapping focus until closed. The disclosure appears near the title and in small-print at the bottom for compliance. The carousel shows one card per view on mobile and two to three on desktop, with visible next/prev controls and keyboard support.

# HTML
```html

See Recommended Products





  
    
      Recommended Products
      Affiliate
      &times;
    

    These recommendations may contain affiliate links, which could earn a commission at no extra cost.

    
    
      &#10094;
      
      &#10095;
    

    
    

    
      As an affiliate, the site may earn from qualifying purchases. Read the full disclosure in the footer.
    
  

```

# CSS (theming-ready)
@blog-post.css file
```

# JavaScript
```html

(function() {
  const state = {
    products: [],
    variant: 'carousel', // 'carousel' | 'grid'
    sessionKey: 'afp_shown',
    lastFocus: null,
    currentIndex: 0
  };

  // Example configuration – replace or hydrate from CMS/JSON
  const AFP_CONFIG = {
    id: 'afp-default',
    variant: 'carousel',
    frequency: 'once_per_session', // 'always' | 'once_per_session'
    triggers: {
      clickSelector: '.afp-trigger',
      scrollPercent: 40, // show at 40% read
      exitIntent: true,
      delayMs: 0
    },
    products: [
      {
        id: 'p1',
        title: 'Probiotic Complex 50B',
        description: 'Broad-spectrum daily probiotic for gut balance.',
        price: '$24.99',
        image: 'https://via.placeholder.com/600x450?text=Probiotic+Complex',
        url: 'https://affiliate.example.com/probiotic?ref=SITEID&utm_source=blog',
        rel: 'sponsored nofollow noopener'
      },
      {
        id: 'p2',
        title: 'Prebiotic Fiber Blend',
        description: 'Soluble fiber to feed beneficial bacteria.',
        price: '$18.50',
        image: 'https://via.placeholder.com/600x450?text=Prebiotic+Fiber',
        url: 'https://affiliate.example.com/prebiotic?ref=SITEID&utm_source=blog',
        rel: 'sponsored nofollow noopener'
      },
      {
        id: 'p3',
        title: 'Digestive Enzymes',
        description: 'Supports digestion of proteins, fats, and carbs.',
        price: '$21.00',
        image: 'https://via.placeholder.com/600x450?text=Digestive+Enzymes',
        url: 'https://affiliate.example.com/enzymes?ref=SITEID&utm_source=blog',
        rel: 'sponsored nofollow noopener'
      }
    ]
  };

  // Elements
  const overlay = document.getElementById('afp-overlay');
  const modal = document.getElementById('afp-modal');
  const inner = modal.querySelector('.afp-modal-inner');
  const track = modal.querySelector('.afp-track');
  const grid = modal.querySelector('.afp-grid');
  const btnPrev = modal.querySelector('.afp-prev');
  const btnNext = modal.querySelector('.afp-next');
  const btnClose = modal.querySelector('.afp-close');

  function buildCards(list) {
    const fragment = document.createDocumentFragment();
    list.forEach((p, idx) => {
      const card = document.createElement('article');
      card.className = 'afp-card';
      card.setAttribute('role', 'group');
      card.setAttribute('aria-label', `${p.title}`);
      card.innerHTML = `
        
        
          ${p.title}
          ${p.description}
          ${p.price ? `${p.price}` : ''}
          
            View on Store
          
        
      `;
      fragment.appendChild(card);
    });
    return fragment;
  }

  function hydrate(config) {
    state.products = config.products || [];
    state.variant = config.variant || 'carousel';
    // Populate UI
    track.innerHTML = '';
    grid.innerHTML = '';
    const cards = buildCards(state.products);
    if (state.variant === 'grid') {
      grid.hidden = false;
      modal.querySelector('.afp-carousel').hidden = true;
      grid.appendChild(cards);
    } else {
      grid.hidden = true;
      modal.querySelector('.afp-carousel').hidden = false;
      track.appendChild(cards);
    }
  }

  function openModal(source='unknown') {
    if (AFP_CONFIG.frequency === 'once_per_session' && sessionStorage.getItem(state.sessionKey)) return;
    sessionStorage.setItem(state.sessionKey, '1');

    state.lastFocus = document.activeElement;
    overlay.hidden = false;
    modal.hidden = false;
    overlay.dataset.open = 'true';
    modal.dataset.open = 'true';
    document.body.style.overflow = 'hidden';
    // Focus the first interactive element
    const firstBtn = modal.querySelector('.afp-cta, .afp-close, button, a, input, select, textarea');
    (firstBtn || inner).focus();

    // Tracking: impression
    window.dispatchEvent(new CustomEvent('afp:impression', { detail: { id: AFP_CONFIG.id, source, count: state.products.length } }));
  }

  function closeModal() {
    overlay.removeAttribute('data-open');
    modal.removeAttribute('data-open');
    document.body.style.overflow = '';
    overlay.hidden = true;
    modal.hidden = true;
    if (state.lastFocus && typeof state.lastFocus.focus === 'function') state.lastFocus.focus();
    window.dispatchEvent(new CustomEvent('afp:close', { detail: { id: AFP_CONFIG.id } }));
  }

  // Focus trap
  function trapFocus(e) {
    if (!modal || modal.hidden) return;
    if (e.key !== 'Tab') return;
    const focusables = modal.querySelectorAll('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  function onKey(e) {
    if (e.key === 'Escape') closeModal();
    if (state.variant === 'carousel') {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    }
  }

  function next() {
    if (state.variant !== 'carousel') return;
    const cardWidth = track.getBoundingClientRect().width / Math.round(track.scrollWidth / track.clientWidth);
    track.scrollBy({ left: track.clientWidth, behavior: 'smooth' });
  }

  function prev() {
    if (state.variant !== 'carousel') return;
    track.scrollBy({ left: -track.clientWidth, behavior: 'smooth' });
  }

  // Triggers
  function setupTriggers() {
    const t = AFP_CONFIG.triggers || {};
    // Click trigger
    if (t.clickSelector) {
      document.addEventListener('click', (e) => {
        const btn = e.target.closest(t.clickSelector);
        if (btn && btn.dataset.afpPopupId === AFP_CONFIG.id) {
          e.preventDefault();
          openModal('click');
        }
      });
    }
    // Timed
    if (t.delayMs && t.delayMs > 0) {
      setTimeout(() => openModal('timer'), t.delayMs);
    }
    // Scroll-depth
    if (typeof t.scrollPercent === 'number') {
      let fired = false;
      const onScroll = () => {
        const scrolled = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;
        if (!fired && scrolled >= t.scrollPercent) {
          fired = true;
          openModal('scroll');
          window.removeEventListener('scroll', onScroll);
        }
      };
      window.addEventListener('scroll', onScroll);
    }
    // Exit-intent (desktop)
    if (t.exitIntent) {
      let fired = false;
      document.addEventListener('mouseout', (e) => {
        if (fired) return;
        if (!e.relatedTarget && e.clientY  {
    const a = e.target.closest('a.afp-cta');
    if (!a) return;
    const pid = a.getAttribute('data-afp-click-id');
    window.dispatchEvent(new CustomEvent('afp:click', { detail: { productId: pid, url: a.href } }));
  });

  // Initialize
  hydrate(AFP_CONFIG);
  setupTriggers();

  // Public API (optional)
  window.AFP = {
    open: () => openModal('api'),
    close: closeModal,
    configure: (cfg) => { hydrate(Object.assign({}, AFP_CONFIG, cfg)); }
  };
})();

```

# Analytics integration hooks
- Impression: listen for afp:impression and forward to analytics.
- Click: listen for afp:click and send an event with productId and url.
- Close: listen for afp:close for popup dismissal tracking.

Example:
```html

  window.addEventListener('afp:impression', (e) => {
    // Example GA4
    if (window.gtag) gtag('event', 'affiliate_popup_impression', { popup_id: e.detail.id, source: e.detail.source, product_count: e.detail.count });
  });
  window.addEventListener('afp:click', (e) => {
    if (window.gtag) gtag('event', 'affiliate_click', { product_id: e.detail.productId, destination: e.detail.url });
  });
  window.addEventListener('afp:close', (e) => {
    if (window.gtag) gtag('event', 'affiliate_popup_close', { popup_id: e.detail.id });
  });

```

# SEO and compliance
Include a visible affiliate disclosure in the modal header and footer, use rel="sponsored nofollow noopener" on outbound links, and avoid blocking main content on initial load without user intent for better UX. Ensure the popup is not shown repeatedly within a single session unless configured otherwise.

# Configuration options
- variant: carousel or grid.
- frequency: always or once_per_session.
- triggers: click selector, scroll percentage, exit intent, delay.
- products: title, description, price, image, url, rel.
- styling: override CSS variables to match the site brand.

# How to integrate on the blog page
Place the HTML blocks near the end of the body, adjust AFP_CONFIG with actual products and affiliate URLs, add a button with class afp-trigger in the relevant section of the blog post, and ensure the CSS and JS are loaded only on pages where the popup is required. For Next.js or similar frameworks, wrap the script in a client-only component and hydrate configuration from CMS fields.

[1] http://localhost:3000/blog/sample-post#user-content-1-permanent-sidebar-placement
[2] http://localhost:3000/blog/sample-post#user-content-1-permanent-sidebar-placement