import defaultJson from '@/data/default_data.json';
import { buildCompleteDataset } from './deduplication';
import { Dataset } from './types';

export const baselineDataset: Dataset = buildCompleteDataset(
  defaultJson.tasks as any,
  defaultJson.employees,
  defaultJson.source_file || 'Timesheet-September2026.xlsx'
);
