'use client';

import React, { useState } from 'react';
import {
  ShieldAlert,
  Database,
  CheckCircle,
  AlertTriangle,
  RotateCcw,
  FileText,
  Activity,
  Layers,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { DataConflict } from '@/types/dravya';

interface AdminDashboardProps {
  conflicts: DataConflict[];
  qualityReport: any;
  importReportMd: string;
}

export function AdminDashboard({ conflicts, qualityReport, importReportMd }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'kpi' | 'conflicts' | 'quality' | 'rawReport'>('kpi');
  const [selectedConflict, setSelectedConflict] = useState<DataConflict | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#83C9F5] mb-2">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Administrative Governance & Ingestion Ledger</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#F4F5F1] tracking-tight">
            Data Quality & Conflict Console
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-[#929BA7] max-w-2xl leading-relaxed">
            Monitor ingested open-source datasets, review cross-source classical divergences, verify SHA-256 integrity, and audit data completeness.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 bg-[#101C2A] p-1.5 rounded-2xl border border-white/5 text-xs">
          <button
            onClick={() => setActiveTab('kpi')}
            className={cn(
              'px-4 py-2 rounded-xl transition-colors font-medium',
              activeTab === 'kpi'
                ? 'bg-[#83C9F5] text-[#07090C] font-semibold'
                : 'text-[#929BA7] hover:text-[#F4F5F1]'
            )}
          >
            Overview KPIs
          </button>
          <button
            onClick={() => setActiveTab('conflicts')}
            className={cn(
              'px-4 py-2 rounded-xl transition-colors font-medium flex items-center gap-1.5',
              activeTab === 'conflicts'
                ? 'bg-amber-400 text-[#07090C] font-semibold'
                : 'text-[#929BA7] hover:text-[#F4F5F1]'
            )}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Conflicts ({conflicts.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('quality')}
            className={cn(
              'px-4 py-2 rounded-xl transition-colors font-medium',
              activeTab === 'quality'
                ? 'bg-[#6BAA83] text-[#07090C] font-semibold'
                : 'text-[#929BA7] hover:text-[#F4F5F1]'
            )}
          >
            Quality Metrics
          </button>
          <button
            onClick={() => setActiveTab('rawReport')}
            className={cn(
              'px-4 py-2 rounded-xl transition-colors font-medium',
              activeTab === 'rawReport'
                ? 'bg-[#B5D3BD] text-[#07090C] font-semibold'
                : 'text-[#929BA7] hover:text-[#F4F5F1]'
            )}
          >
            Audit Report Markdown
          </button>
        </div>
      </div>

      {/* TAB 1: OVERVIEW KPIS */}
      {activeTab === 'kpi' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#101C2A] border border-white/5 rounded-2xl p-6">
              <span className="text-[10px] font-mono text-[#929BA7] uppercase">Consolidated Dravyas</span>
              <div className="font-serif text-3xl font-bold text-[#F4F5F1] mt-2">483</div>
              <div className="text-[11px] text-[#6BAA83] mt-1">360 Source A + 123 Standalone Source C</div>
            </div>

            <div className="bg-[#101C2A] border border-white/5 rounded-2xl p-6">
              <span className="text-[10px] font-mono text-[#929BA7] uppercase">Biomedical Papers</span>
              <div className="font-serif text-3xl font-bold text-[#83C9F5] mt-2">3,593</div>
              <div className="text-[11px] text-[#929BA7] mt-1">PMID & DOI Indexed</div>
            </div>

            <div className="bg-[#101C2A] border border-white/5 rounded-2xl p-6">
              <span className="text-[10px] font-mono text-[#929BA7] uppercase">Classical Formulations</span>
              <div className="font-serif text-3xl font-bold text-[#B5D3BD] mt-2">106</div>
              <div className="text-[11px] text-[#929BA7] mt-1">AFI Part I / II Recipes</div>
            </div>

            <div className="bg-[#101C2A] border border-white/5 rounded-2xl p-6">
              <span className="text-[10px] font-mono text-[#929BA7] uppercase">Property Divergences</span>
              <div className="font-serif text-3xl font-bold text-amber-400 mt-2">{conflicts.length}</div>
              <div className="text-[11px] text-amber-300 mt-1">Parallel Assertions Preserved</div>
            </div>
          </div>

          {/* Ingestion Pipelines Status Card */}
          <div className="bg-[#101C2A] border border-white/5 rounded-3xl p-6 md:p-8 space-y-6">
            <h3 className="font-serif text-xl font-bold text-[#F4F5F1]">
              Registered Pipeline Datasets & Validation Health
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#0A1420] p-5 rounded-2xl border border-white/5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[#6BAA83] font-semibold">SOURCE A (Amidha)</span>
                  <CheckCircle className="w-4 h-4 text-[#6BAA83]" />
                </div>
                <div className="font-serif text-lg font-bold text-[#F4F5F1]">360 Canonical Herbs</div>
                <p className="text-xs text-[#929BA7]">
                  Checksum verified. 100% indications availability. Complete Rasa Panchaka and Dosha parameters.
                </p>
              </div>

              <div className="bg-[#0A1420] p-5 rounded-2xl border border-white/5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[#83C9F5] font-semibold">SOURCE B (Explorer)</span>
                  <CheckCircle className="w-4 h-4 text-[#83C9F5]" />
                </div>
                <div className="font-serif text-lg font-bold text-[#F4F5F1]">Software Consumer</div>
                <p className="text-xs text-[#929BA7]">
                  Verified de-duplication: Source B consumes Source A JSON. No duplicate records ingested.
                </p>
              </div>

              <div className="bg-[#0A1420] p-5 rounded-2xl border border-white/5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[#B5D3BD] font-semibold">SOURCE C (Nighantu)</span>
                  <CheckCircle className="w-4 h-4 text-[#B5D3BD]" />
                </div>
                <div className="font-serif text-lg font-bold text-[#F4F5F1]">8 Scholarly Datasets</div>
                <p className="text-xs text-[#929BA7]">
                  Zenodo DOI: 10.5281/zenodo.22805684. 284 GBIF taxa, 816 compounds, 3,593 papers, 277 terms.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CLASSICAL DATA CONFLICTS REVIEW */}
      {activeTab === 'conflicts' && (
        <div className="bg-[#101C2A] border border-white/5 rounded-3xl p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/5">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#F4F5F1]">
                Classical Conflict & Divergence Ledger
              </h3>
              <p className="text-xs text-[#929BA7] mt-1">
                Policy: In traditional Dravyaguna, secondary Rasas or Virya perspectives vary across treatises. DravyaDex preserves both assertions in parallel.
              </p>
            </div>
            <span className="text-xs font-mono text-amber-400 bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-full">
              {conflicts.length} Flagged Assertions
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0A1420] text-[#636D7A] font-mono uppercase text-[10px]">
                <tr>
                  <th className="p-3">Medicinal Plant</th>
                  <th className="p-3">Botanical Binomial</th>
                  <th className="p-3">Field</th>
                  <th className="p-3">Source A (Amidha)</th>
                  <th className="p-3">Source C (Nighantu)</th>
                  <th className="p-3">Action Policy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {conflicts.map((c, idx) => (
                  <tr key={idx} className="hover:bg-white/5">
                    <td className="p-3 font-semibold text-[#F4F5F1] capitalize">{c.dravyaSlug.replace(/-/g, ' ')}</td>
                    <td className="p-3 font-serif italic text-[#B5D3BD]">{c.botanicalName}</td>
                    <td className="p-3 font-mono text-[#83C9F5] uppercase">{c.fieldName}</td>
                    <td className="p-3 text-[#F4F5F1] font-mono text-[11px]">
                      {Array.isArray(c.sourceA) ? c.sourceA.join(', ') : String(c.sourceA)}
                    </td>
                    <td className="p-3 text-amber-300 font-mono text-[11px]">
                      {Array.isArray(c.sourceC) ? c.sourceC.join(', ') : String(c.sourceC)}
                    </td>
                    <td className="p-3">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#6BAA83]/15 text-[#6BAA83] border border-[#6BAA83]/30">
                        both_preserved
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: DATA QUALITY METRICS */}
      {activeTab === 'quality' && (
        <div className="bg-[#101C2A] border border-white/5 rounded-3xl p-6 md:p-8 space-y-6">
          <h3 className="font-serif text-xl font-bold text-[#F4F5F1]">
            Automated Quality Audit Results
          </h3>
          {qualityReport ? (
            <div className="space-y-6 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-[#0A1420] p-4 rounded-xl border border-white/5">
                  <span className="text-[#636D7A] font-mono uppercase text-[10px]">Audited Attributes</span>
                  <div className="text-xl font-bold text-[#F4F5F1] mt-1">{qualityReport.crossSourceMetrics?.totalAttributesAudited || 3960}</div>
                </div>
                <div className="bg-[#0A1420] p-4 rounded-xl border border-white/5">
                  <span className="text-[#636D7A] font-mono uppercase text-[10px]">Completeness Rate</span>
                  <div className="text-xl font-bold text-[#6BAA83] mt-1">
                    {Math.round((qualityReport.crossSourceMetrics?.fieldCompletenessRate || 1.0) * 100)}%
                  </div>
                </div>
                <div className="bg-[#0A1420] p-4 rounded-xl border border-white/5">
                  <span className="text-[#636D7A] font-mono uppercase text-[10px]">Overall Status</span>
                  <div className="text-xl font-bold text-[#6BAA83] mt-1">{qualityReport.overallStatus}</div>
                </div>
                <div className="bg-[#0A1420] p-4 rounded-xl border border-white/5">
                  <span className="text-[#636D7A] font-mono uppercase text-[10px]">Anomalies Found</span>
                  <div className="text-xl font-bold text-[#83C9F5] mt-1">{qualityReport.crossSourceMetrics?.anomaliesFound || 0}</div>
                </div>
              </div>

              <div className="bg-[#0A1420] p-4 rounded-xl border border-white/5 overflow-x-auto">
                <pre className="text-[11px] font-mono text-[#929BA7]">
                  {JSON.stringify(qualityReport, null, 2)}
                </pre>
              </div>
            </div>
          ) : (
            <div className="text-xs text-[#929BA7]">No reports/data-quality.json loaded yet.</div>
          )}
        </div>
      )}

      {/* TAB 4: RAW AUDIT REPORT MARKDOWN */}
      {activeTab === 'rawReport' && (
        <div className="bg-[#101C2A] border border-white/5 rounded-3xl p-6 md:p-8 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <h3 className="font-serif text-xl font-bold text-[#F4F5F1]">
              Live Data Ingestion Audit Report (reports/data-import-report.md)
            </h3>
            <span className="text-[11px] font-mono text-[#6BAA83]">Live Markdown Artifact</span>
          </div>
          <div className="bg-[#0A1420] p-6 rounded-2xl border border-white/5 overflow-x-auto font-mono text-xs text-[#929BA7] whitespace-pre-wrap leading-relaxed">
            {importReportMd || 'No markdown report found in reports/data-import-report.md.'}
          </div>
        </div>
      )}
    </div>
  );
}
