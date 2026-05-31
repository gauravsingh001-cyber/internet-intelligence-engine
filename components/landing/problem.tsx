'use client';

import {
  AlertCircle,
  Clock,
  Database,
  Zap,
} from 'lucide-react';

const problems = [
  {
    icon: Database,
    title: 'Information Overload',
    description: 'Scattered data across hundreds of sources makes it impossible to get a complete picture of any company in reasonable time.',
  },
  {
    icon: Clock,
    title: 'Manual Research Takes Forever',
    description: 'Hours spent digging through news, financial reports, and social media to piece together company intelligence.',
  },
  {
    icon: AlertCircle,
    title: 'Unreliable Data',
    description: 'Outdated information and conflicting sources lead to poor decision-making and missed opportunities.',
  },
  {
    icon: Zap,
    title: 'No Real-Time Insights',
    description: 'By the time you discover market changes, your competitors have already acted on them.',
  },
];

export default function Problem() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-gradient-to-r from-rose-500/10 to-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            The Problem with Company Intelligence
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            In today's fast-paced business environment, getting timely, accurate insights on companies is harder than ever.
          </p>
        </div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {problems.map((problem, idx) => {
            const Icon = problem.icon;
            return (
              <div
                key={idx}
                className="group p-6 rounded-xl bg-gradient-to-br from-red-500/5 to-rose-500/5 border border-red-500/20 hover:border-red-500/50 backdrop-blur-sm transition duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 rounded-lg bg-red-500/10 group-hover:bg-red-500/20 transition duration-300">
                    <Icon className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {problem.title}
                    </h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition duration-300">
                      {problem.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Transition Text */}
        <div className="text-center p-8 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <h3 className="text-2xl font-bold text-white mb-2">
            There's a Better Way
          </h3>
          <p className="text-gray-300">
            What if you could access instant, accurate intelligence on any company in seconds?
          </p>
        </div>
      </div>
    </section>
  );
}
