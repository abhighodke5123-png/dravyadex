'use client';

import React from 'react';
import Link from 'next/link';
import { Dravya } from '@/types/dravya';
import { useComparison } from '@/components/comparison/ComparisonContext';
import { Plus, Check, ShieldCheck, BookOpen, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HerbCardProps {
  herb: Dravya;
}

export function HerbCard({ herb }: HerbCardProps) {
  const { addHerbToCompare, removeHerbFromCompare, isHerbInCompare } = useComparison();
  const inCompare = isHerbInCompare(herb.slug);

  return (
    <div className="bg-[#101C2A] border border-white/5 hover:border-[#6BAA83]/40 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-lg hover:shadow-black/40 group">
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#929BA7] bg-[#0A1420] border border-white/5 px-2 py-0.5 rounded">
            {herb.family || 'Botanical Taxon'}
          </span>
          <div className="flex items-center gap-1.5">
            {herb.properties?.virya && (
              <span
                className={cn(
                  'text-[10px] font-mono px-2 py-0.5 rounded border font-medium',
                  herb.properties.virya === 'Ushna'
                    ? 'bg-orange-500/10 text-orange-300 border-orange-500/30'
                    : 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                )}
              >
                {herb.properties.virya}
              </span>
            )}
            {herb.verified && (
              <span title="Verified botanical authority">
                <ShieldCheck className="w-3.5 h-3.5 text-[#6BAA83]" />
              </span>
            )}
          </div>
        </div>

        {/* Title & Names */}
        <Link href={`/dravya/${herb.slug}`} className="block group-hover:text-[#6BAA83] transition-colors">
          <h3 className="font-serif text-xl font-bold text-[#F4F5F1] tracking-tight">
            {herb.canonical_name}
          </h3>
        </Link>
        <div className="text-xs font-serif italic text-[#B5D3BD] mt-0.5 truncate">
          {herb.botanical_name}
        </div>
        {herb.sanskrit_name && herb.sanskrit_name !== herb.canonical_name && (
          <div className="text-[11px] text-[#929BA7] font-devanagari mt-0.5">
            संस्कृत: {herb.sanskrit_name}
          </div>
        )}

        {/* Rasa Panchaka Summary */}
        <div className="mt-4 pt-3 border-t border-white/5 grid grid-cols-2 gap-2 text-[10px]">
          <div>
            <span className="text-[#636D7A] font-mono uppercase">Rasa:</span>{' '}
            <span className="text-[#F4F5F1]">
              {herb.properties?.rasa?.slice(0, 3).join(', ') || 'N/A'}
            </span>
          </div>
          <div>
            <span className="text-[#636D7A] font-mono uppercase">Vipaka:</span>{' '}
            <span className="text-[#F4F5F1]">
              {herb.properties?.vipaka || 'N/A'}
            </span>
          </div>
        </div>

        {/* Dosha Karma Strip */}
        {herb.properties?.dosha_karma?.pacify && herb.properties.dosha_karma.pacify.length > 0 && (
          <div className="mt-2 text-[10px] text-[#929BA7]">
            <span className="text-[#636D7A] font-mono uppercase">Pacifies:</span>{' '}
            <span className="text-[#6BAA83]">
              {herb.properties.dosha_karma.pacify.join(', ')}
            </span>
          </div>
        )}

        {/* Indications Tags */}
        {herb.indications && herb.indications.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {herb.indications.slice(0, 2).map(ind => (
              <span
                key={ind}
                className="text-[9px] bg-[#0A1420] text-[#929BA7] px-1.5 py-0.5 rounded border border-white/5 truncate max-w-[120px]"
              >
                {ind}
              </span>
            ))}
            {herb.indications.length > 2 && (
              <span className="text-[9px] text-[#636D7A] self-center">
                +{herb.indications.length - 2}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[10px] text-[#636D7A]">
          {herb.research && herb.research.length > 0 && (
            <span className="flex items-center gap-0.5 text-[#83C9F5]">
              <BookOpen className="w-3 h-3" />
              {herb.research.length}
            </span>
          )}
          <span>Score: {Math.round(herb.completeness_score * 100)}%</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => inCompare ? removeHerbFromCompare(herb.slug) : addHerbToCompare(herb)}
            className={cn(
              'p-1.5 rounded-lg border text-xs transition-colors flex items-center gap-1',
              inCompare
                ? 'bg-[#6BAA83]/20 border-[#6BAA83] text-[#6BAA83]'
                : 'bg-[#0A1420] border-white/10 text-[#929BA7] hover:text-[#F4F5F1]'
            )}
            title={inCompare ? 'In compare tray' : 'Add to compare tray'}
          >
            {inCompare ? <Check className="w-3.5 h-3.5" /> : <Layers className="w-3.5 h-3.5" />}
          </button>
          <Link
            href={`/dravya/${herb.slug}`}
            className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-[#6BAA83] hover:text-[#07090C] text-[#F4F5F1] text-xs font-medium transition-colors"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
