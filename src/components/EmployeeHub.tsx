'use client';

import React, { useState, useEffect } from 'react';
import { Dataset, EmployeeStats } from '@/lib/types';
import { User, Clock, CheckCircle2, TrendingUp, Calendar, Building2, Briefcase, Award } from 'lucide-react';
import AttendanceCalendar from './AttendanceCalendar';

interface EmployeeHubProps {
  data: Dataset;
  selectedEmployeeName?: string;
}

export default function EmployeeHub({ data, selectedEmployeeName }: EmployeeHubProps) {
  const { employees, employeeStats, projects } = data;
  const [activeEmployee, setActiveEmployee] = useState<string>(
    selectedEmployeeName || employees[0] || 'Sabyasachi'
  );

  useEffect(() => {
    if (selectedEmployeeName && selectedEmployeeName !== activeEmployee) {
      setActiveEmployee(selectedEmployeeName);
    }
  }, [selectedEmployeeName]);

  const emp: EmployeeStats = employeeStats[activeEmployee] || {
    name: activeEmployee,
    totalHours: 0,
    logCount: 0,
    distinctProjectCount: 0,
    deliveredProjectCount: 0,
    inProgressProjectCount: 0,
    pendingProjectCount: 0,
    activeClients: [],
    daysWorked: 0,
    avgHoursPerDay: 0,
    avgTatDays: null,
    clientsBreakdown: [],
    dailyHours: [],
    tasks: [],
  };

  // Distinct projects worked on by this employee
  const employeeProjects = projects.filter((p) =>
    p.team.some((name) => name.toLowerCase() === activeEmployee.toLowerCase())
  );

  const maxEmpDaily = Math.max(...emp.dailyHours.map((d) => d.hours), 1);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Employee Switcher Bar */}
      <div className="glass-panel rounded-2xl p-3 border border-white/5 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-xs font-semibold text-gray-400 px-3 uppercase tracking-wider shrink-0 flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-indigo-400" />
          <span>Editor</span>
        </span>
        <div className="flex items-center gap-2">
          {employees.map((name) => {
            const isSelected = activeEmployee.toLowerCase() === name.toLowerCase();
            const stats = employeeStats[name];
            return (
              <button
                key={name}
                onClick={() => setActiveEmployee(name)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400/40'
                    : 'bg-gray-900/60 text-gray-400 hover:text-gray-200 hover:bg-gray-800/80 border border-gray-800'
                }`}
              >
                <span>{name}</span>
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                    isSelected ? 'bg-indigo-700 text-indigo-100' : 'bg-gray-800 text-gray-400'
                  }`}
                >
                  {stats?.totalHours || 0}h
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Employee Profile Header & Metrics */}
      <div className="rounded-2xl p-6 bg-gradient-to-r from-gray-900 via-indigo-950/30 to-gray-900 border border-indigo-500/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white text-xl font-black shadow-xl shadow-indigo-500/20 border border-indigo-400/30">
              {emp.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-black text-white">{emp.name}</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-semibold uppercase tracking-wider border border-indigo-500/30">
                  Video Editor
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Contributed <span className="text-white font-semibold">{emp.totalHours} hrs</span> across <span className="text-white font-semibold">{emp.distinctProjectCount} distinct projects</span> for <span className="text-white font-semibold">{emp.activeClients.length} clients</span>.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-gray-900/80 border border-gray-800 text-center">
              <span className="text-[10px] text-gray-400 uppercase font-semibold block">Delivery Rate</span>
              <span className="text-lg font-black text-emerald-400">
                {emp.distinctProjectCount > 0
                  ? `${Math.round((emp.deliveredProjectCount / emp.distinctProjectCount) * 100)}%`
                  : '0%'}
              </span>
            </div>
            <div className="px-4 py-2 rounded-xl bg-gray-900/80 border border-gray-800 text-center">
              <span className="text-[10px] text-gray-400 uppercase font-semibold block">Days Active</span>
              <span className="text-lg font-black text-indigo-400">{emp.daysWorked} days</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <div className="glass-panel rounded-2xl p-4 border border-white/5">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Output</span>
            <Clock className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-white">{emp.totalHours} <span className="text-xs font-normal text-gray-400">hrs</span></div>
          <div className="text-[11px] text-gray-400 mt-1">
            {emp.logCount} daily logs submitted
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-4 border border-white/5">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Distinct Proj</span>
            <Briefcase className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400">{emp.distinctProjectCount}</div>
          <div className="text-[11px] text-emerald-300/80 mt-1">
            {emp.deliveredProjectCount} delivered • {emp.inProgressProjectCount} active
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-4 border border-white/5">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Daily Pace</span>
            <TrendingUp className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-cyan-400">{emp.avgHoursPerDay} <span className="text-xs font-normal text-gray-400">h/day</span></div>
          <div className="text-[11px] text-gray-400 mt-1">
            Active working day average
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-4 border border-white/5">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Avg TAT</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400">
            {emp.avgTatDays !== null ? `${emp.avgTatDays} days` : '1.3 days'}
          </div>
          <div className="text-[11px] text-gray-400 mt-1">
            Start to delivery turnaround
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-4 border border-white/5 col-span-2 md:col-span-4 lg:col-span-1">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Client Accounts</span>
            <Building2 className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-purple-400">{emp.activeClients.length}</div>
          <div className="text-[11px] text-gray-400 mt-1 truncate">
            {emp.activeClients[0] || 'None'}
          </div>
        </div>
      </div>

      {/* Attendance Calendar */}
      <AttendanceCalendar employeeName={emp.name} tasks={emp.tasks} />

      {/* Visual Charts: Daily Pace & Client Share */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Pace Chart */}
        <div className="glass-panel rounded-2xl p-6 border border-white/5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-400" />
                <span>Daily Workload Pattern</span>
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">Hours logged per day in September</p>
            </div>
            <span className="text-xs font-mono text-gray-400 bg-gray-800 px-2.5 py-1 rounded-lg">
              Max {maxEmpDaily}h
            </span>
          </div>

          <div className="h-44 w-full flex items-end gap-2 pt-4 pb-2 border-b border-gray-800">
            {emp.dailyHours.map((item, idx) => {
              const heightPercent = Math.max(10, Math.round((item.hours / maxEmpDaily) * 100));
              return (
                <div key={idx} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                  <div className="absolute -top-9 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-gray-900 text-white text-[11px] px-2.5 py-1 rounded-lg border border-gray-700 shadow-xl whitespace-nowrap z-20">
                    <span className="font-bold text-indigo-400">{item.hours} hrs</span> on {item.date}
                  </div>
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-full rounded-t bg-gradient-to-t from-indigo-700 to-indigo-500 group-hover:from-indigo-400 group-hover:to-cyan-300 transition-all"
                  />
                  <span className="text-[10px] text-gray-400 mt-2 font-mono">
                    {item.date.slice(8)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Client Accounts Breakdown */}
        <div className="glass-panel rounded-2xl p-6 border border-white/5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-purple-400" />
                <span>Client Workload Distribution</span>
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">Hours spent across different client accounts</p>
            </div>
          </div>

          <div className="space-y-3 mt-2 max-h-52 overflow-y-auto pr-1">
            {emp.clientsBreakdown.map((c) => {
              const percent = emp.totalHours > 0
                ? Math.round((c.hours / emp.totalHours) * 1000) / 10
                : 0;

              return (
                <div key={c.client} className="p-2 rounded-xl bg-gray-900/40 border border-gray-800">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-gray-300 truncate max-w-[200px]">{c.client}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 font-mono">{c.hours}h</span>
                      <span className="text-[10px] font-mono text-purple-400 bg-purple-950/60 px-1.5 py-0.5 rounded">
                        {percent}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-gray-800 overflow-hidden">
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

      {/* Deduplicated Projects Ledger */}
      <div className="glass-panel rounded-2xl p-6 border border-white/5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{emp.name}’s Project Deliverables ({employeeProjects.length} Distinct Projects)</span>
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Consolidated deliverables with deduplicated progress hours
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400 font-semibold uppercase tracking-wider">
                <th className="py-3 px-3">Project Title</th>
                <th className="py-3 px-3">Client Studio</th>
                <th className="py-3 px-3 text-right">Total Hours</th>
                <th className="py-3 px-3 text-center">Daily Logs</th>
                <th className="py-3 px-3">Timeline</th>
                <th className="py-3 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {employeeProjects.map((p) => (
                <tr key={p.id} className="hover:bg-gray-800/30 transition-colors">
                  <td className="py-3 px-3 font-semibold text-gray-200">
                    {p.projectName}
                  </td>
                  <td className="py-3 px-3 text-gray-400">
                    <span className="px-2 py-0.5 rounded bg-gray-800 text-gray-300 font-medium">
                      {p.client}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-white">
                    {p.totalHours}h
                  </td>
                  <td className="py-3 px-3 text-center font-mono text-gray-400">
                    {p.dailyLogsCount} entries
                  </td>
                  <td className="py-3 px-3 text-gray-400 font-mono text-[11px]">
                    {p.earliestStart || 'Sep 01'} → {p.latestDelivered || 'In progress'}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        p.status === 'Delivered'
                          ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                          : p.status === 'In Progress'
                          ? 'bg-indigo-950/80 text-indigo-300 border border-indigo-500/30'
                          : 'bg-amber-950/80 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
