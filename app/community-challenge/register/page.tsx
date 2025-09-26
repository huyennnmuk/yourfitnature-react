'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import FormField from '@/app/components/form/FormField';
import ReusableButton from '@/app/components/ReusableButton';
import { communityChallengeSliderData } from '@/lib/communityChallengeSliderData';

export default function RegisterChallengePage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [challenge, setChallenge] = useState(communityChallengeSliderData[0]?.title || '');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!name || !email || !challenge) {
      setError('Please fill out all fields.');
      setIsLoading(false);
      return;
    }

    const [firstName, ...lastNameParts] = name.split(' ');
    const lastName = lastNameParts.join(' ');

    try {
      const response = await fetch('/api/community-challenge/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, firstName, lastName, challenge }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        const data = await response.json();
        setError(data.error || 'An error occurred during registration.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('An error occurred during registration.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-camber-background-muted">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-2xl shadow-xl">
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="typography-h1 text-camber-text-primary">Thank You!</h1>
            <p className="text-lg text-camber-text-secondary mt-2">
              You&apos;ve successfully registered for the &quot;{challenge}&quot; challenge. Check your email for more details!
            </p>
            <div className="mt-6">
              <ReusableButton
                onClick={() => router.push('/community-challenge')}
              >
                Explore More Challenges
              </ReusableButton>
            </div>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="text-center">
                <h1 className="typography-h1 text-camber-text-primary">Join a Challenge</h1>
                <p className="text-lg text-camber-text-secondary">
                    Take the next step in your gut health journey.
                </p>
            </div>
            <FormField
              id="name"
              name="name"
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Jane Doe"
            />
            <FormField
              id="email"
              name="email"
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
            <div>
              <label htmlFor="challenge" className="block text-sm font-medium text-camber-text-secondary mb-1">
                Select a Challenge <span className="text-red-500">*</span>
              </label>
              <select
                id="challenge"
                name="challenge"
                value={challenge}
                onChange={(e) => setChallenge(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg text-base h-12 border-camber-background-muted"
                required
              >
                {communityChallengeSliderData.map((item) => (
                  <option key={item.title} value={item.title}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <ReusableButton
              type="submit"
              className="w-full mt-6 px-6 py-3"
              disabled={isLoading}
            >
              {isLoading ? 'Registering...' : 'Join Now'}
            </ReusableButton>
            <div className="text-center mt-4">
              <Link href="/community-challenge" className="text-sm text-camber-sage-primary hover:underline">
                &larr; Back to Challenges
              </Link>
            </div>
          </motion.form>
        )}
      </div>
    </div>
  );
}
