'use client';

import React from 'react';
import { DravyaProperties } from '@/types/dravya';
import { Flame, Snowflake, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RasaPanchakaRadarProps {
  properties: DravyaProperties;
}

export function RasaPanchakaRadar({ properties }: RasaPanchakaRadarProps) {
  const allRasas = [
    { name: 'Madhura', label: 'Sweet (Madhura)', devanagari: 'मधुर', angle: 0 },
    { name: 'Amla', label: 'Sour (Amla)', devanagari: 'अम्ल', angle: 60 },
    { name: 'Lavana', label: 'Salty (Lavana)', devanagari: 'लवण', angle: 120 },
    { name: 'Katu', label: 'Pungent (Katu)', devanagari: 'कटु', angle: 180 },
    { name: 'Tikta', label: 'Bitter (Tikta)', devanagari: 'तिक्त', angle: 240 },
    { name: 'Kashaya', label: 'Astringent (Kashaya)', devanagari: 'कषाय', angle: 300 },
  ];

  const presentRasas = properties.rasa || [];
  const virya = properties.virya;
  const vipaka = properties.vipaka;

  return (
    <div className="bg-[#101C2A] border border-white/5 rounded-2xl p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#6BAA83]">
            Pharmacological Energetics
          </span>
          <h3 className="font-serif text-2xl font-bold text-[#F4F5F1]">
            Rasa Panchaka Matrix
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {virya && (
            <div
              className={cn(
                'flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium border',
                virya === 'Ushna'
                  ? 'bg-orange-500/10 text-orange-400 border-orange-500/30'
                  : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
              )}
            >
              {virya === 'Ushna' ? <Flame className="w-3.5 h-3.5" /> : <Snowflake className="w-3.5 h-3.5" />}
              <span>{virya} Virya</span>
            </div>
          )}
        </div>
      </div>

      {/* Hexagonal Interactive Rasa Ring */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {allRasas.map(r => {
          const isPresent = presentRasas.some(
            pr => pr.toLowerCase() === r.name.toLowerCase()
          );
          return (
            <div
              key={r.name}
              className={cn(
                'p-3.5 rounded-xl border text-center transition-all',
                isPresent
                  ? 'bg-[#6BAA83]/15 border-[#6BAA83] text-[#F4F5F1] shadow-lg shadow-[#6BAA83]/10'
                  : 'bg-[#0A1420]/60 border-white/5 text-[#636D7A] opacity-60'
              )}
            >
              <div className="font-devanagari text-base mb-0.5">{r.devanagari}</div>
              <div className="text-xs font-bold font-serif">{r.name}</div>
              <div className="text-[9px] font-mono mt-1 uppercase tracking-wider">
                {isPresent ? 'Active Rasa' : 'Absent'}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pillars Breakdown: Guna, Vipaka, Prabhava */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-white/5">
        {/* Guna */}
        <div className="bg-[#0A1420] p-4 rounded-xl border border-white/5">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#929BA7] mb-1">
            Guna (Attributes)
          </div>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {properties.guna && properties.guna.length > 0 ? (
              properties.guna.map(g => (
                <span
                  key={g}
                  className="px-2.5 py-1 rounded bg-[#101C2A] text-xs font-medium text-[#F4F5F1] border border-white/5"
                >
                  {g}
                </span>
              ))
            ) : (
              <span className="text-xs text-[#636D7A] italic">Not available in the imported sources.</span>
            )}
          </div>
        </div>

        {/* Vipaka */}
        <div className="bg-[#0A1420] p-4 rounded-xl border border-white/5">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#929BA7] mb-1">
            Vipaka (Post-Digestive Transformation)
          </div>
          <div className="mt-2 text-base font-serif font-bold text-[#F4F5F1]">
            {vipaka || <span className="text-xs font-normal text-[#636D7A] italic">Not available in the imported sources.</span>}
          </div>
          <p className="mt-1 text-[11px] text-[#929BA7]">
            {vipaka === 'Madhura' && 'Nourishing, anabolic, Kapha-promoting post-digestion.'}
            {vipaka === 'Katu' && 'Drying, catabolic, Vata-promoting post-digestion.'}
            {vipaka === 'Amla' && 'Stimulating, Pitta-elevating post-digestion.'}
          </p>
        </div>

        {/* Prabhava */}
        <div className="bg-[#0A1420] p-4 rounded-xl border border-white/5">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#929BA7] mb-1">
            Prabhava (Specific Inherent Action)
          </div>
          <div className="mt-2 text-sm font-medium text-[#B5D3BD] flex items-start gap-1.5">
            <Sparkles className="w-4 h-4 text-[#6BAA83] shrink-0 mt-0.5" />
            <span>{properties.prabhava || 'Action follows canonical Rasa-Virya-Vipaka.'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
