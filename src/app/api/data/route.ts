import { NextRequest, NextResponse } from 'next/server';
import { getLatestDataset, resetDatasetToBaseline } from '@/lib/storage';

export async function GET() {
  const currentData = getLatestDataset();
  return NextResponse.json({
    success: true,
    data: currentData,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    if (body.action === 'reset') {
      const resetData = resetDatasetToBaseline();
      return NextResponse.json({
        success: true,
        message: 'Reset to baseline September 2026 dataset',
        data: resetData,
      });
    }

    return NextResponse.json({
      success: true,
      data: getLatestDataset(),
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to process request' },
      { status: 500 }
    );
  }
}
