"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import ReusableButton from './ReusableButton';
import { CheckCircle, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const accordionItems = [
  {
    title: "Phase-by-Phase Plan",
    content: "Learn what to eat and how to train during each phase of your menstrual cycle."
  },
  {
    title: "Hormone-Balancing Strategies",
    content: "Discover lifestyle hacks and nutrition tips to support hormonal harmony."
  },
  {
    title: "Live Q&A",
    content: "Get your personal questions answered by our women's health experts."
  }
];

const WorkshopCTA = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="py-20 px-4">
      <div className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-left">
          <span className="text-sm font-bold uppercase text-camber-sage-primary tracking-widest">Expert-Led Workshop</span>
          <h2 className="typography-h2 text-grey text-pretty mt-4">Unlock the Secrets of Your Cycle: The Bloating & Hormones Workshop</h2>
          <p className="typography-body text-soil mt-4 max-w-xl mx-auto md:mx-0">
            Tired of monthly bloating and unpredictable symptoms? This workshop connects the dots between your hormones and your gut health, giving you the power to reclaim control.
          </p>
          <div className="mt-6 space-y-3 text-left">
            {accordionItems.map((item, index) => (
              <div key={index} className="border-b border-gray-200 last:border-b-0">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="flex justify-between items-center w-full p-4 text-left"
                >
                  <div className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-perplexity-primary mr-4 flex-shrink-0" />
                    <span className="">{item.title}</span>
                  </div>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 pt-0 pl-14">
                        <p>{item.content}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <ReusableButton as="a" href="/workshop/bloating-hormones" className="!bg-perplexity-primary !text-white !px-10 !py-4">
                Register Now & Save Your Spot
            </ReusableButton>
          </div>
        </div>
        <div className="relative w-full h-80 md:h-full min-h-[300px] rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1510034141778-a4d065653d92?q=80&w=2070&auto=format&fit=crop"
            alt="Statue of person doing meditation, representing hormonal balance and wellness"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <p className="font-bold text-lg">Live Workshop + Recording</p>
            <p className="text-sm">Next Session: September 15th, 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkshopCTA;