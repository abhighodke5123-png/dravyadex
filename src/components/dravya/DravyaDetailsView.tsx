'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Dravya } from '@/types/dravya';
import { RasaPanchakaRadar } from './RasaPanchakaRadar';
import { useComparison } from '@/components/comparison/ComparisonContext';
import {
  ShieldCheck,
  Bookmark,
  BookmarkCheck,
  Layers,
  Check,
  BookOpen,
  FlaskConical,
  ExternalLink,
  ChevronRight,
  Database,
  Globe,
  Share2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface DravyaDetailsViewProps {
  dravya: Dravya;
  relatedDravyas: Dravya[];
}

export function DravyaDetailsView({ dravya, relatedDravyas }: DravyaDetailsViewProps) {
  const { addHerbToCompare, removeHerbFromCompare, isHerbInCompare } = useComparison();
  const inCompare = isHerbInCompare(dravya.slug);

  const [isFavorited, setIsFavorited] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const toggleFavorite = () => {
    setIsFavorited(prev => {
      const next = !prev;
      try {
        const stored = localStorage.getItem('dravyadex_user_favorites') || '[]';
        const list: string[] = JSON.parse(stored);
        const updated = next
          ? [...list, dravya.slug]
          : list.filter(s => s !== dravya.slug);
        localStorage.setItem('dravyadex_user_favorites', JSON.stringify(updated));
      } catch (e) {}
      return next;
    });
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-[#929BA7] font-mono">
        <Link href="/" className="hover:text-[#F4F5F1] transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/explore" className="hover:text-[#F4F5F1] transition-colors">
          Dravyas
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#6BAA83] truncate">{dravya.canonical_name}</span>
      </nav>

      {/* 1. BOTANICAL HERO SECTION */}
      <section className="bg-[#101C2A] border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#929BA7] bg-[#0A1420] border border-white/5 px-3 py-1 rounded-full">
                {dravya.family || 'Botanical Family Unspecified'}
              </span>
              <span className="flex items-center gap-1 text-xs font-mono text-[#6BAA83] bg-[#6BAA83]/10 border border-[#6BAA83]/30 px-3 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{dravya.verified ? 'Verified Taxonomy' : 'Documented Taxon'}</span>
              </span>
              <span className="text-xs font-mono text-[#83C9F5] bg-[#83C9F5]/10 border border-[#83C9F5]/30 px-3 py-1 rounded-full">
                Score: {Math.round(dravya.completeness_score * 100)}%
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#F4F5F1] tracking-tight">
              {dravya.canonical_name}
            </h1>

            <div className="font-serif italic text-lg sm:text-xl text-[#B5D3BD] mt-1">
              {dravya.botanical_name}
            </div>

            {dravya.sanskrit_name && (
              <div className="font-devanagari text-base text-[#929BA7] mt-1">
                संस्कृत नाम: {dravya.sanskrit_name}
              </div>
            )}

            <p className="mt-6 text-sm text-[#929BA7] max-w-3xl leading-relaxed">
              {dravya.summary || 'Classical Ayurvedic medicinal plant recognized across traditional treatises.'}
            </p>
          </div>

          {/* Action buttons: Favorite, Compare, Share */}
          <div className="flex md:flex-col items-center gap-2 shrink-0">
            <button
              onClick={() => inCompare ? removeHerbFromCompare(dravya.slug) : addHerbToCompare(dravya)}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-medium transition-all duration-200',
                inCompare
                  ? 'bg-[#6BAA83]/20 border-[#6BAA83] text-[#6BAA83]'
                  : 'bg-[#0A1420] border-white/10 text-[#F4F5F1] hover:border-[#6BAA83]/50'
              )}
            >
              {inCompare ? <Check className="w-4 h-4" /> : <Layers className="w-4 h-4" />}
              <span>{inCompare ? 'In Comparison' : 'Add to Compare'}</span>
            </button>

            <button
              onClick={toggleFavorite}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-medium transition-colors',
                isFavorited
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                  : 'bg-[#0A1420] border-white/10 text-[#929BA7] hover:text-[#F4F5F1]'
              )}
            >
              {isFavorited ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
              <span>{isFavorited ? 'Saved in Study' : 'Save to Study'}</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0A1420] border border-white/10 text-[#929BA7] hover:text-[#F4F5F1] text-xs font-medium transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. MULTILINGUAL NAMES & SYNONYMS */}
      <section className="bg-[#101C2A] border border-white/5 rounded-2xl p-6 md:p-8">
        <h2 className="text-xs font-mono uppercase tracking-wider text-[#6BAA83] mb-4">
          Nomenclatural Crosswalk & Synonyms
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#0A1420] p-4 rounded-xl border border-white/5">
            <span className="text-[10px] font-mono text-[#636D7A] uppercase">Sanskrit / IAST</span>
            <div className="text-sm font-semibold text-[#F4F5F1] mt-1 font-devanagari">
              {dravya.sanskrit_name || dravya.canonical_name}
            </div>
          </div>
          <div className="bg-[#0A1420] p-4 rounded-xl border border-white/5">
            <span className="text-[10px] font-mono text-[#636D7A] uppercase">Botanical Binomial</span>
            <div className="text-sm font-semibold text-[#B5D3BD] mt-1 italic font-serif">
              {dravya.botanical_name}
            </div>
          </div>
          <div className="bg-[#0A1420] p-4 rounded-xl border border-white/5">
            <span className="text-[10px] font-mono text-[#636D7A] uppercase">English Common Name</span>
            <div className="text-sm font-semibold text-[#F4F5F1] mt-1">
              {dravya.english_name || dravya.canonical_name}
            </div>
          </div>
          <div className="bg-[#0A1420] p-4 rounded-xl border border-white/5">
            <span className="text-[10px] font-mono text-[#636D7A] uppercase">Classical Synonyms</span>
            <div className="text-xs text-[#929BA7] mt-1 leading-relaxed">
              {dravya.names && dravya.names.length > 2
                ? dravya.names.filter(n => n.is_synonym).map(n => n.name).join(', ')
                : 'Not available in the imported sources.'}
            </div>
          </div>
        </div>
      </section>

      {/* 3. BOTANICAL TAXONOMY */}
      <section className="bg-[#101C2A] border border-white/5 rounded-2xl p-6 md:p-8">
        <h2 className="text-xs font-mono uppercase tracking-wider text-[#83C9F5] mb-4">
          Botanical Taxonomy (GBIF / IPNI Crosswalk)
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-xs">
          <div className="bg-[#0A1420] p-3 rounded-xl border border-white/5">
            <div className="text-[10px] text-[#636D7A] font-mono uppercase">Taxonomic Rank</div>
            <div className="font-semibold text-[#F4F5F1] mt-0.5">{dravya.taxonomy?.rank || 'SPECIES'}</div>
          </div>
          <div className="bg-[#0A1420] p-3 rounded-xl border border-white/5">
            <div className="text-[10px] text-[#636D7A] font-mono uppercase">Status</div>
            <div className="font-semibold text-[#6BAA83] mt-0.5">{dravya.taxonomy?.taxonomic_status || 'ACCEPTED'}</div>
          </div>
          <div className="bg-[#0A1420] p-3 rounded-xl border border-white/5">
            <div className="text-[10px] text-[#636D7A] font-mono uppercase">Family</div>
            <div className="font-semibold text-[#F4F5F1] mt-0.5 truncate">{dravya.family || 'Unspecified'}</div>
          </div>
          <div className="bg-[#0A1420] p-3 rounded-xl border border-white/5">
            <div className="text-[10px] text-[#636D7A] font-mono uppercase">Scientific Authority</div>
            <div className="font-semibold text-[#F4F5F1] mt-0.5 truncate">{dravya.taxonomy?.scientific_name || dravya.botanical_name}</div>
          </div>
          <div className="bg-[#0A1420] p-3 rounded-xl border border-white/5">
            <div className="text-[10px] text-[#636D7A] font-mono uppercase">GBIF Key</div>
            <div className="font-semibold text-[#83C9F5] mt-0.5">
              {dravya.taxonomy?.gbif_key ? (
                <a
                  href={`https://www.gbif.org/species/${dravya.taxonomy.gbif_key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center gap-1"
                >
                  <span>{dravya.taxonomy.gbif_key}</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              ) : (
                'Pending'
              )}
            </div>
          </div>
          <div className="bg-[#0A1420] p-3 rounded-xl border border-white/5">
            <div className="text-[10px] text-[#636D7A] font-mono uppercase">Source Dataset</div>
            <div className="font-semibold text-[#929BA7] mt-0.5">{dravya.provenance?.dataset_code || 'Amidha v2.0'}</div>
          </div>
        </div>
      </section>

      {/* 4. RASA PANCHAKA INTERACTIVE MATRIX */}
      <section>
        <RasaPanchakaRadar properties={dravya.properties} />
      </section>

      {/* 5. DOSHA KARMA (DISTINGUISHING PACIFY VS AGGRAVATE) */}
      <section className="bg-[#101C2A] border border-white/5 rounded-2xl p-6 md:p-8">
        <h2 className="text-xs font-mono uppercase tracking-wider text-[#6BAA83] mb-4">
          Dosha Karma (Humoral Dynamics)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pacification */}
          <div className="bg-[#0A1420] border border-[#6BAA83]/20 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-[#6BAA83]">
                Shamana (Pacification)
              </span>
              <span className="text-[10px] font-mono text-[#6BAA83] bg-[#6BAA83]/10 px-2 py-0.5 rounded">
                Reduces Excess
              </span>
            </div>
            {dravya.properties?.dosha_karma?.pacify && dravya.properties.dosha_karma.pacify.length > 0 ? (
              <div className="flex flex-wrap gap-2 mt-2">
                {dravya.properties.dosha_karma.pacify.map(d => (
                  <span
                    key={d}
                    className="px-3 py-1.5 rounded-lg bg-[#101C2A] border border-[#6BAA83]/40 text-sm font-medium text-[#F4F5F1]"
                  >
                    {d} Shamana
                  </span>
                ))}
              </div>
            ) : (
              <div className="text-xs text-[#636D7A] italic mt-2">
                No specific pacification reported in imported record.
              </div>
            )}
          </div>

          {/* Aggravation */}
          <div className="bg-[#0A1420] border border-rose-500/20 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-rose-400">
                Kopana / Vriddhi (Aggravation)
              </span>
              <span className="text-[10px] font-mono text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded">
                May Increase If Misused
              </span>
            </div>
            {dravya.properties?.dosha_karma?.aggravate && dravya.properties.dosha_karma.aggravate.length > 0 ? (
              <div className="flex flex-wrap gap-2 mt-2">
                {dravya.properties.dosha_karma.aggravate.map(d => (
                  <span
                    key={d}
                    className="px-3 py-1.5 rounded-lg bg-[#101C2A] border border-rose-500/40 text-sm font-medium text-rose-300"
                  >
                    {d} Vriddhi
                  </span>
                ))}
              </div>
            ) : (
              <div className="text-xs text-[#929BA7] italic mt-2">
                None flagged as aggravating in the imported monographs.
              </div>
            )}
          </div>
        </div>

        {dravya.properties?.dosha_karma?.tridosha && (
          <div className="mt-4 p-3 rounded-xl bg-[#0A1420] border border-white/5 text-xs text-[#B5D3BD]">
            <span className="font-semibold text-[#F4F5F1]">Tridosha Dynamic:</span>{' '}
            {dravya.properties.dosha_karma.tridosha}
          </div>
        )}
      </section>

      {/* 6. PARTS USED & 7. INDICATIONS */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Parts Used */}
        <div className="bg-[#101C2A] border border-white/5 rounded-2xl p-6">
          <h2 className="text-xs font-mono uppercase tracking-wider text-[#929BA7] mb-3">
            Parts Used (Prayojyanga)
          </h2>
          {dravya.parts_used && dravya.parts_used.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {dravya.parts_used.map(p => (
                <span
                  key={p}
                  className="px-3 py-1.5 rounded-lg bg-[#0A1420] border border-white/5 text-xs text-[#F4F5F1] font-medium"
                >
                  {p}
                </span>
              ))}
            </div>
          ) : (
            <div className="text-xs text-[#636D7A] italic">Not available in the imported sources.</div>
          )}
        </div>

        {/* Indications */}
        <div className="bg-[#101C2A] border border-white/5 rounded-2xl p-6">
          <h2 className="text-xs font-mono uppercase tracking-wider text-[#929BA7] mb-3">
            Classical Indications (Rogaghnata)
          </h2>
          {dravya.indications && dravya.indications.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {dravya.indications.map(ind => (
                <span
                  key={ind}
                  className="px-3 py-1.5 rounded-lg bg-[#0A1420] border border-white/5 text-xs text-[#6BAA83] font-medium"
                >
                  {ind}
                </span>
              ))}
            </div>
          ) : (
            <div className="text-xs text-[#636D7A] italic">Not available in the imported sources.</div>
          )}
        </div>
      </section>

      {/* 8. CLASSICAL FORMULATIONS (AFI Crosswalk) */}
      {dravya.formulations && dravya.formulations.length > 0 && (
        <section className="bg-[#101C2A] border border-white/5 rounded-2xl p-6 md:p-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-mono uppercase tracking-wider text-[#83C9F5]">
              Formulations Containing {dravya.canonical_name} (AFI Crosswalk)
            </h2>
            <span className="text-xs text-[#929BA7]">Ayurvedic Formulary of India</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {dravya.formulations.map(f => (
              <span
                key={f}
                className="px-3 py-1.5 rounded-xl bg-[#0A1420] border border-white/10 text-xs text-[#F4F5F1]"
              >
                {f}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* 9. PHYTOCHEMICAL CONSTITUENTS */}
      {dravya.compounds && dravya.compounds.length > 0 && (
        <section className="bg-[#101C2A] border border-white/5 rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-2 mb-4">
            <FlaskConical className="w-4 h-4 text-[#B5D3BD]" />
            <h2 className="text-xs font-mono uppercase tracking-wider text-[#B5D3BD]">
              Isolated Phytochemical Constituents ({dravya.compounds.length})
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {dravya.compounds.map(comp => (
              <div
                key={comp.name}
                className="p-3 rounded-xl bg-[#0A1420] border border-white/5 text-xs font-medium text-[#F4F5F1]"
              >
                {comp.name}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 10. SCIENTIFIC RESEARCH & BIOMEDICAL LITERATURE */}
      <section className="bg-[#101C2A] border border-white/5 rounded-2xl p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#83C9F5]" />
            <h2 className="text-xs font-mono uppercase tracking-wider text-[#83C9F5]">
              Published Biomedical Research ({dravya.research?.length || 0} Papers Indexed)
            </h2>
          </div>
          <span className="text-[11px] font-mono text-[#636D7A]">
            Delineated from Classical Samhitas
          </span>
        </div>

        {dravya.research && dravya.research.length > 0 ? (
          <div className="space-y-4">
            {dravya.research.map((paper, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#0A1420] border border-white/5 hover:border-[#83C9F5]/30 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-[#F4F5F1] leading-snug">
                      {paper.title}
                    </h4>
                    <div className="text-xs text-[#929BA7]">
                      {paper.journal} {paper.year ? `(${paper.year})` : ''} • Authors: {(paper.authors || []).slice(0, 3).join(', ')}
                    </div>
                  </div>
                  {paper.url && (
                    <a
                      href={paper.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/5 hover:bg-[#83C9F5] hover:text-[#07090C] text-[#83C9F5] transition-colors shrink-0"
                      title="Open on PubMed / Publisher"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-6 text-center text-xs text-[#636D7A] italic">
            No specific biomedical PubMed research articles linked in the imported catalog.
          </div>
        )}
      </section>

      {/* 11. SOURCE PROVENANCE & ATTRIBUTION */}
      <section className="bg-[#0A1420] border border-white/5 rounded-2xl p-6 text-xs text-[#929BA7] space-y-2">
        <div className="flex items-center gap-2 text-[#F4F5F1] font-semibold">
          <Database className="w-3.5 h-3.5 text-[#6BAA83]" />
          <span>Source Provenance & Open Access License</span>
        </div>
        <p className="leading-relaxed">
          Record derived from the <span className="text-[#F4F5F1]">Amidha Ayurveda Open Herb Database v2.0.0</span> and <span className="text-[#F4F5F1]">Age Ayurveda Nighantu (Zenodo: 10.5281/zenodo.22805684)</span>.
          Licensed under Creative Commons Attribution 4.0 International (CC BY 4.0).
        </p>
        <div className="text-[11px] text-[#636D7A] font-mono">
          Dravya ID: {dravya.id} • Canonical Slug: {dravya.slug}
        </div>
      </section>

      {/* 12. RELATED DRAVYAS */}
      {relatedDravyas && relatedDravyas.length > 0 && (
        <section className="pt-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-2xl font-bold text-[#F4F5F1]">
              Related Medicinal Dravyas
            </h2>
            <Link href="/explore" className="text-xs text-[#6BAA83] hover:underline">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {relatedDravyas.map(rel => (
              <Link
                key={rel.slug}
                href={`/dravya/${rel.slug}`}
                className="p-4 rounded-xl bg-[#101C2A] border border-white/5 hover:border-[#6BAA83]/40 transition-colors block group"
              >
                <div className="text-[10px] font-mono text-[#929BA7] uppercase">{rel.family || 'Taxon'}</div>
                <div className="text-base font-serif font-bold text-[#F4F5F1] group-hover:text-[#6BAA83] transition-colors mt-1">
                  {rel.canonical_name}
                </div>
                <div className="text-xs font-serif italic text-[#B5D3BD] truncate mt-0.5">
                  {rel.botanical_name}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
