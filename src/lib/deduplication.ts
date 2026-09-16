import { RawTask, AggregatedProject, EmployeeStats, ClientSummary, CompanyMetrics, Dataset } from './types';

export function normalizeClientName(client: string | null | undefined): string {
  if (!client) return 'Internal / Unspecified';
  const c = String(client).trim();
  if (c === '-' || c === '' || c.toLowerCase() === 'none') return 'Internal / Unspecified';
  const lower = c.toLowerCase().replace(/-/g, ' ');
  if (lower.includes('that') || lower.includes('ttws')) return "That's What She Said (TTWS)";
  if (lower.includes('reel')) return 'Reel Movie Flicks';
  if (lower.includes('artizan')) return 'Artizan TV';
  if (lower.includes('basic')) return 'BasicwitReacts';
  if (lower.includes('cinepals')) return 'CinePALS';
  if (lower.includes('eralia')) return 'Eralia';
  if (lower.includes('jess')) return 'Jess Tess';
  if (lower.includes('phoenix')) return 'Phoenix Nat';
  if (lower.includes('kali')) return 'KaliWali';
  if (lower.includes('movieverse')) return 'Movieverse';
  if (lower.includes('jrocks')) return 'JRocks';
  return c;
}

export function canonicalProjectKey(projectName: string | null | undefined, clientName: string | null | undefined): string {
  const c = normalizeClientName(clientName);
  let p = String(projectName || 'General Project Work').trim().toLowerCase();
  p = p.replace(/\s+/g, ' ');
  p = p.replace(/-/g, ' ');
  p = p.replace(/\s+/g, ' ').trim();
  // Unique composite key: Client + Project
  return `${c}:::${p}`;
}

export function calculateTatDays(startStr: string | null, endStr: string | null): number | null {
  if (!startStr || !endStr) return null;
  try {
    const s = new Date(startStr);
    const e = new Date(endStr);
    if (isNaN(s.getTime()) || isNaN(e.getTime())) return null;
    const diffTime = e.getTime() - s.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 ? diffDays + 1 : 1;
  } catch {
    return null;
  }
}

export function aggregateProjects(tasks: RawTask[]): AggregatedProject[] {
  const projectMap: Record<string, {
    key: string;
    id: string;
    projectName: string;
    client: string;
    totalHours: number;
    dailyLogs: RawTask[];
    team: Set<string>;
    dates: string[];
    startedDates: string[];
    deliveredDates: string[];
    hasDelivered: boolean;
    hasStarted: boolean;
  }> = {};

  tasks.forEach((t) => {
    const client = normalizeClientName(t.client);
    const key = canonicalProjectKey(t.project, client);
    if (!projectMap[key]) {
      projectMap[key] = {
        key: key,
        id: 'proj-' + key.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        projectName: (t.project || 'General Project Work').trim(),
        client: client,
        totalHours: 0.0,
        dailyLogs: [],
        team: new Set<string>(),
        dates: [],
        startedDates: [],
        deliveredDates: [],
        hasDelivered: false,
        hasStarted: false,
      };
    }

    const p = projectMap[key];
    if ((t.project || '').length > p.projectName.length) {
      p.projectName = t.project.trim();
    }
    p.client = client;

    p.totalHours += (t.hours || 0.0);
    p.dailyLogs.push(t);
    if (t.employee) p.team.add(t.employee);

    if (t.date) p.dates.push(t.date);
    if (t.started && t.started !== '-') {
      p.startedDates.push(t.started);
      p.hasStarted = true;
    }
    if (t.delivered && t.delivered !== '-') {
      p.deliveredDates.push(t.delivered);
      p.hasDelivered = true;
    }
    if (t.status === 'Delivered') p.hasDelivered = true;
    if (t.status === 'In Progress') p.hasStarted = true;
  });

  return Object.values(projectMap).map((p) => {
    const totalHours = Math.round(p.totalHours * 100) / 100;
    const dailyLogsCount = p.dailyLogs.length;
    const team = Array.from(p.team).sort();

    const earliestStart = p.startedDates.length > 0 ? p.startedDates.sort()[0] : (p.dates.length > 0 ? p.dates.sort()[0] : null);
    const sortedDelivered = p.deliveredDates.sort();
    const latestDelivered = sortedDelivered.length > 0 ? sortedDelivered[sortedDelivered.length - 1] : null;

    const tatDays = calculateTatDays(earliestStart, latestDelivered);

    let status: 'Delivered' | 'In Progress' | 'Pending';
    if (p.hasDelivered) {
      status = 'Delivered';
    } else if (p.hasStarted || totalHours > 0) {
      status = 'In Progress';
    } else {
      status = 'Pending';
    }

    return {
      key: p.key,
      id: p.id,
      projectName: p.projectName,
      client: p.client,
      totalHours,
      dailyLogs: p.dailyLogs,
      dailyLogsCount,
      team,
      dates: p.dates,
      startedDates: p.startedDates,
      deliveredDates: p.deliveredDates,
      earliestStart,
      latestDelivered,
      tatDays,
      status,
      hasDelivered: p.hasDelivered,
      hasStarted: p.hasStarted,
    };
  });
}

export function buildCompleteDataset(rawTasks: RawTask[], employeesList: string[], sourceFile: string = 'Timesheet-September2026.xlsx'): Dataset {
  // Normalize tasks
  const tasks: RawTask[] = rawTasks.map((t, idx) => ({
    ...t,
    id: t.id || `task-${idx + 1}`,
    client: normalizeClientName(t.client),
    hours: typeof t.hours === 'number' ? t.hours : (parseFloat(String(t.hours)) || 0),
    status: t.status || (t.delivered ? 'Delivered' : (t.hours > 0 ? 'In Progress' : 'Pending'))
  }));

  // Aggregate projects
  const projects = aggregateProjects(tasks);

  // Compute Company Metrics
  const totalHours = Math.round(tasks.reduce((sum, t) => sum + (t.hours || 0), 0) * 100) / 100;
  const deliveredCount = projects.filter((p) => p.status === 'Delivered').length;
  const inProgressCount = projects.filter((p) => p.status === 'In Progress').length;
  const pendingCount = projects.filter((p) => p.status === 'Pending').length;
  const deliveryRate = projects.length > 0 ? Math.round((deliveredCount / projects.length) * 1000) / 10 : 0;

  const uniqueClients = Array.from(new Set(projects.map((p) => p.client))).sort();
  const allDates = tasks.map((t) => t.date).filter(Boolean).sort();
  const dateRange = {
    start: allDates[0] || '2026-09-01',
    end: allDates[allDates.length - 1] || '2026-09-30'
  };

  const tatProjects = projects.filter((p) => p.tatDays !== null && p.tatDays !== undefined);
  const avgTatDays = tatProjects.length > 0
    ? Math.round((tatProjects.reduce((s, p) => s + (p.tatDays || 0), 0) / tatProjects.length) * 10) / 10
    : null;

  const companyMetrics: CompanyMetrics = {
    totalHours,
    totalDailyLogs: tasks.length,
    distinctProjectCount: projects.length,
    deliveredCount,
    inProgressCount,
    pendingCount,
    deliveryRate,
    activeEmployeesCount: employeesList.length,
    activeClientsCount: uniqueClients.length,
    avgHoursPerEmployee: employeesList.length > 0 ? Math.round((totalHours / employeesList.length) * 10) / 10 : 0,
    avgTatDays,
    dateRange
  };

  // Compute Employee Stats
  const employeeStats: Record<string, EmployeeStats> = {};
  employeesList.forEach((emp) => {
    const empTasks = tasks.filter((t) => t.employee.toLowerCase() === emp.toLowerCase());
    const empProjects = projects.filter((p) => p.team.some((name) => name.toLowerCase() === emp.toLowerCase()));
    const empHours = Math.round(empTasks.reduce((s, t) => s + (t.hours || 0), 0) * 100) / 100;

    const daysSet = new Set(empTasks.filter((t) => t.hours > 0).map((t) => t.date));
    const daysWorked = daysSet.size;

    // Daily hours mapping
    const dailyMap: Record<string, number> = {};
    empTasks.forEach((t) => {
      if (t.date) {
        dailyMap[t.date] = (dailyMap[t.date] || 0) + (t.hours || 0);
      }
    });
    const dailyHours = Object.keys(dailyMap).sort().map((d) => ({
      date: d,
      hours: Math.round(dailyMap[d] * 100) / 100
    }));

    // Clients breakdown
    const clientMap: Record<string, { hours: number; count: number }> = {};
    empTasks.forEach((t) => {
      const c = t.client;
      if (!clientMap[c]) clientMap[c] = { hours: 0, count: 0 };
      clientMap[c].hours += (t.hours || 0);
      clientMap[c].count += 1;
    });
    const clientsBreakdown = Object.keys(clientMap).map((c) => ({
      client: c,
      hours: Math.round(clientMap[c].hours * 100) / 100,
      count: clientMap[c].count
    })).sort((a, b) => b.hours - a.hours);

    const empTatProjects = empProjects.filter((p) => p.tatDays !== null);
    const empAvgTat = empTatProjects.length > 0
      ? Math.round((empTatProjects.reduce((s, p) => s + (p.tatDays || 0), 0) / empTatProjects.length) * 10) / 10
      : null;

    employeeStats[emp] = {
      name: emp,
      totalHours: empHours,
      logCount: empTasks.length,
      distinctProjectCount: empProjects.length,
      deliveredProjectCount: empProjects.filter((p) => p.status === 'Delivered').length,
      inProgressProjectCount: empProjects.filter((p) => p.status === 'In Progress').length,
      pendingProjectCount: empProjects.filter((p) => p.status === 'Pending').length,
      activeClients: Object.keys(clientMap),
      daysWorked,
      avgHoursPerDay: daysWorked > 0 ? Math.round((empHours / daysWorked) * 10) / 10 : 0,
      avgTatDays: empAvgTat,
      clientsBreakdown,
      dailyHours,
      tasks: empTasks
    };
  });

  // Compute Client Summaries
  const clientSummaries: ClientSummary[] = uniqueClients.map((client) => {
    const cProjects = projects.filter((p) => p.client === client);
    const cTasks = tasks.filter((t) => t.client === client);
    const cHours = Math.round(cTasks.reduce((s, t) => s + (t.hours || 0), 0) * 100) / 100;
    const teamSet = new Set<string>();
    cProjects.forEach((p) => p.team.forEach((m) => teamSet.add(m)));

    return {
      name: client,
      totalHours: cHours,
      distinctProjectCount: cProjects.length,
      deliveredCount: cProjects.filter((p) => p.status === 'Delivered').length,
      inProgressCount: cProjects.filter((p) => p.status === 'In Progress').length,
      pendingCount: cProjects.filter((p) => p.status === 'Pending').length,
      team: Array.from(teamSet).sort(),
      projects: cProjects
    };
  }).sort((a, b) => b.totalHours - a.totalHours);

  return {
    source_file: sourceFile,
    generated_at: new Date().toISOString(),
    employees: employeesList,
    tasks,
    projects,
    employeeStats,
    clientSummaries,
    companyMetrics
  };
}
