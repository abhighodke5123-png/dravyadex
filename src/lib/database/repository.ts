import fs from 'fs';
import path from 'path';
import { Dravya, FilterState, ClassicalFormulation, TerminologyItem, DataConflict } from '@/types/dravya';

// In-memory cached dataset instances
let cachedDravyas: Dravya[] | null = null;
let cachedFormulations: ClassicalFormulation[] | null = null;
let cachedTerminology: TerminologyItem[] | null = null;
let cachedConflicts: DataConflict[] | null = null;

function resolveDataPath(relPath: string): string {
  const possiblePaths = [
    path.join(process.cwd(), 'data', relPath),
    path.join(process.cwd(), 'dravyadex', 'data', relPath),
    path.join(process.cwd(), '..', 'data', relPath),
  ];
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) return p;
  }
  return path.join(process.cwd(), 'data', relPath);
}

export function getAllDravyas(): Dravya[] {
  if (cachedDravyas) return cachedDravyas;
  try {
    const fPath = resolveDataPath('seed/dravyas.json');
    if (fs.existsSync(fPath)) {
      const raw = fs.readFileSync(fPath, 'utf8');
      cachedDravyas = JSON.parse(raw);
      return cachedDravyas || [];
    }
  } catch (err) {
    console.error('Error loading seed/dravyas.json:', err);
  }
  return [];
}

export function getAllFormulations(): ClassicalFormulation[] {
  if (cachedFormulations) return cachedFormulations;
  try {
    const fPath = resolveDataPath('seed/formulations.json');
    if (fs.existsSync(fPath)) {
      cachedFormulations = JSON.parse(fs.readFileSync(fPath, 'utf8'));
      return cachedFormulations || [];
    }
  } catch (err) {
    console.error('Error loading seed/formulations.json:', err);
  }
  return [];
}

export function getAllTerminology(): TerminologyItem[] {
  if (cachedTerminology) return cachedTerminology;
  try {
    const fPath = resolveDataPath('seed/terminology.json');
    if (fs.existsSync(fPath)) {
      cachedTerminology = JSON.parse(fs.readFileSync(fPath, 'utf8'));
      return cachedTerminology || [];
    }
  } catch (err) {
    console.error('Error loading seed/terminology.json:', err);
  }
  return [];
}

export function getAllDataConflicts(): DataConflict[] {
  if (cachedConflicts) return cachedConflicts;
  try {
    const possiblePaths = [
      path.join(process.cwd(), 'reports', 'data-conflicts.json'),
      path.join(process.cwd(), 'dravyadex', 'reports', 'data-conflicts.json'),
    ];
    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        const raw = JSON.parse(fs.readFileSync(p, 'utf8'));
        cachedConflicts = raw.conflicts || [];
        return cachedConflicts || [];
      }
    }
  } catch (err) {
    console.error('Error loading data-conflicts.json:', err);
  }
  return [];
}

export function getDataQualityReport() {
  try {
    const possiblePaths = [
      path.join(process.cwd(), 'reports', 'data-quality.json'),
      path.join(process.cwd(), 'dravyadex', 'reports', 'data-quality.json'),
    ];
    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        return JSON.parse(fs.readFileSync(p, 'utf8'));
      }
    }
  } catch (e) {}
  return null;
}

// ----------------------------------------------------
// INTELLIGENT MULTILINGUAL SEARCH & FILTER ENGINE
// ----------------------------------------------------

export function searchAndFilterDravyas(filters: Partial<FilterState>, page = 1, limit = 24) {
  const all = getAllDravyas();
  const q = (filters.query || '').trim().toLowerCase();

  let filtered = all.filter(d => {
    // 1. Text Search matching across canonical, botanical, sanskrit, english, and synonyms
    if (q) {
      const matchCanonical = d.canonical_name.toLowerCase().includes(q);
      const matchBotanical = d.botanical_name.toLowerCase().includes(q);
      const matchSanskrit = d.sanskrit_name ? d.sanskrit_name.toLowerCase().includes(q) : false;
      const matchEnglish = d.english_name ? d.english_name.toLowerCase().includes(q) : false;
      const matchFamily = d.family ? d.family.toLowerCase().includes(q) : false;
      const matchSynonyms = d.names?.some(n => n.name.toLowerCase().includes(q));
      const matchIndications = d.indications?.some(ind => ind.toLowerCase().includes(q));

      if (
        !matchCanonical &&
        !matchBotanical &&
        !matchSanskrit &&
        !matchEnglish &&
        !matchFamily &&
        !matchSynonyms &&
        !matchIndications
      ) {
        return false;
      }
    }

    // 2. Rasa Filter
    if (filters.rasa && filters.rasa.length > 0) {
      const dRasa = d.properties?.rasa || [];
      const hasAnyRasa = filters.rasa.some(r => dRasa.includes(r));
      if (!hasAnyRasa) return false;
    }

    // 3. Guna Filter
    if (filters.guna && filters.guna.length > 0) {
      const dGuna = d.properties?.guna || [];
      const hasAnyGuna = filters.guna.some(g => dGuna.includes(g));
      if (!hasAnyGuna) return false;
    }

    // 4. Virya Filter
    if (filters.virya && filters.virya.length > 0) {
      const dVirya = d.properties?.virya || '';
      if (!filters.virya.includes(dVirya as any)) return false;
    }

    // 5. Vipaka Filter
    if (filters.vipaka && filters.vipaka.length > 0) {
      const dVipaka = d.properties?.vipaka || '';
      const hasVipaka = filters.vipaka.some(v => dVipaka.includes(v));
      if (!hasVipaka) return false;
    }

    // 6. Dosha Karma Filter
    if (filters.dosha && filters.dosha.length > 0) {
      const pacify = d.properties?.dosha_karma?.pacify || [];
      const aggravate = d.properties?.dosha_karma?.aggravate || [];
      const tridosha = d.properties?.dosha_karma?.tridosha || '';

      const matchesDosha = filters.dosha.some(filterDosha => {
        if (filterDosha === 'Tridosha') return tridosha.toLowerCase().includes('tridosha');
        if (filterDosha.includes('Shamana')) {
          const doshaName = filterDosha.replace(' Shamana', '').trim();
          return pacify.includes(doshaName);
        }
        if (filterDosha.includes('Vriddhi')) {
          const doshaName = filterDosha.replace(' Vriddhi', '').trim();
          return aggravate.includes(doshaName);
        }
        return pacify.includes(filterDosha) || aggravate.includes(filterDosha);
      });

      if (!matchesDosha) return false;
    }

    // 7. Parts Used Filter
    if (filters.parts && filters.parts.length > 0) {
      const dParts = d.parts_used || [];
      const hasPart = filters.parts.some(p =>
        dParts.some(dp => dp.toLowerCase().includes(p.toLowerCase()))
      );
      if (!hasPart) return false;
    }

    // 8. Family Filter
    if (filters.family && filters.family.length > 0) {
      if (!d.family || !filters.family.includes(d.family)) return false;
    }

    // 9. Verified Only Filter
    if (filters.verifiedOnly && !d.verified) {
      return false;
    }

    // 10. Has Research References
    if (filters.hasResearch && (!d.research || d.research.length === 0)) {
      return false;
    }

    // 11. Has Phytochemical Compounds
    if (filters.hasCompounds && (!d.compounds || d.compounds.length === 0)) {
      return false;
    }

    return true;
  });

  // Sorting
  const sortBy = filters.sortBy || 'relevance';
  if (sortBy === 'name-asc') {
    filtered.sort((a, b) => a.canonical_name.localeCompare(b.canonical_name));
  } else if (sortBy === 'name-desc') {
    filtered.sort((a, b) => b.canonical_name.localeCompare(a.canonical_name));
  } else if (sortBy === 'completeness') {
    filtered.sort((a, b) => (b.completeness_score || 0) - (a.completeness_score || 0));
  } else if (q) {
    // Relevance ranking: exact name matches come first
    filtered.sort((a, b) => {
      const aExact = a.canonical_name.toLowerCase() === q || a.botanical_name.toLowerCase() === q;
      const bExact = b.canonical_name.toLowerCase() === q || b.botanical_name.toLowerCase() === q;
      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;
      return (b.completeness_score || 0) - (a.completeness_score || 0);
    });
  }

  const total = filtered.length;
  const totalPages = Math.ceil(total / limit) || 1;
  const safePage = Math.max(1, Math.min(page, totalPages));
  const startIndex = (safePage - 1) * limit;
  const paginated = filtered.slice(startIndex, startIndex + limit);

  return {
    items: paginated,
    total,
    page: safePage,
    totalPages,
    limit,
  };
}

export function getDravyaBySlug(slug: string): Dravya | null {
  const all = getAllDravyas();
  const cleanSlug = slug.toLowerCase().trim();
  const found = all.find(
    d => d.slug.toLowerCase() === cleanSlug || d.canonical_name.toLowerCase() === cleanSlug
  );
  return found || null;
}

export function getCompareDravyas(slugs: string[]): Dravya[] {
  const all = getAllDravyas();
  const cleanSlugs = slugs.map(s => s.toLowerCase().trim());
  return all.filter(d => cleanSlugs.includes(d.slug.toLowerCase()));
}

export function getRelatedDravyas(currentDravya: Dravya, limit = 4): Dravya[] {
  const all = getAllDravyas();
  return all
    .filter(d => d.id !== currentDravya.id)
    .filter(d => {
      const sameFamily = currentDravya.family && d.family === currentDravya.family;
      const sameVirya = currentDravya.properties?.virya && d.properties?.virya === currentDravya.properties?.virya;
      const sharedRasa = currentDravya.properties?.rasa?.some(r => (d.properties?.rasa as any[])?.includes(r));
      return sameFamily || (sameVirya && sharedRasa);
    })
    .slice(0, limit);
}

export function getFeaturedDravyas(limit = 6): Dravya[] {
  const all = getAllDravyas();
  // Select well-known benchmark herbs with rich classical and botanical profiles
  const benchmarkSlugs = [
    'ashwagandha',
    'tulsi',
    'amla',
    'giloy',
    'shatavari',
    'haritaki',
    'brahmi',
    'neem',
    'guggulu',
    'triphala',
    'shunthi'
  ];

  const benchmarkHerbs = all.filter(d => benchmarkSlugs.includes(d.slug.toLowerCase()));
  if (benchmarkHerbs.length >= limit) {
    return benchmarkHerbs.slice(0, limit);
  }
  // Fill remaining with highest completeness score
  const remaining = all
    .filter(d => !benchmarkHerbs.some(b => b.id === d.id))
    .sort((a, b) => b.completeness_score - a.completeness_score)
    .slice(0, limit - benchmarkHerbs.length);

  return [...benchmarkHerbs, ...remaining];
}

export function getSearchSuggestions(query: string, limit = 8) {
  if (!query || query.length < 2) return [];
  const q = query.toLowerCase().trim();
  const all = getAllDravyas();

  const results: Array<{
    title: string;
    botanical: string;
    slug: string;
    family?: string;
    virya?: string | null;
  }> = [];

  for (const d of all) {
    if (
      d.canonical_name.toLowerCase().includes(q) ||
      d.botanical_name.toLowerCase().includes(q) ||
      d.sanskrit_name?.toLowerCase().includes(q) ||
      d.english_name?.toLowerCase().includes(q) ||
      d.names?.some(n => n.name.toLowerCase().includes(q))
    ) {
      results.push({
        title: d.canonical_name,
        botanical: d.botanical_name,
        slug: d.slug,
        family: d.family,
        virya: d.properties?.virya,
      });
      if (results.length >= limit) break;
    }
  }

  return results;
}

export function getDynamicFilterOptions() {
  const all = getAllDravyas();
  const rasas = new Set<string>();
  const gunas = new Set<string>();
  const viryas = new Set<string>();
  const vipakas = new Set<string>();
  const doshas = new Set<string>();
  const families = new Set<string>();
  const parts = new Set<string>();

  for (const d of all) {
    if (d.properties?.rasa) d.properties.rasa.forEach(r => rasas.add(r));
    if (d.properties?.guna) d.properties.guna.forEach(g => gunas.add(g));
    if (d.properties?.virya) viryas.add(d.properties.virya);
    if (d.properties?.vipaka) vipakas.add(d.properties.vipaka);
    if (d.family && d.family !== 'Unspecified') families.add(d.family);
    if (d.parts_used) d.parts_used.forEach(p => parts.add(p.trim()));
  }

  return {
    rasas: Array.from(rasas).sort(),
    gunas: Array.from(gunas).sort(),
    viryas: Array.from(viryas).sort(),
    vipakas: Array.from(vipakas).sort(),
    families: Array.from(families).sort(),
    parts: Array.from(parts).slice(0, 30).sort(),
    doshaActions: [
      'Vata Shamana',
      'Pitta Shamana',
      'Kapha Shamana',
      'Vata Vriddhi',
      'Pitta Vriddhi',
      'Kapha Vriddhi',
      'Tridosha',
    ],
  };
}
