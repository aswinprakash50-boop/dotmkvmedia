'use client';

import React from 'react';
import { LayoutDashboard, UserCheck, BarChart3, Briefcase, FileText } from 'lucide-react';

export type TabKey = 'overview' | 'employee' | 'comparison' | 'clients' | 'logs';

interface TabsProps {
  activeTab: TabKey;
  onChangeTab: (tab: TabKey) => void;
  projectCount: number;
  logCount: number;
}

export default function Tabs({ activeTab, onChangeTab, projectCount, logCount }: TabsProps) {
  const tabs = [
    {
      id: 'overview' as TabKey,
      label: 'Company Profile',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'employee' as TabKey,
      label: 'Employee Hub',
      icon: UserCheck,
      badge: null,
    },
    {
      id: 'comparison' as TabKey,
      label: 'Team Comparison',
      icon: BarChart3,
      badge: null,
    },
    {
      id: 'clients' as TabKey,
      label: 'Client Matrix',
      icon: Briefcase,
      badge: null,
    },
    {
      id: 'logs' as TabKey,
      label: 'Master Logs',
      icon: FileText,
      badge: `${projectCount} Proj`,
    },
  ];

  return (
    <div className="border-b border-gray-800 bg-[#0c111e] sticky top-[57px] sm:top-[69px] z-30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
        <nav className="flex space-x-1.5 sm:space-x-3 overflow-x-auto py-2 no-scrollbar scroll-smooth">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onChangeTab(tab.id)}
                className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${isActive ? 'text-indigo-400' : 'text-gray-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`ml-0.5 sm:ml-1 px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono ${
                      isActive
                        ? 'bg-indigo-500/30 text-indigo-200'
                        : 'bg-gray-800 text-gray-400'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
