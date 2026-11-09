'use client';

import React from 'react';
import Link from 'next/link';
import { Scroll, FlaskConical, Globe, BookOpen, ShieldCheck, ArrowRight } from 'lucide-react';

export function KnowledgeSourcesSection() {
  const pillars = [
    {
      title: 'Classical Samhita & Nighantu Treatises',
      category: 'Primary Tradition',
      icon: Scroll,
      color: 'text-[#6BAA83]',
      bgColor: 'bg-[#6BAA83]/10',
      borderColor: 'border-[#6BAA83]/30',
      description:
        'Unadulterated assertions derived from Charaka Samhita, Sushruta Samhita, Ashtanga Hridaya, Bhavaprakasha Nighantu, and Dhanvantari Nighantu. Citing specific verses, chapters, and classical commentaries.',
      stats: '4 Classical Samhitas • 8 Nighantu Lexicons',
    },
    {
      title: 'Pharmacopoeial Standards (AFI / API)',
      category: 'Regulatory Standards',
      icon: FlaskConical,
      color: 'text-[#83C9F5]',
      bgColor: 'bg-[#83C9F5]/10',
      borderColor: 'border-[#83C9F5]/30',
      description:
        'Official standardizations from the Ayurvedic Formulary of India (AFI) and Ayurvedic Pharmacopoeia of India (API). Crosswalking official compound formulations, proportions, and therapeutic dosages.',
      stats: '106 AFI Formulations • 2,144 Ingredients Crosswalked',
    },
    {
      title: 'Verified Botanical Taxonomy',
      category: 'Biological Identity',
      icon: Globe,
      color: 'text-[#B5D3BD]',
      bgColor: 'bg-[#B5D3BD]/10',
      borderColor: 'border-[#B5D3BD]/30',
      description:
        'Resolved binomial nomenclature mapped against the Global Biodiversity Information Facility (GBIF) and International Plant Names Index (IPNI). Prevents adulteration and resolves vernacular homonyms.',
      stats: '284 GBIF Taxa • Accepted Binomial Authority',
    },
    {
      title: 'Biomedical & Pharmacognostic Research',
      category: 'Empirical Evidence',
      icon: BookOpen,
      color: 'text-amber-400',
      bgColor: 'bg-amber-400/10',
      borderColor: 'border-amber-400/30',
      description:
        'Peer-reviewed contemporary biomedical studies indexed from PubMed, Journal of Ethnopharmacology, and phytochemistry registries. Strictly delineated from classical knowledge.',
      stats: '3,593 PubMed Citations • 816 Phytochemicals',
    },
  ];

  return (
    <section className="py-24 bg-[#07090C] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-mono uppercase tracking-widest text-[#83C9F5] mb-2 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Four Pillars of Verification</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#F4F5F1] tracking-tight">
            Evidence Architecture & Transparency
          </h2>
          <p className="mt-3 text-sm text-[#929BA7] leading-relaxed">
            DravyaDex maintains a strict methodological boundary between classical Ayurvedic texts, statutory pharmacopoeias, botanical authorities, and modern biomedical research.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map(p => (
            <div
              key={p.title}
              className="bg-[#101C2A] border border-white/5 rounded-2xl p-8 flex flex-col justify-between hover:border-white/20 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#929BA7]">
                    {p.category}
                  </span>
                  <div className={`w-10 h-10 rounded-xl ${p.bgColor} ${p.borderColor} border flex items-center justify-center ${p.color}`}>
                    <p.icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="font-serif text-2xl font-bold text-[#F4F5F1] tracking-tight">
                  {p.title}
                </h3>

                <p className="mt-4 text-xs text-[#929BA7] leading-relaxed">
                  {p.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-[#636D7A]">
                <span className="font-mono text-[11px] text-[#B5D3BD]">{p.stats}</span>
                <Link
                  href="/sources"
                  className="flex items-center gap-1 hover:text-[#F4F5F1] transition-colors"
                >
                  <span>Attribution</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
