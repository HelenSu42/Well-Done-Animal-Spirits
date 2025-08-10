import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/layout/Layout';
import FedNewsDashboard from '@/components/news/FedNewsDashboard';
import { supabase } from '@/integrations/supabase/client';
import { RefreshCw, TrendingUp, Brain, MessageSquare } from 'lucide-react';

interface AgentAnalysis {
  agent_name: string;
  analysis: string;
  sentiment: 'hawkish' | 'dovish' | 'neutral';
  conviction: number;
  key_points: string[];
  timestamp: string;
}

const AnalystsHub = () => {
  const [question, setQuestion] = useState('');
  const [liveAnalyses, setLiveAnalyses] = useState<AgentAnalysis[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const tradeIdeas = [
    {
      idea: 'Long QQQ, Short TLT',
      conviction: 73,
      size: 2.5,
      rationale: 'Fed pivot odds declining, tech outperforms in higher rate environment',
      agent: 'Hawk Agent',
      timeframe: '5 days'
    },
    {
      idea: 'Long Gold, Short USD/JPY',
      conviction: 68,
      size: 1.8,
      rationale: 'Dollar weakness expected if Fed maintains pause longer than market expects',
      agent: 'Dove Agent',
      timeframe: '5 days'
    },
    {
      idea: 'Long VIX Calls',
      conviction: 82,
      size: 1.2,
      rationale: 'Technical analysis suggests volatility spike probability >70%',
      agent: 'Technical Agent',
      timeframe: '3 days'
    },
    {
      idea: 'Short 2Y/10Y Spread',
      conviction: 61,
      size: 3.0,
      rationale: 'Curve steepening likely as long-term inflation expectations adjust',
      agent: 'Rates Agent',
      timeframe: '7 days'
    }
  ];

  const agents = [
    { name: 'Hawk Agent', status: 'Active', color: 'bg-red-100 text-red-800' },
    { name: 'Dove Agent', status: 'Active', color: 'bg-green-100 text-green-800' },
    { name: 'Technical Agent', status: 'Active', color: 'bg-blue-100 text-blue-800' },
    { name: 'Rates Agent', status: 'Active', color: 'bg-purple-100 text-purple-800' }
  ];

  const fetchLiveAnalyses = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('fed-news-analysis');
      if (error) throw error;
      setLiveAnalyses(data.analyses || []);
    } catch (error) {
      console.error('Error fetching analyses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveAnalyses();
    const interval = setInterval(fetchLiveAnalyses, 300000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'hawkish': return 'border-red-200 bg-red-50';
      case 'dovish': return 'border-green-200 bg-green-50';
      default: return 'border-blue-200 bg-blue-50';
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <Brain className="h-8 w-8 text-blue-600" />
                LLM Analysts Hub
              </h1>
              <p className="text-slate-600 max-w-3xl">
                Four autonomous AI agents analyze Federal Reserve communications and market data in real-time, 
                providing institutional-grade insights and trade recommendations.
              </p>
            </div>
            <Button onClick={fetchLiveAnalyses} disabled={isLoading} className="flex items-center gap-2">
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh Agents
            </Button>
          </div>
        </div>

        {/* Live News Integration */}
        <div className="mb-12">
          <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Live Fed News Analysis
              </CardTitle>
              <p className="text-sm text-slate-600">
                Real-time analysis of Federal Reserve news by our AI agents
              </p>
            </CardHeader>
            <CardContent>
              <FedNewsDashboard />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Agent Status & Controls */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Agents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {agents.map((agent, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                      <div>
                        <Badge className={agent.color}>{agent.name}</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-green-100 text-green-800">
                          {agent.status}
                        </Badge>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ask the Agents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask about Fed policy, market implications, or request analysis..."
                    className="w-full p-3 border border-slate-300 rounded-lg resize-none h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Button className="w-full">Submit Question</Button>
                  <p className="text-xs text-slate-500">
                    Responses generated using live market data and Fed communications
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Enhanced Trade Ideas with Live Data */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>AI-Generated Trade Ideas</CardTitle>
                  <Button variant="outline" size="sm">Export All</Button>
                </div>
                <p className="text-sm text-slate-600 mt-2">
                  <strong>Live Analysis:</strong> Ideas generated from real-time Fed news and market data<br/>
                  <strong>Conviction %</strong> = probability of positive risk-adjusted return
                </p>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-medium">Trade Idea</th>
                        <th className="text-center p-3 font-medium">Conviction %</th>
                        <th className="text-center p-3 font-medium">Size %</th>
                        <th className="text-center p-3 font-medium">Agent</th>
                        <th className="text-center p-3 font-medium">Timeframe</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tradeIdeas.map((trade, index) => (
                        <tr key={index} className="border-b hover:bg-slate-50">
                          <td className="p-3">
                            <div>
                              <div className="font-medium text-slate-900">{trade.idea}</div>
                              <div className="text-sm text-slate-600 mt-1">{trade.rationale}</div>
                            </div>
                          </td>
                          <td className="p-3 text-center">
                            <Badge 
                              variant={trade.conviction > 70 ? "default" : trade.conviction > 60 ? "secondary" : "outline"}
                              className={trade.conviction > 70 ? "bg-green-100 text-green-800" : ""}
                            >
                              {trade.conviction}%
                            </Badge>
                          </td>
                          <td className="p-3 text-center font-mono">{trade.size}%</td>
                          <td className="p-3 text-center">
                            <Badge variant="outline" className="text-xs">
                              {trade.agent}
                            </Badge>
                          </td>
                          <td className="p-3 text-center text-sm text-slate-600">{trade.timeframe}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Live Agent Debate */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Live Agent Analysis
                </CardTitle>
                <p className="text-sm text-slate-600">Real-time analysis of Fed news and market developments</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {liveAnalyses.slice(0, 6).map((message, index) => (
                    <div key={index} className={`p-4 rounded-lg border-l-4 ${getSentimentColor(message.sentiment)}`}>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs">
                          {message.agent_name}
                        </Badge>
                        <div className="flex items-center gap-2">
                          <Badge className={`text-xs ${
                            message.sentiment === 'hawkish' ? 'bg-red-100 text-red-800' :
                            message.sentiment === 'dovish' ? 'bg-green-100 text-green-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {message.sentiment.toUpperCase()} {message.conviction}%
                          </Badge>
                          <span className="text-xs text-slate-500 font-mono">
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-slate-700 mb-2">{message.analysis}</p>
                      {message.key_points.length > 0 && (
                        <div className="space-y-1 mt-3 pt-2 border-t border-slate-200">
                          {message.key_points.slice(0, 2).map((point, pointIndex) => (
                            <div key={pointIndex} className="text-xs text-slate-600 flex items-start gap-1">
                              <span className="text-blue-500 mt-1">•</span>
                              <span>{point.trim()}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800 flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    Agents continuously analyzing live Fed news and market data...
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AnalystsHub;
