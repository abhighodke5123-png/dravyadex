import React from 'react';
import { getAllDataConflicts, getDataQualityReport } from '@/lib/database/repository';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
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

export default function AdminPage() {
  const conflicts = getAllDataConflicts();
  const quality = getDataQualityReport();
  const importReportMd = getImportReportMarkdown();

  return (
    <AdminDashboard
      conflicts={conflicts}
      qualityReport={quality}
      importReportMd={importReportMd}
    />
  );
}
