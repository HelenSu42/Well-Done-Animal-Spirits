
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/layout/Layout';

const Security = () => {
  const certifications = [
    {
      name: 'SOC 2 Type II',
      status: 'Certified',
      issueDate: 'November 2026',
      description: 'Independent audit of security controls, availability, and confidentiality',
      badge: 'bg-green-100 text-green-800'
    },
    {
      name: 'ISO 27001',
      status: 'In Progress',
      issueDate: 'Target Q2 2027',
      description: 'International standard for information security management systems',
      badge: 'bg-yellow-100 text-yellow-800'
    },
    {
      name: 'GDPR Compliance',
      status: 'Compliant',
      issueDate: 'May 2025',
      description: 'EU-hosted cluster with compliant Data Processing Agreement',
      badge: 'bg-blue-100 text-blue-800'
    },
    {
      name: 'CCPA Compliance',
      status: 'Compliant',
      issueDate: 'June 2025',
      description: 'California Consumer Privacy Act compliance framework',
      badge: 'bg-purple-100 text-purple-800'
    }
  ];

  const securityMeasures = [
    {
      category: 'Data Protection',
      icon: '🔒',
      measures: [
        'AES-256-GCM encryption at rest',
        'TLS 1.3 encryption in transit',
        'End-to-end encryption for sensitive data',
        'Regular encryption key rotation'
      ]
    },
    {
      category: 'Access Control',
      icon: '🔑',
      measures: [
        'Multi-factor authentication (MFA)',
        'Role-based access control (RBAC)',
        'Single Sign-On (SSO) integration',
        'Regular access reviews and audits'
      ]
    },
    {
      category: 'Infrastructure',
      icon: '🏗️',
      measures: [
        'AWS cloud infrastructure',
        'Auto-scaling and load balancing',
        'DDoS protection and WAF',
        'Isolated production environments'
      ]
    },
    {
      category: 'Monitoring',
      icon: '👁️',
      measures: [
        '24/7 security monitoring',
        'Intrusion detection systems',
        'Automated threat response',
        'Comprehensive audit logging'
      ]
    }
  ];

  const privacyFeatures = [
    {
      title: 'Data Minimization',
      description: 'We collect only the data necessary to provide our services and delete it when no longer needed.'
    },
    {
      title: 'User Control',
      description: 'Users can export, modify, or delete their data at any time through our self-service portal.'
    },
    {
      title: 'Anonymization',
      description: 'Personal data is anonymized in analytics and research datasets to protect user privacy.'
    },
    {
      title: 'Geographic Data Residency',
      description: 'EU customer data is stored exclusively in EU data centers to comply with local regulations.'
    }
  ];

  const incidentResponse = [
    {
      step: '1',
      title: 'Detection & Assessment',
      description: 'Automated monitoring systems detect potential security incidents within minutes'
    },
    {
      step: '2',
      title: 'Containment',
      description: 'Immediate isolation of affected systems to prevent spread of potential breach'
    },
    {
      step: '3',
      title: 'Investigation',
      description: 'Forensic analysis to determine scope, cause, and impact of the incident'
    },
    {
      step: '4',
      title: 'Communication',
      description: 'Transparent communication with affected customers within 72 hours'
    },
    {
      step: '5',
      title: 'Recovery',
      description: 'System restoration and implementation of additional safeguards'
    }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Security & Compliance</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Enterprise-grade security and comprehensive compliance framework protecting your data and ensuring regulatory adherence.
          </p>
        </div>

        {/* Certifications */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Certifications & Compliance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{cert.name}</CardTitle>
                    <Badge className={cert.badge}>{cert.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-3">{cert.description}</p>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <span>📅</span>
                    <span>{cert.issueDate}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Security Measures */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Security Framework</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {securityMeasures.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <span className="text-2xl">{category.icon}</span>
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.measures.map((measure, measureIndex) => (
                      <li key={measureIndex} className="flex items-center text-sm">
                        <span className="text-green-500 mr-3">✓</span>
                        {measure}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Encryption Details */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle>Encryption & Key Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">Data at Rest</h4>
                <p className="text-slate-600 text-sm mb-4">
                  All data encrypted in transit (TLS 1.3) and at rest (AES-256-GCM). Keys managed via AWS KMS 
                  with automatic rotation and hardware security modules (HSMs).
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Algorithm:</span>
                    <span className="font-mono">AES-256-GCM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Key Management:</span>
                    <span className="font-mono">AWS KMS</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rotation:</span>
                    <span className="font-mono">Automatic (90 days)</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">Data in Transit</h4>
                <p className="text-slate-600 text-sm mb-4">
                  All communications use TLS 1.3 with perfect forward secrecy. API endpoints require 
                  certificate pinning and support HSTS with preload directive.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Protocol:</span>
                    <span className="font-mono">TLS 1.3</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cipher Suite:</span>
                    <span className="font-mono">ECDHE-RSA-AES256</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Certificate:</span>
                    <span className="font-mono">Extended Validation</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Privacy Protection</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {privacyFeatures.map((feature, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h4 className="font-semibold text-slate-900 mb-3">{feature.title}</h4>
                  <p className="text-slate-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Incident Response */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Incident Response Process</h2>
          <div className="space-y-6">
            {incidentResponse.map((step, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">{step.title}</h4>
                      <p className="text-slate-600 text-sm">{step.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Security Team */}
        <Card className="bg-gradient-to-r from-slate-900 to-blue-900 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Security Questions or Concerns?</h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Our security team is available to answer questions about our security practices, 
              compliance status, or to discuss enterprise security requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-white text-slate-900 rounded-lg font-medium hover:bg-slate-100 transition-colors">
                Contact Security Team
              </button>
              <button className="px-6 py-3 border border-white rounded-lg font-medium hover:bg-white hover:text-slate-900 transition-colors">
                Report Vulnerability
              </button>
            </div>
            <p className="text-slate-400 text-sm mt-4">
              🔒 security@fedanalysis.com | PGP Key: 4096R/ABC123DE
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Security;
