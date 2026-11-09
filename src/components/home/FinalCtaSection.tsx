'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Compass, Sparkles, Layers } from 'lucide-react';

export function FinalCtaSection() {
  return (
    <section className="py-28 bg-gradient-to-b from-[#0A1420] to-[#07090C] border-t border-white/5 relative overflow-hidden text-center">
      <div className="absolute inset-0 bg-radial-gradient from-[#6BAA83]/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101C2A] border border-[#6BAA83]/30 text-[#6BAA83] text-xs font-mono uppercase tracking-widest mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Ayurvedic Scholar & Practitioner Suite</span>
        </div>

        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#F4F5F1] tracking-tight mb-6">
          “Discover the Depth of Dravyaguna.”
        </h2>

        <p className="max-w-2xl mx-auto text-base text-[#929BA7] leading-relaxed mb-10">
          Join BAMS educators, postgraduate researchers, and integrative practitioners using DravyaDex to study medicinal plants with pharmacological fidelity.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/explore"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#6BAA83] hover:bg-[#5aa073] text-[#07090C] font-semibold text-sm tracking-wide transition-all duration-200 shadow-xl shadow-[#6BAA83]/20 hover:scale-[1.02]"
          >
            <Compass className="w-4 h-4" />
            <span>Launch Dravya Explorer</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/compare"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#101C2A] hover:bg-[#162538] border border-white/10 text-[#F4F5F1] font-medium text-sm tracking-wide transition-all duration-200"
          >
            <Layers className="w-4 h-4 text-[#83C9F5]" />
            <span>Open Comparison Matrix</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
