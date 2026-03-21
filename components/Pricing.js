import React from 'react';

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for trying out the platform.',
    features: ['1 Active Quiz', 'Up to 100 Responses/mo', 'Basic Analytics', 'Community Support'],
    cta: 'Get Started',
    popular: false
  },
  {
    name: 'Starter',
    price: '$29',
    period: '/mo',
    description: 'Great for independent creators.',
    features: ['5 Active Quizzes', 'Up to 1k Responses/mo', 'Email Integrations', 'Basic Customization'],
    cta: 'Start 14-Day Trial',
    popular: false
  },
  {
    name: 'Growth',
    price: '$79',
    period: '/mo',
    description: 'For growing businesses and agencies.',
    features: ['Unlimited Quizzes', 'Up to 10k Responses/mo', 'Advanced Analytics', 'Remove Branding', 'Priority Support'],
    cta: 'Start 14-Day Trial',
    popular: true
  },
  {
    name: 'Agency',
    price: '$199',
    period: '/mo',
    description: 'For high-volume marketing teams.',
    features: ['Unlimited Everything', 'Custom Domains', 'Team Collaboration', 'Dedicated Success Manager'],
    cta: 'Contact Sales',
    popular: false
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-primary-600 font-semibold tracking-wide uppercase text-sm">Pricing</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Plans that scale with your growth
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Choose the right plan for your business needs. Upgrade or downgrade at any time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className={`glass-card relative flex flex-col p-8 transition-transform duration-300 hover:-translate-y-2 ${plan.popular ? 'border-primary-500 shadow-xl scale-105' : 'border-white/60'}`}>
              {plan.popular && (
                <div className="absolute top-0 inset-x-0 transform -translate-y-1/2 flex justify-center">
                  <span className="bg-gradient-to-r from-primary-600 to-indigo-600 text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full shadow-sm">
                    Most Popular
                  </span>
                  {/*aumentar icones*/}
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-sm text-gray-500 h-10">{plan.description}</p>
              </div>
              <div className="mb-6 flex items-baseline">
                <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                {plan.period && <span className="text-xl text-gray-500 font-medium">{plan.period}</span>}
              </div>

              <ul className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 px-4 rounded-lg font-semibold text-sm transition-all shadow-sm ${plan.popular
                ? 'bg-primary-600 hover:bg-primary-700 text-white hover:shadow-md'
                : 'bg-white/80 hover:bg-gray-50 text-gray-900 border border-gray-200'
                }`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
