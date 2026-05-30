'use client';

import { Company } from '@/data/mockData';
import { TrendingUp, AlertCircle } from 'lucide-react';

interface CompaniesTableProps {
  companies: Company[];
}

export default function CompaniesTable({ companies }: CompaniesTableProps) {
  const getSignalColor = (signal: 'high' | 'medium' | 'low') => {
    switch (signal) {
      case 'high':
        return 'bg-green-500/20 text-green-400';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'low':
        return 'bg-red-500/20 text-red-400';
    }
  };

  return (
    <div className="rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <h3 className="text-lg font-semibold text-white">Recent Companies</h3>
        <p className="text-sm text-gray-400 mt-1">Tracked companies with latest signals</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Company</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Industry</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-400 uppercase">Hiring</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-400 uppercase">Repos</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-400 uppercase">Growth</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-400 uppercase">Signal</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr
                key={company.id}
                className="border-b border-white/5 hover:bg-white/5 transition duration-300"
              >
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-white">{company.name}</p>
                    <p className="text-xs text-gray-400">{company.location}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-300">{company.industry}</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <TrendingUp className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm font-medium text-white">{company.hiringCount}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="text-sm text-gray-300">{company.repoCount.toLocaleString()}</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="text-sm font-semibold">
                    <span className="text-green-400">{company.growthScore.toFixed(1)}</span>
                    <span className="text-gray-400">/10</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getSignalColor(
                      company.signal
                    )}`}
                  >
                    <AlertCircle className="w-3 h-3" />
                    <span className="capitalize">{company.signal}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
