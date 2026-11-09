import React, { Suspense } from 'react';
import { getAllFormulations, getAllTerminology } from '@/lib/database/repository';
import { ResearchPortal } from '@/components/research/ResearchPortal';
import fs from 'fs';
import path from 'path';
import { Sparkles } from 'lucide-react';

function getResearchPapers() {
  const possiblePaths = [
    path.join(process.cwd(), 'data', 'seed', 'research.json'),
    path.join(process.cwd(), 'dravyadex', 'data', 'seed', 'research.json'),
  ];
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      return JSON.parse(fs.readFileSync(p, 'utf8'));
    }
  }
  return [];
}

export default function ResearchPage() {
  const papers = getResearchPapers();
  const formulations = getAllFormulations();
  const terms = getAllTerminology();

  return (
    <Suspense
      fallback={
        <div className="py-32 flex flex-col items-center justify-center gap-3 text-[#929BA7]">
          <Sparkles className="w-6 h-6 animate-spin text-[#83C9F5]" />
          <div className="text-sm">Loading Research Corpus...</div>
        </div>
      }
    >
      <ResearchPortal papers={papers} formulations={formulations} terms={terms} />
    </Suspense>
  );
}
