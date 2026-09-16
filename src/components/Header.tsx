'use client';

import React from 'react';
import { Film, Upload, RotateCcw, LogOut, FileSpreadsheet, Calendar } from 'lucide-react';

interface HeaderProps {
  sourceFile: string;
  dateRange: { start: string; end: string };
  onOpenUpload: () => void;
  onResetBaseline: () => void;
  onLogout: () => void;
}

export default function Header({
  sourceFile,
  dateRange,
  onOpenUpload,
  onResetBaseline,
  onLogout,
}: HeaderProps) {
  return (
    <header className="border-b border-gray-800 bg-[#0e1424]/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-600/30 border border-indigo-400/30">
            <Film className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-white">
                dot<span className="text-indigo-400">MKV</span>
              </span>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-indigo-950/80 text-indigo-300 border border-indigo-800/60 uppercase">
                Studio Intelligence
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
              <span className="flex items-center gap-1">
                <FileSpreadsheet className="w-3 h-3 text-emerald-400" />
                <span className="text-gray-300 font-medium">{sourceFile}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-indigo-400" />
                <span>{dateRange.start} — {dateRange.end}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenUpload}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/25 transition-all cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Excel</span>
          </button>

          <button
            onClick={onResetBaseline}
            title="Reset to default September 2026 data"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-800/80 hover:bg-gray-700/80 text-gray-300 text-xs font-medium border border-gray-700 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <div className="h-6 w-px bg-gray-800 mx-1" />

          <div className="flex items-center gap-2 pl-1">
            <div className="hidden md:flex flex-col text-right">
              <span className="text-xs font-semibold text-gray-200">Studio Admin</span>
              <span className="text-[10px] text-gray-500">dotMKV Studio</span>
            </div>
            <button
              onClick={onLogout}
              title="Sign Out"
              className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
