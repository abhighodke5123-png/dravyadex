'use client';

import React from 'react';
import Link from 'next/link';
import { Dravya } from '@/types/dravya';
import { useComparison } from '@/components/comparison/ComparisonContext';
import { Plus, Check, ArrowRight, ShieldCheck, Database, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeaturedDravyasProps {
  dravyas: Dravya[];
}

export function FeaturedDravyas({ dravyas }: FeaturedDravyasProps) {
  const { addHerbToCompare, removeHerbFromCompare, isHerbInCompare } = useComparison();

  return (
    <section className="py-24 bg-[#07090C] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#6BAA83] mb-2">
              Canonical Benchmarks
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#F4F5F1] tracking-tight">
              Featured Medicinal Dravyas
            </h2>
            <p className="mt-3 text-sm text-[#929BA7] max-w-xl">
              Curated monographs representing cornerstone classical pharmacology, botanical families, and documented pharmacological actions.
            </p>
          </div>
          <Link
            href="/explore"
            className="flex items-center gap-2 text-xs font-semibold text-[#6BAA83] hover:text-[#B5D3BD] transition-colors group"
          >
            <span>View all 483 Dravyas</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Herb Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dravyas.map(herb => {
            const inCompare = isHerbInCompare(herb.slug);

            return (
              <div
                key={herb.slug}
                className="group relative bg-[#101C2A] border border-white/5 hover:border-[#6BAA83]/40 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-black/50"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#929BA7] bg-[#0A1420] border border-white/5 px-2.5 py-1 rounded-md">
                      {herb.family || 'Taxon'}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] font-mono text-[#6BAA83] bg-[#6BAA83]/10 border border-[#6BAA83]/20 px-2 py-0.5 rounded-full">
                      <ShieldCheck className="w-3 h-3" />
                      <span>{herb.verified ? 'Verified' : 'Documented'}</span>
                    </div>
                  </div>

                  {/* Names */}
                  <Link href={`/dravya/${herb.slug}`} className="block group-hover:text-[#6BAA83] transition-colors">
                    <h3 className="font-serif text-2xl font-bold text-[#F4F5F1] tracking-tight">
                      {herb.canonical_name}
                    </h3>
                  </Link>
                  <p className="font-serif italic text-sm text-[#B5D3BD] mt-0.5">
                    {herb.botanical_name}
                  </p>
                  {herb.sanskrit_name && herb.sanskrit_name !== herb.canonical_name && (
                    <div className="text-xs text-[#929BA7] font-devanagari mt-1">
                      Sanskrit: {herb.sanskrit_name}
                    </div>
                  )}

                  {/* Summary preview */}
                  <p className="mt-4 text-xs text-[#929BA7] line-clamp-2 leading-relaxed">
                    {herb.summary}
                  </p>

                  {/* Rasa Panchaka Compact Strip */}
                  <div className="mt-5 pt-4 border-t border-white/5 grid grid-cols-3 gap-2 text-[11px]">
                    <div className="bg-[#0A1420] p-2 rounded-lg border border-white/5">
                      <div className="text-[#636D7A] text-[9px] uppercase font-mono">Rasa</div>
                      <div className="text-[#F4F5F1] font-medium truncate">
                        {herb.properties?.rasa?.slice(0, 2).join(', ') || 'N/A'}
                      </div>
                    </div>
                    <div className="bg-[#0A1420] p-2 rounded-lg border border-white/5">
                      <div className="text-[#636D7A] text-[9px] uppercase font-mono">Virya</div>
                      <div className={cn(
                        'font-medium truncate',
                        herb.properties?.virya === 'Ushna' ? 'text-orange-400' : 'text-cyan-400'
                      )}>
                        {herb.properties?.virya || 'N/A'}
                      </div>
                    </div>
                    <div className="bg-[#0A1420] p-2 rounded-lg border border-white/5">
                      <div className="text-[#636D7A] text-[9px] uppercase font-mono">Vipaka</div>
                      <div className="text-[#F4F5F1] font-medium truncate">
                        {herb.properties?.vipaka || 'N/A'}
                      </div>
                    </div>
                  </div>

                  {/* Indications Preview */}
                  {herb.indications && herb.indications.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {herb.indications.slice(0, 3).map(ind => (
                        <span
                          key={ind}
                          className="text-[10px] bg-[#0A1420] text-[#929BA7] px-2 py-0.5 rounded border border-white/5"
                        >
                          {ind}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Bottom: Evidence tags & Actions */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[10px] text-[#636D7A]">
                    {herb.research && herb.research.length > 0 && (
                      <span className="flex items-center gap-1 text-[#83C9F5]">
                        <BookOpen className="w-3 h-3" />
                        {herb.research.length} Papers
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Database className="w-3 h-3" />
                      CC BY 4.0
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Compare Button */}
                    <button
                      onClick={() => inCompare ? removeHerbFromCompare(herb.slug) : addHerbToCompare(herb)}
                      className={cn(
                        'p-2 rounded-xl border text-xs transition-colors flex items-center gap-1',
                        inCompare
                          ? 'bg-[#6BAA83]/20 border-[#6BAA83] text-[#6BAA83]'
                          : 'bg-[#0A1420] border-white/10 text-[#929BA7] hover:text-[#F4F5F1] hover:border-white/20'
                      )}
                      title={inCompare ? 'Remove from compare' : 'Add to compare matrix'}
                    >
                      {inCompare ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </button>

                    {/* View Details Link */}
                    <Link
                      href={`/dravya/${herb.slug}`}
                      className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-[#6BAA83] hover:text-[#07090C] text-[#F4F5F1] text-xs font-medium transition-colors"
                    >
                      View Monograph
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
