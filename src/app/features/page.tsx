"use client";
import React, { useRef, useLayoutEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CheckCircleIcon, SparklesIcon, BoltIcon, UserGroupIcon, Cog6ToothIcon } from '@heroicons/react/24/solid';

const featureList = [
  // Personalization
  {
    category: "Personalization",
    icon: UserGroupIcon,
    title: "AI-Powered Personalization",
    description: "Generate emails tailored to your recipient using advanced AI models.",
  },
  {
    category: "Personalization",
    icon: UserGroupIcon,
    title: "LinkedIn & Company Data (Pro)",
    description: "Enrich emails with real-time data from LinkedIn and company websites.",
  },
  {
    category: "Personalization",
    icon: UserGroupIcon,
    title: "Dynamic Placeholders",
    description: "Auto-insert names, roles, and company info for every recipient.",
  },
  // Productivity
  {
    category: "Productivity",
    icon: BoltIcon,
    title: "1-Click Email Generation",
    description: "Get 3 ready-to-send drafts instantly for every campaign.",
  },
  {
    category: "Productivity",
    icon: BoltIcon,
    title: "Follow-up Sequence Generator (Pro)",
    description: "Create multi-step follow-up sequences in seconds.",
  },
  {
    category: "Productivity",
    icon: BoltIcon,
    title: "Template Library",
    description: "Save and reuse your best-performing email templates.",
  },
  // Quality & Deliverability
  {
    category: "Quality & Deliverability",
    icon: SparklesIcon,
    title: "Spam Score Checker",
    description: "Ensure your emails land in the inbox, not spam.",
  },
  {
    category: "Quality & Deliverability",
    icon: SparklesIcon,
    title: "Tone & Style Options",
    description: "Choose from friendly, professional, or custom tones.",
  },
  {
    category: "Quality & Deliverability",
    icon: SparklesIcon,
    title: "A/B Testing",
    description: "Test different email versions to maximize replies.",
  },
  // Integrations
  {
    category: "Integrations",
    icon: Cog6ToothIcon,
    title: "CRM Integrations",
    description: "Connect with HubSpot, Salesforce, and more (coming soon).",
  },
  {
    category: "Integrations",
    icon: Cog6ToothIcon,
    title: "Zapier Support",
    description: "Automate workflows with 5,000+ apps via Zapier.",
  },
  {
    category: "Integrations",
    icon: Cog6ToothIcon,
    title: "API Access (Pro)",
    description: "Integrate ColdReach AI into your own tools and workflows.",
  },
];

export default function FeaturesPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [windowW, setWindowW] = useState(0);

  // Calculate the width of the horizontal scroll area
  const cardWidth = 320; // px
  const gap = 32; // px
  const totalCards = featureList.length;
  const totalWidth = totalCards * cardWidth + (totalCards - 1) * gap;

  useLayoutEffect(() => {
    setWindowW(window.innerWidth);
    setContainerWidth(totalWidth);
  }, [totalWidth]);

  // Framer Motion scroll hook
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // Slow down the scroll: increase the vertical scroll distance
  const verticalScrollLength = totalWidth + windowW * 1.5; // More vertical space for slower scroll
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -(totalWidth - windowW + 64)]
  );

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center pt-24 pb-16">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 mb-4 text-center">Features</h1>
        <p className="text-lg sm:text-xl text-gray-600 text-center max-w-2xl">
          Everything you need to generate high-converting, personalized cold emails—fast.
        </p>
      </section>
      {/* Spacer before */}
      <div style={{ height: `30vh` }} />
      <section
        ref={sectionRef}
        className="relative h-[120vh] flex items-center justify-center overflow-hidden"
        style={{ position: "sticky", top: 0, background: "linear-gradient(to bottom right, #eff6ff, #c7d2fe)" }}
      >
        <motion.div
          style={{ x }}
          className="flex gap-8 px-8"
        >
          {featureList.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="flex-shrink-0 w-80 bg-white rounded-2xl shadow-xl p-7 flex flex-col gap-3 border border-indigo-100 hover:shadow-2xl transition-shadow duration-200"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, type: 'spring' }}
              whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 rgba(99,102,241,0.15)' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <feature.icon className="h-6 w-6 text-indigo-500" />
                <span className="text-lg font-bold text-gray-900">{feature.title}</span>
              </div>
              <p className="text-gray-600 text-base">{feature.description}</p>
              <span className="text-xs text-indigo-400 font-semibold mt-2">{feature.category}</span>
            </motion.div>
          ))}
        </motion.div>
        {/* Gradient overlays for visual polish */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-blue-50 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-blue-50 to-transparent z-10" />
      </section>
      {/* Spacer after */}
      <div style={{ height: `60vh` }} />
    </div>
  );
} 