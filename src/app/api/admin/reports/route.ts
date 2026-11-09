import { NextResponse } from 'next/server';
import { getDataQualityReport } from '@/lib/database/repository';
import fs from 'fs';
import path from 'path';

function getImportReportMarkdown() {
  const possiblePaths = [
    path.join(process.cwd(), 'reports', 'data-import-report.md'),
    path.join(process.cwd(), 'dravyadex', 'reports', 'data-import-report.md'),
  ];
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      return fs.readFileSync(p, 'utf8');
    }
  }
  return '';
}

export async function GET() {
  try {
    const qualityReport = getDataQualityReport();
    const importReportMd = getImportReportMarkdown();

    return NextResponse.json({
      success: true,
      quality: qualityReport,
      importReportMarkdown: importReportMd,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Error fetching admin reports' },
      { status: 500 }
    );
  }
}
