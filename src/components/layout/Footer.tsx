
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <span className="text-white text-xl font-semibold">FedAnalysis</span>
            </div>
            <p className="text-slate-400 text-sm max-w-md">
              Turning every Fed word, tone, and gesture into measurable alpha.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-medium mb-4">Product</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/fed-monitor" className="text-slate-400 hover:text-blue-400 transition-colors">Fed Monitor</Link></li>
              <li><Link to="/impact" className="text-slate-400 hover:text-blue-400 transition-colors">Impact Dashboard</Link></li>
              <li><Link to="/portfolio-lab" className="text-slate-400 hover:text-blue-400 transition-colors">Portfolio Lab</Link></li>
              <li><Link to="/analysts" className="text-slate-400 hover:text-blue-400 transition-colors">LLM Analysts</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-medium mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="text-slate-400 hover:text-blue-400 transition-colors">About</Link></li>
              <li><Link to="/security" className="text-slate-400 hover:text-blue-400 transition-colors">Security</Link></li>
              <li><Link to="/support" className="text-slate-400 hover:text-blue-400 transition-colors">Support</Link></li>
              <li><Link to="/pricing" className="text-slate-400 hover:text-blue-400 transition-colors">Pricing</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-800">
          <p className="text-slate-400 text-sm text-center">
            © 2025 FedAnalysis Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
