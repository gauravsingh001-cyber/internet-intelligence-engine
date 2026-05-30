'use client';

import { TrendingUp, Users, Zap, Globe } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '5,000+',
    label: 'Enterprise Customers',
    description: 'Trusted by leading companies worldwide',
  },
  {
    icon: Globe,
    value: '150+',
    label: 'Countries Covered',
    description: 'Global coverage with local expertise',
  },
  {
    icon: TrendingUp,
    value: '500M+',
    label: 'Data Points',
    description: 'Updated in real-time continuously',
  },
  {
    icon: Zap,
    value: '99.9%',
    label: 'Uptime SLA',
    description: 'Enterprise-grade reliability',
  },
];

export default function Statistics() {
  return (
    <section id="stats" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="group p-8 rounded-xl bg-gradient-to-br from-white/5 to-white/[2%] border border-white/10 hover:border-cyan-500/50 backdrop-blur-sm transition duration-300"
              >
                {/* Icon */}
                <div className="mb-4 inline-block p-3 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition duration-300">
                  <Icon className="w-6 h-6 text-cyan-400" />
                </div>

                {/* Value */}
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>

                {/* Label */}
                <h3 className="text-lg font-semibold text-white mb-2">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-400">{stat.description}</p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-20 p-8 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-white/10 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Ready to Transform Your Business?
              </h3>
              <p className="text-gray-300 mb-6">
                Join thousands of companies that are using Internet Intelligence Engine to make smarter decisions faster.
              </p>
              <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition duration-300">
                Get Started Free
              </button>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg blur"></div>
                <div className="relative bg-black/40 rounded-lg p-6 border border-white/10">
                  <div className="space-y-3">
                    <div className="h-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded opacity-75"></div>
                    <div className="h-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded opacity-50"></div>
                    <div className="h-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded opacity-30"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
