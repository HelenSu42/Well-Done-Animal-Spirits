
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/layout/Layout';

const ImpactDashboard = () => {
  const compositeScore = 0.34;
  
  const heatmapData = [
    { asset: 'SPX', '5min': 0.12, '1hr': 0.34, '1day': 0.67, '1week': 1.23 },
    { asset: 'NQ', '5min': 0.18, '1hr': 0.45, '1day': 0.89, '1week': 1.56 },
    { asset: 'Gold', '5min': -0.08, '1hr': -0.12, '1day': -0.23, '1week': -0.45 },
    { asset: 'USD/EUR', '5min': 0.05, '1hr': 0.15, '1day': 0.28, '1week': 0.42 },
    { asset: '2Y Treasury', '5min': 0.03, '1hr': 0.08, '1day': 0.15, '1week': 0.24 },
    { asset: '10Y Treasury', '5min': 0.02, '1hr': 0.06, '1day': 0.12, '1week': 0.19 },
  ];

  const timeframes = ['5min', '1hr', '1day', '1week'];

  const getCellColor = (value: number) => {
    if (Math.abs(value) < 0.05) return 'bg-slate-100';
    if (value > 0) {
      if (value > 0.5) return 'bg-green-500 text-white';
      if (value > 0.2) return 'bg-green-300';
      return 'bg-green-100';
    } else {
      if (value < -0.5) return 'bg-red-500 text-white';
      if (value < -0.2) return 'bg-red-300';
      return 'bg-red-100';
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Impact Dashboard</h1>
          <p className="text-slate-600 max-w-3xl">
            See how today's policy signals propagate across equity, rates, FX, and commodity complexes—from 5 minutes to one week.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Sentiment Gauge */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Composite Sentiment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <div className="absolute inset-0 rounded-full border-8 border-slate-200"></div>
                  <div 
                    className="absolute inset-0 rounded-full border-8 border-blue-500 border-t-transparent transform -rotate-90"
                    style={{ clipPath: `circle(${Math.abs(compositeScore) * 50}% at 50% 50%)` }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">{compositeScore}</span>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Dovish</span>
                  <span>Hawkish</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Legend */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Impact Heatmap Legend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-400 rounded"></div>
                  <span>Positive % move</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-400 rounded"></div>
                  <span>Negative % move</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-slate-100 border rounded"></div>
                  <span>less than |0.05%|</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Impact Heatmap */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Market Impact Heatmap</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Export PNG</Button>
                <Button variant="outline" size="sm">Download CSV</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left p-3 font-medium text-slate-700">Asset</th>
                    {timeframes.map(timeframe => (
                      <th key={timeframe} className="text-center p-3 font-medium text-slate-700 min-w-[100px]">
                        {timeframe}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {heatmapData.map((row, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-3 font-medium text-slate-900">{row.asset}</td>
                      {timeframes.map(timeframe => {
                        const value = row[timeframe as keyof typeof row] as number;
                        return (
                          <td key={timeframe} className="p-1">
                            <div className={`p-2 rounded text-center font-mono text-sm ${getCellColor(value)}`}>
                              {value > 0 ? '+' : ''}{value.toFixed(2)}%
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Factor Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Factor Panel Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-slate-900 mb-2">Rate-Path Factor</h4>
                <p className="text-sm text-slate-600 mb-4">
                  Represents the first principal component of Eurodollar futures beyond 12 months.
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Current: +0.23</Badge>
                  <Badge variant="outline">1D Change: +0.08</Badge>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-slate-900 mb-2">Volatility Factor</h4>
                <p className="text-sm text-slate-600 mb-4">
                  Captures systematic volatility changes across asset classes.
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Current: -0.15</Badge>
                  <Badge variant="outline">1D Change: -0.04</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ImpactDashboard;
