'use client';

import React, { useState, useMemo } from 'react';
import { RawTask } from '@/lib/types';
import { Calendar as CalendarIcon, Clock, CheckCircle2, AlertCircle, Sparkles, ChevronRight, Info, Coffee } from 'lucide-react';

interface AttendanceCalendarProps {
  employeeName: string;
  tasks: RawTask[];
  monthYear?: { year: number; month: number }; // default 2026, 9 (September)
}

export default function AttendanceCalendar({
  employeeName,
  tasks,
  monthYear = { year: 2026, month: 9 },
}: AttendanceCalendarProps) {
  const { year, month } = monthYear;

  // Month metadata
  const monthName = 'September';
  const totalDaysInMonth = 30; // September has 30 days
  // Day of the week for 2026-09-01: Tuesday (0 = Sun, 1 = Mon, 2 = Tue)
  const firstDayWeekday = new Date(year, month - 1, 1).getDay(); // 2

  // Group tasks by date string (YYYY-MM-DD)
  const dateTasksMap = useMemo(() => {
    const map: Record<string, RawTask[]> = {};
    tasks.forEach((t) => {
      if (t.date) {
        if (!map[t.date]) map[t.date] = [];
        map[t.date].push(t);
      }
    });
    return map;
  }, [tasks]);

  // Aggregate stats per day of month
  const calendarDays = useMemo(() => {
    return Array.from({ length: totalDaysInMonth }, (_, i) => {
      const dayNum = i + 1;
      const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
      const dayTasks = dateTasksMap[dateStr] || [];
      const totalHours = Math.round(dayTasks.reduce((sum, t) => sum + (t.hours || 0), 0) * 100) / 100;
      const isPresent = totalHours > 0;

      let category: 'overtime' | 'full' | 'partial' | 'off' = 'off';
      if (totalHours > 8) {
        category = 'overtime';
      } else if (totalHours >= 6) {
        category = 'full';
      } else if (totalHours > 0) {
        category = 'partial';
      }

      return {
        dayNum,
        dateStr,
        dayTasks,
        totalHours,
        isPresent,
        category,
      };
    });
  }, [year, month, totalDaysInMonth, dateTasksMap]);

  // Selected Day state (default to first active day or day 1)
  const defaultActiveDay = calendarDays.find((d) => d.isPresent) || calendarDays[0];
  const [selectedDateStr, setSelectedDateStr] = useState<string>(defaultActiveDay.dateStr);

  const selectedDayData = calendarDays.find((d) => d.dateStr === selectedDateStr) || calendarDays[0];

  // Attendance metrics
  const activeDaysCount = calendarDays.filter((d) => d.isPresent).length;
  const offDaysCount = totalDaysInMonth - activeDaysCount;
  const totalMonthHours = Math.round(calendarDays.reduce((s, d) => s + d.totalHours, 0) * 100) / 100;
  const avgHoursPerActiveDay = activeDaysCount > 0 ? Math.round((totalMonthHours / activeDaysCount) * 10) / 10 : 0;
  const overtimeDaysCount = calendarDays.filter((d) => d.category === 'overtime').length;
  const fullDaysCount = calendarDays.filter((d) => d.category === 'full').length;
  const partialDaysCount = calendarDays.filter((d) => d.category === 'partial').length;
  const attendanceRate = Math.round((activeDaysCount / totalDaysInMonth) * 1000) / 10;

  // Weekday names
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Format date helper (e.g. "Tuesday, September 8, 2026")
  const formatFriendlyDate = (dateStr: string) => {
    const parts = dateStr.split('-');
    const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="glass-panel rounded-2xl p-6 border border-white/5 space-y-6">
      {/* Calendar Header & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2 border border-emerald-500/30">
            <CalendarIcon className="w-3.5 h-3.5 text-emerald-400" />
            <span>Monthly Attendance Tracker</span>
          </div>
          <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
            <span>{monthName} {year} Timesheet Attendance</span>
            <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-gray-800 text-gray-300 border border-gray-700">
              {employeeName}
            </span>
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Visual day-by-day attendance calendar with hours logged, shift classification, and daily task inspector.
          </p>
        </div>

        {/* Quick Summary Badges */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="px-3.5 py-2 rounded-xl bg-gray-900/80 border border-gray-800 text-center">
            <span className="text-[10px] text-gray-400 uppercase font-semibold block">Days Present</span>
            <span className="text-base font-black text-emerald-400">
              {activeDaysCount} <span className="text-xs font-normal text-gray-500">/ {totalDaysInMonth}d</span>
            </span>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-gray-900/80 border border-gray-800 text-center">
            <span className="text-[10px] text-gray-400 uppercase font-semibold block">Output</span>
            <span className="text-base font-black text-indigo-400">
              {totalMonthHours} <span className="text-xs font-normal text-gray-500">hrs</span>
            </span>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-gray-900/80 border border-gray-800 text-center">
            <span className="text-[10px] text-gray-400 uppercase font-semibold block">Pace</span>
            <span className="text-base font-black text-cyan-400">
              {avgHoursPerActiveDay} <span className="text-xs font-normal text-gray-500">h/day</span>
            </span>
          </div>
        </div>
      </div>

      {/* Legend & Categories */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-md bg-purple-500/80 border border-purple-400/50" />
            <span className="text-gray-300 font-medium">Overtime (&gt;8h): <strong className="text-purple-300">{overtimeDaysCount}d</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-md bg-emerald-500/80 border border-emerald-400/50" />
            <span className="text-gray-300 font-medium">Full Day (6-8h): <strong className="text-emerald-300">{fullDaysCount}d</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-md bg-indigo-500/80 border border-indigo-400/50" />
            <span className="text-gray-300 font-medium">Partial (&lt;6h): <strong className="text-indigo-300">{partialDaysCount}d</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-md bg-gray-800 border border-gray-700" />
            <span className="text-gray-400">Off / Rest: <strong>{offDaysCount}d</strong></span>
          </div>
        </div>
        <div className="text-[11px] text-indigo-300 font-mono bg-indigo-950/60 px-2.5 py-1 rounded-lg border border-indigo-800/40">
          Attendance Rate: <strong>{attendanceRate}%</strong>
        </div>
      </div>

      {/* Monthly Calendar Grid */}
      <div className="rounded-2xl border border-gray-800 bg-[#0e1424] p-4 overflow-hidden">
        {/* Weekdays Header */}
        <div className="grid grid-cols-7 gap-2 mb-2 text-center text-xs font-bold text-gray-400 uppercase tracking-wider">
          {weekdays.map((w, idx) => (
            <div key={w} className={`py-1.5 ${idx === 0 || idx === 6 ? 'text-gray-500' : 'text-gray-300'}`}>
              {w}
            </div>
          ))}
        </div>

        {/* Days Matrix */}
        <div className="grid grid-cols-7 gap-2">
          {/* Leading empty cells for August days before Tuesday */}
          {Array.from({ length: firstDayWeekday }, (_, i) => (
            <div
              key={`empty-prev-${i}`}
              className="min-h-[85px] sm:min-h-[95px] p-2 rounded-xl bg-gray-900/20 border border-gray-900 text-gray-600 opacity-40 flex flex-col justify-between"
            >
              <span className="text-xs font-medium">{31 - (firstDayWeekday - 1 - i)}</span>
              <span className="text-[10px] italic">Aug</span>
            </div>
          ))}

          {/* September 1..30 Days */}
          {calendarDays.map((day) => {
            const isSelected = selectedDateStr === day.dateStr;

            let cardStyle = 'bg-gray-900/50 border-gray-800 hover:border-gray-700 text-gray-400';
            let badgeStyle = 'bg-gray-800 text-gray-500';

            if (day.category === 'overtime') {
              cardStyle = isSelected
                ? 'bg-purple-950/80 border-purple-400 ring-2 ring-purple-500/50 text-white shadow-lg shadow-purple-900/30'
                : 'bg-purple-950/40 border-purple-800/60 hover:border-purple-500/80 text-white';
              badgeStyle = 'bg-purple-500/30 text-purple-200 border border-purple-500/50 font-bold';
            } else if (day.category === 'full') {
              cardStyle = isSelected
                ? 'bg-emerald-950/80 border-emerald-400 ring-2 ring-emerald-500/50 text-white shadow-lg shadow-emerald-900/30'
                : 'bg-emerald-950/40 border-emerald-800/60 hover:border-emerald-500/80 text-white';
              badgeStyle = 'bg-emerald-500/30 text-emerald-200 border border-emerald-500/50 font-bold';
            } else if (day.category === 'partial') {
              cardStyle = isSelected
                ? 'bg-indigo-950/80 border-indigo-400 ring-2 ring-indigo-500/50 text-white shadow-lg shadow-indigo-900/30'
                : 'bg-indigo-950/40 border-indigo-800/60 hover:border-indigo-500/80 text-white';
              badgeStyle = 'bg-indigo-500/30 text-indigo-200 border border-indigo-500/50 font-bold';
            } else {
              if (isSelected) {
                cardStyle = 'bg-gray-800/80 border-indigo-500 ring-2 ring-indigo-500/40 text-gray-200';
              }
            }

            return (
              <div
                key={day.dateStr}
                onClick={() => setSelectedDateStr(day.dateStr)}
                className={`min-h-[85px] sm:min-h-[95px] p-2.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between group ${cardStyle}`}
              >
                {/* Top Row: Day Number & Status Dot */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black group-hover:text-white">
                    {day.dayNum}
                  </span>
                  {day.isPresent ? (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 group-hover:scale-125 transition-transform" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-700" />
                  )}
                </div>

                {/* Middle / Bottom Content */}
                {day.isPresent ? (
                  <div className="mt-1">
                    <div className="text-sm font-black font-mono tracking-tight text-white flex items-baseline gap-0.5">
                      <span>{day.totalHours}</span>
                      <span className="text-[10px] font-normal text-gray-400">h</span>
                    </div>
                    <div className="mt-1 flex items-center justify-between">
                      <span className={`px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider ${badgeStyle}`}>
                        {day.category === 'overtime' ? 'OT' : day.category === 'full' ? 'Full' : 'Part'}
                      </span>
                      <span className="text-[10px] text-gray-400 font-mono hidden sm:inline">
                        {day.dayTasks.length} {day.dayTasks.length === 1 ? 'task' : 'tasks'}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-[10px] text-gray-600 italic mt-auto">
                    Off
                  </div>
                )}
              </div>
            );
          })}

          {/* Trailing empty cells for October */}
          {Array.from({ length: 35 - (firstDayWeekday + totalDaysInMonth) }, (_, i) => (
            <div
              key={`empty-next-${i}`}
              className="min-h-[85px] sm:min-h-[95px] p-2 rounded-xl bg-gray-900/20 border border-gray-900 text-gray-600 opacity-40 flex flex-col justify-between"
            >
              <span className="text-xs font-medium">{i + 1}</span>
              <span className="text-[10px] italic">Oct</span>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Day Activity Inspector */}
      <div className="rounded-2xl p-5 bg-[#0e1424] border border-gray-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-800">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400 block">
              Day Attendance Details
            </span>
            <h4 className="text-base font-bold text-white mt-0.5">
              {formatFriendlyDate(selectedDayData.dateStr)}
            </h4>
          </div>

          <div className="flex items-center gap-2">
            {selectedDayData.isPresent ? (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Present • {selectedDayData.totalHours} hrs logged</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-900 text-gray-400 border border-gray-800 text-xs font-medium">
                <Coffee className="w-4 h-4 text-gray-500" />
                <span>Rest / Off Day • No hours logged</span>
              </div>
            )}
          </div>
        </div>

        {/* Task cards list for the selected day */}
        <div className="mt-4">
          {selectedDayData.dayTasks.length > 0 ? (
            <div className="space-y-2.5">
              {selectedDayData.dayTasks.map((t, idx) => (
                <div
                  key={t.id || idx}
                  className="p-3.5 rounded-xl bg-gray-900/80 border border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-indigo-500/30 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-gray-800 text-indigo-300 text-[11px] font-semibold">
                        {t.client}
                      </span>
                      <span className="text-xs font-bold text-gray-200">
                        {t.project}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-400 mt-1.5">
                      <span>Started: <strong className="text-gray-300">{t.started || '—'}</strong></span>
                      <span>•</span>
                      <span>Delivered: <strong className="text-gray-300">{t.delivered || '—'}</strong></span>
                      {t.tat_days && (
                        <>
                          <span>•</span>
                          <span>TAT: <strong className="text-amber-300">{t.tat_days} days</strong></span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-mono text-base font-bold text-white">
                      {t.hours}h
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        t.status === 'Delivered'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : t.status === 'In Progress'
                          ? 'bg-indigo-950 text-indigo-300 border border-indigo-800'
                          : 'bg-amber-950 text-amber-300 border border-amber-800'
                      }`}
                    >
                      {t.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-6 text-center text-gray-500 text-xs flex flex-col items-center justify-center gap-2">
              <Coffee className="w-6 h-6 text-gray-600" />
              <span>No timesheet tasks recorded on this date for {employeeName}.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
