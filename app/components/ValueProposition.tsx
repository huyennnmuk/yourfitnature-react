
'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, CalendarDays, EyeOff, ShieldCheck, RadioTower, HeartHandshake, FileText } from 'lucide-react';

interface Benefit {
    icon: LucideIcon;
    title: string;
    description: string;
}

const defaultBenefits: Benefit[] = [
    {
        icon: CalendarDays,
        title: "Cycle-by-Cycle Guidance",
        description: "Never one-size-fits-all. Get strategies tailored to your unique hormonal phase."
    },
    {
        icon: EyeOff,
        title: "100% Camera-Free",
        description: "Slides, captions, and audio only. Learn comfortably and anonymously."
    },
    {
        icon: ShieldCheck,
        title: "Real-World Fixes",
        description: "Practical, sustainable solutions, not just another pill to take."
    },
    {
        icon: RadioTower,
        title: "Flexible & On-Demand",
        description: "Join the live session or watch the replay anytime that works for you."
    },
    {
        icon: HeartHandshake,
        title: "Full Privacy Protection",
        description: "Your data is never shared. Participate anonymously, always."
    },
    {
        icon: FileText,
        title: "Honest Affiliate Policy",
        description: "We only recommend what we trust. Our affiliate model is clear and ethical."
    }
];

interface ValuePropositionProps {
    title?: string;
    benefits?: Benefit[];
    gridClassName?: string;
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5
        }
    }
};

const ValueProposition: React.FC<ValuePropositionProps> = ({ title = "Why This Workshop Works", benefits = defaultBenefits, gridClassName }) => {
    const gridClasses = gridClassName || "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8";
    return (
        <section>
            <h2 className="typography-h1 text-grey text-pretty text-center mb-12">{title}</h2>
            <motion.div 
                className={gridClasses}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                {benefits.map((benefit, index) => (
                    <motion.div 
                        key={index}
                        className="bg-[#f5f5f580] p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col text-center items-center"
                        variants={itemVariants}
                    >
                        <div className="w-16 h-16 rounded-full bg-camber-background-medium flex items-center justify-center mb-5">
                            <benefit.icon className="w-8 h-8 text-perplexity-primary" />
                        </div>
                        <h3 className="mb-2 text-xl font-bold text-grey text-pretty">{benefit.title}</h3>
                        <p className="text-camber-text-secondary flex-grow">{benefit.description}</p>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}

export default ValueProposition;