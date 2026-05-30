'use client';

import { ArrowRight, CheckCircle } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="rounded-2xl bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 border border-white/10 backdrop-blur-sm overflow-hidden">
          {/* Content */}
          <div className="p-8 sm:p-12 lg:p-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Start Discovering Intelligence Today
            </h2>

            <p className="text-lg text-gray-300 mb-8">
              Get instant access to millions of companies. No credit card required. Start with a free trial and scale as you grow.
            </p>

            {/* Benefits List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                'Access 50M+ companies instantly',
                'Real-time data updates',
                'Advanced analytics dashboard',
                '24/7 priority support',
                'Custom integrations',
                'Team collaboration tools',
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <span className="text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition duration-300 flex items-center justify-center space-x-2">
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition duration-300" />
              </button>
              <button className="px-8 py-4 rounded-lg border border-white/20 text-white font-semibold text-lg hover:bg-white/10 hover:border-white/40 transition duration-300">
                Schedule Demo
              </button>
            </div>

            {/* Footer Text */}
            <p className="text-sm text-gray-400 mt-8">
              Free trial includes full access to all features. No credit card required. Takes 2 minutes to set up.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
