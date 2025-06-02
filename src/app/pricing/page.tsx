'use client';
import React, { useState } from 'react';
import { CheckCircleIcon, StarIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../../lib/useAuth';
import { usePlan } from '../../lib/usePlan';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const plans = [
  {
    name: 'Free',
    price: 0,
    description: 'Try ColdReach AI for free. 1 email per week, basic features.',
    features: [
      'Basic personalization',
      '1 email per week',
      'No credit card required',
    ],
    cta: 'Start for Free',
    free: true,
  },
  {
    name: 'Starter',
    price: 15,
    description: 'Everything you need to get started with AI-powered cold outreach.',
    features: [
      'Basic personalization',
      'Unlimited email drafts',
      'Email templates',
      'Standard support',
    ],
    cta: 'Choose Starter',
    dark: true,
  },
  {
    name: 'Pro',
    price: 30,
    description: 'Unlock advanced personalization and automation for serious senders.',
    features: [
      'Advanced personalization (LinkedIn/company data)',
      'Unlimited email drafts',
      'Email templates',
      'Priority support',
      'Follow-up sequence generator',
    ],
    cta: 'Choose Pro',
    featured: true,
  },
];

const features = [
  {
    name: 'Basic personalization',
    starter: true,
    pro: true,
  },
  {
    name: 'Advanced personalization (LinkedIn/company data)',
    starter: false,
    pro: true,
  },
  {
    name: 'Unlimited email drafts',
    starter: true,
    pro: true,
  },
  {
    name: 'Email templates',
    starter: true,
    pro: true,
  },
  {
    name: 'Follow-up sequence generator',
    starter: false,
    pro: true,
  },
  {
    name: 'Support',
    starter: 'Standard',
    pro: 'Priority',
  },
];

const faqs = [
  {
    q: "What's included in each plan?",
    a: 'Starter gives you all the basics for cold outreach. Pro unlocks advanced personalization, automation, and priority support.'
  },
  {
    q: 'Can I change my plan later?',
    a: 'Absolutely! You can upgrade or downgrade your plan at any time from your account dashboard.'
  },
  {
    q: 'Do you offer a free trial?',
    a: 'Yes, you can try ColdReach AI for free with limited features before choosing a paid plan.'
  },
  {
    q: 'How does billing work?',
    a: 'You can choose between monthly or annual billing. Annual plans come with a discount and are billed upfront.'
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit cards. For enterprise plans, contact us for invoicing options.'
  },
];

const annuals = [
  {
    name: 'Starter',
    monthly: 15,
    annual: 180,
    discount: 0.2,
    final: 144,
    discountLabel: '20% off',
  },
  {
    name: 'Pro',
    monthly: 30,
    annual: 360,
    discount: 0.25,
    final: 270,
    discountLabel: '25% off',
  },
];

const PricingPage = () => {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('annual');
  const { user } = useAuth();
  const { plan, upgradePlan } = usePlan();
  const router = useRouter();

  const handlePlanSelect = async (planName: 'Starter' | 'Pro' | 'Free') => {
    if (!user) {
      toast.error('Please sign in to select a plan');
      router.push('/login');
      return;
    }

    try {
      await upgradePlan(planName.toLowerCase() as 'starter' | 'pro' | 'free');
      toast.success(`Successfully upgraded to ${planName} plan!`);
      router.push('/generate');
    } catch (error) {
      toast.error('Failed to upgrade plan. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Hero + Pricing Section */}
      <section className="w-full bg-gradient-to-br from-[#181C2A] via-[#0f111c] to-[#181C2A] py-24 px-2 relative overflow-hidden">
        {/* Purple glow behind featured card */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-600 opacity-30 blur-3xl rounded-full z-0" />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-14">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-white">Pricing that grows with you</h1>
            <p className="text-lg text-gray-300 mb-8">
              Choose a plan designed to help you generate high-converting cold emails, boost reply rates, and save hours every week.
            </p>
            {/* Pill toggle */}
            <div className="inline-flex rounded-full bg-[#232946] p-1 mb-2">
              <button
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${billing === 'monthly' ? 'bg-white text-[#232946]' : 'text-white'}`}
                onClick={() => setBilling('monthly')}
              >
                Monthly
              </button>
              <button
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${billing === 'annual' ? 'bg-white text-[#232946]' : 'text-white'}`}
                onClick={() => setBilling('annual')}
              >
                Annually
              </button>
            </div>
          </div>
          {/* Pricing Cards Row */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-8 md:mt-0">
            {plans.map((planItem, idx) => {
              const annual = annuals.find(a => a.name === planItem.name);
              const isAnnual = billing === 'annual';
              const isCurrentPlan = plan === planItem.name.toLowerCase();
              return (
                <motion.div
                  key={planItem.name}
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5, type: 'spring' }}
                  className={`flex flex-col p-8 rounded-2xl transition-transform duration-200 ${planItem.featured
                    ? 'bg-white text-[#181C2A] shadow-2xl z-10 scale-105 border-0 relative'
                    : 'bg-[#232946] text-white shadow-xl'} ${planItem.featured ? 'shadow-2xl' : ''}`}
                  style={{
                    marginTop: planItem.featured ? '-40px' : '0',
                    boxShadow: planItem.featured ? '0 8px 32px 0 rgba(99,102,241,0.15)' : undefined,
                  }}
                >
                  {planItem.featured && (
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-5 py-1.5 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1"><StarIcon className="h-4 w-4 text-yellow-300 inline"/> Best Value</span>
                  )}
                  <h2 className="text-xl font-bold mb-2">{planItem.name}</h2>
                  <div className="flex flex-col items-start mb-2">
                    {isAnnual && annual ? (
                      <>
                        <div className="flex items-end gap-2">
                          <span className="text-4xl font-extrabold text-indigo-700">${annual.final}</span>
                          <span className="text-base text-gray-400 font-medium">USD/year</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="line-through text-gray-400 text-base">${annual.annual}</span>
                          <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full animate-pulse shadow">{annual.discountLabel}</span>
                          <span className="text-xs text-gray-500">Billed annually</span>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">Equivalent to <span className="font-semibold text-indigo-600">${(annual.final/12).toFixed(2)}/mo</span></div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-end gap-2">
                          <span className="text-4xl font-extrabold">${planItem.price}</span>
                          <span className="text-base text-gray-400 font-medium">USD/month</span>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">Billed monthly</div>
                      </>
                    )}
                  </div>
                  <div className="text-xs text-gray-400 mb-6">{planItem.description}</div>
                  <button 
                    onClick={() => handlePlanSelect(planItem.name as 'Starter' | 'Pro' | 'Free')}
                    className={`w-full py-3 rounded-lg font-semibold mb-6 ${
                      isCurrentPlan 
                        ? 'bg-gray-200 text-gray-600 cursor-not-allowed' 
                        : planItem.featured 
                          ? 'bg-[#4f46e5] text-white hover:bg-[#6366f1]' 
                          : 'bg-[#232946] text-white opacity-80 hover:opacity-100 border border-white/10'
                    }`}
                    disabled={isCurrentPlan}
                  >
                    {isCurrentPlan ? 'Current Plan' : planItem.cta}
                  </button>
                  <ul className="space-y-2 text-sm">
                    {planItem.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <CheckCircleIcon className={`h-4 w-4 ${planItem.featured ? 'text-[#4f46e5]' : 'text-blue-400'}`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      {/* Feature Comparison Table Section */}
      <section className="w-full bg-[#f8f9fb] py-24 px-2">
        <div className="w-full max-w-4xl mx-auto">
          <table className="min-w-full text-[#181C2A] bg-white rounded-2xl overflow-hidden shadow border border-gray-100">
            <thead>
              <tr>
                <th className="py-4 px-6 text-left text-lg font-bold bg-[#f8f9fb]">Features</th>
                <th className="py-4 px-6 text-center text-lg font-bold bg-[#f8f9fb]">Starter</th>
                <th className="py-4 px-6 text-center text-lg font-bold bg-[#f8f9fb]">Pro</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, idx) => (
                <tr key={feature.name} className={`border-t border-gray-100 ${idx % 2 === 1 ? 'bg-[#f4f5fa]' : ''}`}>
                  <td className="py-3 px-6 font-medium flex items-center gap-2">{feature.name}</td>
                  <td className="py-3 px-6 text-center">
                    {feature.starter === true && <CheckCircleIcon className="h-5 w-5 text-green-500 mx-auto" />}
                    {feature.starter === false && <span className="text-gray-300">—</span>}
                    {typeof feature.starter === 'string' && <span className="font-semibold text-[#4f46e5]">{feature.starter}</span>}
                  </td>
                  <td className="py-3 px-6 text-center">
                    {feature.pro === true && <CheckCircleIcon className="h-5 w-5 text-green-500 mx-auto" />}
                    {feature.pro === false && <span className="text-gray-300">—</span>}
                    {typeof feature.pro === 'string' && <span className="font-semibold text-[#4f46e5]">{feature.pro}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="w-full bg-white py-24 px-2">
        <div className="w-full max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Frequently asked questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className=""
              >
                <h3 className="font-semibold text-lg text-blue-700 mb-1 flex items-center gap-2"><StarIcon className="h-5 w-5 text-yellow-400" />{faq.q}</h3>
                <p className="text-gray-700 ml-7">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage; 