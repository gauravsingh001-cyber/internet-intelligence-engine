'use client';

import Link from 'next/link';
import { Zap, Mail, Code, MessageSquare, Share2, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black/50 border-t border-white/10 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-75"></div>
                <div className="relative bg-black px-2 py-2 rounded-lg">
                  <Zap className="w-5 h-5 text-cyan-400" fill="currentColor" />
                </div>
              </div>
              <span className="text-lg font-bold text-white">IIE</span>
            </div>
            <p className="text-gray-400 text-sm">
              Powering intelligent business decisions with real-time data and advanced analytics.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <div className="space-y-2">
              <Link href="#" className="text-gray-400 hover:text-white text-sm transition">
                Features
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white text-sm transition">
                Pricing
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white text-sm transition">
                API Docs
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white text-sm transition">
                Integrations
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <div className="space-y-2">
              <Link href="#" className="text-gray-400 hover:text-white text-sm transition">
                About
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white text-sm transition">
                Blog
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white text-sm transition">
                Careers
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white text-sm transition">
                Contact
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <div className="space-y-2">
              <Link href="#" className="text-gray-400 hover:text-white text-sm transition">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white text-sm transition">
                Terms of Service
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white text-sm transition">
                Security
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white text-sm transition">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          {/* Social Links & Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2026 Internet Intelligence Engine. All rights reserved.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-4">
              <Link
                href="#"
                className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition duration-300"
              >
                <Code className="w-5 h-5 text-gray-400 hover:text-cyan-400" />
              </Link>
              <Link
                href="#"
                className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition duration-300"
              >
                <MessageSquare className="w-5 h-5 text-gray-400 hover:text-cyan-400" />
              </Link>
              <Link
                href="#"
                className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition duration-300"
              >
                <Share2 className="w-5 h-5 text-gray-400 hover:text-cyan-400" />
              </Link>
              <Link
                href="#"
                className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition duration-300"
              >
                <Send className="w-5 h-5 text-gray-400 hover:text-cyan-400" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
