
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/layout/Layout';

const Support = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    severity: 'Medium',
    description: '',
    email: ''
  });

  const supportTiers = [
    {
      plan: 'Base',
      channels: ['Email'],
      hours: 'Email-only',
      response: '24-48 hours',
      color: 'bg-slate-100 text-slate-800'
    },
    {
      plan: 'Plus',
      channels: ['Email', 'Live Chat'],
      hours: 'Mon–Fri 06:00–20:00 ET',
      response: '4-8 hours',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      plan: 'Premium',
      channels: ['Email', 'Live Chat', 'Phone'],
      hours: '24×7',
      response: '< 2 hours',
      color: 'bg-purple-100 text-purple-800'
    }
  ];

  const knowledgeBase = [
    {
      category: 'Getting Started',
      articles: [
        'Quick Start Guide: Setting up your first alerts',
        'Understanding Fed sentiment scores',
        'Configuring portfolio optimization',
        'API authentication and rate limits'
      ]
    },
    {
      category: 'API Documentation',
      articles: [
        'REST API reference and examples',
        'WebSocket feeds for real-time data',
        'Python SDK installation and usage',
        'Rate limiting and error handling'
      ]
    },
    {
      category: 'Troubleshooting',
      articles: [
        'Common connection issues and solutions',
        'Why am I not receiving alerts?',
        'Portfolio optimization not updating',
        'Historical data access problems'
      ]
    },
    {
      category: 'Account Management',
      articles: [
        'Upgrading or downgrading your plan',
        'Managing team members and permissions',
        'Billing and payment methods',
        'Canceling your subscription'
      ]
    }
  ];

  const faqs = [
    {
      question: 'How accurate are the sentiment scores?',
      answer: 'Our sentiment scores have a 73% accuracy rate for predicting market direction within 48 hours, based on backtesting over 12 years of Fed communications.'
    },
    {
      question: 'Can I integrate FedAnalysis with my existing trading system?',
      answer: 'Yes, we offer REST APIs, WebSocket feeds, and Python/R SDKs for easy integration with popular trading platforms and portfolio management systems.'
    },
    {
      question: 'What happens if I exceed my API quota?',
      answer: 'You\'ll receive warnings at 80% and 100% usage. After quota exceeded, additional calls are billed at $0.0008 per request, or you can upgrade your plan anytime.'
    },
    {
      question: 'Do you offer historical backtesting data?',
      answer: 'Plus and Premium plans include access to our full 20-year historical database. Base plan includes 2 years of historical data.'
    }
  ];

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Support ticket submitted:', ticketForm);
    // Handle ticket submission
    alert('Support ticket submitted successfully! You should receive a confirmation email shortly.');
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Help & Support</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Get help with FedAnalysis features, troubleshoot issues, or contact our support team directly.
          </p>
        </div>

        {/* Knowledge Base Search */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Knowledge Base</CardTitle>
            <p className="text-slate-600">Search 120+ articles, video walkthroughs, and API examples.</p>
          </CardHeader>
          <CardContent>
            <div className="relative mb-6">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search help articles..."
                className="w-full px-4 py-3 pl-10 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute left-3 top-3.5 text-slate-400">🔍</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {knowledgeBase.map((category, index) => (
                <div key={index}>
                  <h4 className="font-semibold text-slate-900 mb-3">{category.category}</h4>
                  <ul className="space-y-2">
                    {category.articles.map((article, articleIndex) => (
                      <li key={articleIndex}>
                        <button className="text-blue-600 hover:text-blue-800 text-sm text-left hover:underline">
                          {article}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Support Ticket Form */}
          <Card>
            <CardHeader>
              <CardTitle>Submit Support Ticket</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTicketSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={ticketForm.email}
                    onChange={(e) => setTicketForm({...ticketForm, email: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={ticketForm.subject}
                    onChange={(e) => setTicketForm({...ticketForm, subject: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Severity
                  </label>
                  <select
                    value={ticketForm.severity}
                    onChange={(e) => setTicketForm({...ticketForm, severity: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Low">Low - General question</option>
                    <option value="Medium">Medium - Feature not working</option>
                    <option value="Urgent">Urgent - Service disruption</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={ticketForm.description}
                    onChange={(e) => setTicketForm({...ticketForm, description: e.target.value})}
                    rows={4}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe your issue or question..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Attach screenshot or log
                  </label>
                  <input
                    type="file"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    accept=".png,.jpg,.jpeg,.pdf,.txt,.log"
                  />
                </div>

                <Button type="submit" className="w-full">
                  Submit Ticket
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Support Tiers */}
          <Card>
            <CardHeader>
              <CardTitle>Support Hours & Response Times</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supportTiers.map((tier, index) => (
                  <div key={index} className="p-4 border border-slate-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className={tier.color}>{tier.plan}</Badge>
                      <span className="text-sm text-slate-600">{tier.response}</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Channels:</span> {tier.channels.join(', ')}
                      </div>
                      <div>
                        <span className="font-medium">Hours:</span> {tier.hours}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Live Chat Available</h4>
                <p className="text-sm text-blue-800 mb-3">
                  Premium: 24×7 | Plus: Mon–Fri 06:00–20:00 ET | Base: Email-only
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Start Live Chat
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
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

        {/* Contact Information */}
        <Card className="bg-gradient-to-r from-slate-900 to-blue-900 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Need More Help?</h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Our support team is here to help you get the most out of FedAnalysis. 
              Reach out through your preferred channel or schedule a call with our team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <button className="px-6 py-3 bg-white text-slate-900 rounded-lg font-medium hover:bg-slate-100 transition-colors">
                Schedule Support Call
              </button>
              <button className="px-6 py-3 border border-white rounded-lg font-medium hover:bg-white hover:text-slate-900 transition-colors">
                Email Support
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-300">
              <div>
                <strong>Email:</strong><br />
                support@fedanalysis.com
              </div>
              <div>
                <strong>Phone (Premium):</strong><br />
                +1 (617) 555-0123
              </div>
              <div>
                <strong>Business Hours:</strong><br />
                Mon-Fri 6AM-8PM ET
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Support;
