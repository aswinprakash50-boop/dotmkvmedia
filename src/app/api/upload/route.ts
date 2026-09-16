import { NextRequest, NextResponse } from 'next/server';
import { parseWorkbookBuffer } from '@/lib/parser';
import { buildCompleteDataset } from '@/lib/deduplication';
import { saveLatestDataset } from '@/lib/storage';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const { employees, tasks } = parseWorkbookBuffer(buffer);

    if (tasks.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'No valid employee timesheet records found in the uploaded workbook.'
      }, { status: 422 });
    }

    const dataset = buildCompleteDataset(tasks, employees, file.name);

    // Persist latest dataset to backend storage
    saveLatestDataset(dataset, buffer, file.name);

    return NextResponse.json({
      success: true,
      message: `Parsed and stored ${tasks.length} daily logs across ${dataset.projects.length} distinct projects`,
      data: dataset,
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err?.message || 'Error processing uploaded file'
    }, { status: 500 });
  }
}
