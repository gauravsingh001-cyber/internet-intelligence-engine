'use client';

import {
  Zap,
  BarChart3,
  Shield,
  Gauge,
  Layers,
  Workflow,
} from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Real-Time Data',
    description: 'Access live company data updated every minute with our advanced crawling infrastructure.',
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Deep insights into market trends, competitor analysis, and growth opportunities.',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level encryption and compliance with GDPR, HIPAA, and SOC 2 standards.',
  },
  {
    icon: Gauge,
    title: 'Lightning Fast',
    description: 'Sub-millisecond queries powered by distributed infrastructure across 6 continents.',
  },
  {
    icon: Layers,
    title: 'Rich Integration',
    description: 'Seamlessly integrate with your existing tools via REST API, webhooks, or direct export.',
  },
  {
    icon: Workflow,
    title: 'Custom Workflows',
    description: 'Build automated workflows to monitor competitors and track market changes in real-time.',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-40 left-1/3 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Powerful Features
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Everything you need to stay ahead of the competition with enterprise-grade intelligence.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group p-6 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-white/10 backdrop-blur-sm transition duration-300"
              >
                {/* Icon Background */}
                <div className="mb-4 inline-block p-3 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition duration-300">
                  <Icon className="w-6 h-6 text-cyan-400" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-400 transition duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition duration-300">
                  {feature.description}
                </p>

                {/* Border Animation */}
                <div className="mt-4 pt-4 border-t border-white/10 opacity-0 group-hover:opacity-100 transition duration-300">
                  <span className="text-sm text-cyan-400">Learn more →</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
