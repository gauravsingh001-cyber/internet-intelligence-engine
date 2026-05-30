'use client';

import Sidebar from '@/components/dashboard/sidebar';
import { mockCompanies, mockEvents } from '@/data/mockData';
import { use } from 'react';
import { MapPin, Users, GitBranch, TrendingUp, Calendar, Zap, Brain } from 'lucide-react';
import { notFound } from 'next/navigation';

interface CompanyDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function CompanyDetailPage({ params }: CompanyDetailPageProps) {
  const { id } = use(params);
  const company = mockCompanies.find((c) => c.id === id);
  const events = mockEvents.filter((e) => e.companyId === id);

  if (!company) {
    notFound();
  }

  const getSignalColor = (signal: 'high' | 'medium' | 'low') => {
    switch (signal) {
      case 'high':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'low':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
    }
  };

  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar />

      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-black/50 border-b border-white/10 backdrop-blur-xl">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold text-white">{company.name}</h1>
            <p className="text-sm text-gray-400 mt-1">{company.industry}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-w-6xl">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="flex items-center space-x-2 mb-2">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <p className="text-xs text-gray-400">Location</p>
              </div>
              <p className="font-semibold text-white">{company.location}</p>
            </div>

            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="w-4 h-4 text-cyan-400" />
                <p className="text-xs text-gray-400">Employees</p>
              </div>
              <p className="font-semibold text-white">{company.employees.toLocaleString()}</p>
            </div>

            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                <p className="text-xs text-gray-400">Funding</p>
              </div>
              <p className="font-semibold text-white">{company.funding}</p>
            </div>

            <div className={`p-4 rounded-lg border backdrop-blur-sm ${getSignalColor(company.signal)}`}>
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-4 h-4" />
                <p className="text-xs opacity-75">Signal Strength</p>
              </div>
              <p className="font-semibold">{company.signal.toUpperCase()}</p>
            </div>
          </div>

          {/* Main Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <h2 className="text-lg font-semibold text-white mb-3">About</h2>
                <p className="text-gray-300">{company.description}</p>
                {company.website && (
                  <p className="text-sm text-cyan-400 mt-4">Website: {company.website}</p>
                )}
              </div>

              {/* Hiring Intelligence */}
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center space-x-2 mb-4">
                  <Zap className="w-5 h-5 text-cyan-400" />
                  <h2 className="text-lg font-semibold text-white">Hiring Intelligence</h2>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                    <span className="text-gray-300">Open Positions</span>
                    <span className="text-2xl font-bold text-cyan-400">{company.hiringCount}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                    <span className="text-gray-300">Hiring Momentum</span>
                    <span className="text-lg font-bold text-green-400">+28% MoM</span>
                  </div>
                  <p className="text-sm text-gray-400">Significant hiring activity detected across engineering and product roles.</p>
                </div>
              </div>

              {/* GitHub Intelligence */}
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center space-x-2 mb-4">
                  <GitBranch className="w-5 h-5 text-cyan-400" />
                  <h2 className="text-lg font-semibold text-white">GitHub Intelligence</h2>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                    <span className="text-gray-300">Repositories</span>
                    <span className="text-2xl font-bold text-blue-400">{company.repoCount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                    <span className="text-gray-300">Repository Activity</span>
                    <span className="text-lg font-bold text-green-400">Very High</span>
                  </div>
                  <p className="text-sm text-gray-400">Active development with frequent commits and pull requests across multiple projects.</p>
                </div>
              </div>

              {/* AI Strategic Insight */}
              <div className="p-6 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30">
                <div className="flex items-center space-x-2 mb-4">
                  <Brain className="w-5 h-5 text-cyan-400" />
                  <h2 className="text-lg font-semibold text-white">AI Strategic Insight</h2>
                </div>
                <p className="text-gray-300 mb-4">
                  {company.name} shows strong growth indicators with aggressive hiring and continuous development activity. The company appears to be in an expansion phase, likely preparing for Series funding or market scaling.
                </p>
                <div className="flex items-center space-x-2 text-sm text-cyan-400">
                  <span>Growth Score: {company.growthScore.toFixed(1)}/10</span>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Timeline of Events */}
              <div className="p-6 rounded-xl bg-white/5 border border-white/10 h-full">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-cyan-400" />
                  <span>Timeline</span>
                </h2>

                {events.length > 0 ? (
                  <div className="space-y-4">
                    {events.map((event) => (
                      <div key={event.id} className="pb-4 border-b border-white/10 last:border-b-0">
                        <div className="flex items-start space-x-3">
                          <div className="mt-1 w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-white">{event.title}</p>
                            <p className="text-xs text-gray-400 mt-1">{event.description}</p>
                            <p className="text-xs text-gray-500 mt-2">{event.date}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">No events recorded yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
