'use client';

import { TrendingUp, Users, Code, Sparkles } from 'lucide-react';

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  change: string;
  positive: boolean;
}

export default function MetricCard({ icon, title, value, change, positive }: MetricCardProps) {
  return (
    <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-cyan-500/50 transition duration-300">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-gray-400 text-sm mb-1">{title}</p>
          <div className="text-3xl font-bold text-white">{value}</div>
        </div>
        <div className="p-3 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20">
          {icon}
        </div>
      </div>

      {/* Change */}
      <div className={`flex items-center space-x-1 text-sm ${positive ? 'text-green-400' : 'text-red-400'}`}>
        <TrendingUp className="w-4 h-4" />
        <span>{change}</span>
      </div>
    </div>
  );
}
