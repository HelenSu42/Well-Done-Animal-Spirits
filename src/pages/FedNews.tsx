
import React from 'react';
import Layout from '@/components/layout/Layout';
import FedNewsDashboard from '@/components/news/FedNewsDashboard';

const FedNews = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FedNewsDashboard />
      </div>
    </Layout>
  );
};

export default FedNews;
