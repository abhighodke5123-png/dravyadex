'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Flame, Snowflake, Activity, Layers, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export function DravyagunaExploration() {
  const [activeTab, setActiveTab] = useState<'rasa' | 'guna' | 'virya' | 'vipaka' | 'dosha'>('rasa');

  const rasas = [
    {
      name: 'Madhura',
      devanagari: 'मधुर',
      english: 'Sweet',
      elements: 'Prithvi + Jala',
      action: 'Nourishing, builds Dhatus, pacifies Vata & Pitta, increases Kapha.',
      href: '/explore?rasa=Madhura',
    },
    {
      name: 'Amla',
      devanagari: 'अम्ल',
      english: 'Sour',
      elements: 'Prithvi + Tejas',
      action: 'Stimulates Agni, enhances salivation, pacifies Vata, increases Pitta & Kapha.',
      href: '/explore?rasa=Amla',
    },
    {
      name: 'Lavana',
      devanagari: 'लवण',
      english: 'Salty',
      elements: 'Jala + Tejas',
      action: 'Softening, carminative, water retention, pacifies Vata, increases Pitta & Kapha.',
      href: '/explore?rasa=Lavana',
    },
    {
      name: 'Katu',
      devanagari: 'कटु',
      english: 'Pungent / Acrid',
      elements: 'Vayu + Tejas',
      action: 'Clears sinuses, stimulates circulation, pacifies Kapha, increases Vata & Pitta.',
      href: '/explore?rasa=Katu',
    },
    {
      name: 'Tikta',
      devanagari: 'तिक्त',
      english: 'Bitter',
      elements: 'Vayu + Akasha',
      action: 'Deep detoxifier, anti-inflammatory, clears Ama, pacifies Pitta & Kapha, increases Vata.',
      href: '/explore?rasa=Tikta',
    },
    {
      name: 'Kashaya',
      devanagari: 'कषाय',
      english: 'Astringent',
      elements: 'Vayu + Prithvi',
      action: 'Constrictive, wound healing, dries secretions, pacifies Pitta & Kapha, increases Vata.',
      href: '/explore?rasa=Kashaya',
    },
  ];

  const gunas = [
    { pair: 'Guru / Laghu', devanagari: 'गुरु / लघु', desc: 'Heavy (anabolic, slow) vs. Light (catabolic, easily digested)' },
    { pair: 'Snigdha / Ruksha', devanagari: 'स्निग्ध / रूक्ष', desc: 'Unctuous (lubricating, moistening) vs. Dry (absorbing, rough)' },
    { pair: 'Sheeta / Ushna', devanagari: 'शीत / उष्ण', desc: 'Cooling (soothing, reducing heat) vs. Heating (stimulant, diaphoretic)' },
    { pair: 'Manda / Tikshna', devanagari: 'मन्द / तीक्ष्ण', desc: 'Slow / Dull (gentle, steady) vs. Sharp / Penetrating (fast-acting)' },
    { pair: 'Sthira / Sara', devanagari: 'स्थिर / सर', desc: 'Stable (supportive, binding) vs. Mobile (purgative, moving fluids)' },
    { pair: 'Mridu / Kathina', devanagari: 'मृदु / कठिन', desc: 'Soft (relaxing, soothing) vs. Hard (compacting, structural)' },
    { pair: 'Vishada / Picchila', devanagari: 'विशद / पिच्छिल', desc: 'Clear (non-slimy, drying) vs. Slimy (coating, mucilaginous)' },
    { pair: 'Shlakshna / Khara', devanagari: 'श्लक्ष्ण / खर', desc: 'Smooth (healing, non-abrasive) vs. Rough (scraping, Lekhana)' },
    { pair: 'Sukshma / Sthula', devanagari: 'सूक्ष्म / स्थूल', desc: 'Subtle (penetrates micro-channels) vs. Gross (obstructive, bulk)' },
    { pair: 'Sandra / Drava', devanagari: 'सान्द्र / द्रव', desc: 'Solid / Dense (consolidating) vs. Liquid (diluting, spreading)' },
  ];

  const doshaKarma = [
    {
      dosha: 'Vata Shamana',
      action: 'Pacifies Vata',
      indication: 'Relieves dryness, nervous tremors, spasms, pain, and intestinal gas.',
      filter: '/explore?dosha=Vata+Shamana',
      color: 'text-amber-400',
    },
    {
      dosha: 'Pitta Shamana',
      action: 'Pacifies Pitta',
      indication: 'Alleviates systemic burning sensations, hyperacidity, inflammation, and fever.',
      filter: '/explore?dosha=Pitta+Shamana',
      color: 'text-rose-400',
    },
    {
      dosha: 'Kapha Shamana',
      action: 'Pacifies Kapha',
      indication: 'Resolves mucus, congestion, lethargy, edema, and sluggish metabolic rate.',
      filter: '/explore?dosha=Kapha+Shamana',
      color: 'text-blue-400',
    },
    {
      dosha: 'Tridosha Shamana',
      action: 'Balances All Three Doshas',
      indication: 'Harmonious adaptogenic action without aggravating any bio-energetic humoral state.',
      filter: '/explore?dosha=Tridosha',
      color: 'text-[#6BAA83]',
    },
  ];

  return (
    <section id="dravyaguna-section" className="py-24 bg-[#0A1420] border-y border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-mono uppercase tracking-widest text-[#6BAA83] mb-2 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Classical Ayurvedic Pharmacology</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#F4F5F1] tracking-tight">
            The Science of Dravyaguna
          </h2>
          <p className="mt-3 text-sm text-[#929BA7] leading-relaxed">
            Ayurveda evaluates medicinal substances through five inseparable energetic parameters: <span className="text-[#F4F5F1]">Rasa</span> (Taste), <span className="text-[#F4F5F1]">Guna</span> (Qualities), <span className="text-[#F4F5F1]">Virya</span> (Potency), <span className="text-[#F4F5F1]">Vipaka</span> (Post-digestive effect), and <span className="text-[#F4F5F1]">Prabhava</span> (Inherent specific potency).
          </p>

          {/* Nav Tabs */}
          <div className="mt-8 inline-flex items-center gap-1 p-1.5 rounded-full bg-[#101C2A] border border-white/5">
            {[
              { id: 'rasa', label: 'Rasa (Tastes)' },
              { id: 'guna', label: 'Guna (Qualities)' },
              { id: 'virya', label: 'Virya (Potency)' },
              { id: 'vipaka', label: 'Vipaka (Post-Digestive)' },
              { id: 'dosha', label: 'Dosha Karma' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  'px-4 py-2 rounded-full text-xs font-medium transition-all duration-200',
                  activeTab === tab.id
                    ? 'bg-[#6BAA83] text-[#07090C] font-semibold shadow-md'
                    : 'text-[#929BA7] hover:text-[#F4F5F1]'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab 1: Rasa */}
        {activeTab === 'rasa' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {rasas.map(r => (
              <div
                key={r.name}
                className="bg-[#101C2A] border border-white/5 rounded-2xl p-6 flex flex-col justify-between hover:border-[#6BAA83]/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-devanagari text-lg text-[#B5D3BD]">{r.devanagari}</span>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#6BAA83] bg-[#6BAA83]/10 px-2.5 py-0.5 rounded-full border border-[#6BAA83]/20">
                      {r.elements}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#F4F5F1]">
                    {r.name}
                    <span className="text-sm font-normal text-[#929BA7] ml-2">({r.english})</span>
                  </h3>
                  <p className="mt-3 text-xs text-[#929BA7] leading-relaxed">
                    {r.action}
                  </p>
                </div>
                <Link
                  href={r.href}
                  className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-[#6BAA83] hover:text-[#B5D3BD] font-medium transition-colors"
                >
                  <span>Explore {r.name} Dravyas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Guna */}
        {activeTab === 'guna' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
            {gunas.map((g, idx) => (
              <div
                key={idx}
                className="bg-[#101C2A] border border-white/5 rounded-xl p-5 flex items-start gap-4 hover:border-white/20 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xs font-mono text-[#6BAA83] shrink-0">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif text-base font-bold text-[#F4F5F1]">
                      {g.pair}
                    </h4>
                    <span className="font-devanagari text-sm text-[#B5D3BD]">{g.devanagari}</span>
                  </div>
                  <p className="mt-1 text-xs text-[#929BA7] leading-relaxed">
                    {g.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Virya */}
        {activeTab === 'virya' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto animate-fade-in">
            {/* Ushna Virya */}
            <div className="bg-[#101C2A] border border-orange-500/20 rounded-2xl p-8 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 mb-6">
                  <Flame className="w-6 h-6" />
                </div>
                <div className="font-devanagari text-xl text-orange-300">उष्ण वीर्य</div>
                <h3 className="font-serif text-3xl font-bold text-[#F4F5F1] mt-1">
                  Ushna Virya (Heating Potency)
                </h3>
                <div className="mt-2 text-xs font-mono uppercase text-[#929BA7]">Dominant Mahabhuta: Tejas (Fire)</div>
                <p className="mt-4 text-xs text-[#929BA7] leading-relaxed">
                  Enhances digestive fire (Agni-Deepana), stimulates circulation, produces sweating (Swedana), burns toxin accumulations (Ama-Pachana), and liquefies Kapha. Indicated in cold, sluggish, and stagnant conditions.
                </p>
              </div>
              <Link
                href="/explore?virya=Ushna"
                className="mt-8 inline-flex items-center justify-between p-3 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 text-orange-300 text-xs font-medium transition-colors"
              >
                <span>Filter all Ushna Dravyas</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Sheeta Virya */}
            <div className="bg-[#101C2A] border border-cyan-500/20 rounded-2xl p-8 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6">
                  <Snowflake className="w-6 h-6" />
                </div>
                <div className="font-devanagari text-xl text-cyan-300">शीत वीर्य</div>
                <h3 className="font-serif text-3xl font-bold text-[#F4F5F1] mt-1">
                  Sheeta Virya (Cooling Potency)
                </h3>
                <div className="mt-2 text-xs font-mono uppercase text-[#929BA7]">Dominant Mahabhuta: Jala + Prithvi</div>
                <p className="mt-4 text-xs text-[#929BA7] leading-relaxed">
                  Provides cellular nourishment (Tarpana), stops internal hemorrhages (Stambhana), quenches thirst, alleviates inflammation and burning sensations, and stabilizes Pitta. Vital in Pitta-predominant disorders.
                </p>
              </div>
              <Link
                href="/explore?virya=Sheeta"
                className="mt-8 inline-flex items-center justify-between p-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs font-medium transition-colors"
              >
                <span>Filter all Sheeta Dravyas</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {/* Tab 4: Vipaka */}
        {activeTab === 'vipaka' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto animate-fade-in">
            {[
              {
                name: 'Madhura Vipaka',
                devanagari: 'मधुर विपाक',
                desc: 'Post-digestive sweet transformation. Anabolic, promotes tissue regeneration (Shukrala), increases Kapha, eases elimination of feces and urine.',
                filter: '/explore?vipaka=Madhura',
              },
              {
                name: 'Amla Vipaka',
                devanagari: 'अम्ल विपाक',
                desc: 'Post-digestive sour transformation. Pitta-elevating, stimulates gastric enzymes, aids nutrient partitioning, moderately increases Kapha.',
                filter: '/explore?vipaka=Amla',
              },
              {
                name: 'Katu Vipaka',
                devanagari: 'कटु विपाक',
                desc: 'Post-digestive pungent transformation. Catabolic, drying, reduces semen and fat tissues, increases Vata, and binds bowel movements.',
                filter: '/explore?vipaka=Katu',
              },
            ].map(v => (
              <div key={v.name} className="bg-[#101C2A] border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <span className="font-devanagari text-base text-[#B5D3BD]">{v.devanagari}</span>
                  <h3 className="font-serif text-xl font-bold text-[#F4F5F1] mt-1">{v.name}</h3>
                  <p className="mt-3 text-xs text-[#929BA7] leading-relaxed">{v.desc}</p>
                </div>
                <Link
                  href={v.filter}
                  className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-[#6BAA83] font-medium"
                >
                  <span>View plants</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Tab 5: Dosha Karma */}
        {activeTab === 'dosha' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
            {doshaKarma.map(d => (
              <div key={d.dosha} className="bg-[#101C2A] border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className={cn('text-sm font-bold font-mono tracking-wide', d.color)}>
                    {d.dosha}
                  </div>
                  <h4 className="font-serif text-lg font-semibold text-[#F4F5F1] mt-2">
                    {d.action}
                  </h4>
                  <p className="mt-3 text-xs text-[#929BA7] leading-relaxed">
                    {d.indication}
                  </p>
                </div>
                <Link
                  href={d.filter}
                  className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-[#6BAA83] font-medium"
                >
                  <span>Filter herbs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
