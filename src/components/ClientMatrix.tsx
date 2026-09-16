'use client';

import React, { useState } from 'react';
import { Dataset } from '@/lib/types';
import { Building2, CheckCircle2, Clock, Users, ChevronDown, ChevronUp } from 'lucide-react';

interface ClientMatrixProps {
  data: Dataset;
  filterClient?: string | null;
}

export default function ClientMatrix({ data, filterClient }: ClientMatrixProps) {
  const { clientSummaries, companyMetrics } = data;
  const [expandedClient, setExpandedClient] = useState<string | null>(filterClient || null);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="glass-panel rounded-2xl p-4 sm:p-6 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-purple-500/20 text-purple-300 text-[11px] sm:text-xs font-semibold mb-2 border border-purple-500/30">
            <Building2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
            <span>Studio Client Portfolio</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Client Accounts & Deliverables Matrix
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Overview of client studios, allocated production hours, and unique deliverables.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-gray-900/80 border border-gray-800 text-center w-full sm:w-auto">
            <span className="text-[9px] sm:text-[10px] text-gray-400 uppercase font-semibold block">Total Clients</span>
            <span className="text-lg sm:text-xl font-black text-purple-400">{clientSummaries.length} Studios</span>
          </div>
        </div>
      </div>

      {/* Client Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {clientSummaries.map((client) => {
          const isExpanded = expandedClient === client.name;
          const studioShare = companyMetrics.totalHours > 0
            ? Math.round((client.totalHours / companyMetrics.totalHours) * 1000) / 10
            : 0;

          return (
            <div
              key={client.name}
              className={`glass-panel rounded-2xl p-4 sm:p-6 border transition-all ${
                isExpanded ? 'border-purple-500/40 bg-[#121929]' : 'border-white/5 hover:border-gray-700'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-black text-white truncate">
                    {client.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-1 text-[11px] sm:text-xs text-gray-400">
                    <span>{client.distinctProjectCount} distinct deliverables</span>
                    <span>•</span>
                    <span className="text-purple-400 font-semibold">{studioShare}% of studio volume</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xl sm:text-2xl font-black text-white font-mono">
                    {client.totalHours} <span className="text-xs font-normal text-gray-400">h</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 sm:h-2 rounded-full bg-gray-800 mt-3 sm:mt-4 overflow-hidden">
                <div
                  style={{ width: `${studioShare}%` }}
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"
                />
              </div>

              {/* Metrics row */}
              <div className="grid grid-cols-3 gap-2 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-800/80 text-center">
                <div className="p-1.5 sm:p-2 rounded-xl bg-gray-900/60 border border-gray-800">
                  <span className="text-[9px] sm:text-[10px] text-gray-400 uppercase block font-semibold">Delivered</span>
                  <span className="text-xs sm:text-sm font-black text-emerald-400">{client.deliveredCount}</span>
                </div>
                <div className="p-1.5 sm:p-2 rounded-xl bg-gray-900/60 border border-gray-800">
                  <span className="text-[9px] sm:text-[10px] text-gray-400 uppercase block font-semibold">Active</span>
                  <span className="text-xs sm:text-sm font-black text-indigo-400">{client.inProgressCount}</span>
                </div>
                <div className="p-1.5 sm:p-2 rounded-xl bg-gray-900/60 border border-gray-800">
                  <span className="text-[9px] sm:text-[10px] text-gray-400 uppercase block font-semibold">Pending</span>
                  <span className="text-xs sm:text-sm font-black text-amber-400">{client.pendingCount}</span>
                </div>
              </div>

              {/* Team Members */}
              <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1.5 text-gray-400 min-w-0">
                  <Users className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="font-semibold text-gray-300">Editors:</span>
                  <span className="truncate">{client.team.join(', ')}</span>
                </div>
                <button
                  onClick={() => setExpandedClient(isExpanded ? null : client.name)}
                  className="inline-flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 font-semibold cursor-pointer shrink-0"
                >
                  <span>{isExpanded ? 'Hide Projects' : 'View Projects'}</span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Expanded Project List */}
              {isExpanded && (
                <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-800 space-y-2 animate-fadeIn">
                  <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                    Distinct Deliverables ({client.projects.length})
                  </h4>
                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {client.projects.map((p) => (
                      <div
                        key={p.id}
                        className="p-2.5 rounded-xl bg-gray-900/80 border border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                      >
                        <div className="min-w-0">
                          <span className="font-bold text-gray-200 truncate block">{p.projectName}</span>
                          <div className="text-[10px] text-gray-400 mt-0.5 truncate">
                            Team: {p.team.join(', ')} • {p.dailyLogsCount} log entries
                          </div>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-2.5 sm:gap-3 shrink-0 pt-1 sm:pt-0 border-t sm:border-t-0 border-gray-800/50">
                          <span className="font-mono font-bold text-white">{p.totalHours}h</span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase ${
                              p.status === 'Delivered'
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                : p.status === 'In Progress'
                                ? 'bg-indigo-950 text-indigo-300 border border-indigo-800'
                                : 'bg-amber-950 text-amber-300 border border-amber-800'
                            }`}
                          >
                            {p.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
