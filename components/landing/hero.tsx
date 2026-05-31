'use client';

import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-10 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center z-10">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md hover:border-cyan-500/50 transition duration-300 mb-8">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-sm text-gray-300">
            Introducing Next-Gen Intelligence
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
          <span className="text-white">Unlock Business Intelligence with</span>
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Internet Intelligence Engine
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          Real-time company data, market insights, and competitive intelligence powered by advanced AI. Make informed decisions faster than ever before.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/dashboard" className="group px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition duration-300 flex items-center justify-center space-x-2">
            <span>Start Analysis</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition duration-300" />
          </Link>
          <button className="px-8 py-4 rounded-lg border border-white/20 text-white font-semibold text-lg hover:bg-white/10 hover:border-white/40 transition duration-300">
            Watch Demo
          </button>
        </div>

        {/* Trust Badge */}
        <div className="flex items-center justify-center space-x-4 text-sm text-gray-400 border-t border-white/10 pt-8">
          <div className="flex items-center space-x-1">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
            <span>99.9% Uptime</span>
          </div>
          <div className="hidden sm:block">•</div>
          <div className="flex items-center space-x-1">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
            <span>Enterprise Grade</span>
          </div>
          <div className="hidden sm:block">•</div>
          <div className="flex items-center space-x-1">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
            <span>24/7 Support</span>
          </div>
        </div>
      </div>
    </section>
  );
}
