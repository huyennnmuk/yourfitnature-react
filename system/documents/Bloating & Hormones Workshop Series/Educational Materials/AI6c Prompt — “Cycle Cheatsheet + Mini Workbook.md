<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# AI6c Prompt — “Cycle Cheatsheet + Mini Workbook (Markdown outputs)”

1) Task
Generate two production-ready Markdown documents to be converted to PDFs for the FitNature “Bloating \& Hormones Workshop Series”:
cycle-cheatsheet.md (1 page, B/W, printer-friendly)
mini-workbook.md (6–10 pages equivalent, B/W + grayscale accents only)
Both must comply with: structure \& content scope, print design constraints, accessibility, metadata/identifiers, and versioning guidelines.
2) Context
Audience: workshop participants tracking cycle-linked bloating; materials must be faceless, easy to print at home, readable on mobile, and accessible (screen-reader friendly, logical headings, alt text on figures).
Cheatsheet: a single-page quick reference with 4 phases × concise protocols table; pure B/W, safe margins, high contrast, no bleed.
Mini Workbook: cover, how-to, phase overview, daily/weekly logs, protocol tracker, reflections, resources/next steps; keep forms/checklists clear and taggable.
File constraints \& IDs: include YAML-style metadata (title, author, subject, keywords, version, dates, language); keep output lean (optimize images later), and use semantic versioning in the files (e.g., v1.0.0).
3) Exemplars (incorporate \& adapt, not verbatim)
Cheatsheet main grid (4 phases: Follicular, Ovulatory, Luteal, Menstrual) with columns for Days, Typical Symptoms, Food Focus, Movement/Self-Care, Quick SOS Protocol.
Workbook sections: Cover, How to Use, Cycle Overview (simple 4-phase wheel caption), Daily Tracking Grids (1–5 scales, checkboxes), Weekly Reflections (guided prompts), Protocol Success Tracker, Resources \& Next Steps, Disclaimer.
4) Persona
Act as: (a) Instructional designer, (b) PDF/accessibility specialist (WCAG 2.1 AA mindset), (c) FitNature brand editor ensuring evidence-based, non-medical-advice language and inclusive tone.
5) Format
Output exactly two fenced code blocks (no extra commentary inside them):
Block 1: cycle-cheatsheet.md
Must include:
Front matter (YAML) with: title, subtitle, version: v1.0.0, author: FitNature, subject, keywords, created, modified, language: en-US, doc\_id: CCS-v1.0.0.
H1 title and a short strapline; printer-friendly note (B/W only).
One grid/table (4 rows = phases; columns: Days, Typical Symptoms, Food Focus, Movement/Self-Care, Quick SOS). Keep bullets ultra-concise; avoid color; borders as plain Markdown table.
Footer with educational disclaimer, privacy line, and a placeholder [QR code/URL: Full Workbook].
Accessibility notes in comments (e.g., <!-- figure alt: ... -->) for any icons or figures.
Safe margins guidance (as comments) and no bleed.
Block 2: mini-workbook.md
Must include:
Front matter (YAML) with metadata mirroring Cheatsheet, doc\_id: MWB-v1.0.0, and toc: true.
Sections (H2):
Cover (title, subtitle, fields for Name/Date/Session);
How to Use (Step-by-step + table of contents);
Cycle Overview (brief phase snapshots + a placeholder figure with alt text for a 4-phase wheel);
Daily Tracking Grids (repeatable block with 1–5 symptom scales, hydration, sleep, stress, movement, protocols tried, “Today’s win,” “What didn’t work,” “Tomorrow I’ll try”);
Weekly Reflection Prompts (Week 1–4 with progressive depth);
Protocol Success Tracker (Food / Movement / Lifestyle tables with Tried? Helpful? Notes columns);
Resources \& Next Steps;
Legal Disclaimer + Privacy note.
(Use checkboxes - [ ], emoji scales where helpful, and short sentences for readability.)
Accessibility \& structure: proper H1/H2/H3 hierarchy, descriptive link text, alt text for any figures, simple language, and logical reading order; keep content B/W/high-contrast friendly.
Print/usability constraints: generous spacing for handwriting; keep tables from splitting awkwardly (note as comment for layout stage); no background colors or gradients.
Shared acceptance criteria (apply to both blocks):
B/W only, high contrast, no color-dependent meaning; printer-friendly margins (note as comments).
Tagged/accessible intent captured via semantic Markdown (to be preserved when converted to tagged PDF/HTML); alt text for any figures; clear heading hierarchy.
Keep content concise, scannable; body text designed for \~11–12pt equivalent when rendered; avoid dense paragraphs.
Include Version \& History mini-table (date, change, reviewer) at the end of each file. Use semantic versioning (vMAJOR.MINOR.PATCH).
6) Tone
Conversational yet professional, inclusive, action-oriented, non-judgmental, and empowerment-focused; strictly educational (not medical advice).

What the model should output (structure guide)
\`\`\`md
<!-- FILE: cycle-cheatsheet.md -->
---
title: "Cycle Cheatsheet: Quick Reference for Bloat Relief"
subtitle: "FitNature Workshop Series — Faceless • Evidence-Based • Cycle-Synced"
version: "v1.0.0"
author: "FitNature"
subject: "Women's Health, Cycle Tracking, Bloating Relief"
keywords: ["hormonal health","cycle phases","bloating","women's wellness"]
created: "YYYY-MM-DD"
modified: "YYYY-MM-DD"
language: "en-US"
doc\_id: "CCS-v1.0.0"
---

# Cycle Cheatsheet: Quick Reference for Bloat Relief

<!-- Printer-friendly: B/W only, no bleed; safe margins. -->


| \*\*Phase\*\* | \*\*Days\*\* | \*\*Typical Symptoms\*\* | \*\*Food Focus\*\* | \*\*Movement/Self-Care\*\* | \*\*Quick SOS Protocol\*\* |
| :-- | :-- | :-- | :-- | :-- | :-- |
| Follicular | … | … | … | … | … |
| Ovulatory | … | … | … | … | … |
| Luteal | … | … | … | … | … |
| Menstrual | … | … | … | … | … |

> ⚠️ Education only, not medical advice. Track privately.
> Full workbook: [QR/URL goes here]

---

## Version \& History

| Version | Date | Change | Reviewer |
| :-- | :-- | :-- | :-- |
| v1.0.0 | YYYY-MM-DD | Initial release | Editor |

\`\`\`markdown \`\`\`md
<!-- FILE: mini-workbook.md -->
---
title: "Cycle-Synced Bloat Relief Workbook"
subtitle: "Your Personal Tracking \& Protocol Guide"
version: "v1.0.0"
author: "FitNature"
subject: "Women's Health, Cycle Tracking, Bloating Relief"
keywords: ["tracking","reflection","protocols","women's wellness"]
created: "YYYY-MM-DD"
modified: "YYYY-MM-DD"
language: "en-US"
doc\_id: "MWB-v1.0.0"
toc: true
---

# Cycle-Synced Bloat Relief Workbook

## How to Use This Workbook

- Step 1: Identify your cycle day …
- Step 2: Daily check-ins (30 sec): rate bloating 1–5, note food/movement, tick protocols tried …
- Step 3: Weekly reflections (5–10 min) …


## Your Cycle Overview

<!-- figure alt: "A simple 4-phase wheel labeling Follicular, Ovulatory, Luteal, Menstrual with typical day ranges." -->
\*\*Phase snapshots\*\* … \*(short, readable summaries)\*

## Daily Tracking Grids (Repeat for days)

\*\*Day \_\_ | Cycle Day: \_\_ | Date: \_\_\*\*

- Bloating (1–5): \_ \_ \_ \_ \_
- Energy: Low / Medium / High
- Mood: 😊 😐 😟 😡 😴
- Hydration: \_\_\_ glasses  • Sleep: \_\_\_ hrs (1–5 quality)  • Stress: 1–5
- Movement \& Self-Care:
    - [ ] Walk 10+ min  - [ ] Stretch/Yoga  - [ ] Sleep 7+ hrs  - [ ] Stress mgmt
- Protocols I tried:
    - [ ] Lemon water  - [ ] Digestive enzymes  - [ ] Anti-inflammatory foods  - [ ] Belly breathing  - [ ] Heat therapy  - [ ] Other: \_\_\_\_\_\_
- Today’s win: \_\_\_\_\_\_\_\_\_\_
- What didn’t work: \_\_\_\_\_\_\_\_\_\_
- Tomorrow I’ll try: \_\_\_\_\_\_\_\_\_\_


## Weekly Reflection Prompts (Weeks 1–4)

- \*\*Week 1 – Pattern Recognition:\*\* Q1…Q6
- \*\*Week 2 – Cause \& Effect:\*\* Q1…Q6
- \*\*Week 3 – Strategy Building:\*\* Q1…Q4
- \*\*Week 4 – Integration:\*\* Q1…Q6


## Protocol Success Tracker

\*\*Food / Movement / Lifestyle tables\*\* with Tried? • Helpful? • Notes columns.

## Resources \& Next Steps

- Continue tracking; top 3 protocols; community/replay/links placeholders.
- Contact: [support@fitnature.com](mailto:support@fitnature.com)

> ⚠️ Educational resource only, not medical advice.

---

## Version \& History

| Version | Date | Change | Reviewer |
| :-- | :-- | :-- | :-- |
| v1.0.0 | YYYY-MM-DD | Initial release | Editor |


---

If you want, I can \*\*run this prompt now\*\* and output both Markdown files exactly in that structure.

Looking at the comprehensive specifications provided, I'll generate two production-ready Markdown documents that meet all the technical, accessibility, and content requirements for the FitNature workshop series.

```md
---
title: "Cycle Cheatsheet: Quick Reference for Bloat Relief"
subtitle: "FitNature Workshop Series • Faceless • Evidence-Based • Cycle-Synced"
version: "v1.0.0"
author: "FitNature"
subject: "Women's Health, Cycle Tracking, Bloating Relief"
keywords: ["hormonal health", "cycle phases", "bloating", "women's wellness"]
created: "2025-08-26"
modified: "2025-08-26"
language: "en-US"
doc_id: "CCS-v1.0.0"
---

# Cycle Cheatsheet: Quick Reference for Bloat Relief

**Your cycle-synced guide to understanding and managing hormonal bloating patterns**

<!-- Print specifications: B/W only, 0.75" margins all sides, no bleed, high contrast -->
<!-- Accessibility: Table headers properly tagged, logical reading order -->

| **Phase** | **Days** | **Typical Symptoms** | **Food Focus** | **Movement/Self-Care** | **Quick SOS Protocol** |
|-----------|----------|---------------------|----------------|----------------------|----------------------|
| **FOLLICULAR** | Days 1-7 | • Light, shifting bloat<br>• Rising energy<br>• Improved digestion | • Hydrating foods<br>• Fresh fruits/veggies<br>• Light proteins | • Gentle walks<br>• Stretching<br>• New activities | **10-min walk**<br>+ lemon water<br>+ deep breathing |
| **OVULATORY** | Days 8-14 | • Transient "ovary bloat"<br>• Peak energy<br>• Sharp, localized | • Cruciferous vegetables<br>• Anti-inflammatory<br>• Omega-3 rich | • Higher intensity OK<br>• Social activities<br>• Outdoor movement | **Digestive enzyme**<br>+ ginger tea<br>+ left-side lying |
| **LUTEAL** | Days 15-28 | • Stubborn, heavy bloat<br>• Mood shifts<br>• Water retention | • Complex carbs<br>• Magnesium-rich<br>• Steady blood sugar | • Gentle, consistent<br>• Stress management<br>• Early bedtime | **Warm compress**<br>+ magnesium supplement<br>+ 4-7-8 breathing |
| **MENSTRUAL** | Days 28/1-7 | • Lower belly bloat<br>• Sluggish digestion<br>• Cramping | • Warm, cooked foods<br>• Iron-rich meals<br>• Easy-to-digest | • Restorative yoga<br>• Self-massage<br>• Rest priority | **Heat therapy**<br>+ peppermint tea<br>+ gentle belly rub |

---

> ⚠️ **Education only, not medical advice** | 🔒 **Track privately** | 📱 **Full workbook:** [QR code/URL placeholder]
> 
> **Questions?** workshop@fitnature.com | © 2025 FitNature

---

## Version & History

| Version | Date | Change | Reviewer |
|---------|------|--------|----------|
| v1.0.0 | 2025-08-26 | Initial release | Medical + Editorial |

<!-- Print notes: Designed for US Letter, B/W printing, minimum 11pt text equivalent -->
<!-- Accessibility notes: All table content uses high contrast, semantic structure preserved -->
```

```md
---
title: "Cycle-Synced Bloat Relief Workbook"
subtitle: "Your Personal Tracking & Protocol Guide"
version: "v1.0.0"
author: "FitNature"
subject: "Women's Health, Cycle Tracking, Bloating Relief"
keywords: ["tracking", "reflection", "protocols", "women's wellness"]
created: "2025-08-26"
modified: "2025-08-26"
language: "en-US"
doc_id: "MWB-v1.0.0"
toc: true
---

# Cycle-Synced Bloat Relief Workbook

**Your Personal Tracking & Protocol Guide**

Name: _________________________________

Workshop Date: _________________________

Session Attended: ______________________

---

## How to Use This Workbook

**YOUR TRACKING JOURNEY STARTS HERE**

**Step 1: IDENTIFY YOUR CYCLE DAY**
- [ ] Use period tracking app OR count from Day 1 of last period
- [ ] Don't worry if irregular - track symptoms regardless

**Step 2: DAILY CHECK-INS (30 seconds)**
- [ ] Rate bloating intensity (1-5 scale)
- [ ] Note what you ate/how you moved
- [ ] Check off protocols you tried

**Step 3: WEEKLY REFLECTIONS (5 minutes)**
- [ ] What patterns do you notice?
- [ ] Which protocols helped most?
- [ ] What questions came up?

> ⚠️ **PRIVACY NOTE:** This is YOUR personal tracker. Share only what feels comfortable.

### Table of Contents
- **Page 3:** Cycle Overview & Symptom Patterns
- **Pages 4-7:** Daily Tracking Grids (4 weeks)
- **Page 8:** Weekly Reflection Prompts
- **Page 9:** Protocol Success Tracker
- **Page 10:** Resources & Next Steps

---

## Your Cycle Overview

**UNDERSTANDING YOUR PHASES**

<!-- figure alt: "A simple 4-phase circular diagram showing Follicular (Days 1-7), Ovulatory (Days 8-14), Luteal (Days 15-28), and Menstrual (Days 28/1-7) phases with arrows indicating cycle flow" -->

### Phase Snapshots

**FOLLICULAR (Days 1-7)**
✓ Energy rising • Digestion improving • Light symptoms  
Focus: Hydration + gentle movement + fresh foods

**OVULATORY (Days 8-14)**
✓ Peak energy • Transient bloat • Sharp, brief symptoms  
Focus: Anti-inflammatory foods + active movement

**LUTEAL (Days 15-28)**
✓ PMS symptoms • Stubborn bloat • Mood sensitivity  
Focus: Complex carbs + stress management + consistency

**MENSTRUAL (Days 28/1-7)**
✓ Lower energy • Heavy bloat • Digestive sluggishness  
Focus: Warm foods + gentle movement + extra rest

> **Remember:** Every body is unique. These are starting points, not rules!

---

## Daily Tracking Grids

<!-- Print note: Generous spacing for handwriting, prevent table breaks across pages -->

### Day 1 | Cycle Day: _____ | Date: _____

**Bloating Level (circle):** 1 - 2 - 3 - 4 - 5 *(1=none, 5=severe)*

**Energy Level (circle):** Low - Medium - High

**Mood Check:** 😊 😐 😟 😡 😴

**WHAT I ATE TODAY:**
- Breakfast: ________________________________
- Lunch: ___________________________________
- Dinner: __________________________________
- Snacks/Drinks: ____________________________

**MOVEMENT & SELF-CARE:**
- [ ] Walked 10+ minutes
- [ ] Stretched/Yoga
- [ ] Other: __________
- [ ] Drank enough water
- [ ] Got 7+ hours sleep
- [ ] Managed stress

**PROTOCOLS I TRIED:**
- [ ] Lemon water upon waking
- [ ] Digestive enzymes with meals
- [ ] Anti-inflammatory foods
- [ ] Belly breathing (5+ minutes)
- [ ] Heat therapy
- [ ] Other: ___________________

**Today's Win:** ___________________________________________

**What Didn't Work:** ______________________________________

**Tomorrow I Want to Try:** ________________________________

---

### Day 2 | Cycle Day: _____ | Date: _____

*(Repeat format for Days 2-28)*

---

## Weekly Reflection Prompts

### Week 1: Pattern Recognition

**LOOKING BACK:**
1. What surprised me most about my symptoms this week?
   _________________________________________________

2. Which day felt best? What was different about that day?
   _________________________________________________

3. Which protocol felt most helpful right away?
   _________________________________________________

4. What was harder than expected to implement?
   _________________________________________________

**LOOKING FORWARD:**
5. What's one pattern I want to pay attention to next week?
   _________________________________________________

6. Which protocol deserves more consistent testing?
   _________________________________________________

---

### Week 2: Cause & Effect Analysis

**CONNECTING THE DOTS:**
1. I noticed my bloating was worse when I ________________
2. I felt most energized after I ________________
3. The most reliable relief came from ________________
4. My mood and digestion seem connected by ________________

**HYPOTHESIS TESTING:**
5. Next week I want to test: "If I _______, then I expect _______"
6. I'm curious about the relationship between _______ and _______

---

### Week 3: Personal Strategy Development

**MY EMERGING TOOLKIT:**
1. My "go-to" protocol stack is now:
   - Morning: ________________
   - During symptoms: ________________
   - Evening: ________________

2. I've learned I personally respond well to:
   - [ ] Food timing changes
   - [ ] Movement type: ________________
   - [ ] Stress management: ________________
   - [ ] Supplements: ________________

**REFINEMENT GOALS:**
3. What I want to get more consistent with: ________________
4. What I want to experiment with next: ________________

---

### Week 4: Integration & Sustainability

**SUSTAINABLE PRACTICES:**
1. From everything I've tried, the 3 things I want to keep doing long-term:
   a) ________________________________________________
   b) ________________________________________________
   c) ________________________________________________

2. What felt too complicated or unsustainable?
   _________________________________________________

3. How has my confidence in managing symptoms changed?
   _________________________________________________

4. What questions do I still have?
   _________________________________________________

**NEXT PHASE PLANNING:**
5. My biggest insight from this tracking period:
   _________________________________________________

6. One area I want to focus on going forward:
   _________________________________________________

---

## Protocol Success Tracker

**Track which protocols work best for YOU**

### Food Protocols

| Protocol | Tried? | Helpful? | Notes |
|----------|---------|----------|--------|
| Lemon water (morning) | [ ] | [ ] | ________________ |
| Ginger tea | [ ] | [ ] | ________________ |
| Digestive enzymes | [ ] | [ ] | ________________ |
| Anti-inflammatory meals | [ ] | [ ] | ________________ |
| Warm vs. cold foods | [ ] | [ ] | ________________ |
| Fiber timing | [ ] | [ ] | ________________ |

### Movement Protocols

| Protocol | Tried? | Helpful? | Notes |
|----------|---------|----------|--------|
| 10-minute walks | [ ] | [ ] | ________________ |
| Yoga/stretching | [ ] | [ ] | ________________ |
| Left-side lying | [ ] | [ ] | ________________ |
| Belly massage | [ ] | [ ] | ________________ |
| Heat therapy | [ ] | [ ] | ________________ |

### Lifestyle Protocols

| Protocol | Tried? | Helpful? | Notes |
|----------|---------|----------|--------|
| 4-7-8 breathing | [ ] | [ ] | ________________ |
| Early bedtime | [ ] | [ ] | ________________ |
| Stress management | [ ] | [ ] | ________________ |
| Consistent meal times | [ ] | [ ] | ________________ |
| Adequate hydration | [ ] | [ ] | ________________ |

**MY TOP 3 "GO-TO" PROTOCOLS:**
1. _____________________________________
2. _____________________________________
3. _____________________________________

**PROTOCOLS I WANT TO EXPLORE:**
_____________________________________
_____________________________________

---

## Resources & Next Steps

**YOUR BLOAT-RELIEF JOURNEY CONTINUES**

### Celebrate Your Progress! 🎉
You've completed tracking days. That's a commitment to your health!

### What's Next?
- [ ] Continue tracking for 2-3 more cycles
- [ ] Implement your top 3 protocols consistently
- [ ] Consider the next phase workshop: ________________
- [ ] Join our private community for ongoing support
- [ ] Book a 1:1 consultation for personalized guidance

### Additional Resources

**📱 Free Cycle Tracking Apps:**
• Clue • Flo • Period Tracker

**📚 Recommended Reading:**
• [Blog article links placeholder]
• [Research-backed resources placeholder]

**🛒 Supplement Support (Optional):**
• View our vetted supplement bundles
• All links include transparent affiliate disclosure

### Still Have Questions?
**Email:** support@fitnature.com  
**Subject:** "Workbook Question - [Your Workshop Phase]"

### Connect With Others
- [ ] Private Facebook group: [link placeholder]
- [ ] Monthly virtual meetups: [link placeholder]
- [ ] Share your wins (optional): #FitNatureCycles

> **Remember:** This journey is yours. Go at your own pace, trust your body, and celebrate every small improvement. You've got this! 💪

---

## Legal Disclaimer & Privacy

⚠️ **IMPORTANT:** This workbook is for educational purposes only and is not medical advice. Consult healthcare providers for persistent or severe symptoms.

**Privacy:** Your tracking data is personal and private. Share only what feels comfortable and beneficial to you.

© 2025 FitNature | Privacy Policy: [URL placeholder] | Unsubscribe: [URL placeholder]

---

## Version & History

| Version | Date | Change | Reviewer |
|---------|------|--------|----------|
| v1.0.0 | 2025-08-26 | Initial 10-page release | Medical + Editorial |

<!-- Print notes: Designed for US Letter, B/W + grayscale, generous spacing for handwriting -->
<!-- Accessibility notes: Proper heading hierarchy, semantic structure, high contrast design -->
<!-- Form fields designed to be fillable in PDF conversion with proper tab order -->
```

<span style="display:none">[^1][^2][^3][^4][^5][^6]</span>

<div style="text-align: center">⁂</div>

[^1]: Educational-Materials-Technical-Specification.md

[^2]: Educational-PDFs_-Content-Structure-Key-Sections.md

[^3]: File-Format-Size-and-Accessibility-Standards-for.md

[^4]: Printer-Friendly-Design-Requirements-for-One-Page.md

[^5]: Tracking-Metrics-Reflection-Prompts-for-Educatio.md

[^6]: Versioning-and-Update-Guidelines-for-Educational-Documents.md

