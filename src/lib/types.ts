export interface RawTask {
  id: string;
  employee: string;
  row?: number;
  date: string;
  client: string;
  project: string;
  hours: number;
  started?: string | null;
  delivered?: string | null;
  status: 'Delivered' | 'In Progress' | 'Pending' | string;
  tat_days?: number | null;
}

export interface AggregatedProject {
  key: string;
  id: string;
  projectName: string;
  client: string;
  totalHours: number;
  dailyLogs: RawTask[];
  dailyLogsCount: number;
  team: string[];
  dates: string[];
  startedDates: string[];
  deliveredDates: string[];
  earliestStart: string | null;
  latestDelivered: string | null;
  tatDays: number | null;
  status: 'Delivered' | 'In Progress' | 'Pending';
  hasDelivered: boolean;
  hasStarted: boolean;
}

export interface EmployeeStats {
  name: string;
  totalHours: number;
  logCount: number;
  distinctProjectCount: number;
  deliveredProjectCount: number;
  inProgressProjectCount: number;
  pendingProjectCount: number;
  activeClients: string[];
  daysWorked: number;
  avgHoursPerDay: number;
  avgTatDays: number | null;
  clientsBreakdown: { client: string; hours: number; count: number }[];
  dailyHours: { date: string; hours: number }[];
  tasks: RawTask[];
}

export interface ClientSummary {
  name: string;
  totalHours: number;
  distinctProjectCount: number;
  deliveredCount: number;
  inProgressCount: number;
  pendingCount: number;
  team: string[];
  projects: AggregatedProject[];
}

export interface CompanyMetrics {
  totalHours: number;
  totalDailyLogs: number;
  distinctProjectCount: number;
  deliveredCount: number;
  inProgressCount: number;
  pendingCount: number;
  deliveryRate: number;
  activeEmployeesCount: number;
  activeClientsCount: number;
  avgHoursPerEmployee: number;
  avgTatDays: number | null;
  dateRange: { start: string; end: string };
}

export interface Dataset {
  source_file: string;
  generated_at: string;
  employees: string[];
  tasks: RawTask[];
  projects: AggregatedProject[];
  employeeStats: Record<string, EmployeeStats>;
  clientSummaries: ClientSummary[];
  companyMetrics: CompanyMetrics;
}
