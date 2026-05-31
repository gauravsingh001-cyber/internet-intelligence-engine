'use client';

import { Code, Zap } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-75"></div>
                <div className="relative bg-black px-2 py-1.5 rounded-lg">
                  <Zap className="w-4 h-4 text-cyan-400" fill="currentColor" />
                </div>
              </div>
              <span className="text-lg font-bold text-white">Internet Intelligence</span>
            </div>
            <p className="text-gray-400 text-sm">
              Real-time company data and market intelligence powered by AI.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-cyan-400 transition text-sm">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-cyan-400 transition text-sm">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-cyan-400 transition text-sm">
                  API Docs
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-cyan-400 transition text-sm">
                  Status
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-cyan-400 transition text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-cyan-400 transition text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-cyan-400 transition text-sm">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-cyan-400 transition text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-white font-semibold mb-4">Tech Stack</h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-400">
                <span className="font-medium text-white">Built with:</span>
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 rounded bg-white/10 border border-white/20 text-gray-300 text-xs">
                  Next.js 16
                </span>
                <span className="px-2 py-1 rounded bg-white/10 border border-white/20 text-gray-300 text-xs">
                  TypeScript
                </span>
                <span className="px-2 py-1 rounded bg-white/10 border border-white/20 text-gray-300 text-xs">
                  React 19
                </span>
                <span className="px-2 py-1 rounded bg-white/10 border border-white/20 text-gray-300 text-xs">
                  TailwindCSS
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Copyright */}
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} Internet Intelligence Engine. All rights reserved.
          </p>

          {/* Social & Links */}
          <div className="flex items-center space-x-6">
            <Link
              href="https://github.com"
              className="text-gray-400 hover:text-cyan-400 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Code className="w-5 h-5" />
            </Link>
            <Link href="/" className="text-gray-400 hover:text-cyan-400 transition text-sm">
              Privacy
            </Link>
            <Link href="/" className="text-gray-400 hover:text-cyan-400 transition text-sm">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

