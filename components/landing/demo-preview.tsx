'use client';

import { TrendingUp, Users, Code, Sparkles, AlertCircle } from 'lucide-react';
import MetricCard from '@/components/dashboard/metric-card';

const demoData = [
  {
    icon: <TrendingUp className="w-6 h-6 text-cyan-400" />,
    title: 'Growth Score',
    value: '8.7/10',
    change: '+15% this quarter',
    positive: true,
  },
  {
    icon: <Users className="w-6 h-6 text-blue-400" />,
    title: 'Hiring Activity',
    value: '+234',
    change: '+28% YoY',
    positive: true,
  },
  {
    icon: <Code className="w-6 h-6 text-purple-400" />,
    title: 'Tech Stack',
    value: '47 tools',
    change: '+8 new this month',
    positive: true,
  },
  {
    icon: <Sparkles className="w-6 h-6 text-emerald-400" />,
    title: 'Signal Confidence',
    value: '94%',
    change: 'Verified from 12 sources',
    positive: true,
  },
];

const sampleInsights = [
  {
    label: 'Company Overview',
    value: 'Building AI infrastructure for enterprise applications with focus on cost optimization.',
  },
  {
    label: 'Recent Developments',
    value: '3 major funding rounds, 250+ employee hiring, 5 new product launches.',
  },
  {
    label: 'Growth Signals',
    value: 'Aggressive hiring, tech stack expansion, geographic expansion to 12 new markets.',
  },
  {
    label: 'Risk Signals',
    value: 'High executive turnover, increased competitor activity, market saturation concerns.',
  },
];

export default function DemoPreview() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            See Intelligence in Action
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Example: Real-time analysis of a hypothetical tech company
          </p>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {demoData.map((metric, idx) => (
            <MetricCard
              key={idx}
              icon={metric.icon}
              title={metric.title}
              value={metric.value}
              change={metric.change}
              positive={metric.positive}
            />
          ))}
        </div>

        {/* Sample Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {sampleInsights.map((insight, idx) => (
            <div
              key={idx}
              className="group p-6 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/50 backdrop-blur-sm transition duration-300"
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <AlertCircle className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition duration-300">
                    {insight.label}
                  </h4>
                  <p className="text-gray-400 group-hover:text-gray-300 transition duration-300">
                    {insight.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Data Sources Info */}
        <div className="p-8 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-white/10 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-cyan-400 mb-2">100+</div>
              <p className="text-gray-300">Data Sources</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">&lt;2s</div>
              <p className="text-gray-300">Analysis Time</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">94%</div>
              <p className="text-gray-300">Confidence Score</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
