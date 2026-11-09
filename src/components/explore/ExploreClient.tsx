'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Dravya, FilterState } from '@/types/dravya';
import { FilterSidebar } from './FilterSidebar';
import { HerbCard } from './HerbCard';
import { Search, SlidersHorizontal, ArrowUpDown, Sparkles, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ExploreClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [filters, setFilters] = useState<FilterState>({
    query: searchParams.get('q') || '',
    rasa: (searchParams.getAll('rasa') as any) || [],
    guna: (searchParams.getAll('guna') as any) || [],
    virya: (searchParams.getAll('virya') as any) || [],
    vipaka: (searchParams.getAll('vipaka') as any) || [],
    dosha: searchParams.getAll('dosha') || [],
    parts: searchParams.getAll('parts') || [],
    family: searchParams.getAll('family') || [],
    verifiedOnly: searchParams.get('verifiedOnly') === 'true',
    hasResearch: searchParams.get('hasResearch') === 'true',
    hasCompounds: searchParams.get('hasCompounds') === 'true',
    sortBy: (searchParams.get('sortBy') as any) || 'relevance',
  });

  const [page, setPage] = useState(1);
  const [items, setItems] = useState<Dravya[]>([]);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1, limit: 24 });
  const [availableOptions, setAvailableOptions] = useState({
    rasas: [],
    gunas: [],
    viryas: [],
    vipakas: [],
    families: [],
    parts: [],
    doshaActions: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sync state to URL and fetch results
  useEffect(() => {
    let isCancelled = false;
    setIsLoading(true);

    const queryParams = new URLSearchParams();
    if (filters.query) queryParams.set('q', filters.query);
    filters.rasa.forEach(r => queryParams.append('rasa', r));
    filters.guna.forEach(g => queryParams.append('guna', g));
    filters.virya.forEach(v => queryParams.append('virya', v));
    filters.vipaka.forEach(vp => queryParams.append('vipaka', vp));
    filters.dosha.forEach(d => queryParams.append('dosha', d));
    filters.parts.forEach(p => queryParams.append('parts', p));
    filters.family.forEach(f => queryParams.append('family', f));
    if (filters.verifiedOnly) queryParams.set('verifiedOnly', 'true');
    if (filters.hasResearch) queryParams.set('hasResearch', 'true');
    if (filters.hasCompounds) queryParams.set('hasCompounds', 'true');
    if (filters.sortBy !== 'relevance') queryParams.set('sortBy', filters.sortBy);
    queryParams.set('page', String(page));
    queryParams.set('limit', '24');

    // Update browser URL without reload
    const urlString = `/explore?${queryParams.toString()}`;
    window.history.replaceState(null, '', urlString);

    fetch(`/api/dravyas?${queryParams.toString()}`)
      .then(res => res.json())
      .then(json => {
        if (!isCancelled && json.success) {
          setItems(json.data);
          setPagination(json.pagination);
          if (json.availableFilters) {
            setAvailableOptions(json.availableFilters);
          }
        }
      })
      .catch(err => console.error('Fetch error:', err))
      .finally(() => {
        if (!isCancelled) setIsLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [filters, page]);

  const removeFilterBadge = (type: keyof FilterState, val?: string) => {
    if (type === 'query') {
      setFilters(prev => ({ ...prev, query: '' }));
    } else if (Array.isArray(filters[type])) {
      setFilters(prev => ({
        ...prev,
        [type]: (prev[type] as string[]).filter(item => item !== val),
      }));
    } else if (typeof filters[type] === 'boolean') {
      setFilters(prev => ({ ...prev, [type]: false }));
    }
    setPage(1);
  };

  const activeBadgeList: Array<{ type: keyof FilterState; label: string; val?: string }> = [];
  if (filters.query) activeBadgeList.push({ type: 'query', label: `Search: "${filters.query}"` });
  filters.rasa.forEach(r => activeBadgeList.push({ type: 'rasa', label: `Rasa: ${r}`, val: r }));
  filters.virya.forEach(v => activeBadgeList.push({ type: 'virya', label: `Virya: ${v}`, val: v }));
  filters.vipaka.forEach(vp => activeBadgeList.push({ type: 'vipaka', label: `Vipaka: ${vp}`, val: vp }));
  filters.dosha.forEach(d => activeBadgeList.push({ type: 'dosha', label: d, val: d }));
  filters.guna.forEach(g => activeBadgeList.push({ type: 'guna', label: `Guna: ${g}`, val: g }));
  filters.family.forEach(f => activeBadgeList.push({ type: 'family', label: `Family: ${f}`, val: f }));
  if (filters.verifiedOnly) activeBadgeList.push({ type: 'verifiedOnly', label: 'Verified Taxonomy' });
  if (filters.hasResearch) activeBadgeList.push({ type: 'hasResearch', label: 'Biomedical Research' });
  if (filters.hasCompounds) activeBadgeList.push({ type: 'hasCompounds', label: 'Phytochemical Data' });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Header */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#F4F5F1] tracking-tight">
          Dravya Explorer
        </h1>
        <p className="mt-1.5 text-sm text-[#929BA7]">
          Search and cross-reference 483 Ayurvedic medicinal plants by classical pharmacological parameters and modern botanical taxonomy.
        </p>
      </div>

      {/* Search Bar & Mobile Filter Trigger */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#6BAA83] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.query}
            onChange={e => {
              setFilters(prev => ({ ...prev, query: e.target.value }));
              setPage(1);
            }}
            placeholder="Search by common, Sanskrit, or botanical binomial..."
            className="w-full bg-[#101C2A] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#F4F5F1] placeholder-[#636D7A] outline-none focus:border-[#6BAA83]/50"
          />
          {filters.query && (
            <button
              onClick={() => removeFilterBadge('query')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#929BA7] hover:text-[#F4F5F1]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort & Mobile Filter Buttons */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-[#101C2A] border border-white/10 px-3 py-2 rounded-xl text-xs text-[#929BA7]">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <select
              value={filters.sortBy}
              onChange={e => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
              className="bg-transparent text-[#F4F5F1] outline-none text-xs cursor-pointer"
            >
              <option value="relevance" className="bg-[#101C2A]">Sort by Relevance</option>
              <option value="name-asc" className="bg-[#101C2A]">Name (A → Z)</option>
              <option value="name-desc" className="bg-[#101C2A]">Name (Z → A)</option>
              <option value="completeness" className="bg-[#101C2A]">Completeness Score</option>
            </select>
          </div>

          <button
            onClick={() => setShowMobileFilters(prev => !prev)}
            className="md:hidden flex items-center gap-2 bg-[#101C2A] border border-white/10 px-4 py-2 rounded-xl text-xs text-[#F4F5F1]"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#6BAA83]" />
            <span>Filters ({activeBadgeList.length})</span>
          </button>
        </div>
      </div>

      {/* Active Filter Badges */}
      {activeBadgeList.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-[11px] font-mono text-[#636D7A]">Active Filters:</span>
          {activeBadgeList.map((badge, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 bg-[#101C2A] border border-[#6BAA83]/30 text-[#6BAA83] text-xs px-2.5 py-1 rounded-full font-medium"
            >
              <span>{badge.label}</span>
              <button
                onClick={() => removeFilterBadge(badge.type, badge.val)}
                className="hover:text-[#F4F5F1] transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          <button
            onClick={() => {
              setFilters({
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
              setPage(1);
            }}
            className="text-[11px] text-[#929BA7] hover:text-[#6BAA83] underline ml-2"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Main Content Layout: Sidebar + Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Desktop Sidebar */}
        <div className="hidden md:block md:col-span-1">
          <FilterSidebar
            filters={filters}
            onChange={newFilters => {
              setFilters(newFilters);
              setPage(1);
            }}
            availableOptions={availableOptions}
          />
        </div>

        {/* Mobile Filters Drawer Modal */}
        {showMobileFilters && (
          <div className="fixed inset-0 z-50 bg-black/80 flex justify-end md:hidden">
            <div className="w-4/5 max-w-sm bg-[#0A1420] h-full p-5 overflow-y-auto space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <span className="font-serif text-lg font-bold text-[#F4F5F1]">Filters</span>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-1 text-[#929BA7] hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <FilterSidebar
                filters={filters}
                onChange={newFilters => {
                  setFilters(newFilters);
                  setPage(1);
                }}
                availableOptions={availableOptions}
              />
            </div>
          </div>
        )}

        {/* Main Grid Section */}
        <div className="md:col-span-3">
          {/* Results Summary Header */}
          <div className="flex items-center justify-between text-xs text-[#929BA7] mb-4 pb-2 border-b border-white/5">
            <span>
              Showing {pagination.total > 0 ? (page - 1) * pagination.limit + 1 : 0}–
              {Math.min(page * pagination.limit, pagination.total)} of {pagination.total} Dravyas
            </span>
            <span>Page {page} of {pagination.totalPages}</span>
          </div>

          {isLoading ? (
            <div className="py-24 text-center text-[#929BA7] flex flex-col items-center justify-center gap-3">
              <Sparkles className="w-6 h-6 animate-spin text-[#6BAA83]" />
              <div className="text-sm">Filtering knowledge records...</div>
            </div>
          ) : items.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {items.map(herb => (
                <HerbCard key={herb.slug} herb={herb} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-[#101C2A] border border-white/5 rounded-2xl p-8">
              <div className="text-base font-serif font-bold text-[#F4F5F1]">
                No matching medicinal plants found
              </div>
              <p className="mt-2 text-xs text-[#929BA7] max-w-md mx-auto">
                No plant records in our ingested datasets match this specific combination of Rasa, Guna, Virya, Vipaka, and Dosha filters.
              </p>
              <button
                onClick={() => {
                  setFilters({
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
                  setPage(1);
                }}
                className="mt-6 px-4 py-2 rounded-xl bg-[#6BAA83] text-[#07090C] font-semibold text-xs transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Pagination Controls */}
          {pagination.totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-3">
              <button
                disabled={page <= 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
                className="flex items-center gap-1 px-4 py-2 rounded-xl bg-[#101C2A] border border-white/10 text-xs font-medium text-[#F4F5F1] disabled:opacity-40 hover:bg-[#162538] transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>
              <span className="text-xs font-mono text-[#929BA7] px-3">
                {page} / {pagination.totalPages}
              </span>
              <button
                disabled={page >= pagination.totalPages}
                onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
                className="flex items-center gap-1 px-4 py-2 rounded-xl bg-[#101C2A] border border-white/10 text-xs font-medium text-[#F4F5F1] disabled:opacity-40 hover:bg-[#162538] transition-colors"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
