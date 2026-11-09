'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Sparkles, ArrowRight, CornerDownLeft, Leaf } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SuggestionItem {
  title: string;
  botanical: string;
  slug: string;
  family?: string;
  virya?: string | null;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSuggestions([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Fetch suggestions with debounce
  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setSuggestions([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/dravyas?q=${encodeURIComponent(query)}&limit=7`);
        const json = await res.json();
        if (json.success && json.data) {
          const items: SuggestionItem[] = json.data.map((d: any) => ({
            title: d.canonical_name,
            botanical: d.botanical_name,
            slug: d.slug,
            family: d.family,
            virya: d.properties?.virya,
          }));
          setSuggestions(items);
        }
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setIsLoading(false);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [query]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % (suggestions.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + (suggestions.length || 1)) % (suggestions.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (suggestions.length > 0 && suggestions[selectedIndex]) {
        handleSelectHerb(suggestions[selectedIndex].slug);
      } else if (query.trim()) {
        router.push(`/explore?q=${encodeURIComponent(query.trim())}`);
        onClose();
      }
    }
  };

  const handleSelectHerb = (slug: string) => {
    router.push(`/dravya/${slug}`);
    onClose();
  };

  if (!isOpen) return null;

  const quickPicks = ['Ashwagandha', 'Tulsi', 'Amla', 'Giloy', 'Shatavari', 'Haritaki', 'Brahmi'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-2xl bg-[#0A1420] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/5 bg-[#101C2A]/70">
          <Search className="w-5 h-5 text-[#6BAA83] mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search by Sanskrit, Hindi, English, Botanical name, or synonym..."
            className="w-full bg-transparent text-sm text-[#F4F5F1] placeholder-[#636D7A] outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 hover:text-white text-[#929BA7] mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 px-2 py-1 rounded text-[#929BA7]"
          >
            ESC
          </button>
        </div>

        {/* Results or Quick Picks */}
        <div className="p-4 max-h-96 overflow-y-auto space-y-2">
          {isLoading ? (
            <div className="py-8 text-center text-xs text-[#929BA7] flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 animate-spin text-[#6BAA83]" />
              Searching classical and botanical records...
            </div>
          ) : suggestions.length > 0 ? (
            <div className="space-y-1">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#929BA7] px-2 py-1">
                Matched Dravyas ({suggestions.length})
              </div>
              {suggestions.map((item, idx) => (
                <div
                  key={item.slug}
                  onClick={() => handleSelectHerb(item.slug)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={cn(
                    'flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors',
                    selectedIndex === idx
                      ? 'bg-[#101C2A] border border-[#6BAA83]/40 text-[#F4F5F1]'
                      : 'hover:bg-white/5 text-[#929BA7]'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#6BAA83]/10 border border-[#6BAA83]/20 flex items-center justify-center text-[#6BAA83]">
                      <Leaf className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-[#F4F5F1] flex items-center gap-2">
                        {item.title}
                        {item.virya && (
                          <span
                            className={cn(
                              'text-[10px] px-1.5 py-0.5 rounded font-mono border',
                              item.virya === 'Ushna'
                                ? 'bg-orange-500/10 text-orange-300 border-orange-500/30'
                                : 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                            )}
                          >
                            {item.virya}
                          </span>
                        )}
                      </div>
                      <div className="text-xs italic text-[#929BA7] font-serif">
                        {item.botanical} {item.family ? `• ${item.family}` : ''}
                      </div>
                    </div>
                  </div>
                  <CornerDownLeft className="w-4 h-4 text-[#6BAA83] opacity-60" />
                </div>
              ))}
            </div>
          ) : query.length >= 2 ? (
            <div className="py-8 text-center text-xs text-[#929BA7]">
              No exact match found for "{query}". Press Enter to run full database search.
            </div>
          ) : (
            <div className="space-y-4 py-2">
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#929BA7]">
                Quick Botanical Picks
              </div>
              <div className="flex flex-wrap gap-2">
                {quickPicks.map(name => (
                  <button
                    key={name}
                    onClick={() => {
                      setQuery(name);
                    }}
                    className="px-3 py-1.5 rounded-full text-xs bg-[#101C2A] border border-white/5 hover:border-[#6BAA83]/40 text-[#F4F5F1] transition-colors"
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-4 py-2.5 bg-[#07090C] border-t border-white/5 flex items-center justify-between text-[11px] text-[#636D7A]">
          <div className="flex items-center gap-4">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <button
            onClick={() => {
              if (query.trim()) {
                router.push(`/explore?q=${encodeURIComponent(query.trim())}`);
                onClose();
              }
            }}
            className="flex items-center gap-1 hover:text-[#6BAA83] transition-colors"
          >
            <span>Explore all results</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
