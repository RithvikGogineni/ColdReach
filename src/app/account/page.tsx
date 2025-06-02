"use client";
import { useAuth } from '../../lib/useAuth';
import { usePlan } from '../../lib/usePlan';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

export default function AccountPage() {
  const { user, loading: authLoading } = useAuth();
  const { plan, loading: planLoading } = usePlan();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/login');
    }
  }, [user, authLoading, router]);

  if (authLoading || planLoading || !user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const initial = user.displayName ? user.displayName[0] : (user.email ? user.email[0] : '?');

  const getPlanFeatures = () => {
    if (plan === 'pro') {
      return [
        'Advanced personalization (LinkedIn/company data)',
        'Unlimited email drafts',
        'Email templates',
        'Priority support',
        'Follow-up sequence generator',
      ];
    } else if (plan === 'starter') {
      return [
        'Basic personalization',
        'Unlimited email drafts',
        'Email templates',
        'Standard support',
      ];
    }
    return [];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md flex flex-col items-center"
      >
        <div className="mb-6 flex flex-col items-center">
          {user.photoURL ? (
            <img src={user.photoURL} alt="avatar" className="h-20 w-20 rounded-full object-cover border border-gray-300 mb-2" />
          ) : (
            <div className="h-20 w-20 rounded-full bg-indigo-100 flex items-center justify-center text-3xl font-bold text-indigo-700 mb-2">
              {initial}
            </div>
          )}
          <div className="text-xl font-bold text-gray-900">{user.displayName || 'No name set'}</div>
          <div className="text-gray-500 text-sm">{user.email || 'No email'}</div>
        </div>
        <div className="w-full mb-6">
          <div className="text-sm text-gray-700 font-semibold mb-1">Current Plan</div>
          <div className="bg-gray-100 rounded-lg px-4 py-2 text-gray-800 font-medium">
            {plan ? plan.charAt(0).toUpperCase() + plan.slice(1) : 'No plan selected'}
          </div>
          {plan && (
            <div className="mt-4 space-y-2">
              {getPlanFeatures().map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircleIcon className="h-4 w-4 text-green-500" />
                  {feature}
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={() => router.push('/pricing')}
          className="w-full mt-2 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
        >
          {plan ? 'Change Plan' : 'Choose a Plan'}
        </button>
        <div className="w-full mt-8">
          <div className="text-sm text-gray-700 font-semibold mb-1">Change Password</div>
          <button
            onClick={() => router.push('/reset-password')}
            className="w-full py-2 rounded-lg bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition-colors mb-2"
          >
            Reset Password
          </button>
          <div className="text-xs text-gray-500 mt-2">
            To change your email, please contact support.
          </div>
        </div>
      </motion.div>
    </div>
  );
} 