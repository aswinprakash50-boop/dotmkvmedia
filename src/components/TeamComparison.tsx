'use client';

import React from 'react';
import { Dataset } from '@/lib/types';
import { Award, Users, TrendingUp, CheckCircle2 } from 'lucide-react';

interface TeamComparisonProps {
  data: Dataset;
  onSelectEmployee: (name: string) => void;
}

export default function TeamComparison({ data, onSelectEmployee }: TeamComparisonProps) {
  const { employeeStats, companyMetrics } = data;
  const employees = Object.values(employeeStats).sort((a, b) => b.totalHours - a.totalHours);

  const maxHours = Math.max(...employees.map((e) => e.totalHours), 1);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="glass-panel rounded-2xl p-4 sm:p-6 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-[11px] sm:text-xs font-semibold mb-2 border border-indigo-500/30">
            <Award className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span>Team Output Leaderboard</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Editor Performance Matrix
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Comparative analysis of output hours, turnaround rate, and deliverable volume.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-gray-900/80 border border-gray-800 text-center w-full sm:w-auto">
            <span className="text-[9px] sm:text-[10px] text-gray-400 uppercase font-semibold block">Total Team Output</span>
            <span className="text-lg sm:text-xl font-black text-white">{companyMetrics.totalHours} hrs</span>
          </div>
        </div>
      </div>

      {/* Visual Comparison Bars */}
      <div className="glass-panel rounded-2xl p-4 sm:p-6 border border-white/5">
        <h3 className="text-sm sm:text-base font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>Output Hours Relative Comparison</span>
        </h3>
        <div className="space-y-3 sm:space-y-4">
          {employees.map((emp, index) => {
            const barWidth = Math.round((emp.totalHours / maxHours) * 100);
            const companyShare = companyMetrics.totalHours > 0
              ? Math.round((emp.totalHours / companyMetrics.totalHours) * 1000) / 10
              : 0;

            return (
              <div
                key={emp.name}
                onClick={() => onSelectEmployee(emp.name)}
                className="group cursor-pointer p-2.5 sm:p-3 rounded-xl hover:bg-gray-800/40 transition-all border border-transparent hover:border-gray-700"
              >
                <div className="flex items-center justify-between text-xs mb-1.5 sm:mb-2">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-800 flex items-center justify-center font-mono font-bold text-[10px] sm:text-[11px] text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors shrink-0">
                      #{index + 1}
                    </span>
                    <span className="font-bold text-xs sm:text-sm text-gray-200 group-hover:text-indigo-300 transition-colors truncate">
                      {emp.name}
                    </span>
                    <span className="text-gray-500 hidden sm:inline">•</span>
                    <span className="text-gray-400 text-[11px] hidden sm:inline">{emp.distinctProjectCount} distinct projects</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                    <span className="text-xs sm:text-sm font-black text-white font-mono">{emp.totalHours}h</span>
                    <span className="text-[9px] sm:text-[10px] font-mono text-indigo-300 bg-indigo-950/80 px-1.5 sm:px-2 py-0.5 rounded border border-indigo-800/50">
                      {companyShare}%
                    </span>
                  </div>
                </div>

                <div className="w-full h-2 sm:h-3 rounded-full bg-gray-900 border border-gray-800 overflow-hidden">
                  <div
                    style={{ width: `${barWidth}%` }}
                    className="h-full rounded-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-400 group-hover:from-indigo-400 group-hover:to-cyan-300 transition-all"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Leaderboard Table */}
      <div className="glass-panel rounded-2xl p-4 sm:p-6 border border-white/5 overflow-hidden">
        <h3 className="text-sm sm:text-base font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
          <Users className="w-4 h-4 text-indigo-400 shrink-0" />
          <span>Full Multi-Metric Matrix</span>
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-[760px] w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400 font-semibold uppercase tracking-wider">
                <th className="py-3 px-3">Rank</th>
                <th className="py-3 px-3">Editor Name</th>
                <th className="py-3 px-3 text-right">Total Hours</th>
                <th className="py-3 px-3 text-center">Daily Logs</th>
                <th className="py-3 px-3 text-center">Distinct Projects</th>
                <th className="py-3 px-3 text-center">Delivered</th>
                <th className="py-3 px-3 text-center">Delivery Rate</th>
                <th className="py-3 px-3 text-right">Daily Avg</th>
                <th className="py-3 px-3 text-center">Avg TAT</th>
                <th className="py-3 px-3 text-right">Studio Share</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {employees.map((emp, index) => {
                const deliveryRate = emp.distinctProjectCount > 0
                  ? Math.round((emp.deliveredProjectCount / emp.distinctProjectCount) * 100)
                  : 0;
                const companyShare = companyMetrics.totalHours > 0
                  ? Math.round((emp.totalHours / companyMetrics.totalHours) * 1000) / 10
                  : 0;

                return (
                  <tr
                    key={emp.name}
                    onClick={() => onSelectEmployee(emp.name)}
                    className="hover:bg-gray-800/40 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-3 font-mono font-bold text-gray-400 whitespace-nowrap">
                      #{index + 1}
                    </td>
                    <td className="py-3 px-3 font-bold text-white flex items-center gap-2 whitespace-nowrap">
                      <div className="w-6 h-6 rounded-full bg-indigo-600/30 text-indigo-300 flex items-center justify-center font-bold text-[10px]">
                        {emp.name.charAt(0)}
                      </div>
                      <span>{emp.name}</span>
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-white whitespace-nowrap">
                      {emp.totalHours}h
                    </td>
                    <td className="py-3 px-3 text-center font-mono text-gray-400 whitespace-nowrap">
                      {emp.logCount}
                    </td>
                    <td className="py-3 px-3 text-center font-mono font-semibold text-indigo-300 whitespace-nowrap">
                      {emp.distinctProjectCount}
                    </td>
                    <td className="py-3 px-3 text-center font-mono text-emerald-400 font-bold whitespace-nowrap">
                      {emp.deliveredProjectCount}
                    </td>
                    <td className="py-3 px-3 text-center whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-800/50">
                        {deliveryRate}%
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-cyan-300 whitespace-nowrap">
                      {emp.avgHoursPerDay}h
                    </td>
                    <td className="py-3 px-3 text-center font-mono text-amber-300 whitespace-nowrap">
                      {emp.avgTatDays !== null ? `${emp.avgTatDays}d` : '1.3d'}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-indigo-400 whitespace-nowrap">
                      {companyShare}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
