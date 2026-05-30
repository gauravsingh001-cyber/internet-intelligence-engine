'use client';

import { Search, MapPin, TrendingUp, Users } from 'lucide-react';
import { useState } from 'react';

export default function SearchCompany() {
  const [searchValue, setSearchValue] = useState('');
  const [showResults, setShowResults] = useState(false);

  const results = [
    {
      name: 'TechCorp Inc',
      location: 'San Francisco, CA',
      employees: '500-1000',
      revenue: '$50M - $100M',
      icon: Users,
    },
    {
      name: 'AI Innovations LLC',
      location: 'Boston, MA',
      employees: '50-200',
      revenue: '$5M - $10M',
      icon: TrendingUp,
    },
    {
      name: 'DataViz Systems',
      location: 'Austin, TX',
      employees: '200-500',
      revenue: '$20M - $50M',
      icon: Users,
    },
  ];

  return (
    <section id="search" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-1/4 w-72 h-72 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Search Any Company
          </h2>
          <p className="text-lg text-gray-300">
            Access instant insights on millions of companies worldwide
          </p>
        </div>

        {/* Search Box */}
        <div className="relative mb-12">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative bg-black/50 backdrop-blur-xl border border-white/10 rounded-lg p-4 flex items-center space-x-3">
              <Search className="w-5 h-5 text-cyan-400" />
              <input
                type="text"
                placeholder="Search by company name, industry, or location..."
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                  setShowResults(e.target.value.length > 0);
                }}
                className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none"
              />
              <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition duration-300">
                Search
              </button>
            </div>
          </div>

          {/* Results Dropdown */}
          {showResults && (
            <div className="absolute top-full left-0 right-0 mt-4 bg-black/80 backdrop-blur-xl border border-white/10 rounded-lg overflow-hidden z-20">
              <div className="p-4 space-y-3">
                {results.map((result, idx) => {
                  const Icon = result.icon;
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-white/10 transition duration-300 cursor-pointer group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-white group-hover:text-cyan-400 transition">
                            {result.name}
                          </h3>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3" />
                              <span>{result.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="w-3 h-3" />
                              <span>{result.employees}</span>
                            </div>
                          </div>
                        </div>
                        <Icon className="w-5 h-5 text-cyan-400 opacity-0 group-hover:opacity-100 transition" />
                      </div>
                      <div className="flex items-center space-x-1 text-sm">
                        <TrendingUp className="w-3 h-3 text-green-500" />
                        <span className="text-green-400">{result.revenue}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Companies Indexed', value: '50M+' },
            { label: 'Data Points', value: '500M+' },
            { label: 'Updates Daily', value: '1M+' },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/50 transition duration-300 text-center"
            >
              <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
