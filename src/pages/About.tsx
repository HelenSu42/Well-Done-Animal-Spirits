
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/layout/Layout';

const About = () => {
  const timeline = [
    {
      date: 'May 2025',
      title: 'FedAnalysis Incorporated',
      description: 'Company founded in Cambridge, MA with initial seed funding.'
    },
    {
      date: 'August 2025',
      title: 'MVP Launch',
      description: 'Beta launch with 50 portfolio managers and quant researchers.'
    },
    {
      date: 'Q1 2026',
      title: 'Series A Funding',
      description: '$12M Series A led by Sequoia Capital to expand AI capabilities.'
    },
    {
      date: 'Q4 2026',
      title: 'SOC 2 Certification',
      description: 'Achieved SOC 2 Type II certification for enterprise security.'
    },
    {
      date: 'Q2 2027',
      title: 'Global Expansion',
      description: 'Expanded to cover ECB, Bank of Japan, and Bank of England communications.'
    }
  ];

  const teamMembers = [
    {
      name: 'Dr. Evan Cheng',
      role: 'Founder & CEO',
      bio: 'Former Fed NY data scientist with PhD in Econometrics from Stanford. Previously led quantitative research at Two Sigma.',
      education: 'PhD Econometrics, Stanford'
    },
    {
      name: 'Sarah Mitchell',
      role: 'CTO',
      bio: 'Former Senior ML Engineer at Google. Led natural language processing initiatives for financial applications.',
      education: 'MS Computer Science, MIT'
    },
    {
      name: 'Dr. Michael Rodriguez',
      role: 'Head of Research',
      bio: 'Former Vice President at J.P. Morgan, specialized in fixed income and macro strategy. 15 years of Fed watching experience.',
      education: 'PhD Finance, Wharton'
    },
    {
      name: 'Lisa Park',
      role: 'VP of Product',
      bio: 'Former product manager at Bloomberg Terminal. Expert in financial data visualization and user experience design.',
      education: 'MBA, Harvard Business School'
    }
  ];

  const investors = [
    { name: 'Sequoia Capital', round: 'Series A' },
    { name: 'Andreessen Horowitz', round: 'Series A' },
    { name: 'Point72 Ventures', round: 'Seed' },
    { name: 'Two Sigma Ventures', round: 'Seed' }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-6">About FedAnalysis</h1>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              We empower investors to understand and act on monetary policy in seconds, not hours.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Founded by former Federal Reserve researchers and quantitative analysts, FedAnalysis combines deep domain expertise 
              with cutting-edge AI to decode the most influential communications in global markets. Our mission is to democratize 
              access to sophisticated monetary policy analysis, giving every investor the tools previously available only to 
              institutional trading desks.
            </p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🎯 Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 leading-relaxed">
                To transform how investors interpret and respond to Federal Reserve communications by providing 
                real-time, AI-powered analysis that captures not just what is said, but how it's said and what it means for markets.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🔮 Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 leading-relaxed">
                A world where every investor, regardless of size or resources, can access institutional-grade monetary policy 
                intelligence to make better investment decisions and manage risk more effectively.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{member.name}</h3>
                      <Badge variant="secondary">{member.role}</Badge>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-3">{member.bio}</p>
                  <p className="text-xs text-slate-500">{member.education}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Company Timeline</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {timeline.map((event, index) => (
                <div key={index} className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-4 h-4 bg-blue-600 rounded-full mt-1"></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="outline">{event.date}</Badge>
                      <h3 className="font-semibold text-slate-900">{event.title}</h3>
                    </div>
                    <p className="text-slate-600 text-sm">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Investors */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Backed by Leading Investors</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {investors.map((investor, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-slate-900 mb-2">{investor.name}</h4>
                  <Badge variant="secondary" className="text-xs">{investor.round}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">🔬</div>
                <h3 className="font-semibold text-slate-900 mb-3">Scientific Rigor</h3>
                <p className="text-slate-600 text-sm">
                  Every model and analysis is grounded in empirical research and validated against historical data.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="font-semibold text-slate-900 mb-3">Speed & Accuracy</h3>
                <p className="text-slate-600 text-sm">
                  We deliver actionable insights within seconds of Fed communications without sacrificing precision.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">🌐</div>
                <h3 className="font-semibold text-slate-900 mb-3">Democratization</h3>
                <p className="text-slate-600 text-sm">
                  Making sophisticated analysis accessible to individual investors, not just Wall Street institutions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact CTA */}
        <Card className="bg-gradient-to-r from-slate-900 to-blue-900 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Join Our Mission</h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              We're always looking for talented researchers, engineers, and product experts who share our passion 
              for financial technology and market intelligence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-white text-slate-900 rounded-lg font-medium hover:bg-slate-100 transition-colors">
                View Open Positions
              </button>
              <button className="px-6 py-3 border border-white rounded-lg font-medium hover:bg-white hover:text-slate-900 transition-colors">
                Contact Us
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default About;
