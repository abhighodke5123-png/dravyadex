import React from 'react';
import Link from 'next/link';
import { Sparkles, ShieldCheck, BookOpen, Compass, CheckCircle2, Globe, Database } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101C2A] border border-[#6BAA83]/30 text-[#6BAA83] text-xs font-mono uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Epistemological Foundations</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#F4F5F1] tracking-tight">
          About DRAVYADEX
        </h1>
        <p className="font-serif italic text-xl text-[#B5D3BD]">
          “Explore the Science of Nature.”
        </p>
        <p className="text-sm text-[#929BA7] leading-relaxed">
          A modern digital knowledge platform bridging classical Ayurvedic pharmacology (<span className="text-[#F4F5F1] italic">Dravyaguna Vigyana</span>), verified botanical taxonomy, and contemporary biomedical pharmacognosy.
        </p>
      </div>

      {/* Mission Statement */}
      <section className="bg-[#101C2A] border border-white/5 rounded-3xl p-8 md:p-12 space-y-6">
        <h2 className="font-serif text-2xl font-bold text-[#F4F5F1]">
          The Academic & Clinical Mission
        </h2>
        <p className="text-sm text-[#929BA7] leading-relaxed">
          In both traditional and contemporary settings, Ayurvedic pharmacological scholarship faces persistent challenges: fragmentation of classical Samhita verses, adulteration and vernacular homonym confusion in raw herb markets, and a divide between classical terminology and modern scientific literature.
        </p>
        <p className="text-sm text-[#929BA7] leading-relaxed">
          <strong className="text-[#F4F5F1]">DRAVYADEX</strong> was constructed from zero to provide a unified, citable, and rigorous digital knowledge engine. We serve Bachelor of Ayurvedic Medicine and Surgery (BAMS) students, postgraduates, clinical physicians, botanical researchers, and phytochemists seeking trustworthy, source-traceable information.
        </p>
      </section>

      {/* Dravyaguna Principles Grid */}
      <section className="space-y-6">
        <h2 className="font-serif text-2xl font-bold text-[#F4F5F1]">
          The Dravyaguna Methodological Hexad
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-[#101C2A] border border-white/5 rounded-2xl p-6 space-y-2">
            <span className="text-[10px] font-mono uppercase text-[#6BAA83]">1. Dravya (Substance)</span>
            <h3 className="font-serif text-xl font-bold text-[#F4F5F1]">The Substratum</h3>
            <p className="text-xs text-[#929BA7] leading-relaxed">
              The medicinal plant or natural substance that serves as the physical vehicle in which Gunas (qualities) and Karmas (actions) inseparably reside.
            </p>
          </div>

          <div className="bg-[#101C2A] border border-white/5 rounded-2xl p-6 space-y-2">
            <span className="text-[10px] font-mono uppercase text-[#6BAA83]">2. Guna (Qualities)</span>
            <h3 className="font-serif text-xl font-bold text-[#F4F5F1]">Twenty Gurvadi Attributes</h3>
            <p className="text-xs text-[#929BA7] leading-relaxed">
              Ten antagonistic pairs (Guru/Laghu, Snigdha/Ruksha, Sheeta/Ushna, etc.) describing the physicochemical and physiological behavioral dynamics of the drug.
            </p>
          </div>

          <div className="bg-[#101C2A] border border-white/5 rounded-2xl p-6 space-y-2">
            <span className="text-[10px] font-mono uppercase text-[#6BAA83]">3. Rasa (Taste)</span>
            <h3 className="font-serif text-xl font-bold text-[#F4F5F1]">The Six Primary Tastes</h3>
            <p className="text-xs text-[#929BA7] leading-relaxed">
              Madhura, Amla, Lavana, Katu, Tikta, and Kashaya. Each Rasa is an empirical indicator of fundamental Mahabhuta (elemental) composition and immediate gustatory effect.
            </p>
          </div>

          <div className="bg-[#101C2A] border border-white/5 rounded-2xl p-6 space-y-2">
            <span className="text-[10px] font-mono uppercase text-[#83C9F5]">4. Virya (Potency)</span>
            <h3 className="font-serif text-xl font-bold text-[#F4F5F1]">Active Energetic Force</h3>
            <p className="text-xs text-[#929BA7] leading-relaxed">
              The principal factor responsible for pharmacological action. Broadly categorized into Ushna (heating/metabolic stimulant) and Sheeta (cooling/cellular soothing).
            </p>
          </div>

          <div className="bg-[#101C2A] border border-white/5 rounded-2xl p-6 space-y-2">
            <span className="text-[10px] font-mono uppercase text-[#83C9F5]">5. Vipaka (Post-Digestive)</span>
            <h3 className="font-serif text-xl font-bold text-[#F4F5F1]">End-Metabolic Transformation</h3>
            <p className="text-xs text-[#929BA7] leading-relaxed">
              The final qualitative outcome of gastric and systemic digestive fires (Jatharagni & Dhatvagni). Transforms into Madhura, Amla, or Katu Vipaka.
            </p>
          </div>

          <div className="bg-[#101C2A] border border-white/5 rounded-2xl p-6 space-y-2">
            <span className="text-[10px] font-mono uppercase text-[#B5D3BD]">6. Prabhava (Specific Potency)</span>
            <h3 className="font-serif text-xl font-bold text-[#F4F5F1]">Inherent Specific Action</h3>
            <p className="text-xs text-[#929BA7] leading-relaxed">
              When two substances share identical Rasa, Guna, Virya, and Vipaka but manifest distinct therapeutic actions, the unexplained specificity is attributed to Prabhava.
            </p>
          </div>
        </div>
      </section>

      {/* Non-Fabrication Guarantee */}
      <section className="bg-[#0A1420] border border-[#6BAA83]/30 rounded-3xl p-8 md:p-10 space-y-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-[#6BAA83]" />
          <h2 className="font-serif text-2xl font-bold text-[#F4F5F1]">
            Our Academic & Evidence Guarantees
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs text-[#929BA7]">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#6BAA83] shrink-0 mt-0.5" />
            <span><strong>Zero Data Fabrication:</strong> If an attribute is missing in source datasets, it is marked &quot;Not available in imported sources&quot;. We never generate synthetic pharmacology.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#6BAA83] shrink-0 mt-0.5" />
            <span><strong>Strict Source Delineation:</strong> Classical Samhita citations are kept strictly separated from contemporary in-vitro/in-vivo PubMed biomedical literature.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#6BAA83] shrink-0 mt-0.5" />
            <span><strong>Preserved Traditions:</strong> Conflicting assertions between Bhavaprakasha, Charaka, and Nighantu traditions are preserved in parallel rather than erased.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#6BAA83] shrink-0 mt-0.5" />
            <span><strong>Taxonomic Precision:</strong> Plants are resolved to accepted scientific binomials with GBIF keys rather than relying solely on colloquial trade names.</span>
          </div>
        </div>
      </section>

      {/* Quick Launch CTA */}
      <div className="text-center pt-6">
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#6BAA83] hover:bg-[#5aa073] text-[#07090C] font-semibold text-sm transition-colors shadow-lg"
        >
          <Compass className="w-4 h-4" />
          <span>Start Exploring Dravyas</span>
        </Link>
      </div>
    </div>
  );
}
