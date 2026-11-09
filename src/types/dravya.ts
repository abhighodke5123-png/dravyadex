export type RasaType = 'Madhura' | 'Amla' | 'Lavana' | 'Katu' | 'Tikta' | 'Kashaya';

export type GunaType =
  | 'Guru'
  | 'Laghu'
  | 'Snigdha'
  | 'Ruksha'
  | 'Sheeta'
  | 'Ushna'
  | 'Manda'
  | 'Tikshna'
  | 'Sthira'
  | 'Sara'
  | 'Mridu'
  | 'Kathina'
  | 'Vishada'
  | 'Picchila'
  | 'Shlakshna'
  | 'Khara'
  | 'Sukshma'
  | 'Sthula'
  | 'Sandra'
  | 'Drava';

export type ViryaType = 'Ushna' | 'Sheeta';
export type VipakaType = 'Madhura' | 'Amla' | 'Katu';

export interface DoshaKarma {
  pacify?: string[];
  aggravate?: string[];
  tridosha?: string | null;
  notes?: Record<string, string> | null;
}

export interface DravyaName {
  language: 'sanskrit' | 'hindi' | 'marathi' | 'english' | 'botanical' | 'regional';
  script?: 'devanagari' | 'latin' | 'iast';
  name: string;
  is_primary?: boolean;
  is_synonym?: boolean;
}

export interface BotanicalTaxonomy {
  scientific_name: string;
  canonical_name: string;
  genus?: string;
  species?: string;
  family?: string;
  rank?: string;
  taxonomic_status?: string;
  gbif_key?: number | null;
  itis_tsn?: string | null;
  ipni_id?: string | null;
  source_authority?: string | null;
}

export interface DravyaProperties {
  rasa: RasaType[] | string[];
  guna: GunaType[] | string[];
  virya: ViryaType | string | null;
  vipaka: VipakaType | string | null;
  prabhava: string | null;
  dosha_karma: DoshaKarma;
  notes?: string | null;
}

export interface ResearchReference {
  pmid?: string;
  doi?: string;
  title: string;
  authors?: string[];
  journal?: string;
  year?: number;
  tier?: string;
  url?: string | null;
  abstract?: string | null;
}

export interface PhytochemicalCompound {
  name: string;
  key?: string;
  slug?: string;
  chemical_class?: string;
  pubchem_cid?: string;
}

export interface Dravya {
  id: string;
  slug: string;
  canonical_name: string;
  sanskrit_name?: string;
  sanskrit_devanagari?: string;
  sanskrit_iast?: string;
  english_name?: string;
  botanical_name: string;
  family?: string;
  summary?: string;
  image_url?: string | null;
  image_attribution?: string;
  external_link?: string | null;
  verified: boolean;
  completeness_score: number;
  names: DravyaName[];
  taxonomy: BotanicalTaxonomy;
  properties: DravyaProperties;
  parts_used: string[];
  indications: string[];
  compounds?: PhytochemicalCompound[];
  research?: ResearchReference[];
  formulations?: string[];
  provenance?: {
    source_a_record_id?: string;
    source_c_monograph?: string | null;
    dataset_code: string;
  };
}

export interface ClassicalFormulation {
  slug: string;
  name?: string;
  page?: string;
  afiPart?: string;
  entryNumber?: string;
  entryHeading?: string;
  classicalSource?: string;
  dose?: string;
  anupana?: string | null;
  ingredientCount?: number;
  ingredients?: Array<{
    n: number;
    name: string;
    gloss?: string;
    part?: string;
  }>;
}

export interface TerminologyItem {
  slug: string;
  page?: string;
  iast?: string;
  devanagari?: string;
  alternates?: string[];
  category?: string;
  family?: string;
  renderings?: Array<{
    english: string;
    definition?: string;
  }>;
}

export interface DataConflict {
  dravyaSlug: string;
  botanicalName: string;
  fieldName: string;
  sourceA: any;
  sourceC: any;
  conflictType: string;
  resolution: string;
}

export interface FilterState {
  query: string;
  rasa: RasaType[];
  guna: GunaType[];
  virya: ViryaType[];
  vipaka: VipakaType[];
  dosha: string[];
  parts: string[];
  family: string[];
  verifiedOnly: boolean;
  hasResearch: boolean;
  hasCompounds: boolean;
  sortBy: 'relevance' | 'name-asc' | 'name-desc' | 'completeness';
}
