import { NextRequest, NextResponse } from 'next/server';
import { getAllDataConflicts } from '@/lib/database/repository';

export async function GET() {
  try {
    const conflicts = getAllDataConflicts();
    return NextResponse.json({
      success: true,
      total: conflicts.length,
      data: conflicts,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Error fetching conflicts' },
      { status: 500 }
    );
  }
}
