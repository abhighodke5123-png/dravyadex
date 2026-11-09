'use client';

import React from 'react';
import Link from 'next/link';
import { useComparison } from './ComparisonContext';
import { X, Layers, ArrowRight, Trash2 } from 'lucide-react';

export function ComparisonTray() {
  const { selectedHerbs, removeHerbFromCompare, clearComparison } = useComparison();

  if (selectedHerbs.length === 0) return null;

  const compareUrl = `/compare?${selectedHerbs.map(h => `slug=${encodeURIComponent(h.slug)}`).join('&')}`;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-xl px-4 animate-fade-in">
      <div className="bg-[#101C2A]/95 backdrop-blur-md border border-[#6BAA83]/40 rounded-2xl p-3 shadow-2xl shadow-black/80 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#6BAA83]/20 flex items-center justify-center text-[#6BAA83]">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-[#F4F5F1]">
              Comparative Tray ({selectedHerbs.length}/3)
            </div>
            <div className="text-[11px] text-[#929BA7]">
              {selectedHerbs.length < 2 ? 'Select 1 more plant to compare' : 'Ready for comparative analysis'}
            </div>
          </div>
        </div>

        {/* Selected plant pills */}
        <div className="flex items-center gap-2 overflow-x-auto">
          {selectedHerbs.map(herb => (
            <div
              key={herb.slug}
              className="flex items-center gap-1.5 bg-[#0A1420] border border-white/10 px-2.5 py-1 rounded-full text-xs text-[#F4F5F1]"
            >
              <span className="font-medium truncate max-w-[90px]">{herb.canonical_name}</span>
              <button
                onClick={() => removeHerbFromCompare(herb.slug)}
                className="text-[#929BA7] hover:text-red-400 transition-colors"
                title="Remove"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={clearComparison}
            className="p-2 rounded-lg hover:bg-white/5 text-[#929BA7] hover:text-red-400 transition-colors"
            title="Clear all"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <Link
            href={compareUrl}
            className="flex items-center gap-1.5 bg-[#6BAA83] hover:bg-[#5aa073] text-black font-semibold text-xs px-3.5 py-2 rounded-xl transition-colors shadow-md"
          >
            <span>Compare</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
