import React from 'react';
import { motion, Variants } from 'framer-motion';
import { CalendarCheck, VideoOff, Download, Sparkles } from 'lucide-react';

const steps = [
    {
        icon: CalendarCheck,
        title: "Choose Your Session",
        description: "Select the workshop for your current (or upcoming) cycle phase."
    },
    {
        icon: VideoOff,
        title: "Join Faceless",
        description: "Attend the live, camera-off workshop with just slides and audio."
    },
    {
        icon: Download,
        title: "Download Your Toolkit",
        description: "Get your phase-specific cheat sheet and workbook."
    },
    {
        icon: Sparkles,
        title: "Continue Your Journey",
        description: "Use our other free resources to keep making progress."
    }
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1,
        }
    }
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
        }
    }
};

const HowItWorks = () => {
    return (
        <section className="py-16 bg-white rounded-2xl shadow-lg">
            <h2 className="typography-h2 text-grey text-pretty text-center mb-16">How It Works</h2>
            <motion.div 
                className="relative grid grid-cols-1 md:grid-cols-4 gap-8 text-center px-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
            >
                {/* Dashed line for desktop */}
                <div className="hidden md:block absolute top-12 left-0 w-full h-px -translate-y-1/2">
                    <svg width="100%" height="2"><line x1="0" y1="1" x2="100%" y2="1" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="8 8"/></svg>
                </div>

                {steps.map((step, index) => (
                    <motion.div 
                        key={index}
                        className="relative flex flex-col items-center p-4"
                        variants={itemVariants}
                    >
                        <div className="relative w-24 h-24 rounded-full bg-camber-background-light text-perplexity-primary flex items-center justify-center mb-4 z-10 ring-8 ring-white">
                            <step.icon className="w-12 h-12" />
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-perplexity-primary text-white rounded-full flex items-center justify-center font-bold text-sm border-2 border-white">
                                {index + 1}
                            </div>
                        </div>
                        <h3 className="font-bold text-lg mb-2 text-camber-text-primary">{step.title}</h3>
                        <p className="text-camber-text-secondary text-sm">{step.description}</p>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}

export default HowItWorks;