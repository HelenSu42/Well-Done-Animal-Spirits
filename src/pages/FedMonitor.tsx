
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/components/layout/Layout';
import { Calendar, ExternalLink, FileText, Video, Clock, Star, Download } from 'lucide-react';

interface FOMCMeeting {
  dates: string;
  month: string;
  year: string;
  hasProjections?: boolean;
  statement?: {
    pdf: string;
    html: string;
  };
  implementationNote?: string;
  pressConference?: string;
  projectionMaterials?: {
    pdf: string;
    html: string;
  };
  minutes?: {
    pdf: string;
    html: string;
    releaseDate: string;
  };
  longerRunGoals?: string;
  balanceSheetPrinciples?: string;
  balanceSheetPlans?: string;
  isUnscheduled?: boolean;
  isNotationVote?: boolean;
  isCancelled?: boolean;
}

const FedMonitor = () => {
  const [selectedYear, setSelectedYear] = useState('2025');
  const [nextMeetingCountdown, setNextMeetingCountdown] = useState('');

  // Calculate countdown to next meeting (March 18-19, 2025)
  useEffect(() => {
    const updateCountdown = () => {
      const nextMeeting = new Date('2025-03-18T14:30:00');
      const now = new Date();
      const diff = nextMeeting.getTime() - now.getTime();

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        setNextMeetingCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      } else {
        setNextMeetingCountdown('Meeting in progress or concluded');
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const meetingsData: Record<string, FOMCMeeting[]> = {
    '2025': [
      {
        dates: '28-29',
        month: 'January',
        year: '2025',
        statement: {
          pdf: 'https://www.federalreserve.gov/monetarypolicy/files/monetary20250129a1.pdf',
          html: 'https://www.federalreserve.gov/newsevents/pressreleases/monetary20250129a.htm'
        },
        implementationNote: 'https://www.federalreserve.gov/newsevents/pressreleases/monetary20250129a1.htm',
        pressConference: 'https://www.federalreserve.gov/monetarypolicy/fomcpresconf20250129.htm',
        minutes: {
          pdf: 'https://www.federalreserve.gov/monetarypolicy/files/fomcminutes20250129.pdf',
          html: 'https://www.federalreserve.gov/monetarypolicy/fomcminutes20250129.htm',
          releaseDate: 'February 19, 2025'
        }
      },
      {
        dates: '18-19',
        month: 'March',
        year: '2025',
        hasProjections: true,
        statement: {
          pdf: 'https://www.federalreserve.gov/monetarypolicy/files/monetary20250319a1.pdf',
          html: 'https://www.federalreserve.gov/newsevents/pressreleases/monetary20250319a.htm'
        },
        implementationNote: 'https://www.federalreserve.gov/newsevents/pressreleases/monetary20250319a1.htm',
        pressConference: 'https://www.federalreserve.gov/monetarypolicy/fomcpresconf20250319.htm',
        projectionMaterials: {
          pdf: 'https://www.federalreserve.gov/monetarypolicy/files/fomcprojtabl20250319.pdf',
          html: 'https://www.federalreserve.gov/monetarypolicy/fomcprojtabl20250319.htm'
        },
        minutes: {
          pdf: 'https://www.federalreserve.gov/monetarypolicy/files/fomcminutes20250319.pdf',
          html: 'https://www.federalreserve.gov/monetarypolicy/fomcminutes20250319.htm',
          releaseDate: 'April 09, 2025'
        }
      },
      {
        dates: '6-7',
        month: 'May',
        year: '2025'
      },
      {
        dates: '17-18',
        month: 'June',
        year: '2025',
        hasProjections: true
      },
      {
        dates: '29-30',
        month: 'July',
        year: '2025'
      },
      {
        dates: '16-17',
        month: 'September',
        year: '2025',
        hasProjections: true
      },
      {
        dates: '28-29',
        month: 'October',
        year: '2025'
      },
      {
        dates: '9-10',
        month: 'December',
        year: '2025',
        hasProjections: true
      }
    ],
    '2024': [
      {
        dates: '30-31',
        month: 'January',
        year: '2024',
        statement: {
          pdf: 'https://www.federalreserve.gov/monetarypolicy/files/monetary20240131a1.pdf',
          html: 'https://www.federalreserve.gov/newsevents/pressreleases/monetary20240131a.htm'
        },
        implementationNote: 'https://www.federalreserve.gov/newsevents/pressreleases/monetary20240131a1.htm',
        pressConference: 'https://www.federalreserve.gov/monetarypolicy/fomcpresconf20240131.htm',
        longerRunGoals: 'https://www.federalreserve.gov/newsevents/pressreleases/monetary20240131b.htm',
        minutes: {
          pdf: 'https://www.federalreserve.gov/monetarypolicy/files/fomcminutes20240131.pdf',
          html: 'https://www.federalreserve.gov/monetarypolicy/fomcminutes20240131.htm',
          releaseDate: 'February 21, 2024'
        }
      },
      {
        dates: '19-20',
        month: 'March',
        year: '2024',
        hasProjections: true,
        statement: {
          pdf: 'https://www.federalreserve.gov/monetarypolicy/files/monetary20240320a1.pdf',
          html: 'https://www.federalreserve.gov/newsevents/pressreleases/monetary20240320a.htm'
        },
        implementationNote: 'https://www.federalreserve.gov/newsevents/pressreleases/monetary20240320a1.htm',
        pressConference: 'https://www.federalreserve.gov/monetarypolicy/fomcpresconf20240320.htm',
        projectionMaterials: {
          pdf: 'https://www.federalreserve.gov/monetarypolicy/files/fomcprojtabl20240320.pdf',
          html: 'https://www.federalreserve.gov/monetarypolicy/fomcprojtabl20240320.htm'
        },
        minutes: {
          pdf: 'https://www.federalreserve.gov/monetarypolicy/files/fomcminutes20240320.pdf',
          html: 'https://www.federalreserve.gov/monetarypolicy/fomcminutes20240320.htm',
          releaseDate: 'April 10, 2024'
        }
      },
      {
        dates: '30-1',
        month: 'Apr/May',
        year: '2024',
        statement: {
          pdf: 'https://www.federalreserve.gov/monetarypolicy/files/monetary20240501a1.pdf',
          html: 'https://www.federalreserve.gov/newsevents/pressreleases/monetary20240501a.htm'
        },
        pressConference: 'https://www.federalreserve.gov/monetarypolicy/fomcpresconf20240501.htm',
        minutes: {
          pdf: 'https://www.federalreserve.gov/monetarypolicy/files/fomcminutes20240501.pdf',
          html: 'https://www.federalreserve.gov/monetarypolicy/fomcminutes20240501.htm',
          releaseDate: 'May 22, 2024'
        }
      },
      {
        dates: '11-12',
        month: 'June',
        year: '2024',
        hasProjections: true,
        statement: {
          pdf: 'https://www.federalreserve.gov/monetarypolicy/files/monetary20240612a1.pdf',
          html: 'https://www.federalreserve.gov/newsevents/pressreleases/monetary20240612a.htm'
        },
        pressConference: 'https://www.federalreserve.gov/monetarypolicy/fomcpresconf20240612.htm',
        projectionMaterials: {
          pdf: 'https://www.federalreserve.gov/monetarypolicy/files/fomcprojtabl20240612.pdf',
          html: 'https://www.federalreserve.gov/monetarypolicy/fomcprojtabl20240612.htm'
        },
        minutes: {
          pdf: 'https://www.federalreserve.gov/monetarypolicy/files/fomcminutes20240612.pdf',
          html: 'https://www.federalreserve.gov/monetarypolicy/fomcminutes20240612.htm',
          releaseDate: 'July 03, 2024'
        }
      },
      {
        dates: '30-31',
        month: 'July',
        year: '2024',
        statement: {
          pdf: 'https://www.federalreserve.gov/monetarypolicy/files/monetary20240731a1.pdf',
          html: 'https://www.federalreserve.gov/newsevents/pressreleases/monetary20240731a.htm'
        },
        pressConference: 'https://www.federalreserve.gov/monetarypolicy/fomcpresconf20240731.htm',
        minutes: {
          pdf: 'https://www.federalreserve.gov/monetarypolicy/files/fomcminutes20240731.pdf',
          html: 'https://www.federalreserve.gov/monetarypolicy/fomcminutes20240731.htm',
          releaseDate: 'August 21, 2024'
        }
      },
      {
        dates: '17-18',
        month: 'September',
        year: '2024',
        hasProjections: true,
        statement: {
          pdf: 'https://www.federalreserve.gov/monetarypolicy/files/monetary20240918a1.pdf',
          html: 'https://www.federalreserve.gov/newsevents/pressreleases/monetary20240918a.htm'
        },
        pressConference: 'https://www.federalreserve.gov/monetarypolicy/fomcpresconf20240918.htm',
        projectionMaterials: {
          pdf: 'https://www.federalreserve.gov/monetarypolicy/files/fomcprojtabl20240918.pdf',
          html: 'https://www.federalreserve.gov/monetarypolicy/fomcprojtabl20240918.htm'
        },
        minutes: {
          pdf: 'https://www.federalreserve.gov/monetarypolicy/files/fomcminutes20240918.pdf',
          html: 'https://www.federalreserve.gov/monetarypolicy/fomcminutes20240918.htm',
          releaseDate: 'October 09, 2024'
        }
      },
      {
        dates: '6-7',
        month: 'November',
        year: '2024',
        statement: {
          pdf: 'https://www.federalreserve.gov/monetarypolicy/files/monetary20241107a1.pdf',
          html: 'https://www.federalreserve.gov/newsevents/pressreleases/monetary20241107a.htm'
        },
        pressConference: 'https://www.federalreserve.gov/monetarypolicy/fomcpresconf20241107.htm',
        minutes: {
          pdf: 'https://www.federalreserve.gov/monetarypolicy/files/fomcminutes20241107.pdf',
          html: 'https://www.federalreserve.gov/monetarypolicy/fomcminutes20241107.htm',
          releaseDate: 'November 26, 2024'
        }
      },
      {
        dates: '17-18',
        month: 'December',
        year: '2024',
        hasProjections: true,
        statement: {
          pdf: 'https://www.federalreserve.gov/monetarypolicy/files/monetary20241218a1.pdf',
          html: 'https://www.federalreserve.gov/newsevents/pressreleases/monetary20241218a.htm'
        },
        pressConference: 'https://www.federalreserve.gov/monetarypolicy/fomcpresconf20241218.htm',
        projectionMaterials: {
          pdf: 'https://www.federalreserve.gov/monetarypolicy/files/fomcprojtabl20241218.pdf',
          html: 'https://www.federalreserve.gov/monetarypolicy/fomcprojtabl20241218.htm'
        },
        minutes: {
          pdf: 'https://www.federalreserve.gov/monetarypolicy/files/fomcminutes20241218.pdf',
          html: 'https://www.federalreserve.gov/monetarypolicy/fomcminutes20241218.htm',
          releaseDate: 'January 08, 2025'
        }
      }
    ]
  };

  const marketData = {
    spx: '+0.42',
    nq: '+0.67',
    gold: '-0.15',
    two_year: '+3.2',
    vix: '-2.1'
  };

  const MeetingCard = ({ meeting }: { meeting: FOMCMeeting }) => (
    <Card className="mb-6 border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-blue-600" />
            <div>
              <CardTitle className="text-lg">
                {meeting.month} {meeting.dates}, {meeting.year}
              </CardTitle>
              {meeting.hasProjections && (
                <Badge variant="secondary" className="mt-1 bg-green-100 text-green-800">
                  <Star className="h-3 w-3 mr-1" />
                  Economic Projections
                </Badge>
              )}
            </div>
          </div>
          {meeting.isUnscheduled && (
            <Badge variant="destructive">Unscheduled</Badge>
          )}
          {meeting.isCancelled && (
            <Badge variant="outline" className="bg-red-50 text-red-700">Cancelled</Badge>
          )}
          {meeting.isNotationVote && (
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700">Notation Vote</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {meeting.statement && (
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-slate-700 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Statement
              </h4>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" asChild>
                  <a href={meeting.statement.pdf} target="_blank" rel="noopener noreferrer">
                    <Download className="h-3 w-3 mr-1" />
                    PDF
                  </a>
                </Button>
                <Button size="sm" variant="outline" asChild>
                  <a href={meeting.statement.html} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    HTML
                  </a>
                </Button>
              </div>
            </div>
          )}

          {meeting.pressConference && (
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-slate-700 flex items-center gap-2">
                <Video className="h-4 w-4" />
                Press Conference
              </h4>
              <Button size="sm" variant="outline" asChild>
                <a href={meeting.pressConference} target="_blank" rel="noopener noreferrer">
                  <Video className="h-3 w-3 mr-1" />
                  Watch
                </a>
              </Button>
            </div>
          )}

          {meeting.projectionMaterials && (
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-slate-700 flex items-center gap-2">
                <Star className="h-4 w-4" />
                Projection Materials
              </h4>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" asChild>
                  <a href={meeting.projectionMaterials.pdf} target="_blank" rel="noopener noreferrer">
                    <Download className="h-3 w-3 mr-1" />
                    PDF
                  </a>
                </Button>
                <Button size="sm" variant="outline" asChild>
                  <a href={meeting.projectionMaterials.html} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    HTML
                  </a>
                </Button>
              </div>
            </div>
          )}

          {meeting.minutes && (
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-slate-700 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Minutes
              </h4>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" asChild>
                  <a href={meeting.minutes.pdf} target="_blank" rel="noopener noreferrer">
                    <Download className="h-3 w-3 mr-1" />
                    PDF
                  </a>
                </Button>
                <Button size="sm" variant="outline" asChild>
                  <a href={meeting.minutes.html} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    HTML
                  </a>
                </Button>
              </div>
              <p className="text-xs text-slate-500">Released {meeting.minutes.releaseDate}</p>
            </div>
          )}

          {meeting.longerRunGoals && (
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-slate-700">Longer-Run Goals</h4>
              <Button size="sm" variant="outline" asChild>
                <a href={meeting.longerRunGoals} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  View
                </a>
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Federal Reserve Monitor</h1>
          <p className="text-slate-600 text-lg">
            Comprehensive tracking of FOMC meetings, statements, and monetary policy decisions
          </p>
        </div>

        {/* Next Meeting Countdown */}
        <Card className="mb-8 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  Next FOMC Meeting: March 18-19, 2025
                </h2>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <span className="text-lg font-mono text-blue-600">{nextMeetingCountdown}</span>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <Star className="h-3 w-3 mr-1" />
                    Economic Projections
                  </Badge>
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex gap-2">
                <Button variant="outline" size="sm">Add to Calendar</Button>
                <Button variant="outline" size="sm">Set Reminder</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={selectedYear} onValueChange={setSelectedYear} className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="2025">2025</TabsTrigger>
                <TabsTrigger value="2024">2024</TabsTrigger>
                <TabsTrigger value="2023">2023</TabsTrigger>
                <TabsTrigger value="2022">2022</TabsTrigger>
                <TabsTrigger value="2021">2021</TabsTrigger>
                <TabsTrigger value="2020">2020</TabsTrigger>
              </TabsList>
              
              {Object.entries(meetingsData).map(([year, meetings]) => (
                <TabsContent key={year} value={year} className="mt-6">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold text-slate-900">{year} FOMC Meetings</h3>
                      <Badge variant="outline" className="text-sm">
                        {meetings.length} Meetings
                      </Badge>
                    </div>
                    {meetings.map((meeting, index) => (
                      <MeetingCard key={index} meeting={meeting} />
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Market Data */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Market Snapshot</CardTitle>
                <p className="text-sm text-slate-600">Live market data</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">S&P 500</span>
                    <span className={`font-mono ${marketData.spx.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {marketData.spx}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">NASDAQ</span>
                    <span className={`font-mono ${marketData.nq.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {marketData.nq}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Gold</span>
                    <span className={`font-mono ${marketData.gold.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {marketData.gold}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">2-Year Treasury</span>
                    <span className={`font-mono ${marketData.two_year.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {marketData.two_year} bp
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">VIX</span>
                    <span className={`font-mono ${marketData.vix.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {marketData.vix}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Access</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                    <a href="https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm" target="_blank" rel="noopener noreferrer">
                      <Calendar className="h-4 w-4 mr-2" />
                      FOMC Calendar
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                    <a href="https://www.federalreserve.gov/monetarypolicy/fomc.htm" target="_blank" rel="noopener noreferrer">
                      <FileText className="h-4 w-4 mr-2" />
                      FOMC Statements
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                    <a href="https://www.federalreserve.gov/monetarypolicy/fomcminutes.htm" target="_blank" rel="noopener noreferrer">
                      <FileText className="h-4 w-4 mr-2" />
                      Meeting Minutes
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                    <a href="https://www.federalreserve.gov/monetarypolicy/fomcpresconf.htm" target="_blank" rel="noopener noreferrer">
                      <Video className="h-4 w-4 mr-2" />
                      Press Conferences
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Legend */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Legend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-green-600" />
                    <span>Economic Projections Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Video className="h-4 w-4 text-blue-600" />
                    <span>Press Conference</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-slate-600" />
                    <span>Statement & Minutes</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FedMonitor;
