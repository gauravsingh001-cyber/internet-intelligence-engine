'use client';

import {
  Search,
  Globe,
  Sparkles,
  BarChart3,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';

const steps = [
  {
    icon: Search,
    title: 'User Query',
    description: 'Enter any company name or business topic to analyze',
    color: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-blue-500/30',
  },
  {
    icon: Globe,
    title: 'Search Aggregation',
    description: 'Our system queries 100+ data sources in parallel',
    color: 'from-cyan-500/20 to-teal-500/20',
    borderColor: 'border-cyan-500/30',
  },
  {
    icon: Sparkles,
    title: 'Intelligence Extraction',
    description: 'AI analyzes and extracts actionable insights',
    color: 'from-teal-500/20 to-emerald-500/20',
    borderColor: 'border-teal-500/30',
  },
  {
    icon: BarChart3,
    title: 'Business Insights',
    description: 'Get structured, validated intelligence instantly',
    color: 'from-emerald-500/20 to-green-500/20',
    borderColor: 'border-emerald-500/30',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Our intelligent pipeline transforms raw data into actionable insights in seconds.
          </p>
        </div>

        {/* Process Flow - Desktop */}
        <div className="hidden md:grid grid-cols-4 gap-6 mb-12">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="relative">
                {/* Card */}
                <div
                  className={`p-6 rounded-xl bg-gradient-to-br ${step.color} border ${step.borderColor} backdrop-blur-sm hover:shadow-lg transition duration-300 h-full`}
                >
                  {/* Icon */}
                  <div className="mb-4 inline-block p-3 rounded-lg bg-white/10">
                    <Icon className="w-6 h-6 text-cyan-400" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-300">
                    {step.description}
                  </p>

                  {/* Step Number */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                    {idx + 1}
                  </div>
                </div>

                {/* Arrow */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 items-center justify-center">
                    <ChevronRight className="w-6 h-6 text-cyan-400" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Process Flow - Mobile */}
        <div className="md:hidden space-y-4 mb-12">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="flex gap-4">
                {/* Timeline */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold">
                    {idx + 1}
                  </div>
                  {idx < steps.length - 1 && (
                    <div className="w-1 h-12 bg-gradient-to-b from-cyan-500 to-transparent mt-2"></div>
                  )}
                </div>

                {/* Card */}
                <div
                  className={`flex-1 p-4 rounded-lg bg-gradient-to-br ${step.color} border ${step.borderColor} backdrop-blur-sm`}
                >
                  <div className="flex items-start gap-3">
                    <Icon className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-base font-semibold text-white mb-1">
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-300">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center p-8 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-white/10 backdrop-blur-sm">
          <p className="text-lg text-gray-300 mb-6">
            All this happens in seconds. Let's see it in action.
          </p>
          <Link href="/dashboard" className="inline-block px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition duration-300">
            Try Now
          </Link>
        </div>
      </div>
    </section>
  );
}
