
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/layout/Layout';

const Account = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const accountData = {
    plan: 'Plus',
    billing: 'Annual',
    nextInvoice: '14 Oct 2025',
    amount: '$2,988',
    apiUsage: {
      used: 117248,
      limit: 250000,
      percentage: 47
    }
  };

  const billingHistory = [
    { date: '14 Oct 2024', amount: '$2,988', status: 'Paid', invoice: 'INV-2024-001' },
    { date: '14 Oct 2023', amount: '$2,988', status: 'Paid', invoice: 'INV-2023-001' },
    { date: '14 Oct 2022', amount: '$2,400', status: 'Paid', invoice: 'INV-2022-001' }
  ];

  const teamMembers = [
    { name: 'John Smith', email: 'john@company.com', role: 'Admin', status: 'Active' },
    { name: 'Sarah Johnson', email: 'sarah@company.com', role: 'User', status: 'Active' },
    { name: 'Mike Chen', email: 'mike@company.com', role: 'User', status: 'Pending' }
  ];

  const apiKeys = [
    { name: 'Production API', key: 'fa_prod_****_ab12', created: '2024-01-15', lastUsed: '2024-12-18' },
    { name: 'Development API', key: 'fa_dev_****_cd34', created: '2024-03-22', lastUsed: '2024-12-17' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'billing', label: 'Billing' },
    { id: 'team', label: 'Team' },
    { id: 'api', label: 'API Keys' },
    { id: 'settings', label: 'Settings' }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Account Portal</h1>
          <p className="text-slate-600">Manage your subscription, team, and API access.</p>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-slate-200 mb-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Subscription Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Subscription Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">Current Plan</h4>
                      <Badge className="bg-blue-100 text-blue-800 text-lg px-3 py-1">
                        {accountData.plan} ({accountData.billing})
                      </Badge>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">Next Invoice</h4>
                      <div>
                        <div className="text-lg font-semibold">{accountData.nextInvoice}</div>
                        <div className="text-slate-600">{accountData.amount}</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex gap-3">
                    <Button variant="outline">Change Plan</Button>
                    <Button variant="outline">Update Payment Method</Button>
                  </div>
                  <p className="text-sm text-slate-600 mt-4">
                    You're on Plus (annual). Next invoice: 14 Oct 2025 — $2,988.
                  </p>
                </CardContent>
              </Card>

              {/* API Usage */}
              <Card>
                <CardHeader>
                  <CardTitle>API Usage</CardTitle>
                  <p className="text-slate-600">117,248 calls used of 250,000 monthly quota.</p>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Monthly Usage</span>
                      <span>{accountData.apiUsage.used.toLocaleString()} / {accountData.apiUsage.limit.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${accountData.apiUsage.percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      {accountData.apiUsage.percentage}% of quota used
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-600">Reset Date</span>
                      <div className="font-semibold">Jan 1, 2025</div>
                    </div>
                    <div>
                      <span className="text-slate-600">Overage Rate</span>
                      <div className="font-semibold">$0.0008/call</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      📊 View Usage Analytics
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      🔑 Generate API Key
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      👥 Invite Team Member
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      📋 Download Invoice
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button className="w-full" variant="outline">
                      💬 Contact Support
                    </Button>
                    <Button className="w-full" variant="outline">
                      📚 View Documentation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Billing Tab */}
        {activeTab === 'billing' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-medium">Date</th>
                        <th className="text-left p-3 font-medium">Amount</th>
                        <th className="text-left p-3 font-medium">Status</th>
                        <th className="text-left p-3 font-medium">Invoice</th>
                        <th className="text-left p-3 font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {billingHistory.map((item, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-3">{item.date}</td>
                          <td className="p-3 font-semibold">{item.amount}</td>
                          <td className="p-3">
                            <Badge className="bg-green-100 text-green-800">{item.status}</Badge>
                          </td>
                          <td className="p-3 font-mono text-sm">{item.invoice}</td>
                          <td className="p-3">
                            <Button variant="outline" size="sm">Download</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Team Tab */}
        {activeTab === 'team' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Team Management</CardTitle>
                  <Button>Invite Member</Button>
                </div>
                <p className="text-slate-600">Admins can invite up to 25 seats. Additional seats $99 each.</p>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-medium">Name</th>
                        <th className="text-left p-3 font-medium">Email</th>
                        <th className="text-left p-3 font-medium">Role</th>
                        <th className="text-left p-3 font-medium">Status</th>
                        <th className="text-left p-3 font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teamMembers.map((member, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-3 font-medium">{member.name}</td>
                          <td className="p-3 text-slate-600">{member.email}</td>
                          <td className="p-3">
                            <Badge variant={member.role === 'Admin' ? 'default' : 'secondary'}>
                              {member.role}
                            </Badge>
                          </td>
                          <td className="p-3">
                            <Badge 
                              className={member.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                            >
                              {member.status}
                            </Badge>
                          </td>
                          <td className="p-3">
                            <Button variant="outline" size="sm">Edit</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* API Keys Tab */}
        {activeTab === 'api' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>API Keys</CardTitle>
                  <Button>Generate New Key</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {apiKeys.map((key, index) => (
                    <div key={index} className="p-4 border border-slate-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-slate-900">{key.name}</h4>
                          <p className="text-sm font-mono text-slate-600">{key.key}</p>
                          <div className="flex gap-4 text-xs text-slate-500 mt-2">
                            <span>Created: {key.created}</span>
                            <span>Last used: {key.lastUsed}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Copy</Button>
                          <Button variant="outline" size="sm">Regenerate</Button>
                          <Button variant="outline" size="sm">Delete</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-slate-900 mb-3">Notification Preferences</h4>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-3" defaultChecked />
                        Email alerts for FOMC events
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-3" defaultChecked />
                        SMS alerts for high-impact events
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-3" />
                        Weekly summary reports
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-slate-900 mb-3">Data Export</h4>
                    <div className="flex gap-3">
                      <Button variant="outline">Export Account Data</Button>
                      <Button variant="outline">Download Usage Report</Button>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-slate-900 mb-3">Danger Zone</h4>
                    <Button variant="destructive">Cancel Subscription</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Account;
