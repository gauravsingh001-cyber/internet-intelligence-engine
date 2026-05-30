'use client';

import Sidebar from '@/components/dashboard/sidebar';
import { mockEvents } from '@/data/mockData';
import { Calendar, Zap, Code, Newspaper, TrendingUp } from 'lucide-react';

export default function TimelinePage() {
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'hiring':
        return <Users className="w-4 h-4" />;
      case 'github':
        return <Code className="w-4 h-4" />;
      case 'funding':
        return <TrendingUp className="w-4 h-4" />;
      case 'news':
        return <Newspaper className="w-4 h-4" />;
      default:
        return <Zap className="w-4 h-4" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'hiring':
        return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50';
      case 'github':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'funding':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'news':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const sortedEvents = [...mockEvents].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar />

      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-black/50 border-b border-white/10 backdrop-blur-xl">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Timeline</h1>
            <p className="text-sm text-gray-400 mt-1">Chronological view of all company events and signals</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-w-4xl">
          <div className="space-y-4">
            {sortedEvents.map((event, index) => (
              <div key={event.id} className="relative">
                {/* Timeline Line */}
                {index !== sortedEvents.length - 1 && (
                  <div className="absolute left-6 top-14 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 to-blue-500 opacity-50"></div>
                )}

                {/* Event Card */}
                <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/50 transition duration-300">
                  <div className="flex gap-6">
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-12 h-12 rounded-lg border flex items-center justify-center ${getEventColor(event.type)}`}>
                      {getEventIcon(event.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-white">{event.title}</h3>
                          <p className="text-sm text-gray-400 capitalize">{event.type} Event</p>
                        </div>
                        <span className="text-xs text-gray-500 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                          {event.date}
                        </span>
                      </div>

                      <p className="text-gray-300 mb-4">{event.description}</p>

                      {event.metadata && (
                        <div className="flex gap-4">
                          {event.metadata.count && (
                            <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                              <p className="text-xs text-gray-400">Count</p>
                              <p className="text-lg font-bold text-cyan-400">{event.metadata.count}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {sortedEvents.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No events recorded yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { Users } from 'lucide-react';
