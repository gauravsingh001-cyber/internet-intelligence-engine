'use client';

import Sidebar from '@/components/dashboard/sidebar';
import { mockCompanies } from '@/data/mockData';
import { Search, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useState, useMemo } from 'react';

export default function CompaniesPage() {
  const [searchValue, setSearchValue] = useState('');

  const filteredCompanies = useMemo(() => {
    return mockCompanies.filter(
      (company) =>
        company.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        company.industry.toLowerCase().includes(searchValue.toLowerCase()) ||
        company.location.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue]);

  const getSignalColor = (signal: 'high' | 'medium' | 'low') => {
    switch (signal) {
      case 'high':
        return 'border-green-500/50 bg-green-500/10';
      case 'medium':
        return 'border-yellow-500/50 bg-yellow-500/10';
      case 'low':
        return 'border-red-500/50 bg-red-500/10';
    }
  };

  const getSignalTextColor = (signal: 'high' | 'medium' | 'low') => {
    switch (signal) {
      case 'high':
        return 'text-green-400';
      case 'medium':
        return 'text-yellow-400';
      case 'low':
        return 'text-red-400';
    }
  };

  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar />

      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-black/50 border-b border-white/10 backdrop-blur-xl">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Companies</h1>
            <p className="text-sm text-gray-400 mt-1">Browse and search all tracked companies</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Search */}
          <div className="relative group max-w-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative bg-black/50 backdrop-blur-xl border border-white/10 rounded-lg p-4 flex items-center space-x-3">
              <Search className="w-5 h-5 text-cyan-400" />
              <input
                type="text"
                placeholder="Search by company name, industry, or location..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none"
              />
            </div>
          </div>

          {/* Companies Grid */}
          <div>
            <p className="text-sm text-gray-400 mb-4">
              {filteredCompanies.length} of {mockCompanies.length} companies
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCompanies.map((company) => (
                <Link
                  key={company.id}
                  href={`/companies/${company.id}`}
                  className={`p-6 rounded-xl border backdrop-blur-sm transition duration-300 hover:border-cyan-500/50 hover:bg-white/10 cursor-pointer group ${getSignalColor(company.signal)}`}
                >
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition">
                          {company.name}
                        </h3>
                        <p className="text-sm text-gray-400">{company.industry}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getSignalColor(company.signal)} ${getSignalTextColor(company.signal)}`}>
                        {company.signal.charAt(0).toUpperCase() + company.signal.slice(1)}
                      </div>
                    </div>

                    {/* Location */}
                    <p className="text-sm text-gray-300">{company.location}</p>

                    {/* Stats */}
                    <div className="pt-3 border-t border-white/10 grid grid-cols-3 gap-3">
                      <div>
                        <p className="text-xs text-gray-400">Hiring</p>
                        <p className="text-lg font-bold text-cyan-400">{company.hiringCount}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Repos</p>
                        <p className="text-lg font-bold text-blue-400">{(company.repoCount / 100).toFixed(1)}k</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Growth</p>
                        <p className="text-lg font-bold text-green-400">{company.growthScore.toFixed(1)}</p>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="pt-3 border-t border-white/10 flex items-center space-x-1 text-xs text-cyan-400 opacity-0 group-hover:opacity-100 transition">
                      <span>View Details</span>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredCompanies.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400">No companies found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
