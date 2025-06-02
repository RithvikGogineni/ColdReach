"use client";

import React, { useState, useEffect, useRef } from 'react';

const testimonials = [
  {
    photo: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=400&h=500&facepad=2",
    name: "Sarah Johnson",
    title: "Sales Director, TechCorp",
    text: "ColdReach AI has transformed our outreach strategy. We've seen a 3x increase in response rates since we started using it."
  },
  {
    photo: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=400&h=500&facepad=2",
    name: "Michael Chen",
    title: "Founder, StartupX",
    text: "The personalization features are incredible. It feels like each email is written specifically for the recipient."
  },
  {
    photo: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=facearea&w=400&h=500&facepad=2",
    name: "Emily Rodriguez",
    title: "Marketing Manager, GrowthCo",
    text: "The time we save on email writing is remarkable. What used to take hours now takes minutes."
  }
];

const TestimonialCarousel = () => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchInProgress = useRef<boolean>(false);

  // Auto-advance every 6 seconds
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [current]);

  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);

  // Touch event handlers for two-finger swipe
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2) {
      touchStartX.current = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      touchStartY.current = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      touchInProgress.current = true;
    } else {
      touchInProgress.current = false;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!touchInProgress.current || e.changedTouches.length < 2) return;
    const endX = (e.changedTouches[0].clientX + e.changedTouches[1].clientX) / 2;
    const endY = (e.changedTouches[0].clientY + e.changedTouches[1].clientY) / 2;
    const dx = endX - (touchStartX.current ?? 0);
    const dy = endY - (touchStartY.current ?? 0);
    // Only trigger if horizontal swipe is significant and more than vertical
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) {
        next(); // Swipe left
      } else {
        prev(); // Swipe right
      }
    }
    touchInProgress.current = false;
  };

  const testimonial = testimonials[current];

  return (
    <div
      className="relative flex items-center justify-center max-w-4xl mx-auto select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Left Arrow (desktop only) */}
      <button
        className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-900 rounded-full p-2 shadow-md transition"
        onClick={prev}
        aria-label="Previous testimonial"
        type="button"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
      </button>
      {/* Card with image overlap */}
      <div className="relative flex w-full bg-white rounded-3xl shadow-xl min-h-[320px]">
        {/* Overlapping Image */}
        <div className="flex-shrink-0 z-10 -ml-8 -mt-8 mb-8">
          <img
            src={testimonial.photo}
            alt={testimonial.name}
            className="w-64 h-80 object-cover rounded-2xl shadow-2xl border-4 border-white bg-gray-200"
            style={{ boxShadow: '0 8px 32px 0 rgba(31, 41, 55, 0.15)' }}
          />
        </div>
        {/* Testimonial Content */}
        <div className="flex flex-col justify-center pl-0 md:pl-12 pr-8 py-12 flex-1 relative">
          {/* Quotation Outline SVG */}
          <svg
            className="absolute left-0 top-0 w-32 h-32 text-white/10 -z-0"
            fill="none"
            viewBox="0 0 120 120"
            aria-hidden="true"
          >
            <text x="0" y="100" fontSize="120" fontFamily="serif" fontWeight="bold" opacity="0.5">“</text>
          </svg>
          <div className="relative z-10">
            <p className="text-2xl font-medium text-gray-900 mb-8 leading-snug">
              {testimonial.text}
            </p>
            <div className="mt-4">
              <div className="font-semibold text-gray-900">{testimonial.name}</div>
              <div className="text-gray-500 text-base">{testimonial.title}</div>
            </div>
          </div>
        </div>
      </div>
      {/* Right Arrow (desktop only) */}
      <button
        className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-900 rounded-full p-2 shadow-md transition"
        onClick={next}
        aria-label="Next testimonial"
        type="button"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  );
};

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          What Our Users Say
        </h2>
        <TestimonialCarousel />
      </div>
    </section>
  );
};

export default TestimonialsSection; 