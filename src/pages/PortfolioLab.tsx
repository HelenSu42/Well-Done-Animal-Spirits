import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';
import Layout from '@/components/layout/Layout';

const PortfolioLab = () => {
  const [fedFundsRate, setFedFundsRate] = useState([5.25]);
  const [scenario, setScenario] = useState('Pause');

  const portfolioData = [
    { asset: 'SPY', current: 35, proposed: 28, return: '8.2%', risk: '16.4%' },
    { asset: 'QQQ', current: 25, proposed: 32, return: '12.1%', risk: '22.3%' },
    { asset: 'TLT', current: 20, proposed: 15, return: '3.8%', risk: '8.9%' },
    { asset: 'GLD', current: 10, proposed: 12, return: '5.1%', risk: '14.2%' },
    { asset: 'VNQ', current: 10, proposed: 13, return: '7.3%', risk: '18.7%' },
  ];

  const getScenarioFromRate = (rate: number) => {
    if (rate > 5.5) return 'Hike';
    if (rate < 4.5) return 'Pivot';
    return 'Pause';
  };

  const handlePushToIB = () => {
    window.open('https://www.interactivebrokers.com/', '_blank');
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-slate-50 min-h-screen">
        {/* Enhanced Header */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-2xl p-8 text-white shadow-2xl">
            <h1 className="text-4xl font-bold mb-4">Portfolio Optimization Lab</h1>
            <p className="text-slate-300 text-lg max-w-4xl leading-relaxed">
              Design Portfolios that Anticipate Federal Reserve Policy. Advanced scenario modeling and stress-testing tools 
              for institutional-grade portfolio optimization against monetary policy shifts.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enhanced Scenario Controls */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="shadow-xl border-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-t-lg">
                <CardTitle className="text-xl">Fed Funds Rate Scenario</CardTitle>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Adjust the Federal Funds Rate to model alternative monetary policy paths. 
                  Our optimization engine updates allocations in real-time.
                </p>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Target Rate</span>
                      <Badge variant="outline" className="text-lg px-4 py-2 font-bold">{fedFundsRate[0]}%</Badge>
                    </div>
                    <Slider
                      value={fedFundsRate}
                      onValueChange={(value) => {
                        setFedFundsRate(value);
                        setScenario(getScenarioFromRate(value[0]));
                      }}
                      max={7}
                      min={2}
                      step={0.25}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-3 font-medium">
                      <span>2.0% (Dovish)</span>
                      <span>7.0% (Hawkish)</span>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <Badge 
                      variant={scenario === 'Hike' ? 'destructive' : scenario === 'Pivot' ? 'default' : 'secondary'}
                      className="text-xl px-6 py-3 font-bold"
                    >
                      {scenario} Scenario
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg">
                <CardTitle className="text-xl">Optimization Results</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                    <p className="text-sm font-bold text-green-800 mb-3 uppercase tracking-wide">Performance Enhancement</p>
                    <p className="text-sm text-green-700 leading-relaxed">
                      Proposed allocation increases expected return by <strong>38 basis points</strong> while 
                      reducing CVaR by <strong>22 basis points</strong> versus benchmark allocation.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6 text-sm">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <span className="text-slate-600 text-xs uppercase tracking-wide block mb-1">Expected Return</span>
                      <div className="font-bold text-green-600 text-lg">+38 bps</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-slate-600 text-xs uppercase tracking-wide block mb-1">CVaR Reduction</span>
                      <div className="font-bold text-blue-600 text-lg">-22 bps</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <span className="text-slate-600 text-xs uppercase tracking-wide block mb-1">Sharpe Ratio</span>
                      <div className="font-bold text-purple-600 text-lg">1.34</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <span className="text-slate-600 text-xs uppercase tracking-wide block mb-1">Max Drawdown</span>
                      <div className="font-bold text-orange-600 text-lg">-8.7%</div>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 text-lg shadow-lg hover:shadow-xl transition-all"
                    onClick={handlePushToIB}
                  >
                    <span>Push to Interactive Brokers</span>
                    <ExternalLink className="h-5 w-5 ml-2" />
                  </Button>
                  <p className="text-xs text-slate-500 text-center leading-relaxed">
                    Strategy will be dispatched to Interactive Brokers. 
                    Please review order preview in Trader Workstation before execution.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Portfolio Allocation */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-t-lg">
                <CardTitle className="text-xl">Portfolio Allocation Matrix</CardTitle>
                <div className="flex gap-3 mt-4">
                  <Button variant="outline" size="sm" className="font-medium">
                    Export Trade Tickets
                  </Button>
                  <Button variant="outline" size="sm" className="font-medium">
                    Save Strategy
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-slate-200">
                        <th className="text-left p-4 font-bold text-slate-700 uppercase tracking-wide">Asset</th>
                        <th className="text-center p-4 font-bold text-slate-700 uppercase tracking-wide">Current %</th>
                        <th className="text-center p-4 font-bold text-slate-700 uppercase tracking-wide">Proposed %</th>
                        <th className="text-center p-4 font-bold text-slate-700 uppercase tracking-wide">Change</th>
                        <th className="text-center p-4 font-bold text-slate-700 uppercase tracking-wide">Expected Return</th>
                        <th className="text-center p-4 font-bold text-slate-700 uppercase tracking-wide">Risk</th>
                      </tr>
                    </thead>
                    <tbody>
                      {portfolioData.map((item, index) => {
                        const change = item.proposed - item.current;
                        return (
                          <tr key={index} className="border-b hover:bg-slate-50 transition-colors">
                            <td className="p-4 font-bold text-slate-900">{item.asset}</td>
                            <td className="p-4 text-center font-medium">{item.current}%</td>
                            <td className="p-4 text-center font-bold text-blue-600">{item.proposed}%</td>
                            <td className="p-4 text-center">
                              <span className={`font-bold ${change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-slate-600'}`}>
                                {change > 0 ? '+' : ''}{change}%
                              </span>
                            </td>
                            <td className="p-4 text-center text-green-600 font-semibold">{item.return}</td>
                            <td className="p-4 text-center text-slate-600 font-medium">{item.risk}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl border border-slate-200">
                  <h4 className="font-bold mb-4 text-slate-900 text-lg">Portfolio Risk Summary</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                    <div className="text-center">
                      <span className="text-slate-600 text-xs uppercase tracking-wide block mb-1">Total Allocation</span>
                      <div className="font-bold text-slate-900 text-lg">100%</div>
                    </div>
                    <div className="text-center">
                      <span className="text-slate-600 text-xs uppercase tracking-wide block mb-1">Risk Budget</span>
                      <div className="font-bold text-slate-900 text-lg">15.2%</div>
                    </div>
                    <div className="text-center">
                      <span className="text-slate-600 text-xs uppercase tracking-wide block mb-1">Beta to SPY</span>
                      <div className="font-bold text-slate-900 text-lg">0.87</div>
                    </div>
                    <div className="text-center">
                      <span className="text-slate-600 text-xs uppercase tracking-wide block mb-1">Correlation</span>
                      <div className="font-bold text-slate-900 text-lg">0.73</div>
                    </div>
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

export default PortfolioLab;
