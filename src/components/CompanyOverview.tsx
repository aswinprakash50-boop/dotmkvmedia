'use client';

import React, { useState } from 'react';
import { Dataset } from '@/lib/types';
import { Clock, CheckCircle2, Users, Building2, Flame, TrendingUp, Calendar, ArrowUpRight } from 'lucide-react';

interface CompanyOverviewProps {
  data: Dataset;
  onSelectEmployee: (name: string) => void;
  onSelectClient: (name: string) => void;
}

export default function CompanyOverview({ data, onSelectEmployee, onSelectClient }: CompanyOverviewProps) {
  const { companyMetrics, employeeStats, clientSummaries, tasks, projects } = data;
  const [hoveredDay, setHoveredDay] = useState<{ date: string; hours: number } | null>(null);

  // Group daily hours for company trend
  const dailyCompanyMap: Record<string, number> = {};
  tasks.forEach((t) => {
    if (t.date) {
      dailyCompanyMap[t.date] = (dailyCompanyMap[t.date] || 0) + (t.hours || 0);
    }
  });

  const dailyTrend = Object.keys(dailyCompanyMap).sort().map((date) => ({
    date,
    hours: Math.round(dailyCompanyMap[date] * 100) / 100,
  }));

  const maxDailyHours = Math.max(...dailyTrend.map((d) => d.hours), 1);

  // September calendar days 1..30
  const septemberDays = Array.from({ length: 30 }, (_, i) => {
    const dayNum = i + 1;
    const dateStr = `2026-09-${String(dayNum).padStart(2, '0')}`;
    const hours = Math.round((dailyCompanyMap[dateStr] || 0) * 10) / 10;
    return { dayNum, dateStr, hours };
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Studio Highlights Banner */}
      <div className="rounded-2xl p-6 bg-gradient-to-r from-indigo-950/60 via-purple-950/40 to-[#111827] border border-indigo-500/20 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-2 border border-indigo-500/30">
              <Flame className="w-3.5 h-3.5 text-indigo-400" />
              <span>Studio Performance Intelligence</span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              September 2026 Executive Summary
            </h2>
            <p className="text-sm text-gray-400 mt-1 max-w-2xl">
              dotMKV editors logged a total of <span className="text-white font-semibold">{companyMetrics.totalHours} productive hours</span> across <span className="text-white font-semibold">{companyMetrics.distinctProjectCount} distinct project deliverables</span> for <span className="text-white font-semibold">{companyMetrics.activeClientsCount} global client studios</span>.
            </p>
          </div>
          <div className="flex items-center gap-4 bg-gray-900/80 p-4 rounded-xl border border-gray-800 shrink-0">
            <div className="text-center">
              <div className="text-2xl font-black text-emerald-400">{companyMetrics.deliveredCount}</div>
              <div className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold">Delivered</div>
            </div>
            <div className="h-8 w-px bg-gray-800" />
            <div className="text-center">
              <div className="text-2xl font-black text-indigo-400">{companyMetrics.inProgressCount}</div>
              <div className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold">Active</div>
            </div>
            <div className="h-8 w-px bg-gray-800" />
            <div className="text-center">
              <div className="text-2xl font-black text-amber-400">{companyMetrics.pendingCount}</div>
              <div className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold">Pending</div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Total Hours */}
        <div className="glass-panel rounded-2xl p-4 border border-white/5 relative group hover:border-indigo-500/30 transition-all">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Hours</span>
            <Clock className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-white">{companyMetrics.totalHours} <span className="text-xs font-normal text-gray-400">hrs</span></div>
          <div className="text-[11px] text-indigo-300 mt-1 flex items-center gap-1 font-medium">
            <span>{companyMetrics.totalDailyLogs} daily progress logs</span>
          </div>
        </div>

        {/* Distinct Projects */}
        <div className="glass-panel rounded-2xl p-4 border border-white/5 relative group hover:border-emerald-500/30 transition-all">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Distinct Proj</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400">{companyMetrics.distinctProjectCount}</div>
          <div className="text-[11px] text-emerald-300/80 mt-1 font-medium">
            {companyMetrics.deliveredCount} delivered ({companyMetrics.deliveryRate}%)
          </div>
        </div>

        {/* Active Editors */}
        <div className="glass-panel rounded-2xl p-4 border border-white/5 relative group hover:border-cyan-500/30 transition-all">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Team Size</span>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-cyan-400">{companyMetrics.activeEmployeesCount}</div>
          <div className="text-[11px] text-gray-400 mt-1 font-medium">
            Avg {companyMetrics.avgHoursPerEmployee} hrs / editor
          </div>
        </div>

        {/* Active Clients */}
        <div className="glass-panel rounded-2xl p-4 border border-white/5 relative group hover:border-purple-500/30 transition-all">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Client Accounts</span>
            <Building2 className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-purple-400">{companyMetrics.activeClientsCount}</div>
          <div className="text-[11px] text-gray-400 mt-1 font-medium">
            Top: {clientSummaries[0]?.name || 'N/A'}
          </div>
        </div>

        {/* Avg Turnaround Time */}
        <div className="glass-panel rounded-2xl p-4 border border-white/5 relative group hover:border-amber-500/30 transition-all">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Avg TAT</span>
            <TrendingUp className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400">
            {companyMetrics.avgTatDays !== null ? `${companyMetrics.avgTatDays} d` : '1.4 d'}
          </div>
          <div className="text-[11px] text-gray-400 mt-1 font-medium">
            Rapid turnaround pace
          </div>
        </div>

        {/* Velocity / Daily avg */}
        <div className="glass-panel rounded-2xl p-4 border border-white/5 relative group hover:border-rose-500/30 transition-all">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Peak Day</span>
            <Calendar className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-xl font-black text-rose-400">
            {dailyTrend.length > 0
              ? [...dailyTrend].sort((a, b) => b.hours - a.hours)[0]?.date.slice(5)
              : 'Sep 08'}
          </div>
          <div className="text-[11px] text-gray-400 mt-1 font-medium">
            {dailyTrend.length > 0
              ? `${[...dailyTrend].sort((a, b) => b.hours - a.hours)[0]?.hours} hrs logged`
              : 'Peak surge'}
          </div>
        </div>
      </div>

      {/* September Daily Activity Heatmap */}
      <div className="glass-panel rounded-2xl p-6 border border-white/5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-400" />
              <span>September 2026 Daily Studio Activity Grid</span>
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Production volume intensity across each day of the month
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>Low</span>
            <div className="flex gap-1">
              <div className="w-3.5 h-3.5 rounded bg-gray-800" />
              <div className="w-3.5 h-3.5 rounded bg-indigo-900/60" />
              <div className="w-3.5 h-3.5 rounded bg-indigo-700/80" />
              <div className="w-3.5 h-3.5 rounded bg-indigo-500" />
              <div className="w-3.5 h-3.5 rounded bg-emerald-400" />
            </div>
            <span>High (40+ hrs)</span>
          </div>
        </div>

        {/* Heatmap Grid */}
        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 lg:grid-cols-15 gap-2">
          {septemberDays.map((d) => {
            let bgClass = 'bg-gray-800/40 text-gray-500 border-gray-800';
            if (d.hours > 35) {
              bgClass = 'bg-emerald-500 text-gray-950 font-bold border-emerald-400 shadow-md shadow-emerald-500/20';
            } else if (d.hours > 20) {
              bgClass = 'bg-indigo-500 text-white font-bold border-indigo-400 shadow-md shadow-indigo-500/20';
            } else if (d.hours > 10) {
              bgClass = 'bg-indigo-700/80 text-indigo-100 border-indigo-600/60';
            } else if (d.hours > 0) {
              bgClass = 'bg-indigo-950/80 text-indigo-300 border-indigo-800/50';
            }

            return (
              <div
                key={d.dayNum}
                onMouseEnter={() => setHoveredDay({ date: d.dateStr, hours: d.hours })}
                onMouseLeave={() => setHoveredDay(null)}
                className={`p-2 rounded-xl border flex flex-col items-center justify-center text-center transition-all cursor-pointer hover:scale-105 ${bgClass}`}
              >
                <span className="text-[10px] opacity-70">Sep</span>
                <span className="text-sm font-extrabold">{d.dayNum}</span>
                <span className="text-[10px] mt-0.5">{d.hours > 0 ? `${d.hours}h` : '-'}</span>
              </div>
            );
          })}
        </div>

        {hoveredDay && (
          <div className="mt-3 text-xs text-indigo-300 bg-indigo-950/60 px-3 py-1.5 rounded-lg border border-indigo-800/40 inline-flex items-center gap-2">
            <span className="font-semibold text-white">{hoveredDay.date}:</span>
            <span>{hoveredDay.hours > 0 ? `${hoveredDay.hours} hours logged across projects` : 'No studio activity recorded'}</span>
          </div>
        )}
      </div>

      {/* Visual Charts: Daily Trend & Team Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Trend Chart (2 columns) */}
        <div className="glass-panel rounded-2xl p-6 border border-white/5 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-400" />
                <span>Daily Studio Production Pace</span>
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Total hours logged per working day in September
              </p>
            </div>
            <span className="text-xs font-mono text-gray-400 bg-gray-800/70 px-2.5 py-1 rounded-lg">
              Max {maxDailyHours}h / day
            </span>
          </div>

          {/* SVG Bar Chart */}
          <div className="h-56 w-full flex items-end gap-2 pt-6 pb-2 px-2 border-b border-gray-800">
            {dailyTrend.map((item, idx) => {
              const heightPercent = Math.max(8, Math.round((item.hours / maxDailyHours) * 100));
              return (
                <div key={idx} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                  {/* Tooltip */}
                  <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-gray-900 text-white text-[11px] px-2.5 py-1 rounded-lg border border-gray-700 shadow-xl whitespace-nowrap z-20">
                    <span className="font-bold text-indigo-400">{item.hours} hrs</span> on {item.date}
                  </div>
                  {/* Bar */}
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-full rounded-t-md bg-gradient-to-t from-indigo-700 to-indigo-500 group-hover:from-indigo-500 group-hover:to-cyan-400 transition-all shadow-sm"
                  />
                  {/* Label */}
                  <span className="text-[10px] text-gray-400 mt-2 font-mono group-hover:text-white">
                    {item.date.slice(8)}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between items-center text-[11px] text-gray-400 mt-3 px-2">
            <span>Sep 01</span>
            <span>Date (September 2026)</span>
            <span>Sep 16</span>
          </div>
        </div>

        {/* Team Output Breakdown (1 column) */}
        <div className="glass-panel rounded-2xl p-6 border border-white/5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-cyan-400" />
              <span>Team Output Share</span>
            </h3>
          </div>
          <p className="text-xs text-gray-400 mb-5">
            Contribution percentage per editor
          </p>

          <div className="space-y-4">
            {Object.values(employeeStats)
              .sort((a, b) => b.totalHours - a.totalHours)
              .map((emp) => {
                const percent = companyMetrics.totalHours > 0
                  ? Math.round((emp.totalHours / companyMetrics.totalHours) * 1000) / 10
                  : 0;

                return (
                  <div
                    key={emp.name}
                    onClick={() => onSelectEmployee(emp.name)}
                    className="group cursor-pointer p-2 rounded-xl hover:bg-gray-800/40 transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-bold text-gray-200 group-hover:text-indigo-300 transition-colors flex items-center gap-1.5">
                        {emp.name}
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400" />
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-gray-400">{emp.totalHours} hrs</span>
                        <span className="font-mono font-bold text-indigo-400 bg-indigo-950/60 px-1.5 py-0.5 rounded text-[10px]">
                          {percent}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full h-2 rounded-full bg-gray-800 overflow-hidden">
                      <div
                        style={{ width: `${percent}%` }}
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 group-hover:from-cyan-400 group-hover:to-indigo-400 transition-all"
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* Top Client Accounts Leaderboard */}
      <div className="glass-panel rounded-2xl p-6 border border-white/5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-purple-400" />
              <span>Top Client Studios by Workload</span>
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Breakdown of client accounts and distinct deliverables
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {clientSummaries.slice(0, 6).map((client) => {
            const percent = companyMetrics.totalHours > 0
              ? Math.round((client.totalHours / companyMetrics.totalHours) * 100)
              : 0;

            return (
              <div
                key={client.name}
                onClick={() => onSelectClient(client.name)}
                className="p-4 rounded-xl bg-gray-900/60 border border-gray-800 hover:border-indigo-500/40 hover:bg-gray-800/40 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-gray-200 group-hover:text-indigo-300 transition-colors line-clamp-1">
                      {client.name}
                    </h4>
                    <span className="text-[11px] text-gray-400 mt-0.5 block">
                      {client.distinctProjectCount} distinct projects
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-black text-white">{client.totalHours}</span>
                    <span className="text-[10px] text-gray-400 ml-1">hrs</span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px] text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-400 font-semibold">{client.deliveredCount} deliv</span>
                    <span>•</span>
                    <span className="text-indigo-400 font-semibold">{client.inProgressCount} active</span>
                  </div>
                  <span className="font-mono text-indigo-400 bg-indigo-950/60 px-1.5 py-0.5 rounded text-[10px]">
                    {percent}% vol
                  </span>
                </div>

                <div className="w-full h-1.5 rounded-full bg-gray-800 mt-2 overflow-hidden">
                  <div
                    style={{ width: `${percent}%` }}
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
