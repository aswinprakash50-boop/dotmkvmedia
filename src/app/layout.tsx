import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'dotMKV — Studio Performance & Timesheet Intelligence',
  description: 'Executive performance tracking, project deliverable analytics, and employee workload metrics for dotMKV.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#0b0f19] text-gray-100 antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
        {children}
      </body>
    </html>
  );
}
