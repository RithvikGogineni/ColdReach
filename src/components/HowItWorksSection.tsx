import React from 'react';
import { SparklesIcon } from '@heroicons/react/24/solid';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const Step = ({ number, title, description }: { number: number; title: string; description: string }) => (
  <div className="relative group">
    {/* Step number circle */}
    <div className="absolute -left-4 top-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-semibold shadow-lg group-hover:scale-110 transition-transform duration-200">
      {number}
    </div>
    
    <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-200 border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  </div>
);

const HowItWorksSection = () => {
  const steps = [
    {
      number: 1,
      title: "Describe your product",
      description: "Tell us about your product or service and what makes it unique. Our AI will use this to craft compelling value propositions."
    },
    {
      number: 2,
      title: "Describe your recipient",
      description: "Provide details about your target recipient or their company. The more context you give, the better we can personalize."
    },
    {
      number: 3,
      title: "Get 3 ready-to-send emails",
      description: "Receive three personalized email variations ready to send. Each version is optimized for maximum response rates."
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600">
            Generate personalized cold emails in three simple steps
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 relative">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <Step
                number={step.number}
                title={step.title}
                description={step.description}
              />
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <ArrowRightIcon className="h-6 w-6 text-gray-400" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Pro Feature Highlight */}
        <div className="mt-12 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-8 border border-indigo-100 shadow-lg hover:shadow-xl transition-shadow duration-200">
          <div className="flex items-center gap-3 mb-4">
            <SparklesIcon className="h-6 w-6 text-indigo-600" />
            <span className="text-sm font-semibold text-indigo-600">Pro Feature</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Supercharge Your Personalization
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Add a LinkedIn profile URL to get even more personalized emails. Our AI will analyze their profile, 
            experience, and interests to create highly targeted outreach that resonates with your recipient.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection; 