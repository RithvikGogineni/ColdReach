"use client";
import React, { useState } from 'react';
import { ChevronDownIcon, StarIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useRequireAuth } from '../../lib/useAuth';
import { usePlan } from '../../lib/usePlan';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const GeneratePage = () => {
  const { user, loading: authLoading } = useRequireAuth();
  const { plan, loading: planLoading } = usePlan();
  const [showProFeatures, setShowProFeatures] = useState(false);

  if (authLoading || planLoading || !user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const handleProFeatureClick = () => {
    if (plan !== 'pro') {
      toast.error('This is a Pro feature. Please upgrade to use it.');
      setShowProFeatures(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 sm:p-12 mx-2"
      >
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2 text-center">Generate a Cold Email</h1>
        <p className="text-gray-500 text-center mb-8">Fill in the details below to get 3 AI-powered cold email drafts tailored to your needs.</p>
        <form>
          <div className="space-y-8">
            <div>
              <label htmlFor="product" className="block text-sm font-medium text-gray-900 mb-1">
                Product Description
              </label>
              <textarea
                id="product"
                name="product"
                rows={3}
                className="block w-full rounded-lg border border-gray-200 py-2 px-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition"
                placeholder={'Describe your product or service...'}
              />
              <p className="text-xs text-gray-400 mt-1">E.g., &quot;AI tool for automating cold outreach&quot;</p>
            </div>
            <div>
              <label htmlFor="recipient" className="block text-sm font-medium text-gray-900 mb-1">
                Recipient Information
              </label>
              <textarea
                id="recipient"
                name="recipient"
                rows={3}
                className="block w-full rounded-lg border border-gray-200 py-2 px-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition"
                placeholder={'Describe your target recipient...'}
              />
              <p className="text-xs text-gray-400 mt-1">E.g., &quot;Sales manager at a SaaS company&quot;</p>
            </div>
          </div>

          <div className="my-10">
            <div className="flex items-center justify-center">
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowProFeatures(!showProFeatures)}
                className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700 shadow hover:bg-indigo-100 border border-indigo-100 transition"
              >
                <StarIcon className="h-5 w-5 text-yellow-400" /> Pro Features
                <ChevronDownIcon className={`h-4 w-4 transition-transform ${showProFeatures ? 'rotate-180' : ''}`} />
              </motion.button>
            </div>
            <AnimatePresence>
              {showProFeatures && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-6 bg-indigo-50 rounded-xl p-6 border border-indigo-100">
                    <div>
                      <label htmlFor="linkedin" className="block text-sm font-medium text-gray-900 mb-1">
                        LinkedIn Profile URL
                      </label>
                      <input
                        type="url"
                        id="linkedin"
                        name="linkedin"
                        onClick={handleProFeatureClick}
                        disabled={plan !== 'pro'}
                        className="block w-full rounded-md border border-gray-200 py-2 px-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:text-gray-500 sm:text-sm transition"
                        placeholder="https://linkedin.com/in/..."
                      />
                      <p className="text-xs text-gray-400 mt-1">Pro: Personalize with recipient&apos;s LinkedIn data</p>
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-900 mb-1">
                        Company Website
                      </label>
                      <input
                        type="url"
                        id="company"
                        name="company"
                        onClick={handleProFeatureClick}
                        disabled={plan !== 'pro'}
                        className="block w-full rounded-md border border-gray-200 py-2 px-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:text-gray-500 sm:text-sm transition"
                        placeholder="https://company.com"
                      />
                      <p className="text-xs text-gray-400 mt-1">Pro: Enrich with company insights</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {plan !== 'pro' && (
              <div className="mt-8 rounded-lg bg-indigo-50 p-4 border border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-indigo-700">
                  <svg className="h-5 w-5 text-indigo-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
                  </svg>
                  <span>Upgrade to Pro to unlock advanced personalization features and boost your reply rates.</span>
                </div>
                <Link href="/pricing" className="whitespace-nowrap font-medium text-indigo-700 hover:text-indigo-600 text-sm">
                  View pricing <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            )}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-end gap-4">
            <Link
              href="/"
              className="w-full sm:w-auto text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600 px-6 py-3 rounded-lg bg-gray-100"
            >
              Cancel
            </Link>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto rounded-lg bg-indigo-600 px-8 py-3 text-base font-bold text-white shadow-lg hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition disabled:opacity-60"
            >
              Generate Emails
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default GeneratePage; 