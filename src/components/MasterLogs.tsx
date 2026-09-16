'use client';

import React, { useState, useMemo } from 'react';
import { Dataset, AggregatedProject, RawTask } from '@/lib/types';
import { Search, Filter, Download, Layers, ListFilter, CheckCircle2, Clock, Calendar, Users, ChevronLeft, ChevronRight } from 'lucide-react';

interface MasterLogsProps {
  data: Dataset;
  initialClientFilter?: string | null;
  initialEmployeeFilter?: string | null;
}

export default function MasterLogs({
  data,
  initialClientFilter = null,
  initialEmployeeFilter = null,
}: MasterLogsProps) {
  const { tasks, projects, employees, clientSummaries } = data;

  // View mode: 'projects' (deduplicated) vs 'daily' (raw logs)
  const [viewMode, setViewMode] = useState<'projects' | 'daily'>('projects');

  // Filters & search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedClient, setSelectedClient] = useState<string>(initialClientFilter || 'ALL');
  const [selectedEmployee, setSelectedEmployee] = useState<string>(initialEmployeeFilter || 'ALL');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  // Filtered Distinct Projects
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchSearch =
        !searchQuery ||
        p.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.team.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchStatus = selectedStatus === 'ALL' || p.status === selectedStatus;
      const matchClient = selectedClient === 'ALL' || p.client === selectedClient;
      const matchEmployee =
        selectedEmployee === 'ALL' ||
        p.team.some((m) => m.toLowerCase() === selectedEmployee.toLowerCase());

      return matchSearch && matchStatus && matchClient && matchEmployee;
    });
  }, [projects, searchQuery, selectedStatus, selectedClient, selectedEmployee]);

  // Filtered Daily Tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      const matchSearch =
        !searchQuery ||
        t.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.employee.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus = selectedStatus === 'ALL' || t.status === selectedStatus;
      const matchClient = selectedClient === 'ALL' || t.client === selectedClient;
      const matchEmployee =
        selectedEmployee === 'ALL' || t.employee.toLowerCase() === selectedEmployee.toLowerCase();

      return matchSearch && matchStatus && matchClient && matchEmployee;
    });
  }, [tasks, searchQuery, selectedStatus, selectedClient, selectedEmployee]);

  // Pagination calculation
  const totalItems = viewMode === 'projects' ? filteredProjects.length : filteredTasks.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    if (viewMode === 'projects') {
      return filteredProjects.slice(start, start + pageSize);
    } else {
      return filteredTasks.slice(start, start + pageSize);
    }
  }, [viewMode, filteredProjects, filteredTasks, currentPage, pageSize]);

  // Reset page when filters or viewMode change
  const handleViewModeChange = (mode: 'projects' | 'daily') => {
    setViewMode(mode);
    setCurrentPage(1);
  };

  // CSV Export handler
  const handleExportCsv = () => {
    let headers: string[] = [];
    let rows: (string | number)[][] = [];

    if (viewMode === 'projects') {
      headers = ['Project Name', 'Client Studio', 'Total Hours', 'Daily Logs Count', 'Editors', 'Earliest Start', 'Delivered On', 'TAT Days', 'Status'];
      rows = filteredProjects.map((p) => [
        `"${p.projectName.replace(/"/g, '""')}"`,
        `"${p.client.replace(/"/g, '""')}"`,
        p.totalHours,
        p.dailyLogsCount,
        `"${p.team.join(', ')}"`,
        p.earliestStart || '',
        p.latestDelivered || '',
        p.tatDays || '',
        p.status,
      ]);
    } else {
      headers = ['Date', 'Editor', 'Client Studio', 'Project Name', 'Hours', 'Started On', 'Delivered On', 'TAT Days', 'Status'];
      rows = filteredTasks.map((t) => [
        t.date || '',
        `"${t.employee}"`,
        `"${t.client.replace(/"/g, '""')}"`,
        `"${t.project.replace(/"/g, '""')}"`,
        t.hours,
        t.started || '',
        t.delivered || '',
        t.tat_days || '',
        t.status,
      ]);
    }

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `dotMKV_${viewMode}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* View Switcher & Header */}
      <div className="glass-panel rounded-2xl p-6 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-black text-white tracking-tight">Master Work Ledger</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold border border-indigo-500/30">
              {totalItems} Records
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Toggle between deduplicated deliverables (isolated per client) and detailed daily timesheet progress logs.
          </p>
        </div>

        {/* Mode Toggle Buttons */}
        <div className="flex items-center p-1 rounded-xl bg-gray-950 border border-gray-800 shrink-0">
          <button
            onClick={() => handleViewModeChange('projects')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'projects'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Distinct Projects ({projects.length})</span>
          </button>
          <button
            onClick={() => handleViewModeChange('daily')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'daily'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <ListFilter className="w-3.5 h-3.5" />
            <span>Daily Logs ({tasks.length})</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="glass-panel rounded-2xl p-4 border border-white/5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search projects, client studios, or editors..."
            className="w-full pl-10 pr-4 py-2 bg-gray-900/90 border border-gray-800 rounded-xl text-white placeholder-gray-500 text-xs focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 bg-gray-900/90 border border-gray-800 rounded-xl text-gray-300 text-xs focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="ALL">All Statuses</option>
            <option value="Delivered">Delivered</option>
            <option value="In Progress">In Progress</option>
            <option value="Pending">Pending</option>
          </select>

          {/* Client Filter */}
          <select
            value={selectedClient}
            onChange={(e) => {
              setSelectedClient(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 bg-gray-900/90 border border-gray-800 rounded-xl text-gray-300 text-xs focus:outline-none focus:border-indigo-500 cursor-pointer max-w-[150px] truncate"
          >
            <option value="ALL">All Clients</option>
            {clientSummaries.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Employee Filter */}
          <select
            value={selectedEmployee}
            onChange={(e) => {
              setSelectedEmployee(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 bg-gray-900/90 border border-gray-800 rounded-xl text-gray-300 text-xs focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="ALL">All Editors</option>
            {employees.map((emp) => (
              <option key={emp} value={emp}>
                {emp}
              </option>
            ))}
          </select>

          {/* CSV Export */}
          <button
            onClick={handleExportCsv}
            title="Export view to CSV"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Table Display */}
      <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          {viewMode === 'projects' ? (
            /* Deduplicated Distinct Projects View */
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#0e1424] border-b border-gray-800 text-gray-400 font-semibold uppercase tracking-wider">
                  <th className="py-3.5 px-4">Project Name</th>
                  <th className="py-3.5 px-4">Client Studio</th>
                  <th className="py-3.5 px-4 text-right">Total Hours</th>
                  <th className="py-3.5 px-4 text-center">Daily Logs</th>
                  <th className="py-3.5 px-4">Editors Involved</th>
                  <th className="py-3.5 px-4">Timeline</th>
                  <th className="py-3.5 px-4 text-center">TAT</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60">
                {(currentItems as AggregatedProject[]).map((p) => (
                  <tr key={p.id} className="hover:bg-gray-800/30 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-white max-w-xs">
                      <div className="truncate">{p.projectName}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-lg bg-gray-900 border border-gray-800 text-indigo-300 font-semibold text-[11px]">
                        {p.client}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-white text-sm">
                      {p.totalHours}h
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="font-mono text-gray-400 bg-gray-900/60 px-2 py-0.5 rounded text-[11px]">
                        {p.dailyLogsCount} {p.dailyLogsCount === 1 ? 'day' : 'days'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1">
                        {p.team.map((m) => (
                          <span
                            key={m}
                            className="px-2 py-0.5 rounded bg-gray-800/80 text-gray-300 text-[11px]"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-gray-400 text-[11px] whitespace-nowrap">
                      {p.earliestStart || '—'} → {p.latestDelivered || 'In Progress'}
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono text-amber-300 font-semibold">
                      {p.tatDays !== null ? `${p.tatDays}d` : '—'}
                    </td>
                    <td className="py-3.5 px-4 text-center">
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
          ) : (
            /* Daily Progress Logs View */
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#0e1424] border-b border-gray-800 text-gray-400 font-semibold uppercase tracking-wider">
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Editor</th>
                  <th className="py-3.5 px-4">Client Studio</th>
                  <th className="py-3.5 px-4">Project Title</th>
                  <th className="py-3.5 px-4 text-right">Logged Hours</th>
                  <th className="py-3.5 px-4">Started On</th>
                  <th className="py-3.5 px-4">Delivered On</th>
                  <th className="py-3.5 px-4 text-center">TAT</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60">
                {(currentItems as RawTask[]).map((t) => (
                  <tr key={t.id} className="hover:bg-gray-800/30 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-indigo-300 font-semibold whitespace-nowrap">
                      {t.date}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-white">
                      {t.employee}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-gray-900 border border-gray-800 text-gray-300 text-[11px]">
                        {t.client}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-gray-200 max-w-xs truncate">
                      {t.project}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-white text-sm">
                      {t.hours}h
                    </td>
                    <td className="py-3.5 px-4 font-mono text-gray-400 text-[11px]">
                      {t.started || '—'}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-gray-400 text-[11px]">
                      {t.delivered || '—'}
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono text-amber-300 font-semibold">
                      {t.tat_days !== null && t.tat_days !== undefined ? `${t.tat_days}d` : '—'}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          t.status === 'Delivered'
                            ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                            : t.status === 'In Progress'
                            ? 'bg-indigo-950/80 text-indigo-300 border border-indigo-500/30'
                            : 'bg-amber-950/80 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Empty state */}
        {totalItems === 0 && (
          <div className="py-12 text-center text-gray-500 text-sm">
            No matching entries found for the selected filters or search query.
          </div>
        )}

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="px-4 py-3 border-t border-gray-800 bg-[#0c111e] flex items-center justify-between text-xs">
            <span className="text-gray-400">
              Showing page <span className="font-bold text-white">{currentPage}</span> of{' '}
              <span className="font-bold text-white">{totalPages}</span> ({totalItems} total)
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-lg bg-gray-900 border border-gray-800 text-gray-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-lg bg-gray-900 border border-gray-800 text-gray-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
