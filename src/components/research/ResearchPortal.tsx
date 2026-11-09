'use client';

import React, { useState } from 'react';
import { BookOpen, FlaskConical, Scroll, Search, ExternalLink, Sparkles, Database } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResearchPortalProps {
  papers: any[];
  formulations: any[];
  terms: any[];
}

export function ResearchPortal({ papers, formulations, terms }: ResearchPortalProps) {
  const [activeTab, setActiveTab] = useState<'papers' | 'formulations' | 'lexicon'>('papers');
  const [searchQuery, setSearchQuery] = useState('');

  const q = searchQuery.toLowerCase().trim();

  const filteredPapers = papers.filter(p => {
    if (!q) return true;
    const text = `${p.title || ''} ${p.journal || ''} ${(p.authors || []).join(' ')}`.toLowerCase();
    return text.includes(q);
  });

  const filteredFormulations = formulations.filter(f => {
    if (!q) return true;
    const text = `${f.entryHeading || ''} ${f.slug || ''} ${f.classicalSource || ''}`.toLowerCase();
    return text.includes(q);
  });

  const filteredTerms = terms.filter(t => {
    if (!q) return true;
    const text = `${t.iast || ''} ${t.devanagari || ''} ${t.slug || ''} ${(t.alternates || []).join(' ')}`.toLowerCase();
    return text.includes(q);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#83C9F5] mb-2 block">
            Academic & Clinical Corpus
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#F4F5F1] tracking-tight">
            Research & Classical Evidence
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-[#929BA7] max-w-2xl leading-relaxed">
            Interrogating 3,593 peer-reviewed biomedical research papers, 106 Ayurvedic Formulary of India (AFI) classical compositions, and 277 classical Sanskrit terms.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1 bg-[#101C2A] p-1.5 rounded-2xl border border-white/5 text-xs">
          <button
            onClick={() => setActiveTab('papers')}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-xl transition-colors font-medium',
              activeTab === 'papers'
                ? 'bg-[#83C9F5] text-[#07090C] font-semibold'
                : 'text-[#929BA7] hover:text-[#F4F5F1]'
            )}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Biomedical Papers ({papers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('formulations')}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-xl transition-colors font-medium',
              activeTab === 'formulations'
                ? 'bg-[#6BAA83] text-[#07090C] font-semibold'
                : 'text-[#929BA7] hover:text-[#F4F5F1]'
            )}
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span>AFI Formulations ({formulations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('lexicon')}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-xl transition-colors font-medium',
              activeTab === 'lexicon'
                ? 'bg-[#B5D3BD] text-[#07090C] font-semibold'
                : 'text-[#929BA7] hover:text-[#F4F5F1]'
            )}
          >
            <Scroll className="w-3.5 h-3.5" />
            <span>Lexicon ({terms.length})</span>
          </button>
        </div>
      </div>

      {/* Global Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#83C9F5] absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder={
            activeTab === 'papers'
              ? 'Search research by paper title, journal, author, or botanical topic...'
              : activeTab === 'formulations'
              ? 'Search formulations by name (e.g. Abhayarishta, Triphala Guggulu, Chyavanaprash)...'
              : 'Search Sanskrit terminology (IAST, Devanagari, swasthavritta)...'
          }
          className="w-full bg-[#101C2A] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-[#F4F5F1] placeholder-[#636D7A] outline-none focus:border-[#83C9F5]/50"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#929BA7] hover:text-white"
          >
            Clear
          </button>
        )}
      </div>

      {/* TAB 1: BIOMEDICAL RESEARCH PAPERS */}
      {activeTab === 'papers' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-[#929BA7]">
            <span>Showing {Math.min(filteredPapers.length, 60)} of {filteredPapers.length} Studies</span>
            <span className="font-mono text-[11px]">Source: Age Ayurveda Nighantu Research Index</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPapers.slice(0, 60).map((paper, idx) => (
              <div
                key={paper.pmid || idx}
                className="bg-[#101C2A] border border-white/5 rounded-2xl p-5 flex flex-col justify-between hover:border-[#83C9F5]/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2 text-[11px] font-mono">
                    <span className="text-[#83C9F5] uppercase tracking-wider">{paper.journal || 'Biomedical Journal'}</span>
                    <span className="text-[#929BA7]">{paper.year}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-[#F4F5F1] leading-snug">
                    {paper.title}
                  </h3>
                  <div className="text-xs text-[#929BA7] mt-2 line-clamp-1">
                    Authors: {(paper.authors || []).join(', ')}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-mono text-[#636D7A]">
                    PMID: {paper.pmid || 'N/A'} {paper.doi ? `• DOI: ${paper.doi}` : ''}
                  </span>
                  <a
                    href={paper.url || `https://pubmed.ncbi.nlm.nih.gov/${paper.pmid}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[#83C9F5] hover:underline"
                  >
                    <span>Read Study</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: CLASSICAL FORMULATIONS (AFI) */}
      {activeTab === 'formulations' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-[#929BA7]">
            <span>Showing {filteredFormulations.length} Classical Formulations</span>
            <span className="font-mono text-[11px]">Ayurvedic Formulary of India (AFI) Standard</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredFormulations.map(form => (
              <div
                key={form.slug}
                className="bg-[#101C2A] border border-white/5 rounded-2xl p-6 flex flex-col justify-between hover:border-[#6BAA83]/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#6BAA83] bg-[#6BAA83]/10 border border-[#6BAA83]/20 px-2 py-0.5 rounded">
                      AFI Part {form.afiPart || 'I'} • {form.entryNumber}
                    </span>
                    <span className="text-[11px] text-[#929BA7] font-mono">
                      {form.ingredientCount || form.ingredients?.length || 0} Ingredients
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-[#F4F5F1]">
                    {form.entryHeading || form.slug}
                  </h3>

                  <div className="text-xs text-[#B5D3BD] mt-1 font-serif italic">
                    Source: {form.classicalSource || 'Classical Samhita / Bhaisajyaratnavali'}
                  </div>

                  {form.dose && (
                    <div className="mt-3 text-xs text-[#929BA7]">
                      <span className="font-mono uppercase text-[10px] text-[#636D7A]">Dosage:</span>{' '}
                      <span className="text-[#F4F5F1]">{form.dose}</span>
                      {form.anupana && ` • Anupana: ${form.anupana}`}
                    </div>
                  )}

                  {/* Ingredients Preview */}
                  {form.ingredients && form.ingredients.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-white/5">
                      <div className="text-[10px] font-mono uppercase text-[#636D7A] mb-2">
                        Formula Ingredients:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {form.ingredients.slice(0, 8).map((ing: any, idx: number) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-[#0A1420] text-[#929BA7] px-2 py-0.5 rounded border border-white/5"
                          >
                            {ing.name} {ing.gloss ? `(${ing.gloss})` : ''}
                          </span>
                        ))}
                        {form.ingredients.length > 8 && (
                          <span className="text-[10px] text-[#636D7A] self-center">
                            +{form.ingredients.length - 8} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: AYURVEDIC LEXICON & TERMINOLOGY */}
      {activeTab === 'lexicon' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-[#929BA7]">
            <span>Showing {filteredTerms.length} Classical Terms</span>
            <span className="font-mono text-[11px]">Classical Sanskrit & Dravyaguna Epistemology</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTerms.map(term => (
              <div
                key={term.slug}
                className="bg-[#101C2A] border border-white/5 rounded-2xl p-5 flex flex-col justify-between hover:border-white/20 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#929BA7] bg-[#0A1420] px-2 py-0.5 rounded">
                      {term.category || 'Dravyaguna'}
                    </span>
                    <span className="font-devanagari text-base text-[#B5D3BD]">
                      {term.devanagari}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#F4F5F1]">
                    {term.iast || term.slug}
                  </h3>

                  {term.alternates && term.alternates.length > 0 && (
                    <div className="text-[11px] text-[#636D7A] italic mt-0.5">
                      Alt: {term.alternates.slice(0, 2).join(', ')}
                    </div>
                  )}

                  {term.renderings && term.renderings.length > 0 && (
                    <div className="mt-3 text-xs text-[#929BA7] leading-relaxed">
                      {term.renderings[0].definition || term.renderings[0].english}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
