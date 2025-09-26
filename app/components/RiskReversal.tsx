'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, HeartHandshake, Download, LucideIcon } from 'lucide-react';

const guarantees: { icon: LucideIcon, text: string }[] = [
    {
        icon: ShieldCheck,
        text: "100% Privacy Guaranteed"
    },
    {
        icon: HeartHandshake,
        text: "No Sales Pressure, Education-First"
    },
    {
        icon: Download,
        text: "Always Free Access to Essentials"
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
    }
};

interface RiskReversalProps {
    title?: string;
}

const RiskReversal: React.FC<RiskReversalProps> = ({ title }) => {
    return (
        <section className="mt-20">
            {title && <h2 className="text-3xl font-bold text-center text-camber-text-primary mb-8">{title}</h2>}
            <div className="bg-camber-sage-light/20 border border-camber-sage-light/30 rounded-2xl p-8">
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                >
                    {guarantees.map((guarantee, index) => (
                        <motion.div 
                            key={index} 
                            className="flex flex-col items-center gap-3 p-4"
                            variants={itemVariants}
                        >
                            <guarantee.icon className="w-10 h-10 text-camber-sage-deep" />
                            <span className="font-semibold text-camber-text-primary text-lg">{guarantee.text}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

export default RiskReversal;
