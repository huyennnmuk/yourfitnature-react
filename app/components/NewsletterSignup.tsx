
"use client";
import React from 'react';
import { useState } from "react";
import { Toaster, toast } from "sonner";

const NewsletterSignup = ({ source }: { source: string }) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const promise = fetch("/api/newsletter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, source }),
    }).then(async (res) => {
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      return data;
    });

    toast.promise(promise, {
      loading: "Subscribing...",
      success: (data) => data.message,
      error: (err) => err.message,
    });

    promise.finally(() => {
      setIsSubmitting(false);
      setEmail("");
    });
  };

  const containerClasses = source === 'blog-sidebar' 
    ? "sticky top-1/2 -translate-y-1/2 hidden lg:block p-4 w-full max-w-md mx-auto" 
    : "p-4 w-full max-w-md mx-auto";

  return (
    <>
      <Toaster position="bottom-right" />
      <div className={containerClasses}>
        { (source === 'blog-sidebar' || source === 'product-sidebar' || source === 'related-blog-post-sidebar' || source === 'success-story-sidebar' || source === 'workshop-story-sidebar') && (
          <>
            <h3 className="text-xl font-bold mb-2 text-center">Stay Updated!</h3>
            <p className="text-gray-600 mb-4 text-center">
              Subscribe to our newsletter for the latest articles and updates.
            </p>
          </>
        )}
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-center w-full"
        >
        <div className="relative w-full">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full px-4 py-3 text-white bg-pink-500/20 border border-pink-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500/50 backdrop-blur-sm"
            aria-label="Email for newsletter"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="absolute inset-y-0 right-0 px-4 py-3 text-white bg-pink-500/50 border-t border-b border-r border-pink-500/30 rounded-r-lg hover:bg-pink-500/70 focus:outline-none focus:ring-2 focus:ring-pink-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </button>
        </div>
      </form>
      </div>
    </>
  );
};

export default NewsletterSignup;
