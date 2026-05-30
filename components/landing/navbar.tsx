'use client';

import Link from 'next/link';
import { Zap, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/30 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-black px-3 py-2 rounded-lg">
                <Zap className="w-5 h-5 text-cyan-400" fill="currentColor" />
              </div>
            </div>
            <span className="text-lg font-bold text-white hidden sm:inline">
              Internet Intelligence
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-300 hover:text-white transition duration-300">
              Features
            </Link>
            <Link href="#search" className="text-gray-300 hover:text-white transition duration-300">
              Search
            </Link>
            <Link href="#stats" className="text-gray-300 hover:text-white transition duration-300">
              Stats
            </Link>
            <Link href="#contact" className="text-gray-300 hover:text-white transition duration-300">
              Contact
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition duration-300">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-cyan-400 transition"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-white/10">
            <Link href="#features" className="block py-2 text-gray-300 hover:text-white">
              Features
            </Link>
            <Link href="#search" className="block py-2 text-gray-300 hover:text-white">
              Search
            </Link>
            <Link href="#stats" className="block py-2 text-gray-300 hover:text-white">
              Stats
            </Link>
            <Link href="#contact" className="block py-2 text-gray-300 hover:text-white">
              Contact
            </Link>
            <button className="w-full mt-4 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold">
              Get Started
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
