'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Tabs, { TabKey } from '@/components/Tabs';
import CompanyOverview from '@/components/CompanyOverview';
import EmployeeHub from '@/components/EmployeeHub';
import TeamComparison from '@/components/TeamComparison';
import ClientMatrix from '@/components/ClientMatrix';
import MasterLogs from '@/components/MasterLogs';
import UploadModal from '@/components/UploadModal';
import { baselineDataset } from '@/lib/defaultData';
import { Dataset } from '@/lib/types';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [dataset, setDataset] = useState<Dataset>(baselineDataset);
  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [selectedEmployeeName, setSelectedEmployeeName] = useState<string | undefined>(undefined);
  const [selectedClientName, setSelectedClientName] = useState<string | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Load latest stored data from backend on initial visit or refresh
  useEffect(() => {
    fetch('/api/data')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setDataset(json.data);
        }
      })
      .catch(() => {});
  }, []);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
      router.refresh();
    } catch {
      router.push('/login');
    }
  };

  const handleResetBaseline = async () => {
    try {
      const res = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reset' }),
      });
      const json = await res.json();
      if (json.success && json.data) {
        setDataset(json.data);
      } else {
        setDataset(baselineDataset);
      }
    } catch {
      setDataset(baselineDataset);
    }
    showToast('Reset to default September 2026 timesheet data', 'info');
  };

  const handleUploadSuccess = (newDataset: Dataset, fileName: string) => {
    setDataset(newDataset);
    showToast(`Successfully parsed ${fileName}: ${newDataset.tasks.length} logs across ${newDataset.projects.length} distinct projects!`, 'success');
  };

  const handleSelectEmployee = (name: string) => {
    setSelectedEmployeeName(name);
    setActiveTab('employee');
  };

  const handleSelectClient = (name: string) => {
    setSelectedClientName(name);
    setActiveTab('clients');
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-100 flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
          <div
            className={`px-4 py-3 rounded-2xl border backdrop-blur-md shadow-2xl flex items-center gap-3 text-xs font-semibold ${
              toast.type === 'success'
                ? 'bg-emerald-950/90 border-emerald-500/40 text-emerald-200'
                : toast.type === 'error'
                ? 'bg-rose-950/90 border-rose-500/40 text-rose-200'
                : 'bg-indigo-950/90 border-indigo-500/40 text-indigo-200'
            }`}
          >
            {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
            {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
            {toast.type === 'info' && <Info className="w-4 h-4 text-indigo-400 shrink-0" />}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Global Header */}
      <Header
        sourceFile={dataset.source_file}
        dateRange={dataset.companyMetrics.dateRange}
        onOpenUpload={() => setIsUploadOpen(true)}
        onResetBaseline={handleResetBaseline}
        onLogout={handleLogout}
      />

      {/* Tab Navigation */}
      <Tabs
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        projectCount={dataset.companyMetrics.distinctProjectCount}
        logCount={dataset.companyMetrics.totalDailyLogs}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        {activeTab === 'overview' && (
          <CompanyOverview
            data={dataset}
            onSelectEmployee={handleSelectEmployee}
            onSelectClient={handleSelectClient}
          />
        )}

        {activeTab === 'employee' && (
          <EmployeeHub
            data={dataset}
            selectedEmployeeName={selectedEmployeeName}
          />
        )}

        {activeTab === 'comparison' && (
          <TeamComparison
            data={dataset}
            onSelectEmployee={handleSelectEmployee}
          />
        )}

        {activeTab === 'clients' && (
          <ClientMatrix
            data={dataset}
            filterClient={selectedClientName}
          />
        )}

        {activeTab === 'logs' && (
          <MasterLogs
            data={dataset}
            initialClientFilter={selectedClientName}
            initialEmployeeFilter={selectedEmployeeName}
          />
        )}
      </main>

      {/* Excel Upload Modal */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />

      {/* Studio Footer */}
      <footer className="border-t border-gray-800/80 bg-[#090d16] py-4 sm:py-6 text-center text-[11px] sm:text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>dotMKV Production Studio • Executive Analytics Platform</span>
          <span className="font-mono text-gray-400">Next.js App Router • SheetJS • Tailwind CSS</span>
        </div>
      </footer>
    </div>
  );
}
