'use client';

import Sidebar from '@/components/dashboard/sidebar';
import { mockInsights, mockCompanies } from '@/data/mockData';
import { Sparkles, TrendingUp, Zap, Brain, CheckCircle } from 'lucide-react';

export default function InsightsPage() {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'market':
        return <TrendingUp className="w-5 h-5" />;
      case 'hiring':
        return <Zap className="w-5 h-5" />;
      case 'technology':
        return <Brain className="w-5 h-5" />;
      case 'growth':
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'market':
        return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50';
      case 'hiring':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'technology':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/50';
      case 'growth':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'text-green-400';
    if (confidence >= 0.8) return 'text-yellow-400';
    return 'text-orange-400';
  };

  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar />

      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-black/50 border-b border-white/10 backdrop-blur-xl">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold text-white">AI Insights</h1>
            <p className="text-sm text-gray-400 mt-1">Strategic insights powered by artificial intelligence</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Insights Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockInsights.map((insight) => (
              <div
                key={insight.id}
                className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/50 transition duration-300"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className={`p-2 rounded-lg border ${getCategoryColor(insight.category)}`}>
                        {getCategoryIcon(insight.category)}
                      </div>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getCategoryColor(insight.category)}`}>
                        {insight.category.charAt(0).toUpperCase() + insight.category.slice(1)}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mt-2">{insight.title}</h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 mb-4">{insight.description}</p>

                {/* Stats */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Confidence</p>
                    <p className={`text-lg font-bold ${getConfidenceColor(insight.confidence)}`}>
                      {(insight.confidence * 100).toFixed(0)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Companies Impacted</p>
                    <p className="text-lg font-bold text-cyan-400">{insight.companies.length}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Date</p>
                    <p className="text-sm text-gray-300">{insight.date}</p>
                  </div>
                </div>

                {/* Related Companies */}
                <div>
                  <p className="text-xs text-gray-400 mb-3">Related Companies</p>
                  <div className="flex flex-wrap gap-2">
                    {insight.companies.map((companyId) => {
                      const company = mockCompanies.find((c) => c.id === companyId);
                      return (
                        <span
                          key={companyId}
                          className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-cyan-400"
                        >
                          {company?.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Insights Summary */}
          <div className="p-6 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <Brain className="w-5 h-5 text-cyan-400" />
              <span>Summary</span>
            </h2>
            <p className="text-gray-300">
              Current market analysis reveals strong growth trends across AI infrastructure and enterprise software sectors. 
              Companies demonstrating aggressive hiring and consistent development activity are positioned for significant expansion. 
              The convergence of AI with specialized domains like biotech and financial services presents unique opportunities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
