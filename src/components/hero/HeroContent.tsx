'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Compass, Sparkles, ChevronDown } from 'lucide-react';

export function HeroContent() {
  return (
    <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8 pb-16">
      {/* Category Pill */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101C2A] border border-[#6BAA83]/30 text-[#6BAA83] text-xs font-mono uppercase tracking-widest mb-6">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Ayurvedic Dravyaguna Knowledge Platform</span>
      </div>

      {/* Main Title */}
      <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#F4F5F1] leading-none mb-6">
        DRAVYADEX
      </h1>

      {/* Tagline */}
      <p className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-[#B5D3BD] font-normal mb-6">
        “Explore the Science of Nature.”
      </p>

      {/* Editorial Description */}
      <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#929BA7] leading-relaxed mb-10 font-normal">
        A living knowledge system for Ayurvedic medicinal plants, classical pharmacology (<span className="text-[#F4F5F1] italic">Dravyaguna Vigyana</span>), verified botanical taxonomy, and peer-reviewed biomedical research.
      </p>

      {/* Call to Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
        <Link
          href="/explore"
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#6BAA83] hover:bg-[#5aa073] text-[#07090C] font-semibold text-sm tracking-wide transition-all duration-200 shadow-lg shadow-[#6BAA83]/20 hover:scale-[1.02]"
        >
          <Compass className="w-4 h-4" />
          <span>Explore Dravyas</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="#dravyaguna-section"
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#101C2A] hover:bg-[#162538] border border-white/10 hover:border-white/20 text-[#F4F5F1] font-medium text-sm tracking-wide transition-all duration-200"
        >
          <span>Discover Dravyaguna</span>
        </Link>
      </div>

      {/* Scroll indicator */}
      <div className="flex flex-col items-center justify-center gap-2 text-[#929BA7] opacity-70 hover:opacity-100 transition-opacity">
        <span className="text-[11px] font-mono uppercase tracking-widest">Scroll to explore</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-[#6BAA83]" />
      </div>
    </div>
  );
}
