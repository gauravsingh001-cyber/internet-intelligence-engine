'use client';

import {
  Zap,
  Brain,
  TrendingUp,
} from 'lucide-react';

const benefits = [
  {
    icon: Zap,
    title: 'Faster Research',
    description: 'Get comprehensive company insights in seconds instead of hours. Eliminate manual research workflows and accelerate decision-making.',
    features: [
      'Instant company analysis',
      'Real-time data updates',
      'Automated report generation',
    ],
  },
  {
    icon: Brain,
    title: 'Better Decisions',
    description: 'Make confident business decisions backed by verified, multi-source data. Reduce risk and identify opportunities early.',
    features: [
      'Confidence scoring',
      'Risk assessment',
      'Opportunity detection',
    ],
  },
  {
    icon: TrendingUp,
    title: 'Reduced Manual Analysis',
    description: 'Eliminate tedious data collection and consolidation. Focus on strategy instead of spreadsheets.',
    features: [
      'Automated aggregation',
      'Competitor monitoring',
      'Market signal tracking',
    ],
  },
];

export default function Benefits() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-40 left-1/4 w-80 h-80 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Real Benefits That Matter
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            See how Internet Intelligence Engine transforms your business workflow.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div
                key={idx}
                className="group relative p-8 rounded-xl bg-gradient-to-br from-white/5 to-white/[2%] border border-white/10 hover:border-cyan-500/50 backdrop-blur-sm transition duration-300"
              >
                {/* Gradient Background on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300 -z-10"></div>

                {/* Icon */}
                <div className="mb-6 inline-block p-4 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition duration-300">
                  <Icon className="w-8 h-8 text-cyan-400" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-3">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 mb-6 group-hover:text-gray-200 transition duration-300">
                  {benefit.description}
                </p>

                {/* Features List */}
                <div className="space-y-2">
                  {benefit.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400"></div>
                      <span className="text-sm text-gray-400">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-6 pt-6 border-t border-white/10 opacity-0 group-hover:opacity-100 transition duration-300">
                  <span className="text-sm text-cyan-400 font-semibold">Learn more →</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
