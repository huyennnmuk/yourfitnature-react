'use client'

import React, { useState } from 'react';
import { useSession, signIn } from "next-auth/react"
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import RoadmapDashboard from "@/app/components/RoadmapDashboard";
import Image from 'next/image';
import ReusableButton from '@/app/components/ReusableButton';
import FormField from '@/app/components/form/FormField';

export default function RoadmapPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSignInForm, setShowSignInForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError('Invalid email or password. Please try again.');
      setIsLoading(false);
    } else {
      router.refresh();
    }
  };

  if (session) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <RoadmapDashboard />
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-camber-background-muted">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl text-center">
        { !showSignInForm ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-center">
              <Image src="/svg/FlowchartSimplicity.svg" alt="Roadmap Icon" width={100} height={100} className="text-camber-sage-primary" />
            </div>
            <div className="space-y-2">
                <h1 className="typography-h1 text-camber-text-primary">Bloating Recovery Roadmap</h1>
                <p className="text-lg text-camber-text-secondary">
                Unlock your personalized path to a healthier gut. Please sign in to begin.
                </p>
            </div>
            <ReusableButton
              onClick={() => setShowSignInForm(true)}
              className="mt-6 px-6 py-3"
            >
              Sign In
            </ReusableButton>
          </motion.div>
        ) : (
            <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-6 text-left"
            >
            <h2 className="typography-h2 text-camber-text-primary text-left">Sign In</h2>
            <FormField
              id="email"
              name="email"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
            />
            <FormField
              id="password"
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="********"
              Icon={showPassword ? FiEyeOff : FiEye}
              onIconClick={() => setShowPassword(!showPassword)}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <ReusableButton
              type="submit"
              className=""
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </ReusableButton>
            <p className="text-sm text-camber-text-secondary">
              <button type="button" onClick={() => setShowSignInForm(false)} className="text-camber-sage-primary hover:underline">
              &larr; Back to welcome
              </button>
            </p>
            </motion.form>
        )}
      </div>
    </div>
  )
}