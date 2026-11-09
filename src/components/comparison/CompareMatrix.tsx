'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Dravya } from '@/types/dravya';
import { getAllDravyas } from '@/lib/database/repository';
import {
  X,
  Plus,
  Share2,
  Check,
  AlertCircle,
  Flame,
  Snowflake,
  ShieldCheck,
  Search,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CompareMatrixProps {
  initialHerbs: Dravya[];
}

export function CompareMatrix({ initialHerbs }: CompareMatrixProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [herbs, setHerbs] = useState<Dravya[]>(initialHerbs);
  const [highlightMode, setHighlightMode] = useState<'all' | 'common' | 'diff'>('all');
  const [shareCopied, setShareCopied] = useState(false);
  const [activeSlotSearch, setActiveSlotSearch] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Update URL whenever herbs change
  const updateUrl = (newHerbs: Dravya[]) => {
    const params = new URLSearchParams();
    newHerbs.forEach(h => params.append('slug', h.slug));
    router.replace(`/compare?${params.toString()}`);
  };

  const removeHerb = (slug: string) => {
    const updated = herbs.filter(h => h.slug !== slug);
    setHerbs(updated);
    updateUrl(updated);
  };

  const addHerb = (herb: Dravya) => {
    if (herbs.length >= 3) return;
    if (herbs.some(h => h.slug === herb.slug)) return;
    const updated = [...herbs, herb];
    setHerbs(updated);
    updateUrl(updated);
    setActiveSlotSearch(null);
    setSearchQuery('');
    setSearchResults([]);
  };

  useEffect(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) {
      setSearchResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/dravyas?q=${encodeURIComponent(searchQuery)}&limit=6`);
        const json = await res.json();
        if (json.success && json.data) {
          setSearchResults(json.data);
        }
      } catch (e) {}
    }, 150);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const copyShareLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    }
  };

  // Helper functions for highlighting
  const isCommonRasa = (r: string) => {
    if (herbs.length < 2) return false;
    return herbs.every(h => h.properties?.rasa?.includes(r as any));
  };

  const isCommonVirya = () => {
    if (herbs.length < 2) return false;
    const first = herbs[0]?.properties?.virya;
    return herbs.every(h => h?.properties?.virya === first);
  };

  const isCommonVipaka = () => {
    if (herbs.length < 2) return false;
    const first = herbs[0]?.properties?.vipaka;
    return herbs.every(h => h?.properties?.vipaka === first);
  };

  const isCommonDoshaPacify = (doshaName: string) => {
    if (herbs.length < 2) return false;
    return herbs.every(h => h.properties?.dosha_karma?.pacify?.includes(doshaName));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#6BAA83] mb-2 block">
            Comparative Pharmacological Analysis
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#F4F5F1] tracking-tight">
            Tri-Dravya Comparative Matrix
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-[#929BA7] max-w-2xl">
            Evaluate up to 3 medicinal plants side-by-side across botanical taxonomy, classical Rasa Panchaka, Dosha Karma, and verified indications.
          </p>
        </div>

        {/* Highlight Mode & Share */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 bg-[#101C2A] p-1 rounded-xl border border-white/10 text-xs">
            <button
              onClick={() => setHighlightMode('all')}
              className={cn(
                'px-3 py-1.5 rounded-lg transition-colors',
                highlightMode === 'all'
                  ? 'bg-[#6BAA83] text-[#07090C] font-semibold'
                  : 'text-[#929BA7] hover:text-[#F4F5F1]'
              )}
            >
              All Data
            </button>
            <button
              onClick={() => setHighlightMode('common')}
              className={cn(
                'px-3 py-1.5 rounded-lg transition-colors',
                highlightMode === 'common'
                  ? 'bg-[#6BAA83] text-[#07090C] font-semibold'
                  : 'text-[#929BA7] hover:text-[#F4F5F1]'
              )}
            >
              Commonalities
            </button>
            <button
              onClick={() => setHighlightMode('diff')}
              className={cn(
                'px-3 py-1.5 rounded-lg transition-colors',
                highlightMode === 'diff'
                  ? 'bg-[#6BAA83] text-[#07090C] font-semibold'
                  : 'text-[#929BA7] hover:text-[#F4F5F1]'
              )}
            >
              Differences
            </button>
          </div>

          <button
            onClick={copyShareLink}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#101C2A] border border-white/10 hover:border-white/20 text-xs text-[#F4F5F1] transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{shareCopied ? 'Link Copied!' : 'Share Matrix'}</span>
          </button>
        </div>
      </div>

      {/* Herb Columns Header Slots */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[0, 1, 2].map(slotIndex => {
          const herb = herbs[slotIndex];

          if (herb) {
            return (
              <div
                key={herb.slug}
                className="bg-[#101C2A] border border-[#6BAA83]/30 rounded-2xl p-6 relative flex flex-col justify-between shadow-lg"
              >
                <button
                  onClick={() => removeHerb(herb.slug)}
                  className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-[#929BA7] hover:text-red-400 transition-colors"
                  title="Remove from comparison"
                >
                  <X className="w-4 h-4" />
                </button>

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#929BA7] bg-[#0A1420] px-2 py-0.5 rounded border border-white/5">
                    Plant {slotIndex + 1} • {herb.family || 'Taxon'}
                  </span>
                  <Link href={`/dravya/${herb.slug}`} className="block mt-2 group">
                    <h2 className="font-serif text-2xl font-bold text-[#F4F5F1] group-hover:text-[#6BAA83] transition-colors">
                      {herb.canonical_name}
                    </h2>
                  </Link>
                  <div className="font-serif italic text-xs text-[#B5D3BD] mt-0.5">
                    {herb.botanical_name}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-[#636D7A]">
                  <span>Completeness: {Math.round(herb.completeness_score * 100)}%</span>
                  <Link href={`/dravya/${herb.slug}`} className="text-[#6BAA83] hover:underline">
                    View Monograph →
                  </Link>
                </div>
              </div>
            );
          }

          return (
            <div
              key={`empty-slot-${slotIndex}`}
              className="bg-[#0A1420] border border-dashed border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[160px] text-center"
            >
              {activeSlotSearch === slotIndex ? (
                <div className="w-full space-y-3">
                  <div className="flex items-center gap-2 bg-[#101C2A] border border-[#6BAA83]/50 rounded-xl px-3 py-2">
                    <Search className="w-4 h-4 text-[#6BAA83]" />
                    <input
                      type="text"
                      autoFocus
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="Type plant name..."
                      className="bg-transparent text-xs text-[#F4F5F1] outline-none w-full"
                    />
                    <button
                      onClick={() => {
                        setActiveSlotSearch(null);
                        setSearchQuery('');
                      }}
                      className="text-[#929BA7] hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {searchResults.length > 0 && (
                    <div className="bg-[#101C2A] border border-white/10 rounded-xl max-h-48 overflow-y-auto p-1 space-y-1 text-left">
                      {searchResults.map(res => (
                        <div
                          key={res.slug}
                          onClick={() => addHerb(res)}
                          className="p-2 hover:bg-white/10 rounded-lg cursor-pointer text-xs"
                        >
                          <div className="font-semibold text-[#F4F5F1]">{res.canonical_name}</div>
                          <div className="text-[10px] text-[#929BA7] italic font-serif truncate">
                            {res.botanical_name}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#929BA7] mx-auto">
                    <Plus className="w-5 h-5" />
                  </div>
                  <div className="text-xs text-[#929BA7]">Slot {slotIndex + 1} Empty</div>
                  <button
                    onClick={() => {
                      setActiveSlotSearch(slotIndex);
                      setSearchQuery('');
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-[#6BAA83]/20 hover:bg-[#6BAA83] text-[#6BAA83] hover:text-[#07090C] text-xs font-medium transition-colors"
                  >
                    + Add Herb to Slot
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {herbs.length === 0 ? (
        <div className="py-20 text-center bg-[#101C2A] border border-white/5 rounded-2xl p-8">
          <AlertCircle className="w-8 h-8 text-[#6BAA83] mx-auto mb-3" />
          <h3 className="font-serif text-lg font-bold text-[#F4F5F1]">No herbs currently selected</h3>
          <p className="text-xs text-[#929BA7] max-w-md mx-auto mt-2">
            Add up to three plants from the slots above or use the "+ Compare" buttons across the Dravya Explorer.
          </p>
          <Link
            href="/explore"
            className="mt-6 inline-block px-5 py-2.5 rounded-xl bg-[#6BAA83] text-[#07090C] font-semibold text-xs"
          >
            Browse Dravya Catalog
          </Link>
        </div>
      ) : (
        /* COMPARISON PARAMETER MATRIX TABLES */
        <div className="bg-[#101C2A] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-4 bg-[#0A1420] border-b border-white/5 flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[#6BAA83]">
              Side-by-Side Parameter Matrix
            </span>
            <span className="text-[11px] text-[#929BA7] font-mono">
              Comparing {herbs.length} Taxa
            </span>
          </div>

          <div className="divide-y divide-white/5 text-xs">
            {/* ROW 1: BOTANICAL TAXONOMY */}
            <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
              <div className="font-mono text-[11px] uppercase tracking-wider text-[#929BA7] md:pt-1">
                Botanical Binomial & Family
              </div>
              <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                {herbs.map(h => (
                  <div key={h.slug} className="bg-[#0A1420] p-3 rounded-xl border border-white/5">
                    <div className="font-serif italic font-medium text-[#B5D3BD]">
                      {h.botanical_name}
                    </div>
                    <div className="text-[10px] text-[#636D7A] mt-1 font-mono">
                      Family: {h.family || 'Unspecified'}
                    </div>
                    {h.taxonomy?.gbif_key && (
                      <div className="text-[10px] text-[#83C9F5] mt-0.5">
                        GBIF Key: {h.taxonomy.gbif_key}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* ROW 2: RASA (TASTES) */}
            <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
              <div className="font-mono text-[11px] uppercase tracking-wider text-[#929BA7] md:pt-1">
                Rasa (Taste Spectrum)
              </div>
              <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                {herbs.map(h => (
                  <div key={h.slug} className="bg-[#0A1420] p-3 rounded-xl border border-white/5 space-y-1.5">
                    <div className="flex flex-wrap gap-1">
                      {h.properties?.rasa?.map(r => {
                        const isShared = isCommonRasa(r);
                        return (
                          <span
                            key={r}
                            className={cn(
                              'px-2 py-0.5 rounded text-[11px] font-medium border',
                              isShared
                                ? 'bg-[#6BAA83]/20 border-[#6BAA83] text-[#6BAA83]'
                                : 'bg-[#101C2A] border-white/10 text-[#F4F5F1]'
                            )}
                          >
                            {r} {isShared && '★'}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ROW 3: VIRYA (POTENCY) */}
            <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
              <div className="font-mono text-[11px] uppercase tracking-wider text-[#929BA7] md:pt-1">
                Virya (Potency)
              </div>
              <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                {herbs.map(h => {
                  const virya = h.properties?.virya;
                  return (
                    <div key={h.slug} className="bg-[#0A1420] p-3 rounded-xl border border-white/5">
                      <div className={cn(
                        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium border',
                        virya === 'Ushna'
                          ? 'bg-orange-500/10 text-orange-400 border-orange-500/30'
                          : virya === 'Sheeta'
                          ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                          : 'bg-white/5 text-[#929BA7] border-white/10'
                      )}>
                        {virya === 'Ushna' ? <Flame className="w-3.5 h-3.5" /> : <Snowflake className="w-3.5 h-3.5" />}
                        <span>{virya || 'Not reported'}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ROW 4: VIPAKA (POST-DIGESTIVE) */}
            <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
              <div className="font-mono text-[11px] uppercase tracking-wider text-[#929BA7] md:pt-1">
                Vipaka
              </div>
              <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                {herbs.map(h => (
                  <div key={h.slug} className="bg-[#0A1420] p-3 rounded-xl border border-white/5">
                    <span className="font-serif font-bold text-sm text-[#F4F5F1]">
                      {h.properties?.vipaka || 'Not reported'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ROW 5: DOSHA KARMA */}
            <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
              <div className="font-mono text-[11px] uppercase tracking-wider text-[#929BA7] md:pt-1">
                Dosha Shamana (Pacification)
              </div>
              <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                {herbs.map(h => (
                  <div key={h.slug} className="bg-[#0A1420] p-3 rounded-xl border border-white/5 space-y-1">
                    <div className="flex flex-wrap gap-1">
                      {h.properties?.dosha_karma?.pacify?.map(d => {
                        const shared = isCommonDoshaPacify(d);
                        return (
                          <span
                            key={d}
                            className={cn(
                              'px-2 py-0.5 rounded text-[10px] font-mono border',
                              shared
                                ? 'bg-[#6BAA83]/20 border-[#6BAA83] text-[#6BAA83] font-semibold'
                                : 'bg-[#101C2A] border-white/10 text-[#F4F5F1]'
                            )}
                          >
                            {d} Shamana
                          </span>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ROW 6: PARTS USED */}
            <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
              <div className="font-mono text-[11px] uppercase tracking-wider text-[#929BA7] md:pt-1">
                Parts Used (Prayojyanga)
              </div>
              <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                {herbs.map(h => (
                  <div key={h.slug} className="bg-[#0A1420] p-3 rounded-xl border border-white/5">
                    <div className="text-xs text-[#F4F5F1]">
                      {h.parts_used?.join(', ') || 'Not available'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ROW 7: MAIN INDICATIONS */}
            <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
              <div className="font-mono text-[11px] uppercase tracking-wider text-[#929BA7] md:pt-1">
                Classical Indications
              </div>
              <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                {herbs.map(h => (
                  <div key={h.slug} className="bg-[#0A1420] p-3 rounded-xl border border-white/5">
                    <div className="flex flex-wrap gap-1">
                      {h.indications?.slice(0, 4).map(ind => (
                        <span key={ind} className="text-[10px] bg-[#101C2A] text-[#929BA7] px-1.5 py-0.5 rounded">
                          {ind}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ROW 8: RESEARCH CITATIONS */}
            <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
              <div className="font-mono text-[11px] uppercase tracking-wider text-[#929BA7] md:pt-1">
                Biomedical Literature
              </div>
              <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                {herbs.map(h => (
                  <div key={h.slug} className="bg-[#0A1420] p-3 rounded-xl border border-white/5">
                    <span className="text-xs font-mono text-[#83C9F5]">
                      {h.research?.length || 0} Indexed Studies
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Epistemological & Clinical Disclaimer */}
      <div className="bg-[#0A1420] border border-white/5 rounded-2xl p-5 text-xs text-[#929BA7] flex items-start gap-3">
        <AlertCircle className="w-4 h-4 text-[#6BAA83] shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-[#F4F5F1]">Epistemological Methodology Note:</strong> DravyaDex does not infer therapeutic superiority or clinical interchangeability solely from matching Rasa Panchaka parameters. In Ayurvedic clinical tradition, substances sharing identical Rasa and Virya may exhibit distinct actions governed by subtle <span className="text-[#F4F5F1]">Prabhava</span>, cellular affinity (<span className="text-[#F4F5F1]">Srotogamitva</span>), and formulation vehicle (<span className="text-[#F4F5F1]">Anupana</span>).
        </div>
      </div>
    </div>
  );
}
