
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/layout/Layout';
import { NewsletterSignup } from '@/components/newsletter/NewsletterSignup';
import { AuthModal } from '@/components/auth/AuthModal';
import { useAuth } from '@/contexts/AuthContext';
import { TrendingUp, Shield, Zap, Clock, Users, Award, ExternalLink, Play } from 'lucide-react';

const Home = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const liveMetrics = {
    fomc_hit_rate_1d: 87.3,
    cumulative_alpha_ytd: 342,
    assets_covered: 1247
  };

  const testimonials = [
    {
      quote: "FedAnalysis shaved research time by 80% and added 240 bps to our macro pod.",
      author: "Portfolio Manager",
      company: "Tier 1 Investment Bank",
      role: "Fixed Income"
    },
    {
      quote: "The LLM hub surfaces trade ideas our quantitative models consistently miss.",
      author: "Head of Research", 
      company: "Hedge Fund",
      role: "Macro Strategy"
    },
    {
      quote: "Essential tool for any serious policy researcher in institutional finance.",
      author: "Chief Economist",
      company: "Asset Manager",
      role: "Economic Research"
    }
  ];

  const features = [
    {
      icon: TrendingUp,
      title: "Multimodal AI Analytics",
      description: "Extract sentiment from speech cadence, facial cues, and policy language. Translate to asset-specific probability scores within 90 seconds of Fed communications.",
      badge: "AI-Powered",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Shield,
      title: "Scenario-Aware Portfolio Lab",
      description: "Stress-test and rebalance your ETF universe against 'Hike', 'Pause', or 'Pivot' scenarios. Export broker-ready trade tickets with one-click execution.",
      badge: "Portfolio Tools",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Zap,
      title: "Real-Time Policy Alerting",
      description: "Email, SMS, Slack, and WebSocket feeds deliver actionable signals with sub-300ms latency from official transcript timestamps.",
      badge: "Low Latency",
      color: "from-purple-500 to-purple-600"
    }
  ];

  const stats = [
    { icon: Clock, label: "Response Time", value: "<300ms", color: "text-blue-600" },
    { icon: Users, label: "Active Users", value: "2,500+", color: "text-green-600" },
    { icon: Award, label: "Accuracy Rate", value: "87.3%", color: "text-purple-600" }
  ];

  const handleLaunchDashboard = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      setAuthModalOpen(true);
    }
  };

  const handleDemo = () => {
    window.open('https://calendly.com/fedanalysis/30min', '_blank');
  };

  const handleVideoClick = () => {
    window.open('https://www.youtube.com/@federalreserve', '_blank');
  };

  return (
    <>
      <Layout>
        {/* Enhanced Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-50" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M20 20c0 5.5-4.5 10-10 10s-10-4.5-10-10 4.5-10 10-10 10 4.5 10 10zm10 0c0 5.5-4.5 10-10 10s-10-4.5-10-10 4.5-10 10-10 10 4.5 10 10z'/%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
            <div className="text-center max-w-5xl mx-auto">
              <Badge className="mb-8 bg-blue-600/20 text-blue-300 border-blue-500/30 px-6 py-3 text-base font-semibold tracking-wide uppercase">
                🏛️ Trusted by 2,500+ Financial Professionals
              </Badge>
              
              <h1 className="text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent leading-tight">
                Unlock Alpha from Every Fed Signal
              </h1>
              
              <p className="text-2xl text-slate-300 mb-12 leading-relaxed max-w-4xl mx-auto font-light">
                Professional-grade Federal Reserve analysis platform. Two decades of FOMC communications decoded through 
                advanced AI—delivering predictive trade signals, scenario-aware portfolio optimization, and institutional-quality research tools.
              </p>
              
              {/* Enhanced Live Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <Card className="bg-slate-800/60 border-slate-700 backdrop-blur-lg shadow-2xl hover:shadow-3xl transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="text-4xl font-bold text-green-400 mb-3">{liveMetrics.fomc_hit_rate_1d}%</div>
                    <div className="text-sm text-slate-400 uppercase tracking-wide font-semibold">Last FOMC Hit-Rate</div>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/60 border-slate-700 backdrop-blur-lg shadow-2xl hover:shadow-3xl transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="text-4xl font-bold text-blue-400 mb-3">{liveMetrics.cumulative_alpha_ytd}</div>
                    <div className="text-sm text-slate-400 uppercase tracking-wide font-semibold">Cumulative Alpha YTD (bps)</div>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/60 border-slate-700 backdrop-blur-lg shadow-2xl hover:shadow-3xl transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="text-4xl font-bold text-purple-400 mb-3">{liveMetrics.assets_covered.toLocaleString()}</div>
                    <div className="text-sm text-slate-400 uppercase tracking-wide font-semibold">Assets Monitored</div>
                  </CardContent>
                </Card>
              </div>

              {/* Enhanced CTAs */}
              <div className="flex flex-col sm:flex-row gap-8 justify-center mb-12">
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 text-xl font-bold shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 rounded-xl"
                  onClick={handleLaunchDashboard}
                >
                  🚀 Launch Live Dashboard
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-slate-900 px-12 py-6 text-xl font-bold shadow-2xl hover:shadow-3xl transition-all bg-slate-800/50 backdrop-blur-sm transform hover:scale-105 rounded-xl"
                  onClick={handleDemo}
                >
                  📅 Book Executive Demo
                </Button>
              </div>

              {/* Enhanced Newsletter */}
              <div className="max-w-2xl mx-auto bg-slate-800/40 backdrop-blur-lg rounded-2xl p-8 border border-slate-700 shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-4">Get our weekly "Fed Risk Brief"</h3>
                <p className="text-slate-300 mb-6 font-medium">Concise signals, institutional insights, zero spam.</p>
                <NewsletterSignup 
                  className="flex-col sm:flex-row gap-4"
                  placeholder="your@institution.com"
                  buttonText="Subscribe Free"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Demo CTA Banner */}
        <section className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-center md:text-left mb-8 md:mb-0">
                <h3 className="text-3xl font-bold mb-3">Ready to Experience Institutional-Grade Fed Analysis?</h3>
                <p className="text-orange-100 text-xl font-light">Schedule a personalized demonstration with our research team</p>
              </div>
              <Button 
                size="lg" 
                className="bg-white text-orange-600 hover:bg-orange-50 px-12 py-6 font-bold shadow-2xl transform hover:scale-105 transition-all rounded-xl text-lg"
                onClick={handleDemo}
              >
                📅 Schedule Executive Demo
                <ExternalLink className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Enhanced Value Proposition */}
        <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-bold text-slate-900 mb-6">Institutional-Grade Federal Reserve Analysis</h2>
              <p className="text-2xl text-slate-600 max-w-4xl mx-auto font-light leading-relaxed">
                Advanced AI-powered research platform trusted by leading financial institutions worldwide
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
              {features.map((feature, index) => (
                <Card key={index} className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 bg-white">
                  <CardContent className="p-10">
                    <div className="mb-8 flex items-center justify-between">
                      <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200 px-4 py-2 font-semibold">
                        {feature.badge}
                      </Badge>
                    </div>
                    <h3 className="text-2xl font-bold mb-6 text-slate-900">{feature.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-lg">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className={`w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                    <stat.icon className={`w-10 h-10 ${stat.color}`} />
                  </div>
                  <div className="text-4xl font-bold text-slate-900 mb-3">{stat.value}</div>
                  <div className="text-slate-600 text-lg font-medium uppercase tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Testimonials */}
        <section className="py-24 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Trusted by Leading Financial Institutions</h2>
              <p className="text-slate-300 text-xl font-light">What industry professionals say about FedAnalysis</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-slate-800 border-slate-700 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <CardContent className="p-8">
                    <p className="text-slate-300 italic mb-6 text-lg leading-relaxed">"{testimonial.quote}"</p>
                    <div className="border-t border-slate-700 pt-6">
                      <p className="font-bold text-white text-lg">{testimonial.author}</p>
                      <p className="text-slate-400 font-medium">{testimonial.company}</p>
                      <p className="text-slate-500 text-sm">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Demo Video Section */}
        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">See Federal Reserve Analysis in Action</h2>
            <p className="text-slate-600 mb-12 text-xl font-light leading-relaxed">
              Watch live FOMC dashboard demonstrations and portfolio optimization tools used by institutional investors.
            </p>
            <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl flex items-center justify-center shadow-2xl cursor-pointer hover:shadow-3xl transition-all duration-300 transform hover:scale-105" onClick={handleVideoClick}>
              <div className="text-center">
                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl hover:bg-blue-700 transition-colors">
                  <Play className="w-10 h-10 text-white ml-1" />
                </div>
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 text-lg font-semibold">
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Watch on Federal Reserve YouTube
                </Button>
              </div>
            </div>
          </div>
        </section>
      </Layout>

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </>
  );
};

export default Home;
