import { getAffiliateProductById } from './OneCentralAffiliateDatabase';
import { workshopTestimonials } from './workshopTestimonialsData';

export const replayData = {
    follicular: {
        phase: "Follicular Phase",
        date: "August 26, 2025",
        videoUrl:"/video/workshop-replay/Follicular_Phase__Fresh_Start.mp4",
        audioUrl: "/audio/workshop-replay/Follicular_Fresh_Start__Decoding_Your_Cycle_s_First_7_Days_for_Better_Digestion_&_Energy.m4a",
        audioDownloadName: "YourFitNature-Follicular-Phase-Audio.m4a",
        videoChapters: [
            { "time": "00:00", "title": "Introduction & Fresh Start Overview", "description": "Reframing the follicular phase as renewal after menstruation." },
            { "time": "00:40", "title": "What Happens in the Follicular Phase", "description": "Overview of estrogen’s rise and cautious optimism." },
            { "time": "01:20", "title": "Post-Period Bloat & Gradual Improvement", "description": "Normal vs. concerning bloating patterns during this week." },
            { "time": "02:20", "title": "Gentle Reactivation Toolkit: Food & Movement", "description": "Supportive foods and low-intensity exercise guidance." },
            { "time": "03:40", "title": "SOS Toolkit for Sudden Bloating", "description": "Quick remedies like breathing, ginger tea, and stretches." },
            { "time": "04:30", "title": "10-Minute Morning Routine", "description": "Simple daily ritual combining hydration, stretches, and intention." },
            { "time": "05:10", "title": "Action Step & Closing Reflection", "description": "Encouragement to choose one gentle habit for consistency." }
        ],
        resources: [
            { name: "Cycle Cheat Sheet", size: "0.2 MB", href: "/pdf/workshop-replay/Follicular Phase Cheat Sheet.pdf", downloadName: "YourFitNature-Follicular-Cycle-Cheat-Sheet.pdf", description: "A quick reference guide to the follicular phase." },
            { name: "Weekly Tracking Workbook", size: "0.2 MB", href: "/pdf/workshop-replay/Weekly Tracking Workbook.pdf", downloadName: "YourFitNature-Weekly-Tracking-Workbook.pdf", description: "Track your progress and symptoms through the week." },
            { name: "Session Slides", size: "2.4 MB", href: "/pdf/workshop-replay/follicular_session_slides.pdf", downloadName: "YourFitNature-Follicular-Phase-Slides.pdf", description: "The complete slide deck from the workshop session." },
        ],
        affiliateProducts: workshopTestimonials[0].featuredProductIds?.map(id => getAffiliateProductById(id)).filter(p => p) || [],
    },
    ovulatory: {
        phase: "Ovulatory Phase",
        date: "September 2, 2025",
        videoUrl:"/video/workshop-replay/The_Ovulatory_Power_Phase.mp4",
        audioUrl: "/audio/workshop-replay/Harness_Your_Hormones__Unpacking_Your_Ovulatory_Phase_Power_and__Ovary_Bloat_.m4a",
        audioDownloadName: "YourFitNature-Ovulatory-Phase-Audio.m4a",
        videoChapters: [
            { "time": "00:00", "title": "Welcome & Power Phase Overview", "description": "Introduction to the ovulatory phase as a peak energy period." },
            { "time": "00:40", "title": "Your Natural Power Surge Explained", "description": "Breaking down why this week feels so good and predictable." },
            { "time": "01:40", "title": "The Hormonal Symphony & Peak Performance", "description": "Estrogen, LH, and testosterone working together for peak results." },
            { "time": "02:40", "title": "The Paradox: Ovary Bloat & Discomfort", "description": "Why high energy may also come with bloating and discomfort." },
            { "time": "03:30", "title": "Nutrition & Movement Strategies", "description": "Smart eating and training tips to maximize benefits." },
            { "time": "04:30", "title": "Action Plan & Relief Protocols", "description": "Practical steps to relieve mid-cycle discomfort." },
            { "time": "05:10", "title": "Conclusion & Embracing Your Cycle", "description": "Encouragement to use natural rhythms for productivity and wellness." }
        ],
        resources: [
            { name: "Ovulatory Phase Quick Reference", size: "0.2 MB", href: "/pdf/Ovulatory Phase Quick Reference.pdf", downloadName: "YourFitNature-Ovulatory-Phase-Quick-Reference.pdf", description: "A quick reference guide to the ovulatory phase." },
            { name: "Peak Energy Optimization Tracker", size: "0.2 MB", href: "/pdf/Peak Energy Optimization Tracker.pdf", downloadName: "YourFitNature-Peak-Energy-Optimization-Tracker.pdf", description: "Track your energy levels and optimize your performance." },
            { name: "Session Slides", size: "3.1 MB", href: "pdf/ovulatory_session_slides.pdf", downloadName: "YourFitNature-Ovulatory-Phase-Slides.pdf", description: "The complete slide deck from the workshop session." },
        ],
        affiliateProducts: workshopTestimonials[1].featuredProductIds?.map(id => getAffiliateProductById(id)).filter(p => p) || [],
    },
    luteal: {
        phase: "Luteal Phase",
        date: "September 9, 2025",
        videoUrl:"/video/workshop-replay/Luteal_Phase_Taming_Pre-Period_Bloat.mp4",
        audioUrl: "/audio/workshop-replay/Unpacking_PMS_Bloating__Your_Sustainable_Strength_Guide_to_the_Luteal_Phase.m4a",
        audioDownloadName: "YourFitNature-Luteal-Phase-Audio.m4a",
        videoChapters: [
            { "time": "00:00", "title": "Introduction & Validating the Experience", "description": "Acknowledging PMS bloating as real and common." },
            { "time": "00:40", "title": "Understanding PMS Bloating", "description": "Breaking down why PMS bloating occurs and its impact." },
            { "time": "01:30", "title": "The PMS Bloat Trifecta Explained", "description": "Progesterone, water retention, and inflammation working together." },
            { "time": "02:30", "title": "Food & Gentle Movement Strategies", "description": "Nutrition and exercise tips to ease PMS discomfort." },
            { "time": "03:40", "title": "Emergency Comfort Toolkit", "description": "Heat, breathing, tea, and gentle poses for immediate relief." },
            { "time": "04:20", "title": "Mindset Shift: Redefining Strength", "description": "Encouragement to practice self-compassion during PMS." },
            { "time": "04:50", "title": "Closing Mantra: Gentle is Enough", "description": "A reminder that gentleness is a strength, not a weakness." }
        ],
        resources: [
            { name: "Luteal Phase Comfort Guide", size: "0.5 MB", href: "/pdf/workshop-replay/Luteal Phase Comfort Guide.pdf", downloadName: "YourFitNature-Luteal-Phase-Comfort-Guide.pdf", description: "A guide to help you through the luteal phase." },
            { name: "PMS Symptom Tracker & Relief Log", size: "0.2 MB", href: "/pdf/workshop-replay/PMS Symptom Tracker & Relief Log.pdf", downloadName: "YourFitNature-PMS-Symptom-Tracker-&-Relief-Log.pdf", description: "Track your PMS symptoms and find relief." },
            { name: "Session Slides", size: "5.5 MB", href: "/pdf/workshop-replay/luteal-slides.pdf", downloadName: "YourFitNature-Luteal-Phase-Slides.pdf", description: "The complete slide deck from the workshop session." },
        ],
        affiliateProducts: workshopTestimonials[2].featuredProductIds?.map(id => getAffiliateProductById(id)).filter(p => p) || [],
    },
    menstrual: {
        phase: "Menstrual Phase",
        date: "September 16, 2025",
        videoUrl:"/video/workshop-replay/Menstrual_Phase__Rest_&_Renewal.mp4",
        audioUrl: "/audio/workshop-replay/The_Menstrual_Phase__Unpacking_the_Sacred_Pause_and_Embracing_Your_Body_s_Wisdom.m4a",
        audioDownloadName: "YourFitNature-Menstrual-Phase-Audio.m4a",
        videoChapters: [
            { "time": "00:00", "title": "Introduction: Rest & Renewal Mindset", "description": "Reframing the period as a time for healing and renewal." },
            { "time": "00:40", "title": "The Period Problem: Culture vs. Biology", "description": "Exploring societal pressure to ignore menstrual needs." },
            { "time": "01:20", "title": "Biology of Rest & Menstrual Phase Benefits", "description": "How low hormone states support intuition and clarity." },
            { "time": "02:30", "title": "Period Bloating Explained (Prostaglandins)", "description": "Why prostaglandins cause bloating and cramping." },
            { "time": "03:20", "title": "Food & Movement Comfort Toolkit", "description": "Nourishing foods and restorative exercises for support." },
            { "time": "04:20", "title": "The Sacred Pause Protocol", "description": "A ritual for intentional rest with warmth and comfort." },
            { "time": "05:10", "title": "Mindset Shift & Cycle Confidence", "description": "Shifting from fighting your body to honoring it." },
            { "time": "05:40", "title": "Closing Reflection & Final Question", "description": "Encouraging reflection on redirecting energy toward body alignment." }
        ],
        resources: [
            { name: "Complete Cycle Reference Guide", size: "0.3 MB", href: "/pdf/workshop-replay/Complete Cycle Reference Guide.pdf", downloadName: "YourFitNature-Complete-Cycle-Reference-Guide.pdf", description: "A comprehensive guide to your entire cycle." },
            { name: "Emergency Comfort Protocol Cards", size: "0.2 MB", href: "/pdf/workshop-replay/Emergency Comfort Protocol Cards.pdf", downloadName: "YourFitNature-Emergency-Comfort-Protocol-Cards.pdf", description: "Quick reference cards for comfort during your period." },
            { name: "Comprehensive Tracking & Reflection Workbook", size: "0.4 MB", href: "/pdf/workshop-replay/Comprehensive Tracking & Reflection Workbook.pdf", downloadName: "YourFitNature-Comprehensive-Tracking-&-Reflection-Workbook.pdf", description: "A workbook for tracking and reflecting on your cycle." },
            { name: "Session Slides", size: "3.6 MB", href: "/pdf/workshop-replay/menstrual_session_slides.pdf", downloadName: "YourFitNature-Menstrual-Phase-Slides.pdf", description: "The complete slide deck from the workshop session." },
        ],
        affiliateProducts: workshopTestimonials[3].featuredProductIds?.map(id => getAffiliateProductById(id)).filter(p => p) || [],
    },
};

export const getReplayDataByPhase = (phase: string) => {
    return replayData[phase as keyof typeof replayData];
}