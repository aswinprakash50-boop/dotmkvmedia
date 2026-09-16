# dotMKV Production Studio & Performance Dashboard

A full-stack **Next.js 14 + React + TypeScript + Tailwind CSS** executive analytics platform built for **dotMKV** to visualize employee work status logs, track studio production hours, deduplicate deliverables uniquely by client, and manage studio records behind secure **Admin Authentication**.

---

## 🌟 Key Features

1. **Next.js Full-Stack Architecture**:
   - Built on Next.js 14 App Router, React 18, and Tailwind CSS.
   - Server-side API endpoints for Excel file parsing (`/api/upload`) and data caching (`/api/data`).
   - Server-side session verification via Edge Middleware.

2. **Admin Authentication**:
   - Protected dashboard routes: unauthenticated visitors are automatically redirected to `/login`.
   - Credentials:
     - **Username**: `admin`
     - **Password**: `admin`
   - Quick "Default Credentials" one-click button on login screen.
   - Secure HTTP-only session cookie (`dotmkv_admin_session`) and Logout action in header.

3. **Per-Client Project Deduplication**:
   - **Crucial Clarification Handled**: Daily work entries for the same project title across *different* clients are considered separate, unique projects (`Client + Project Name` composite key).
   - In the September 2026 timesheet:
     - **304.5 Total Output Hours**
     - **39 Distinct Project Deliverables** across 11 client accounts
     - **64 Daily Progress Logs** across 6 video editors

4. **Master Work Ledger with Dual-View Switcher**:
   - 🎯 **Distinct Projects (Deduplicated)**: Shows each unique project deliverable per client with consolidated hours across multiple working days, number of daily logs, editors involved, timeline, and delivery status.
   - 📋 **Daily Progress Logs**: Shows every individual day-to-day timesheet entry.
   - Real-time search, filters (Status, Client Studio, Editor), pagination, and **CSV Export**.

5. **Company Profile (Executive Overview)**:
   - 6 KPI Cards: Total Hours (304.5h), Distinct Deliverables (39), Active Team (6), Client Accounts (11), Delivery Rate, Avg Turnaround.
   - **Interactive Visualizations**:
     - *Daily Studio Production Pace*: Day-by-day output timeline across September 2026.
     - *Team Output Share*: Hours and % share per editor.
     - *September 2026 Activity Heatmap*: 30-day calendar grid with color intensity.
     - *Top Client Studios Leaderboard*.

6. **Employee Performance Hub & Attendance Calendar**:
   - Quick switcher for all 6 editors: **Sabyasachi**, **Aswin**, **Muskan**, **Aviral**, **Anmol**, **Sourav**.
   - **Interactive Monthly Attendance Calendar**:
     - 30-day September 2026 calendar view (Sun to Sat grid).
     - Color-coded shift classification:
       - 🟣 Overtime (&gt;8h)
       - 🟢 Full Day (6-8h)
       - 🔵 Partial (&lt;6h)
       - ⚫ Rest / Off Day (0h)
     - Key statistics: Days Present, Days Off, Output Hours, Attendance Rate %, and Average Pace.
     - **Click-to-Inspect**: Select any calendar day to see specific projects, client accounts, hours, and status worked on that day.
   - Individual KPIs (Total Hours, Deliverables, Daily Pace, Turnaround Time).
   - Daily workload pattern chart & client workload distribution.
   - Distinct project deliverables ledger.

7. **Team Comparison Matrix & Client Matrix**:
   - Multi-metric comparative ranking table and visual bars.
   - Client portfolio matrix detailing allocated hours, project lists, and editor assignments.

8. **Dynamic Excel Upload & Backend Persistence**:
   - Server-side SheetJS parser supporting multi-sheet timesheets.
   - **Persistent Backend Storage**: Whenever an Excel file is uploaded, the parsed dataset is automatically persisted on the backend (multi-tier storage: in-memory global cache, disk `data/latest_dataset.json`, and `/tmp/` serverless fallback).
   - Any page reload, browser refresh, or subsequent visitor immediately sees the latest uploaded data.
   - Instant recalculation of all KPIs, deduplicated project views, attendance calendars, and master ledgers.
   - One-click "Reset Baseline" restores the original September 2026 dataset.

---

## 🚀 How to Run the Application

The Next.js production server is currently running at:
```
http://localhost:3000
```

### Development Mode:
```bash
export PATH="$HOME/.nodejs/current/bin:$PATH"
npm run dev
```

### Production Mode:
```bash
export PATH="$HOME/.nodejs/current/bin:$PATH"
npm run build
npm run start
```

Then visit:
```
http://localhost:3000/login
```
Enter `admin` / `admin` to sign in.

---

## 📁 File Structure
```
dotMKV dashboard/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx            # Root layout with fonts & meta
│   │   ├── page.tsx              # Main Protected Dashboard
│   │   ├── globals.css           # Tailwind directives & glassmorphism
│   │   ├── login/
│   │   │   └── page.tsx          # Admin Login Page (admin / admin)
│   │   └── api/
│   │       ├── auth/
│   │       │   ├── login/route.ts   # Authenticates admin & sets cookie
│   │       │   ├── logout/route.ts  # Clears cookie
│   │       │   └── me/route.ts      # Verifies session status
│   │       ├── data/route.ts        # Serves baseline timesheet dataset
│   │       └── upload/route.ts      # Parses uploaded .xlsx files
│   ├── components/
│   │   ├── Header.tsx            # Global studio header with logout
│   │   ├── Tabs.tsx              # Tab switcher
│   │   ├── CompanyOverview.tsx   # Executive KPIs, heatmap, & trend charts
│   │   ├── EmployeeHub.tsx       # Editor drill-down & personal ledgers
│   │   ├── TeamComparison.tsx    # Team ranking table & comparative bars
│   │   ├── ClientMatrix.tsx      # Client accounts & projects grid
│   │   ├── MasterLogs.tsx        # Deduplicated Projects vs Daily Logs table
│   │   └── UploadModal.tsx       # Drag-and-drop Excel upload modal
│   ├── lib/
│   │   ├── auth.ts               # Admin auth & cookie helpers
│   │   ├── deduplication.ts      # Client+Project deduplication engine
│   │   ├── parser.ts             # SheetJS Excel parser
│   │   ├── storage.ts            # Multi-tier backend persistence engine
│   │   ├── types.ts              # TypeScript interfaces
│   │   └── defaultData.ts        # Preloaded September 2026 data
│   └── middleware.ts             # Route protection middleware
├── Timesheet-September2026.xlsx  # Baseline spreadsheet
├── package.json                  # Dependencies
├── tailwind.config.ts            # Studio dark theme color tokens
├── tsconfig.json                 # TypeScript configuration
└── next.config.mjs               # Next.js configuration
```
