import React from 'react';
import Link from 'next/link';
import { Database, ShieldCheck, ExternalLink, Leaf } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0A1420] border-t border-white/5 pt-16 pb-12 text-[#929BA7] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/5">
          {/* Brand & Vision */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-[#6BAA83]/20 border border-[#6BAA83]/40 flex items-center justify-center">
                <Leaf className="w-3.5 h-3.5 text-[#6BAA83]" />
              </div>
              <span className="font-serif tracking-wider text-sm font-semibold text-[#F4F5F1]">
                DRAVYADEX
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[#929BA7]">
              Digital Ayurvedic Dravyaguna Knowledge Platform. Harmonizing classical Ayurvedic pharmacology with verified botanical taxonomy and modern biomedical literature.
            </p>
            <div className="text-[11px] text-[#636D7A]">
              Designed for BAMS scholars, researchers, clinical practitioners, and ethnobotanists.
            </div>
          </div>

          {/* Dravyaguna Pillars */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#F4F5F1]">
              Rasa Panchaka
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/explore?rasa=Madhura" className="hover:text-[#6BAA83] transition-colors">
                  Rasa (Six Tastes)
                </Link>
              </li>
              <li>
                <Link href="/explore?guna=Guru" className="hover:text-[#6BAA83] transition-colors">
                  Guna (Twenty Attributes)
                </Link>
              </li>
              <li>
                <Link href="/explore?virya=Sheeta" className="hover:text-[#6BAA83] transition-colors">
                  Virya (Potency: Ushna & Sheeta)
                </Link>
              </li>
              <li>
                <Link href="/explore?vipaka=Madhura" className="hover:text-[#6BAA83] transition-colors">
                  Vipaka (Post-Digestive Effect)
                </Link>
              </li>
              <li>
                <Link href="/explore" className="hover:text-[#6BAA83] transition-colors">
                  Prabhava (Specific Action)
                </Link>
              </li>
              <li>
                <Link href="/explore?dosha=Vata+Shamana" className="hover:text-[#6BAA83] transition-colors">
                  Dosha Karma (Tridosha Dynamics)
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform & Data */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#F4F5F1]">
              Knowledge Architecture
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/explore" className="hover:text-[#6BAA83] transition-colors">
                  Dravya Explorer (483 Taxa)
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-[#6BAA83] transition-colors">
                  Tri-Dravya Comparative Matrix
                </Link>
              </li>
              <li>
                <Link href="/research" className="hover:text-[#6BAA83] transition-colors">
                  Biomedical Research (3,593 Papers)
                </Link>
              </li>
              <li>
                <Link href="/sources" className="hover:text-[#6BAA83] transition-colors">
                  Dataset Provenance & Checksums
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#83C9F5] transition-colors flex items-center gap-1">
                  <span>Conflict Audit Ledger</span>
                  <ShieldCheck className="w-3 h-3 text-[#83C9F5]" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Academic Transparency */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#F4F5F1]">
              Attribution & Open Access
            </h4>
            <p className="text-xs text-[#929BA7] leading-relaxed">
              All datasets ingested under Creative Commons Attribution 4.0 International (CC BY 4.0).
            </p>
            <div className="space-y-1.5 pt-1 text-[11px]">
              <div className="flex items-center gap-1.5 text-[#F4F5F1]">
                <Database className="w-3 h-3 text-[#6BAA83]" />
                <span>Amidha Ayurveda Open Herb Database</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#F4F5F1]">
                <Database className="w-3 h-3 text-[#83C9F5]" />
                <span>Age Ayurveda Nighantu (Zenodo: 10.5281/zenodo.22805684)</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#F4F5F1]">
                <Database className="w-3 h-3 text-[#B5D3BD]" />
                <span>Ayurvedic Herb Explorer (Zenodo: 10.5281/zenodo.1085515020)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#636D7A]">
          <div>
            © {new Date().getFullYear()} DRAVYADEX. Licensed under CC BY 4.0.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/sources" className="hover:text-[#929BA7] transition-colors">
              Dataset Checksums
            </Link>
            <Link href="/about" className="hover:text-[#929BA7] transition-colors">
              Methodology
            </Link>
            <a
              href="https://github.com/sciencewithsaucee-sudo/herb-database"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#929BA7] transition-colors flex items-center gap-1"
            >
              <span>Source A Repo</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
            <a
              href="https://nighantu.ageayurveda.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#929BA7] transition-colors flex items-center gap-1"
            >
              <span>Age Ayurveda Nighantu</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
