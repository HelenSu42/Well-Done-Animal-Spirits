
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/layout/Layout';
import StripePayment from '@/components/payments/StripePayment';

const Pricing = () => {
  const plans = [
    {
      name: 'Base',
      tagline: 'Essential Fed indicators for personal traders',
      price: 49,
      billing: 'monthly',
      features: [
        'Real-time FOMC transcript access',
        'Basic sentiment analysis',
        'Email alerts',
        '5,000 API calls/month',
        'Historical data (2 years)',
        'Community support'
      ],
      highlighted: false,
      cta: 'Start Free Trial'
    },
    {
      name: 'Plus',
      tagline: 'Full historical database and text analytics for quant teams',
      price: 249,
      billing: 'monthly',
      annualPrice: 2988,
      features: [
        'Everything in Base',
        'Full 20-year historical database',
        'Advanced multimodal sentiment',
        'SMS + Slack alerts',
        '250,000 API calls/month',
        'Portfolio optimization tools',
        'Priority email support',
        'Academic discount available (50% off)'
      ],
      highlighted: true,
      cta: 'Start Plus Trial'
    },
    {
      name: 'Premium',
      tagline: 'Real-time multimodal AI and API firehose for institutions',
      price: 999,
      billing: 'monthly',
      annualPrice: 9999,
      features: [
        'Everything in Plus',
        'Real-time video/audio analysis',
        'Custom model training',
        'WebSocket feeds',
        'Unlimited API calls',
        'White-label solutions',
        'Dedicated account manager',
        '24/7 phone support',
        'SLA guarantees'
      ],
      highlighted: false,
      cta: 'Contact Sales'
    }
  ];

  const faqs = [
    {
      question: 'Can I cancel anytime?',
      answer: 'Yes, plans are month-to-month with no long-term commitments.'
    },
    {
      question: 'Do you offer academic discounts?',
      answer: '50% off Plus plan for verified academic institutions. Email proof of enrollment/employment.'
    },
    {
      question: 'What happens if I exceed my API quota?',
      answer: 'Overage billed at $0.0008 per call or upgrade anytime to a higher tier.'
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes, all plans include a 14-day free trial with full access to features.'
    }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Choose Your Plan</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Transparent pricing for every type of trader and institution. All plans include core Fed analysis capabilities.
          </p>
        </div>

        {/* Stripe Payment Section */}
        <div className="mb-16">
          <StripePayment />
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative ${plan.highlighted ? 'border-blue-500 shadow-lg scale-105' : 'border-slate-200'}`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white px-4 py-1">Most Popular</Badge>
                </div>
              )}
              
              <CardHeader className={`text-center ${plan.highlighted ? 'bg-gradient-to-br from-blue-50 to-indigo-50' : ''}`}>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <p className="text-slate-600 text-sm mt-2">{plan.tagline}</p>
                
                <div className="mt-6">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-slate-600 ml-2">/{plan.billing}</span>
                  </div>
                  {plan.annualPrice && (
                    <p className="text-sm text-green-600 mt-2">
                      ${plan.annualPrice}/year (save ${(plan.price * 12) - plan.annualPrice})
                    </p>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm">
                      <span className="text-green-500 mr-3">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${plan.highlighted ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                  variant={plan.highlighted ? 'default' : 'outline'}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h4 className="font-semibold text-slate-900 mb-3">{faq.question}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <Card className="bg-gradient-to-r from-slate-900 to-blue-900 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Need a Custom Solution?</h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              We work with hedge funds, asset managers, and institutions to create tailored analytics solutions. 
              Contact our team to discuss volume pricing and custom integrations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900">
                Schedule Demo Call
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Contact Enterprise Sales
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Pricing;
