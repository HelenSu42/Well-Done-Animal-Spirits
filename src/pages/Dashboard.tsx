import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Sparkles } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = () => {
    // Sign out logic here
    navigate('/');
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const quickActions = [
    { 
      title: 'Fed Monitor', 
      description: 'Live FOMC events and real-time analysis',
      icon: '📡', 
      path: '/fed-monitor',
      color: 'from-blue-500 to-blue-600'
    },
    { 
      title: 'Fed News Hub', 
      description: 'AI-powered analysis of Fed-related news',
      icon: '📰', 
      path: '/fed-news',
      color: 'from-green-500 to-green-600'
    },
    { 
      title: 'LLM Analysts', 
      description: 'Multi-agent AI discussion and trade ideas',
      icon: '🤖', 
      path: '/analysts',
      color: 'from-purple-500 to-purple-600'
    },
    { 
      title: 'Portfolio Lab', 
      description: 'Scenario analysis and portfolio optimization',
      icon: '🧪', 
      path: '/portfolio-lab',
      color: 'from-orange-500 to-orange-600'
    },
    { 
      title: 'Impact Dashboard', 
      description: 'Market impact analysis and predictions',
      icon: '📊', 
      path: '/impact',
      color: 'from-red-500 to-red-600'
    },
    { 
      title: 'Research Hub', 
      description: 'Historical Fed data and research tools',
      icon: '📚', 
      path: '/research',
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Dashboard
          </h1>
          <p className="text-slate-600">
            Welcome to your dashboard! Explore key features and insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <Card 
              key={index} 
              className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:scale-105 cursor-pointer"
              onClick={() => handleNavigate(action.path)}
            >
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl text-white mb-4 bg-gradient-to-br ${action.color}`}>
                  {action.icon}
                </div>
                <h2 className="text-xl font-semibold text-slate-900 mb-2">{action.title}</h2>
                <p className="text-slate-600">{action.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12">
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
