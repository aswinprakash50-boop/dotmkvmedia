import { NextResponse } from 'next/server';
import { baselineDataset } from '@/lib/defaultData';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: baselineDataset,
  });
}
