'use client';

import Sidebar from '@/components/dashboard/sidebar';
import MetricCard from '@/components/dashboard/metric-card';
import TrendChart from '@/components/dashboard/trend-chart';
import CompaniesTable from '@/components/dashboard/companies-table';
import { Users, Zap, Code, Sparkles, Bell, Download } from 'lucide-react';
import { mockCompanies, mockTrendData, mockMetrics } from '@/data/mockData';

export default function MonitorPage() {
  return (
    <div className="flex min-h-screen bg-black">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-black/50 border-b border-white/10 backdrop-blur-xl">
          <div className="px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Intelligence Dashboard</h1>
              <p className="text-sm text-gray-400 mt-1">Real-time monitoring of market signals and company intelligence</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/50 transition duration-300">
                <Bell className="w-5 h-5 text-gray-400 hover:text-cyan-400" />
              </button>
              <button className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/50 transition duration-300">
                <Download className="w-5 h-5 text-gray-400 hover:text-cyan-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Top Metrics */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Key Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                icon={<Users className="w-6 h-6 text-cyan-400" />}
                title="Companies Tracked"
                value={mockMetrics.companiesTracked.toLocaleString()}
                change="+12% from last month"
                positive={true}
              />
              <MetricCard
                icon={<Zap className="w-6 h-6 text-cyan-400" />}
                title="Hiring Signals"
                value={mockMetrics.hiringSignals}
                change="+28% this week"
                positive={true}
              />
              <MetricCard
                icon={<Code className="w-6 h-6 text-cyan-400" />}
                title="GitHub Signals"
                value={mockMetrics.githubSignals}
                change="+15% activity"
                positive={true}
              />
              <MetricCard
                icon={<Sparkles className="w-6 h-6 text-cyan-400" />}
                title="AI Insights"
                value={mockMetrics.aiInsights}
                change="+42% accuracy"
                positive={true}
              />
            </div>
          </div>

          {/* Charts Section */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Trend Analysis</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TrendChart data={mockTrendData} title="Hiring Trend" />
              <TrendChart data={mockTrendData} title="Activity Trend" />
            </div>
          </div>

          {/* Companies Table */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Companies</h2>
            <CompaniesTable companies={mockCompanies} />
          </div>

          {/* Footer Spacing */}
          <div className="pb-6"></div>
        </div>
      </div>
    </div>
  );
}
