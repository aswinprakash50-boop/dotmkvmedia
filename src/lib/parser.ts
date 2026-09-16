import * as XLSX from 'xlsx';
import { RawTask } from './types';
import { normalizeClientName, calculateTatDays } from './deduplication';

export function parseExcelDate(val: any, defaultYear: number = 2026, defaultMonth: number = 9): string | null {
  if (val === null || val === undefined) return null;
  const strVal = String(val).trim();
  if (strVal === '' || strVal === '-' || strVal.toLowerCase() === 'none') return null;

  const num = Number(strVal);
  if (!isNaN(num) && num > 20000) {
    const d = new Date((num - 25569) * 86400 * 1000);
    return d.toISOString().split('T')[0];
  }

  const match = strVal.match(/^(\d{1,2})\s*[-/]?\s*([a-zA-Z]+)/);
  if (match) {
    const day = parseInt(match[1], 10);
    const monStr = match[2].toLowerCase().substring(0, 3);
    const monthMap: Record<string, number> = {
      jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
      jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12
    };
    const mon = monthMap[monStr] || defaultMonth;
    return `${defaultYear}-${String(mon).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(strVal)) return strVal;
  return strVal;
}

export function parseExcelHours(val: any): number {
  if (val === null || val === undefined) return 0.0;
  const strVal = String(val).trim();
  if (strVal === '' || strVal === '-' || strVal.toLowerCase() === 'none') return 0.0;
  const num = parseFloat(strVal);
  if (isNaN(num)) return 0.0;

  if (num > 0 && num < 1.0) {
    return Math.round(num * 24.0 * 100) / 100;
  }
  return Math.round(num * 100) / 100;
}

export function parseWorkbookBuffer(buffer: ArrayBuffer | Buffer): { employees: string[]; tasks: RawTask[] } {
  const workbook = XLSX.read(buffer, { type: 'buffer' });
  const parsedTasks: RawTask[] = [];
  const parsedEmployees: string[] = [];

  workbook.SheetNames.forEach((sheetName) => {
    if (['Summary', 'Overview', 'Master', 'Sheet1', 'Instructions'].includes(sheetName)) return;

    parsedEmployees.push(sheetName);
    const worksheet = workbook.Sheets[sheetName];
    const rows: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: null });

    let headerRowIndex = -1;
    const colMap = { date: -1, client: -1, project: -1, hours: -1, started: -1, delivered: -1 };

    for (let r = 0; r < Math.min(10, rows.length); r++) {
      const row = rows[r];
      if (!row || !Array.isArray(row)) continue;
      const strRow = row.map((cell) => String(cell || '').trim().toUpperCase());
      if (strRow.some((c) => c.includes('PROJECT') || c.includes('CLIENT') || c.includes('DATE'))) {
        headerRowIndex = r;
        row.forEach((colName, cIdx) => {
          const c = String(colName || '').trim().toUpperCase();
          if (c.includes('DATE') && colMap.date === -1) colMap.date = cIdx;
          if (c.includes('CLIENT') && colMap.client === -1) colMap.client = cIdx;
          if (c.includes('PROJECT') && !c.includes('HOURS') && colMap.project === -1) colMap.project = cIdx;
          if ((c.includes('TIME') || c.includes('HOURS')) && !c.includes('PROJECT') && colMap.hours === -1) colMap.hours = cIdx;
          if (c.includes('STARTED') && colMap.started === -1) colMap.started = cIdx;
          if (c.includes('DELIVERED') && colMap.delivered === -1) colMap.delivered = cIdx;
        });
        break;
      }
    }

    if (sheetName === 'Sourav' || colMap.hours === -1) {
      if (rows[headerRowIndex]) {
        rows[headerRowIndex].forEach((c, idx) => {
          const str = String(c || '').toUpperCase();
          if (str.includes('DAILY TIME')) colMap.hours = idx;
        });
      }
    }

    let lastDate: string | null = null;
    let lastClient: string | null = null;

    for (let r = headerRowIndex + 1; r < rows.length; r++) {
      const row = rows[r];
      if (!row) continue;

      const rawDate = colMap.date !== -1 ? row[colMap.date] : null;
      const rawClient = colMap.client !== -1 ? row[colMap.client] : null;
      const rawProject = colMap.project !== -1 ? row[colMap.project] : null;
      const rawHours = colMap.hours !== -1 ? row[colMap.hours] : null;
      const rawStarted = colMap.started !== -1 ? row[colMap.started] : null;
      const rawDelivered = colMap.delivered !== -1 ? row[colMap.delivered] : null;

      const parsedDate = parseExcelDate(rawDate);
      if (parsedDate) lastDate = parsedDate;

      const clientNormalized = normalizeClientName(rawClient);
      if (clientNormalized !== 'Internal / Unspecified') lastClient = clientNormalized;

      const projVal = rawProject && String(rawProject).trim() !== '-' ? String(rawProject).trim() : null;
      const hoursVal = parseExcelHours(rawHours);
      const startVal = parseExcelDate(rawStarted);
      const delivVal = parseExcelDate(rawDelivered);

      if (projVal || hoursVal > 0 || (clientNormalized && clientNormalized !== 'Internal / Unspecified')) {
        const status = delivVal && delivVal !== '-' ? 'Delivered' : (startVal && startVal !== '-' ? 'In Progress' : 'Pending');
        const tat = calculateTatDays(startVal, delivVal);

        parsedTasks.push({
          id: `${sheetName.toLowerCase()}-${r + 1}`,
          employee: sheetName,
          row: r + 1,
          date: parsedDate || lastDate || '2026-09-01',
          client: clientNormalized !== 'Internal / Unspecified' ? clientNormalized : (lastClient || 'Internal / Unspecified'),
          project: projVal || 'General Project Work',
          hours: hoursVal,
          started: startVal,
          delivered: delivVal,
          status: status,
          tat_days: tat
        });
      }
    }
  });

  return { employees: parsedEmployees, tasks: parsedTasks };
}
