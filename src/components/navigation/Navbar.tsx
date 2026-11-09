'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Sparkles, BookOpen, Layers, Database, Sun, Moon, Shield, Bookmark, User, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SearchModal } from '@/components/search/SearchModal';

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut (Cmd+K / Ctrl+K) to open search modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTheme = () => {
    setIsLightMode(prev => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('light');
      } else {
        document.documentElement.classList.remove('light');
      }
      return next;
    });
  };

  const navLinks = [
    { href: '/explore', label: 'Explore Dravyas', icon: Compass },
    { href: '/compare', label: 'Compare', icon: Layers },
    { href: '/research', label: 'Research', icon: BookOpen },
    { href: '/sources', label: 'Sources', icon: Database },
    { href: '/about', label: 'Methodology', icon: Sparkles },
  ];

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          isScrolled
            ? 'bg-[#07090C]/90 backdrop-blur-md border-b border-white/5 py-3 shadow-lg'
            : 'bg-transparent py-5'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6BAA83] to-[#101C2A] border border-[#6BAA83]/30 flex items-center justify-center shadow-inner group-hover:border-[#6BAA83] transition-colors">
              <span className="text-white font-serif font-bold text-sm tracking-widest">D</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif tracking-wider text-base font-semibold text-[#F4F5F1] group-hover:text-[#6BAA83] transition-colors">
                DRAVYADEX
              </span>
              <span className="text-[10px] tracking-widest text-[#929BA7] uppercase font-mono">
                Dravyaguna System
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[#101C2A]/60 border border-white/5 px-2 py-1.5 rounded-full">
            {navLinks.map(link => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 flex items-center gap-1.5',
                    isActive
                      ? 'bg-[#6BAA83]/20 text-[#6BAA83] border border-[#6BAA83]/30'
                      : 'text-[#929BA7] hover:text-[#F4F5F1] hover:bg-white/5'
                  )}
                >
                  <link.icon className="w-3.5 h-3.5" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Controls: Search, Collections, Admin, Theme */}
          <div className="flex items-center gap-2">
            {/* Quick Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 bg-[#101C2A] border border-white/10 hover:border-[#6BAA83]/40 text-[#929BA7] hover:text-[#F4F5F1] px-3 py-1.5 rounded-full text-xs transition-colors group"
            >
              <Search className="w-3.5 h-3.5 group-hover:text-[#6BAA83] transition-colors" />
              <span className="hidden sm:inline">Search herbs...</span>
              <kbd className="hidden sm:inline bg-black/40 border border-white/10 text-[10px] px-1.5 py-0.5 rounded text-[#929BA7]">
                ⌘K
              </kbd>
            </button>

            {/* Collections */}
            <Link
              href="/collections"
              className={cn(
                'p-2 rounded-full border transition-colors',
                pathname === '/collections'
                  ? 'bg-[#6BAA83]/20 text-[#6BAA83] border-[#6BAA83]/30'
                  : 'bg-[#101C2A] border-white/5 text-[#929BA7] hover:text-[#F4F5F1]'
              )}
              title="Saved Collections"
            >
              <Bookmark className="w-4 h-4" />
            </Link>

            {/* Admin Portal */}
            <Link
              href="/admin"
              className={cn(
                'p-2 rounded-full border transition-colors',
                pathname === '/admin'
                  ? 'bg-[#83C9F5]/20 text-[#83C9F5] border-[#83C9F5]/30'
                  : 'bg-[#101C2A] border-white/5 text-[#929BA7] hover:text-[#83C9F5]'
              )}
              title="Admin & Dataset Ledger"
            >
              <Shield className="w-4 h-4" />
            </Link>

            {/* User Profile / Auth */}
            <Link
              href="/profile"
              className="p-2 rounded-full bg-[#101C2A] border border-white/5 text-[#929BA7] hover:text-[#F4F5F1] transition-colors"
              title="Account"
            >
              <User className="w-4 h-4" />
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-[#101C2A] border border-white/5 text-[#929BA7] hover:text-[#F4F5F1] transition-colors"
              title="Toggle theme"
            >
              {isLightMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Global Interactive Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
