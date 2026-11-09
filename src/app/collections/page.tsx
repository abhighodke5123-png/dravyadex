'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Bookmark, Plus, Trash2, BookOpen, Download, Share2 } from 'lucide-react';

interface Collection {
  id: string;
  title: string;
  description: string;
  herbs: Array<{ name: string; botanical: string; slug: string; note: string }>;
}

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([
    {
      id: '1',
      title: 'Medhya Rasayana (Cognitive Adaptogens)',
      description: 'Cornerstone herbs for cognitive endurance, neuroprotection, and memory enhancement.',
      herbs: [
        { name: 'Brahmi', botanical: 'Bacopa monnieri', slug: 'brahmi', note: 'Sheetaprada, pacifies Pitta & Kapha, promotes Dhi-Dhriti-Smriti.' },
        { name: 'Mandukaparni', botanical: 'Centella asiatica', slug: 'mandukaparni', note: 'Direct brain tissue nutrient (Majja Dhatu Rasayana).' },
        { name: 'Ashwagandha', botanical: 'Withania somnifera', slug: 'ashwagandha', note: 'Calms Vata, strengthens neuroendocrine resilience.' },
        { name: 'Shankhpushpi', botanical: 'Convolvulus pluricaulis', slug: 'shankhpushpi', note: 'Classical foremost Medhya dravya according to Charaka.' },
      ],
    },
    {
      id: '2',
      title: 'Deepana-Pachana (Digestive Fire Catalysts)',
      description: 'Formulations and single herbs for igniting metabolic Agni and digesting metabolic Ama.',
      herbs: [
        { name: 'Shunthi', botanical: 'Zingiber officinale', slug: 'shunthi', note: 'Ruksha, Ushna, Katu-Madhura, excellent Vata-Kapha Shamana.' },
        { name: 'Maricha', botanical: 'Piper nigrum', slug: 'maricha', note: 'Tikshna, Chedana, stimulates enzyme secretion.' },
        { name: 'Pippali', botanical: 'Piper longum', slug: 'pippali', note: 'Anabolic stimulant, respiratory bio-enhancer (Rasayana).' },
        { name: 'Chitrak', botanical: 'Plumbago zeylanica', slug: 'chitrak', note: 'Foremost Deepaniya and Pachaniya herb in classical Dravyaguna.' },
      ],
    },
    {
      id: '3',
      title: 'Pramehaghna (Metabolic & Glycemic Balance)',
      description: 'Herbs indicated in classical Prameha and metabolic syndrome management.',
      herbs: [
        { name: 'Haridra', botanical: 'Curcuma longa', slug: 'haridra', note: 'Combined with Amalaki (Nisha-Amalaki) as foremost Prameha remedy.' },
        { name: 'Amalaki', botanical: 'Phyllanthus emblica', slug: 'amla', note: 'Sheetala, Rasayana, mitigates microvascular oxidative stress.' },
        { name: 'Gudmar', botanical: 'Gymnema sylvestre', slug: 'gudmar', note: 'Blocks sweet taste receptors, enhances beta-cell function.' },
      ],
    },
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleCreateCollection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const created: Collection = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      description: newDesc.trim() || 'Custom study collection.',
      herbs: [],
    };

    setCollections(prev => [...prev, created]);
    setNewTitle('');
    setNewDesc('');
    setIsAdding(false);
  };

  const handleDeleteCollection = (id: string) => {
    setCollections(prev => prev.filter(c => c.id !== id));
  };

  const handleExport = (col: Collection) => {
    let md = `# ${col.title}\n\n${col.description}\n\n## Medicinal Plants:\n`;
    col.herbs.forEach((h, i) => {
      md += `${i + 1}. **${h.name}** (*${h.botanical}*)\n   - Clinical Note: ${h.note}\n   - Reference: https://dravyadex.org/dravya/${h.slug}\n\n`;
    });
    md += `\n*Exported from DRAVYADEX (CC BY 4.0)*\n`;

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${col.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#6BAA83] mb-2 block">
            Personal Study Portfolios
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#F4F5F1] tracking-tight">
            Research Collections
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-[#929BA7] max-w-2xl leading-relaxed">
            Organize medicinal plants into thematic clinical groups, annotate observations, and export structured study guides.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6BAA83] hover:bg-[#5aa073] text-[#07090C] font-semibold text-xs transition-colors self-start md:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>New Collection</span>
        </button>
      </div>

      {/* New Collection Modal/Form */}
      {isAdding && (
        <form onSubmit={handleCreateCollection} className="bg-[#101C2A] border border-[#6BAA83]/40 rounded-2xl p-6 space-y-4">
          <h3 className="font-serif text-lg font-bold text-[#F4F5F1]">Create New Study Collection</h3>
          <div>
            <label className="block text-xs font-mono uppercase text-[#929BA7] mb-1">Title</label>
            <input
              type="text"
              required
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              placeholder="e.g. Rasayana Herbs for Sthaulya (Obesity)"
              className="w-full bg-[#0A1420] border border-white/10 rounded-xl px-4 py-2 text-xs text-[#F4F5F1] outline-none focus:border-[#6BAA83]"
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase text-[#929BA7] mb-1">Description / Clinical Purpose</label>
            <textarea
              rows={2}
              value={newDesc}
              onChange={e => setNewDesc(e.target.value)}
              placeholder="Focusing on Lekhana and Medohara attributes..."
              className="w-full bg-[#0A1420] border border-white/10 rounded-xl px-4 py-2 text-xs text-[#F4F5F1] outline-none focus:border-[#6BAA83]"
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#6BAA83] text-[#07090C] font-semibold text-xs"
            >
              Create
            </button>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 rounded-xl bg-white/5 text-[#929BA7] text-xs hover:text-white"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Collections List */}
      <div className="space-y-8">
        {collections.map(col => (
          <div
            key={col.id}
            className="bg-[#101C2A] border border-white/5 rounded-3xl p-6 md:p-8 space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#6BAA83] bg-[#6BAA83]/10 border border-[#6BAA83]/30 px-2.5 py-0.5 rounded-full">
                  {col.herbs.length} Medicinal Taxa
                </span>
                <h2 className="font-serif text-2xl font-bold text-[#F4F5F1] mt-2">
                  {col.title}
                </h2>
                <p className="text-xs text-[#929BA7] mt-1">{col.description}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleExport(col)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0A1420] border border-white/10 hover:border-white/20 text-xs text-[#F4F5F1] transition-colors"
                  title="Export Markdown Study Guide"
                >
                  <Download className="w-3.5 h-3.5 text-[#83C9F5]" />
                  <span>Export</span>
                </button>
                <button
                  onClick={() => handleDeleteCollection(col.id)}
                  className="p-2 rounded-xl bg-[#0A1420] border border-white/10 hover:border-red-400 text-[#929BA7] hover:text-red-400 transition-colors"
                  title="Delete collection"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Herb Rows */}
            {col.herbs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {col.herbs.map(h => (
                  <div
                    key={h.slug}
                    className="p-4 rounded-xl bg-[#0A1420] border border-white/5 hover:border-white/20 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <Link
                        href={`/dravya/${h.slug}`}
                        className="font-serif text-base font-bold text-[#F4F5F1] hover:text-[#6BAA83] transition-colors"
                      >
                        {h.name}
                      </Link>
                      <span className="text-[11px] font-serif italic text-[#B5D3BD]">
                        {h.botanical}
                      </span>
                    </div>
                    <div className="text-xs text-[#929BA7] mt-2 leading-relaxed">
                      {h.note}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-6 text-center text-xs text-[#636D7A] italic">
                No herbs in this collection yet. Browse the Dravya Explorer and click &quot;Save to Study&quot;.
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


