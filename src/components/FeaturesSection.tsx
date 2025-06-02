import { 
  SparklesIcon, 
  RocketLaunchIcon, 
  ChartBarIcon, 
  UserGroupIcon 
} from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Instant Personalization',
    description:
      'Generate highly personalized cold emails in seconds. Just describe your product and recipient, and our AI will craft compelling outreach that resonates.',
    icon: SparklesIcon,
  },
  {
    name: 'Pro-Level Targeting',
    description:
      'Take personalization to the next level with LinkedIn profile analysis. Our AI extracts key insights to create hyper-relevant emails that get responses.',
    icon: RocketLaunchIcon,
  },
  {
    name: 'Boost Reply Rates',
    description:
      'Our AI is trained on successful cold emails to maximize response rates. Get three variations of each email, each optimized for different engagement strategies.',
    icon: ChartBarIcon,
  },
  {
    name: 'Smart Templates',
    description:
      'Start with proven templates and customize them for your needs. Save your best-performing emails as templates for future campaigns.',
    icon: UserGroupIcon,
  },
]

const FeaturesSection = () => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-indigo-600">Features</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance">
            Write cold emails that actually work
          </p>
          <p className="mt-6 text-lg/8 text-gray-600">
            Our AI-powered platform helps you create personalized cold emails that get responses. 
            No more generic templates or guesswork - just effective outreach that converts.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base/7 font-semibold text-gray-900">
                  <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon aria-hidden="true" className="size-6 text-white" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base/7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

export default FeaturesSection 