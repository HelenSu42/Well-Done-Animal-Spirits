
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/components/layout/Layout';
import ResearchPapersTable from '@/components/research/ResearchPapersTable';
import ResearchAnalytics from '@/components/research/ResearchAnalytics';
import { BookOpen, TrendingUp, Users, Calendar, Download, ExternalLink } from 'lucide-react';

const Research = () => {
  const featuredPaper = {
    title: "Quantitative Easing Announcements and High-Frequency Stock Market Volatility",
    subtitle: "Evidence from the United States Federal Reserve",
    authors: "Corbet, Shaen; Dunne, John James; Larkin, Charles",
    journal: "Research in International Business and Finance",
    year: "2019",
    abstract: "This paper provides an investigation of the volatility effects associated with regularly scheduled US Federal Reserve quantitative easing (QE) announcements, using high-frequency returns data. We find significant and substantial increases of stock market volatility immediately after a policy announcement.",
    downloadCount: "2,847",
    doi: "10.1016/j.ribaf.2019.01.007"
  };

  const upcomingWebinars = [
    {
      title: "Advanced Fed Policy Analysis with Machine Learning",
      date: "January 25, 2025",
      time: "2:00 PM ET",
      speaker: "Dr. Sarah Chen, Stanford University",
      registered: 342,
      level: "Advanced"
    },
    {
      title: "Real-time Sentiment Analysis of FOMC Communications",
      date: "February 8, 2025",
      time: "1:00 PM ET",
      speaker: "Prof. Michael Rodriguez, MIT",
      registered: 256,
      level: "Intermediate"
    }
  ];

  const datasets = [
    {
      name: "FOMC Transcript Corpus (1994-2024)",
      description: "Complete collection of Federal Reserve meeting transcripts with sentiment annotations",
      size: "2.3 GB",
      format: "JSON, CSV, Parquet",
      lastUpdated: "December 2024",
      downloads: "1,247"
    },
    {
      name: "Fed Speech Audio & Text Dataset",
      description: "Audio recordings and transcripts of Federal Reserve speeches with metadata",
      size: "15.7 GB",
      format: "WAV, MP3, TXT",
      lastUpdated: "November 2024",
      downloads: "834"
    },
    {
      name: "Market Reaction Database",
      description: "High-frequency market data around Fed announcements with event classifications",
      size: "890 MB",
      format: "Parquet, HDF5",
      lastUpdated: "December 2024",
      downloads: "2,156"
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
              <BookOpen className="w-4 h-4 mr-2" />
              Academic Research Hub
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Federal Reserve Research Library
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive collection of academic papers, datasets, and analytical tools for Federal Reserve 
              policy research and monetary analysis.
            </p>
          </div>

          <Tabs defaultValue="papers" className="space-y-8">
            <div className="flex justify-center">
              <TabsList className="grid w-full max-w-md grid-cols-3 h-12 bg-white shadow-sm border">
                <TabsTrigger value="papers" className="text-sm font-medium">Research Papers</TabsTrigger>
                <TabsTrigger value="analytics" className="text-sm font-medium">Analytics</TabsTrigger>
                <TabsTrigger value="resources" className="text-sm font-medium">Resources</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="papers" className="space-y-8">
              <ResearchPapersTable />
            </TabsContent>

            <TabsContent value="analytics" className="space-y-8">
              <ResearchAnalytics />
            </TabsContent>

            <TabsContent value="resources" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Featured Research */}
                <div className="lg:col-span-2 space-y-8">
                  <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-3 mb-4">
                        <Badge className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1">
                          Featured Research
                        </Badge>
                        <Badge variant="outline" className="text-blue-700 border-blue-200">
                          {featuredPaper.downloadCount} downloads
                        </Badge>
                      </div>
                      <CardTitle className="text-2xl leading-tight text-slate-900 mb-2">
                        {featuredPaper.title}
                      </CardTitle>
                      <p className="text-blue-700 font-medium">{featuredPaper.subtitle}</p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2 text-slate-600">
                          <Users className="w-4 h-4" />
                          <span>{featuredPaper.authors}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                          <Calendar className="w-4 h-4" />
                          <span>{featuredPaper.journal}, {featuredPaper.year}</span>
                        </div>
                      </div>
                      <p className="text-slate-700 leading-relaxed">
                        {featuredPaper.abstract}
                      </p>
                      <div className="flex flex-wrap gap-3 pt-4">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                          <Download className="w-4 h-4 mr-2" />
                          Download PDF
                        </Button>
                        <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                          View Abstract
                        </Button>
                        <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          DOI: {featuredPaper.doi}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Upcoming Webinars */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        Upcoming Webinars
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {upcomingWebinars.map((webinar, index) => (
                        <div key={index} className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="font-semibold text-slate-900 text-sm leading-tight pr-2">
                              {webinar.title}
                            </h4>
                            <Badge variant="secondary" className="text-xs">
                              {webinar.level}
                            </Badge>
                          </div>
                          <div className="space-y-2 text-sm text-slate-600">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-3 h-3" />
                              <span>{webinar.date} at {webinar.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-3 h-3" />
                              <span>{webinar.speaker}</span>
                            </div>
                            <div className="flex items-center gap-2 text-green-600">
                              <TrendingUp className="w-3 h-3" />
                              <span>{webinar.registered} registered</span>
                            </div>
                          </div>
                          <Button size="sm" className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                            Register Now
                          </Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Research Datasets */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <BookOpen className="w-5 h-5 text-blue-600" />
                        Research Datasets
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {datasets.map((dataset, index) => (
                        <div key={index} className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                          <h4 className="font-semibold text-slate-900 text-sm mb-2 leading-tight">
                            {dataset.name}
                          </h4>
                          <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                            {dataset.description}
                          </p>
                          <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 mb-3">
                            <div>Size: <span className="font-medium">{dataset.size}</span></div>
                            <div>Downloads: <span className="font-medium">{dataset.downloads}</span></div>
                            <div className="col-span-2">Format: <span className="font-medium">{dataset.format}</span></div>
                            <div className="col-span-2">Updated: <span className="font-medium">{dataset.lastUpdated}</span></div>
                          </div>
                          <Button variant="outline" size="sm" className="w-full text-xs border-blue-200 text-blue-700 hover:bg-blue-50">
                            <Download className="w-3 h-3 mr-2" />
                            Download Dataset
                          </Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Library Statistics */}
                  <Card className="border-0 shadow-sm bg-gradient-to-br from-slate-50 to-slate-100">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <TrendingUp className="w-5 h-5 text-blue-600" />
                        Library Statistics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-600">Research Papers</span>
                          <span className="text-lg font-bold text-slate-900">5</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-600">Active Datasets</span>
                          <span className="text-lg font-bold text-slate-900">3</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-600">Total Downloads</span>
                          <span className="text-lg font-bold text-blue-600">15,294</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-600">Monthly Active Users</span>
                          <span className="text-lg font-bold text-green-600">3,847</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-600">Citation Impact Score</span>
                          <span className="text-lg font-bold text-purple-600">8.9</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Research;
