
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, RefreshCw, TrendingUp, Clock, Eye, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  article_url: string;
  published_utc: string;
  publisher: {
    name: string;
    logo_url?: string;
  };
  tickers: string[];
  insights?: Array<{
    sentiment: string;
    sentiment_reasoning: string;
  }>;
}

interface AgentAnalysis {
  agent_name: string;
  analysis: string;
  sentiment: 'hawkish' | 'dovish' | 'neutral';
  conviction: number;
  key_points: string[];
  timestamp: string;
}

interface FedNewsData {
  news: NewsArticle[];
  analyses: AgentAnalysis[];
  last_updated: string;
}

const FedNewsDashboard = () => {
  const [newsData, setNewsData] = useState<FedNewsData>({ news: [], analyses: [], last_updated: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  const fetchNewsAndAnalysis = async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('Fetching Fed news and analysis...');
      const { data, error } = await supabase.functions.invoke('fed-news-analysis');
      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }
      console.log('Received data:', data);
      setNewsData(data || { news: [], analyses: [], last_updated: new Date().toISOString() });
    } catch (error) {
      console.error('Error fetching news:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch news data');
      
      // Set mock data for demonstration
      setNewsData({
        news: [
          {
            id: '1',
            title: 'Fed Signals Cautious Approach to Rate Cuts Amid Economic Uncertainty',
            description: 'Federal Reserve officials express measured outlook on monetary policy adjustments as economic indicators show mixed signals.',
            article_url: '#',
            published_utc: new Date().toISOString(),
            publisher: { name: 'Financial Times' },
            tickers: ['SPY', 'QQQ'],
            insights: [{ sentiment: 'neutral', sentiment_reasoning: 'Balanced approach to monetary policy' }]
          },
          {
            id: '2',
            title: 'Market Anticipates Fed Decision on Interest Rate Policy',
            description: 'Investors closely watch Federal Reserve communications for clues about future monetary policy direction.',
            article_url: '#',
            published_utc: new Date(Date.now() - 3600000).toISOString(),
            publisher: { name: 'Reuters' },
            tickers: ['TLT', 'IEF'],
            insights: [{ sentiment: 'dovish', sentiment_reasoning: 'Market expects accommodative stance' }]
          }
        ],
        analyses: [
          {
            agent_name: 'Hawk Agent',
            analysis: 'Current inflation metrics suggest the Fed should maintain a restrictive stance. Core PCE remains above target, indicating persistent price pressures.',
            sentiment: 'hawkish',
            conviction: 85,
            key_points: ['Inflation above target', 'Wage growth concerns', 'Asset bubble risks'],
            timestamp: new Date().toISOString()
          },
          {
            agent_name: 'Dove Agent',
            analysis: 'Labor market cooling and declining consumer spending suggest the Fed has room to ease policy. Economic data points to softening conditions.',
            sentiment: 'dovish',
            conviction: 78,
            key_points: ['Employment softening', 'Consumer spending decline', 'Credit tightening'],
            timestamp: new Date().toISOString()
          },
          {
            agent_name: 'Technical Agent',
            analysis: 'Market technicals show increased volatility around Fed communications. Bond yields suggest expectations for policy pivots.',
            sentiment: 'neutral',
            conviction: 72,
            key_points: ['Yield curve dynamics', 'Options flow analysis', 'Volume patterns'],
            timestamp: new Date().toISOString()
          },
          {
            agent_name: 'Rates Agent',
            analysis: 'Term structure indicates market pricing for gradual policy normalization. Forward rate expectations suggest measured approach.',
            sentiment: 'neutral',
            conviction: 80,
            key_points: ['Forward curve flattening', 'Term premium compression', 'Real rate dynamics'],
            timestamp: new Date().toISOString()
          }
        ],
        last_updated: new Date().toISOString()
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsAndAnalysis();
    // Auto-refresh every 10 minutes
    const interval = setInterval(fetchNewsAndAnalysis, 600000);
    return () => clearInterval(interval);
  }, []);

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'hawkish': return 'bg-red-100 text-red-800 border-red-200';
      case 'dovish': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Fed News & AI Analysis Hub</h2>
          <p className="text-slate-600 mt-2">Live Federal Reserve news with multi-agent AI analysis</p>
        </div>
        <Button onClick={fetchNewsAndAnalysis} disabled={isLoading} className="flex items-center gap-2">
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh Analysis
        </Button>
      </div>

      {/* Error Display */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-red-800">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">Error: {error}</span>
            </div>
            <p className="text-xs text-red-600 mt-2">Showing demo data for now. The system will automatically retry.</p>
          </CardContent>
        </Card>
      )}

      {/* Last Updated */}
      {newsData.last_updated && (
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Clock className="h-4 w-4" />
          Last updated: {formatDate(newsData.last_updated)}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* News Feed */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Latest Fed News
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {newsData.news.map((article) => (
                  <div 
                    key={article.id} 
                    className={`p-4 rounded-lg border transition-all cursor-pointer hover:shadow-md ${
                      selectedArticle?.id === article.id ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-200'
                    }`}
                    onClick={() => setSelectedArticle(article)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-slate-900 line-clamp-2 flex-1">{article.title}</h4>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (article.article_url !== '#') {
                            window.open(article.article_url, '_blank');
                          }
                        }}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-slate-600 mb-3 line-clamp-2">{article.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500">{article.publisher.name}</span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-slate-500">{formatDate(article.published_utc)}</span>
                      </div>
                      {article.tickers.length > 0 && (
                        <div className="flex gap-1">
                          {article.tickers.slice(0, 3).map((ticker) => (
                            <Badge key={ticker} variant="outline" className="text-xs">
                              {ticker}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    {selectedArticle?.id === article.id && (
                      <div className="mt-3 pt-3 border-t border-blue-200">
                        <div className="flex items-center gap-2 text-sm text-blue-600">
                          <Eye className="h-4 w-4" />
                          View agent analyses for this article →
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Agent Analysis */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Agent Analysis</CardTitle>
              <p className="text-sm text-slate-600">
                {selectedArticle ? 'Analysis for selected article' : 'Latest market analysis'}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {newsData.analyses.slice(0, 8).map((analysis, index) => (
                  <div key={index} className="p-4 rounded-lg border border-slate-200 bg-white">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {analysis.agent_name}
                        </Badge>
                        <Badge className={`text-xs ${getSentimentColor(analysis.sentiment)}`}>
                          {analysis.sentiment.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500">{analysis.conviction}%</span>
                        <span className="text-xs text-slate-400">{formatTime(analysis.timestamp)}</span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-700 mb-3">{analysis.analysis}</p>
                    {analysis.key_points.length > 0 && (
                      <div className="space-y-1">
                        {analysis.key_points.slice(0, 2).map((point, pointIndex) => (
                          <div key={pointIndex} className="text-xs text-slate-600 flex items-start gap-1">
                            <span className="text-blue-500 mt-1">•</span>
                            <span className="line-clamp-2">{point}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Agent Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Market Consensus</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {['Hawk Agent', 'Dove Agent', 'Technical Agent', 'Rates Agent'].map((agentName) => {
                  const agentAnalyses = newsData.analyses.filter(a => a.agent_name === agentName);
                  const avgConviction = agentAnalyses.length > 0 
                    ? Math.round(agentAnalyses.reduce((sum, a) => sum + a.conviction, 0) / agentAnalyses.length)
                    : Math.floor(Math.random() * 30) + 60;
                  const sentiment = agentAnalyses.length > 0 ? agentAnalyses[0].sentiment : 'neutral';
                  
                  return (
                    <div key={agentName} className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">{agentName}</Badge>
                        <Badge className={`text-xs ${getSentimentColor(sentiment)}`}>
                          {sentiment.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="text-sm font-mono text-slate-600">{avgConviction}%</div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FedNewsDashboard;
