'use client';

import React, { useState } from 'react';
import { FilterState, RasaType, GunaType, ViryaType, VipakaType } from '@/types/dravya';
import { Filter, X, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  availableOptions: {
    rasas: string[];
    gunas: string[];
    viryas: string[];
    vipakas: string[];
    families: string[];
    parts: string[];
    doshaActions: string[];
  };
  className?: string;
}

export function FilterSidebar({
  filters,
  onChange,
  availableOptions,
  className,
}: FilterSidebarProps) {
  const [openSections, setOpenSections] = useState({
    rasa: true,
    virya: true,
    vipaka: true,
    dosha: true,
    guna: false,
    family: false,
    parts: false,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleArrayItem = <T extends string>(
    field: keyof FilterState,
    item: T
  ) => {
    const current = (filters[field] as T[]) || [];
    const exists = current.includes(item);
    const updated = exists ? current.filter(x => x !== item) : [...current, item];
    onChange({ ...filters, [field]: updated });
  };

  const handleReset = () => {
    onChange({
      query: '',
      rasa: [],
      guna: [],
      virya: [],
      vipaka: [],
      dosha: [],
      parts: [],
      family: [],
      verifiedOnly: false,
      hasResearch: false,
      hasCompounds: false,
      sortBy: 'relevance',
    });
  };

  const hasActiveFilters =
    filters.query ||
    filters.rasa.length > 0 ||
    filters.guna.length > 0 ||
    filters.virya.length > 0 ||
    filters.vipaka.length > 0 ||
    filters.dosha.length > 0 ||
    filters.parts.length > 0 ||
    filters.family.length > 0 ||
    filters.verifiedOnly ||
    filters.hasResearch ||
    filters.hasCompounds;

  return (
    <aside className={cn('bg-[#0A1420] border border-white/5 rounded-2xl p-5 space-y-6', className)}>
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/5">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#F4F5F1]">
          <Filter className="w-4 h-4 text-[#6BAA83]" />
          <span>Pharmacological Filters</span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-[11px] text-[#929BA7] hover:text-[#6BAA83] transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Quick Evidence Toggles */}
      <div className="space-y-2 pt-1 text-xs">
        <label className="flex items-center gap-2 text-[#929BA7] hover:text-[#F4F5F1] cursor-pointer">
          <input
            type="checkbox"
            checked={filters.verifiedOnly}
            onChange={e => onChange({ ...filters, verifiedOnly: e.target.checked })}
            className="rounded border-white/20 text-[#6BAA83] focus:ring-0 bg-[#101C2A]"
          />
          <span>Verified Taxonomy Only</span>
        </label>
        <label className="flex items-center gap-2 text-[#929BA7] hover:text-[#F4F5F1] cursor-pointer">
          <input
            type="checkbox"
            checked={filters.hasResearch}
            onChange={e => onChange({ ...filters, hasResearch: e.target.checked })}
            className="rounded border-white/20 text-[#6BAA83] focus:ring-0 bg-[#101C2A]"
          />
          <span>Biomedical Literature Available</span>
        </label>
        <label className="flex items-center gap-2 text-[#929BA7] hover:text-[#F4F5F1] cursor-pointer">
          <input
            type="checkbox"
            checked={filters.hasCompounds}
            onChange={e => onChange({ ...filters, hasCompounds: e.target.checked })}
            className="rounded border-white/20 text-[#6BAA83] focus:ring-0 bg-[#101C2A]"
          />
          <span>Phytochemical Data Indexed</span>
        </label>
      </div>

      {/* 1. RASA FILTER */}
      <div className="pt-2 border-t border-white/5">
        <button
          onClick={() => toggleSection('rasa')}
          className="w-full flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#F4F5F1] py-1"
        >
          <span>Rasa (Tastes)</span>
          {openSections.rasa ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
        {openSections.rasa && (
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
            {['Madhura', 'Amla', 'Lavana', 'Katu', 'Tikta', 'Kashaya'].map(r => {
              const active = filters.rasa.includes(r as RasaType);
              return (
                <button
                  key={r}
                  onClick={() => toggleArrayItem('rasa', r as RasaType)}
                  className={cn(
                    'px-2.5 py-1.5 rounded-lg border text-left transition-colors text-xs',
                    active
                      ? 'bg-[#6BAA83]/20 border-[#6BAA83] text-[#6BAA83] font-medium'
                      : 'bg-[#101C2A] border-white/5 text-[#929BA7] hover:text-[#F4F5F1]'
                  )}
                >
                  {r}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 2. VIRYA FILTER */}
      <div className="pt-2 border-t border-white/5">
        <button
          onClick={() => toggleSection('virya')}
          className="w-full flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#F4F5F1] py-1"
        >
          <span>Virya (Potency)</span>
          {openSections.virya ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
        {openSections.virya && (
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
            {['Ushna', 'Sheeta'].map(v => {
              const active = filters.virya.includes(v as ViryaType);
              return (
                <button
                  key={v}
                  onClick={() => toggleArrayItem('virya', v as ViryaType)}
                  className={cn(
                    'px-2.5 py-1.5 rounded-lg border text-center transition-colors text-xs font-medium',
                    active
                      ? v === 'Ushna'
                        ? 'bg-orange-500/20 border-orange-500 text-orange-400'
                        : 'bg-cyan-500/20 border-cyan-500 text-cyan-400'
                      : 'bg-[#101C2A] border-white/5 text-[#929BA7] hover:text-[#F4F5F1]'
                  )}
                >
                  {v}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. VIPAKA FILTER */}
      <div className="pt-2 border-t border-white/5">
        <button
          onClick={() => toggleSection('vipaka')}
          className="w-full flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#F4F5F1] py-1"
        >
          <span>Vipaka (Post-Digestive)</span>
          {openSections.vipaka ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
        {openSections.vipaka && (
          <div className="mt-3 grid grid-cols-3 gap-1.5 text-xs">
            {['Madhura', 'Amla', 'Katu'].map(vp => {
              const active = filters.vipaka.includes(vp as VipakaType);
              return (
                <button
                  key={vp}
                  onClick={() => toggleArrayItem('vipaka', vp as VipakaType)}
                  className={cn(
                    'px-2 py-1.5 rounded-lg border text-center transition-colors text-xs',
                    active
                      ? 'bg-[#6BAA83]/20 border-[#6BAA83] text-[#6BAA83] font-medium'
                      : 'bg-[#101C2A] border-white/5 text-[#929BA7] hover:text-[#F4F5F1]'
                  )}
                >
                  {vp}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. DOSHA KARMA FILTER */}
      <div className="pt-2 border-t border-white/5">
        <button
          onClick={() => toggleSection('dosha')}
          className="w-full flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#F4F5F1] py-1"
        >
          <span>Dosha Karma</span>
          {openSections.dosha ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
        {openSections.dosha && (
          <div className="mt-3 space-y-1.5 text-xs">
            {availableOptions.doshaActions.map(d => {
              const active = filters.dosha.includes(d);
              return (
                <button
                  key={d}
                  onClick={() => toggleArrayItem('dosha', d)}
                  className={cn(
                    'w-full px-2.5 py-1.5 rounded-lg border text-left transition-colors flex items-center justify-between text-xs',
                    active
                      ? 'bg-[#6BAA83]/20 border-[#6BAA83] text-[#6BAA83] font-medium'
                      : 'bg-[#101C2A] border-white/5 text-[#929BA7] hover:text-[#F4F5F1]'
                  )}
                >
                  <span>{d}</span>
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-[#6BAA83]" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 5. GUNA FILTER */}
      <div className="pt-2 border-t border-white/5">
        <button
          onClick={() => toggleSection('guna')}
          className="w-full flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#F4F5F1] py-1"
        >
          <span>Guna (Qualities)</span>
          {openSections.guna ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
        {openSections.guna && (
          <div className="mt-3 grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1 text-xs">
            {availableOptions.gunas.map(g => {
              const active = filters.guna.includes(g as GunaType);
              return (
                <button
                  key={g}
                  onClick={() => toggleArrayItem('guna', g as GunaType)}
                  className={cn(
                    'px-2 py-1 rounded border text-left transition-colors text-[11px]',
                    active
                      ? 'bg-[#6BAA83]/20 border-[#6BAA83] text-[#6BAA83]'
                      : 'bg-[#101C2A] border-white/5 text-[#929BA7] hover:text-[#F4F5F1]'
                  )}
                >
                  {g}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 6. BOTANICAL FAMILY FILTER */}
      <div className="pt-2 border-t border-white/5">
        <button
          onClick={() => toggleSection('family')}
          className="w-full flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#F4F5F1] py-1"
        >
          <span>Botanical Family</span>
          {openSections.family ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
        {openSections.family && (
          <div className="mt-3 space-y-1 max-h-44 overflow-y-auto pr-1 text-xs">
            {availableOptions.families.slice(0, 30).map(fam => {
              const active = filters.family.includes(fam);
              return (
                <button
                  key={fam}
                  onClick={() => toggleArrayItem('family', fam)}
                  className={cn(
                    'w-full px-2 py-1 rounded border text-left transition-colors text-[11px] truncate',
                    active
                      ? 'bg-[#6BAA83]/20 border-[#6BAA83] text-[#6BAA83]'
                      : 'bg-[#101C2A] border-white/5 text-[#929BA7] hover:text-[#F4F5F1]'
                  )}
                >
                  {fam}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
}
