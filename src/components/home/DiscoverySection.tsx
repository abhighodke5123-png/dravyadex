'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Sparkles, ArrowRight, CornerDownLeft, Clock, Leaf } from 'lucide-react';
import { cn } from '@/lib/utils';

export function DiscoverySection() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('dravyadex_recent_searches');
      if (stored) setHistory(JSON.parse(stored).slice(0, 5));
    } catch (e) {}
  }, []);

  const saveHistory = (q: string) => {
    try {
      const updated = [q, ...history.filter(h => h.toLowerCase() !== q.toLowerCase())].slice(0, 5);
      setHistory(updated);
      localStorage.setItem('dravyadex_recent_searches', JSON.stringify(updated));
    } catch (e) {}
  };

  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setSuggestions([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/dravyas?q=${encodeURIComponent(query)}&limit=6`);
        const json = await res.json();
        if (json.success && json.data) {
          setSuggestions(json.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [query]);

  const handleExecuteSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    saveHistory(searchQuery.trim());
    router.push(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleSelectHerb = (slug: string, name: string) => {
    saveHistory(name);
    router.push(`/dravya/${slug}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % (suggestions.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + (suggestions.length || 1)) % (suggestions.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (suggestions.length > 0 && suggestions[selectedIndex]) {
        handleSelectHerb(suggestions[selectedIndex].slug, suggestions[selectedIndex].canonical_name);
      } else if (query.trim()) {
        handleExecuteSearch(query);
      }
    }
  };

  return (
    <section className="py-20 bg-[#0A1420] border-y border-white/5 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="text-xs font-mono uppercase tracking-widest text-[#6BAA83] mb-2">
            Multilingual Lexical Discovery
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#F4F5F1] tracking-tight">
            Knowledge Begins With a Dravya.
          </h2>
          <p className="mt-3 text-sm text-[#929BA7] max-w-xl mx-auto">
            Search instantaneously across Sanskrit, Hindi, Marathi, English, Botanical binomials, and classical synonyms.
          </p>
        </div>

        {/* Search Input Box */}
        <div className="relative bg-[#101C2A] border border-white/10 rounded-2xl shadow-xl p-2 transition-all focus-within:border-[#6BAA83]/50 focus-within:ring-2 focus-within:ring-[#6BAA83]/20">
          <div className="flex items-center px-4 py-2">
            <Search className="w-5 h-5 text-[#6BAA83] mr-3 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder="e.g. Ashwagandha, Withania somnifera, अश्वगंधा, Giloy, Tinospora..."
              className="w-full bg-transparent text-sm sm:text-base text-[#F4F5F1] placeholder-[#636D7A] outline-none"
            />
            <button
              onClick={() => handleExecuteSearch(query)}
              className="ml-2 px-5 py-2.5 rounded-xl bg-[#6BAA83] hover:bg-[#5aa073] text-[#07090C] font-semibold text-xs transition-colors flex items-center gap-1.5 shrink-0"
            >
              <span>Search</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Instant Suggestions Dropdown */}
          {query.length >= 2 && (
            <div className="mt-2 pt-2 border-t border-white/5 px-2 pb-2">
              {isLoading ? (
                <div className="py-6 text-center text-xs text-[#929BA7] flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 animate-spin text-[#6BAA83]" />
                  Querying classical & botanical records...
                </div>
              ) : suggestions.length > 0 ? (
                <div className="space-y-1">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#929BA7] px-2 py-1 flex items-center justify-between">
                    <span>Matched Plants ({suggestions.length})</span>
                    <span>Use ↑↓ to navigate, Enter to select</span>
                  </div>
                  {suggestions.map((item, idx) => (
                    <div
                      key={item.slug}
                      onClick={() => handleSelectHerb(item.slug, item.canonical_name)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={cn(
                        'flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-colors',
                        selectedIndex === idx
                          ? 'bg-white/10 text-[#F4F5F1]'
                          : 'hover:bg-white/5 text-[#929BA7]'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-[#6BAA83]/10 border border-[#6BAA83]/20 flex items-center justify-center text-[#6BAA83]">
                          <Leaf className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-[#F4F5F1]">
                            {item.canonical_name}
                            <span className="ml-2 font-normal text-[11px] text-[#929BA7] font-serif italic">
                              ({item.botanical_name})
                            </span>
                          </div>
                          <div className="text-[10px] text-[#636D7A] flex items-center gap-2 mt-0.5">
                            <span>Family: {item.family || 'Unspecified'}</span>
                            {item.properties?.virya && (
                              <span>• Virya: {item.properties.virya}</span>
                            )}
                            {item.properties?.rasa && (
                              <span>• Rasa: {item.properties.rasa.slice(0, 3).join(', ')}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <CornerDownLeft className="w-3.5 h-3.5 text-[#6BAA83] opacity-70" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-6 text-center text-xs text-[#929BA7]">
                  No exact botanical or vernacular record found for "{query}".
                </div>
              )}
            </div>
          )}
        </div>

        {/* Search History / Popular Queries */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-[#636D7A] text-[11px] font-mono flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Recent Searches:
          </span>
          {(history.length > 0 ? history : ['Ashwagandha', 'Tulsi', 'Giloy', 'Haritaki', 'Shatavari']).map(item => (
            <button
              key={item}
              onClick={() => {
                setQuery(item);
                handleExecuteSearch(item);
              }}
              className="px-2.5 py-1 rounded-full bg-[#101C2A] border border-white/5 hover:border-[#6BAA83]/40 text-[#929BA7] hover:text-[#F4F5F1] transition-colors text-[11px]"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
