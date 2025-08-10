
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, Users, Calendar, BookOpen, BarChart3, Award, Star, Network, Brain, Lightbulb } from 'lucide-react';

const ResearchAnalytics = () => {
  const { data: papers, isLoading, error } = useQuery({
    queryKey: ['research-papers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('research_papers')
        .select('*')
        .order('publication_year', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return (
      <Card className="border-0 shadow-lg">
        <CardContent className="p-12">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
            <p className="text-slate-600 font-medium">Loading analytics...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !papers) {
    return (
      <Card className="border-0 shadow-lg">
        <CardContent className="p-12">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <BarChart3 className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Error Loading Analytics</h3>
              <p className="text-red-600">{error?.message || 'Unable to load data'}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Abstract Keywords Analysis
  const abstractKeywords = papers.reduce((acc, paper) => {
    const text = `${paper.article_title} ${paper.abstract || ''}`.toLowerCase();
    const keywords = ['policy', 'monetary', 'market', 'federal', 'reserve', 'effects', 'evidence', 
                     'financial', 'rates', 'announcement', 'central', 'bank', 'economic', 'impact', 'volatility'];
    
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'g');
      const matches = text.match(regex);
      acc[keyword] = (acc[keyword] || 0) + (matches ? matches.length : 0);
    });
    return acc;
  }, {} as Record<string, number>);

  const keywordData = Object.entries(abstractKeywords)
    .map(([keyword, count]) => ({ keyword, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Topic Evolution Over Time (2015-2025)
  const topicEvolution = papers.reduce((acc, paper) => {
    const year = paper.publication_year;
    if (year && year >= 2015 && year <= 2025) {
      if (!acc[year]) acc[year] = { policy: 0, market: 0, inflation: 0, crisis: 0, communication: 0 };
      
      const text = `${paper.article_title} ${paper.abstract || ''}`.toLowerCase();
      if (text.includes('policy') || text.includes('monetary')) acc[year].policy++;
      if (text.includes('market') || text.includes('financial')) acc[year].market++;
      if (text.includes('inflation') || text.includes('price')) acc[year].inflation++;
      if (text.includes('crisis') || text.includes('covid')) acc[year].crisis++;
      if (text.includes('communication') || text.includes('announcement')) acc[year].communication++;
    }
    return acc;
  }, {} as Record<number, any>);

  const evolutionData = Object.entries(topicEvolution)
    .map(([year, topics]) => ({ year: parseInt(year), ...topics }))
    .sort((a, b) => a.year - b.year);

  // New Top 10 Most Prolific Authors (using the format from the provided chart)
  const authorAnalysis = papers.reduce((acc, paper) => {
    const authors = paper.author_full_names.split(/[;,]/).map(author => author.trim());
    authors.forEach(author => {
      if (author) {
        acc[author] = (acc[author] || 0) + 1;
      }
    });
    return acc;
  }, {} as Record<string, number>);

  const topAuthors = Object.entries(authorAnalysis)
    .map(([author, papers]) => ({ 
      author: author.length > 20 ? author.substring(0, 20) + '...' : author,
      papers,
      fullName: author
    }))
    .sort((a, b) => b.papers - a.papers)
    .slice(0, 10);

  // Publication Timeline Analysis
  const yearData = papers.reduce((acc, paper) => {
    const year = paper.publication_year;
    if (year) {
      acc[year] = (acc[year] || 0) + 1;
    }
    return acc;
  }, {} as Record<number, number>);

  const timelineData = Object.entries(yearData)
    .map(([year, count]) => ({ year: parseInt(year), papers: count }))
    .sort((a, b) => a.year - b.year);

  // Top 10 Publication Sources Analysis
  const journalData = papers.reduce((acc, paper) => {
    const journal = paper.source_title || 'Unknown';
    acc[journal] = (acc[journal] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topJournals = Object.entries(journalData)
    .map(([journal, count]) => ({ 
      journal: journal.length > 25 ? journal.substring(0, 25) + '...' : journal, 
      count,
      fullName: journal
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Research Topic Distribution
  const topicAnalysis = () => {
    const topics = {
      'Monetary Policy': 0,
      'Interest Rates': 0,
      'Inflation': 0,
      'Markets': 0,
      'Central Banking': 0,
      'Quantitative Easing': 0
    };

    papers.forEach(paper => {
      const text = `${paper.article_title} ${paper.abstract || ''}`.toLowerCase();
      
      if (text.includes('monetary policy') || text.includes('federal reserve')) topics['Monetary Policy']++;
      if (text.includes('interest rate') || text.includes('discount rate')) topics['Interest Rates']++;
      if (text.includes('inflation') || text.includes('price')) topics['Inflation']++;
      if (text.includes('market') || text.includes('stock') || text.includes('reit')) topics['Markets']++;
      if (text.includes('central bank') || text.includes('fomc')) topics['Central Banking']++;
      if (text.includes('quantitative easing') || text.includes('qe')) topics['Quantitative Easing']++;
    });

    return Object.entries(topics)
      .map(([topic, count]) => ({ topic, count }))
      .filter(item => item.count > 0);
  };

  const topicDistribution = topicAnalysis();

  // Statistical Metrics
  const years = papers.filter(p => p.publication_year).map(p => p.publication_year);
  const avgYear = years.reduce((sum, year) => sum + year, 0) / years.length;
  const totalAuthors = papers.reduce((sum, paper) => sum + paper.author_full_names.split(/[;,]/).length, 0);
  const avgAuthorsPerPaper = totalAuthors / papers.length;
  const journalCount = new Set(papers.map(p => p.source_title).filter(Boolean)).size;

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6B7280'];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-slate-900">{`${label}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
          <BarChart3 className="w-4 h-4 mr-2" />
          Research Analytics Dashboard
        </div>
        <h2 className="text-3xl font-bold text-slate-900">Comprehensive Research Insights</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Advanced analytics and statistical insights derived from our Federal Reserve research paper collection
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-blue-700">{papers.length}</p>
                <p className="text-sm font-medium text-blue-600 mt-1">Total Papers</p>
              </div>
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-md bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-green-700">{avgAuthorsPerPaper.toFixed(1)}</p>
                <p className="text-sm font-medium text-green-600 mt-1">Avg Authors/Paper</p>
              </div>
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-md bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-purple-700">{avgYear.toFixed(0)}</p>
                <p className="text-sm font-medium text-purple-600 mt-1">Avg Publication Year</p>
              </div>
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-md bg-gradient-to-br from-orange-50 to-orange-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-orange-700">{journalCount}</p>
                <p className="text-sm font-medium text-orange-600 mt-1">Unique Journals</p>
              </div>
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Research Knowledge Graph */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 border-b border-purple-100">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Network className="w-6 h-6 text-purple-600" />
            Research Knowledge Graph - Topic Relationships & Connections
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-8 border-2 border-dashed border-slate-300">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <Network className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Interactive Knowledge Graph</h3>
              <p className="text-slate-600 max-w-md mx-auto">
                Visual representation of research topic relationships and connections based on {papers.length} papers. 
                Shows interconnections between Federal Reserve policies, market impacts, and research methodologies.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-white p-3 rounded border">
                  <div className="text-sm font-medium text-slate-700">Core Topics</div>
                  <div className="text-xs text-slate-500">Monetary Policy, Markets</div>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="text-sm font-medium text-slate-700">Institutions</div>
                  <div className="text-xs text-slate-500">Federal Reserve, FOMC</div>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="text-sm font-medium text-slate-700">Methods</div>
                  <div className="text-xs text-slate-500">Announcements, Guidance</div>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="text-sm font-medium text-slate-700">Effects</div>
                  <div className="text-xs text-slate-500">Volatility, Spillovers</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Key Research Insights */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 border-b border-emerald-100">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Lightbulb className="w-5 h-5 text-emerald-600" />
              Key Research Insights from Abstract Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-semibold text-blue-800 mb-2">📈 Dominant Research Focus</h4>
              <p className="text-sm text-blue-700">
                Monetary policy dominates research appearing in {Math.round((topicDistribution.find(t => t.topic === 'Monetary Policy')?.count || 0) / papers.length * 100)}% of papers. 
                Financial markets analysis is present in {Math.round((topicDistribution.find(t => t.topic === 'Markets')?.count || 0) / papers.length * 100)}% of studies.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg border-l-4 border-purple-500">
              <h4 className="font-semibold text-purple-800 mb-2">🔬 Methodological Trends</h4>
              <p className="text-sm text-purple-700">
                Event studies and empirical analysis dominate with {Math.round(papers.filter(p => p.abstract?.toLowerCase().includes('event') || p.abstract?.toLowerCase().includes('empirical')).length / papers.length * 100)}% of papers using quantitative methods.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg border-l-4 border-orange-500">
              <h4 className="font-semibold text-orange-800 mb-2">🌐 Emerging Topics</h4>
              <p className="text-sm text-orange-700">
                Central bank communication and forward guidance show increasing prominence. 
                International spillovers appear in {Math.round(papers.filter(p => p.abstract?.toLowerCase().includes('international')).length / papers.length * 100)}% of recent studies.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border-l-4 border-green-500">
              <h4 className="font-semibold text-green-800 mb-2">💡 Key Findings Pattern</h4>
              <p className="text-sm text-green-700">
                {Math.round(papers.filter(p => p.abstract?.toLowerCase().includes('significant')).length / papers.length * 100)}% of studies report significant effects of Fed policies. 
                Market impact studies consistently show measurable responses to policy announcements.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Topic Evolution Over Time */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-indigo-100">
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              Topic Evolution Over Time (2015-2025)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={evolutionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="year" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="policy" stroke="#3B82F6" strokeWidth={3} name="Policy" />
                <Line type="monotone" dataKey="market" stroke="#8B5CF6" strokeWidth={3} name="Markets" />
                <Line type="monotone" dataKey="communication" stroke="#10B981" strokeWidth={3} name="Communication" />
                <Line type="monotone" dataKey="crisis" stroke="#F59E0B" strokeWidth={3} name="Crisis" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Publication Timeline */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Publication Timeline Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="year" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="papers" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, fill: '#059669' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top 10 Publication Sources */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Award className="w-5 h-5 text-blue-600" />
              Top 10 Publication Sources
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={topJournals}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                  label={({ journal, percent }) => `${journal.substring(0, 15)}... (${(percent * 100).toFixed(0)}%)`}
                  labelLine={false}
                >
                  {topJournals.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-lg max-w-xs">
                          <p className="text-sm font-medium text-slate-900">{payload[0].payload.fullName}</p>
                          <p className="text-sm text-slate-600">Papers: {payload[0].value}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top 10 Most Prolific Authors */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 border-b border-purple-100">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Star className="w-5 h-5 text-purple-600" />
              Top 10 Most Prolific Authors
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topAuthors} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" stroke="#64748b" fontSize={12} />
                <YAxis dataKey="author" type="category" width={120} stroke="#64748b" fontSize={10} />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-lg">
                          <p className="text-sm font-medium text-slate-900">{payload[0].payload.fullName}</p>
                          <p className="text-sm text-slate-600">Papers: {payload[0].value}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="papers" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Abstract Keywords Analysis */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-cyan-50 to-teal-50 border-b border-cyan-100">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Brain className="w-5 h-5 text-cyan-600" />
              Abstract Keywords Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={keywordData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="keyword" stroke="#64748b" fontSize={11} angle={-45} textAnchor="end" height={80} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill="#06B6D4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Research Topic Distribution */}
        <Card className="border-0 shadow-lg lg:col-span-2">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 border-b border-orange-100">
            <CardTitle className="flex items-center gap-2 text-lg">
              <BarChart3 className="w-5 h-5 text-orange-600" />
              Research Topic Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={topicDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ topic, percent }) => `${topic} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {topicDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResearchAnalytics;
