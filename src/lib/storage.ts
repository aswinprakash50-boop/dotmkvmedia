import fs from 'fs';
import path from 'path';
import { Dataset } from './types';
import { baselineDataset } from './defaultData';

// Global in-memory cache for serverless lifecycles
declare global {
  var __dotmkv_latest_dataset: Dataset | null;
}

const LOCAL_DATA_DIR = path.join(process.cwd(), 'data');
const LOCAL_DATA_FILE = path.join(LOCAL_DATA_DIR, 'latest_dataset.json');
const TMP_DATA_FILE = path.join('/tmp', 'dotmkv_latest_dataset.json');

export function saveLatestDataset(dataset: Dataset, rawBuffer?: Buffer, fileName?: string): boolean {
  // 1. Update in-memory global cache
  globalThis.__dotmkv_latest_dataset = dataset;

  let savedLocally = false;

  // 2. Try saving to project data/ directory (local dev, self-hosted, Docker)
  try {
    if (!fs.existsSync(LOCAL_DATA_DIR)) {
      fs.mkdirSync(LOCAL_DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(LOCAL_DATA_FILE, JSON.stringify(dataset, null, 2), 'utf-8');

    if (rawBuffer && fileName) {
      const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
      fs.writeFileSync(path.join(LOCAL_DATA_DIR, safeName), rawBuffer);
    }
    savedLocally = true;
  } catch (err) {
    // Expected in read-only serverless environments like Vercel
  }

  // 3. Try saving to /tmp directory (Vercel serverless writable storage)
  try {
    fs.writeFileSync(TMP_DATA_FILE, JSON.stringify(dataset, null, 2), 'utf-8');
  } catch (err) {
    // Ignore if /tmp write fails
  }

  return savedLocally;
}

export function getLatestDataset(): Dataset {
  // 1. Check in-memory global cache
  if (globalThis.__dotmkv_latest_dataset) {
    return globalThis.__dotmkv_latest_dataset;
  }

  // 2. Check local data directory
  try {
    if (fs.existsSync(LOCAL_DATA_FILE)) {
      const raw = fs.readFileSync(LOCAL_DATA_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      globalThis.__dotmkv_latest_dataset = parsed;
      return parsed;
    }
  } catch (err) {
    // Fallthrough
  }

  // 3. Check /tmp directory
  try {
    if (fs.existsSync(TMP_DATA_FILE)) {
      const raw = fs.readFileSync(TMP_DATA_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      globalThis.__dotmkv_latest_dataset = parsed;
      return parsed;
    }
  } catch (err) {
    // Fallthrough
  }

  // 4. Default fallback to baseline September 2026 data
  return baselineDataset;
}

export function resetDatasetToBaseline(): Dataset {
  globalThis.__dotmkv_latest_dataset = null;

  try {
    if (fs.existsSync(LOCAL_DATA_FILE)) {
      fs.unlinkSync(LOCAL_DATA_FILE);
    }
  } catch (err) {
    // Ignore
  }

  try {
    if (fs.existsSync(TMP_DATA_FILE)) {
      fs.unlinkSync(TMP_DATA_FILE);
    }
  } catch (err) {
    // Ignore
  }

  return baselineDataset;
}
