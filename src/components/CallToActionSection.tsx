import React from 'react';
import Link from 'next/link';

const CallToActionSection = () => {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-6">
          Supercharge your cold outreach.<br />
          Start using ColdReach AI today.
        </h2>
        <p className="mt-4 text-xl text-gray-600 mb-10">
          Join thousands of professionals who are already using ColdReach AI to boost their reply rates and save hours every week.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/generate"
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-indigo-600 text-white font-semibold text-lg hover:bg-indigo-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Get started for free
          </Link>
          <a
            href="#"
            className="inline-flex items-center justify-center px-6 py-4 rounded-lg text-indigo-600 font-semibold text-lg hover:underline transition-colors duration-200"
          >
            Learn more <span className="ml-2">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection; 