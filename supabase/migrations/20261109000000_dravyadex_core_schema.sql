-- DRAVYADEX 1.0: Core Relational Schema
-- PostgreSQL Schema with pg_trgm, Full-Text Search, JSONB immutable source store, and RLS

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- 1. Source Datasets Catalog
CREATE TABLE IF NOT EXISTS source_datasets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    version TEXT NOT NULL,
    license TEXT NOT NULL,
    url TEXT,
    concept_doi TEXT,
    attribution TEXT,
    sha256_hash TEXT,
    record_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Primary Dravyas Table
CREATE TABLE IF NOT EXISTS dravyas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    canonical_name TEXT NOT NULL,
    sanskrit_name TEXT,
    sanskrit_devanagari TEXT,
    sanskrit_iast TEXT,
    english_name TEXT,
    botanical_name TEXT NOT NULL,
    family TEXT,
    summary TEXT,
    image_url TEXT,
    image_attribution TEXT,
    external_link TEXT,
    verified BOOLEAN DEFAULT false,
    completeness_score NUMERIC(3,2) DEFAULT 0.0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Multilingual Names & Synonyms
CREATE TABLE IF NOT EXISTS dravya_names (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dravya_id UUID REFERENCES dravyas(id) ON DELETE CASCADE,
    language TEXT NOT NULL, -- 'sanskrit', 'hindi', 'marathi', 'english', 'regional'
    script TEXT,            -- 'devanagari', 'latin', 'iast'
    name TEXT NOT NULL,
    is_primary BOOLEAN DEFAULT false,
    is_synonym BOOLEAN DEFAULT true,
    source_dataset_id UUID REFERENCES source_datasets(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Botanical Taxonomy & Authorities
CREATE TABLE IF NOT EXISTS botanical_taxonomy (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dravya_id UUID REFERENCES dravyas(id) ON DELETE CASCADE,
    scientific_name TEXT NOT NULL,
    canonical_name TEXT,
    genus TEXT,
    species TEXT,
    family TEXT,
    rank TEXT DEFAULT 'SPECIES',
    taxonomic_status TEXT DEFAULT 'ACCEPTED',
    gbif_key BIGINT,
    itis_tsn TEXT,
    ipni_id TEXT,
    source_authority TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Classical Dravyaguna Properties (Rasa Panchaka & Dosha Karma)
CREATE TABLE IF NOT EXISTS dravya_properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dravya_id UUID REFERENCES dravyas(id) ON DELETE CASCADE,
    rasa TEXT[] DEFAULT '{}',
    guna TEXT[] DEFAULT '{}',
    virya TEXT,
    vipaka TEXT,
    prabhava TEXT,
    dosha_karma JSONB DEFAULT '{}',
    notes TEXT,
    source_dataset_id UUID REFERENCES source_datasets(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Parts Used (Prayojyanga)
CREATE TABLE IF NOT EXISTS dravya_parts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dravya_id UUID REFERENCES dravyas(id) ON DELETE CASCADE,
    part_name TEXT NOT NULL,
    part_description TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. Indications (Rogaghnata / Amayika Prayoga)
CREATE TABLE IF NOT EXISTS dravya_indications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dravya_id UUID REFERENCES dravyas(id) ON DELETE CASCADE,
    indication TEXT NOT NULL,
    classical_term TEXT,
    modern_category TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 8. Immutable Source Records
CREATE TABLE IF NOT EXISTS source_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dataset_id UUID REFERENCES source_datasets(id) ON DELETE CASCADE,
    source_record_key TEXT NOT NULL,
    raw_json JSONB NOT NULL,
    ingested_at TIMESTAMPTZ DEFAULT now(),
    CONSTRAINT unq_dataset_record UNIQUE (dataset_id, source_record_key)
);

-- 9. Source Assertions (Traceability Engine)
CREATE TABLE IF NOT EXISTS source_assertions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dravya_id UUID REFERENCES dravyas(id) ON DELETE CASCADE,
    source_record_id UUID REFERENCES source_records(id) ON DELETE CASCADE,
    field_name TEXT NOT NULL,
    asserted_value JSONB NOT NULL,
    confidence NUMERIC(3,2) DEFAULT 1.0,
    is_preferred BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 10. Classical References
CREATE TABLE IF NOT EXISTS classical_references (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dravya_id UUID REFERENCES dravyas(id) ON DELETE CASCADE,
    treatise_name TEXT NOT NULL,
    section TEXT,
    chapter TEXT,
    verse TEXT,
    original_sanskrit TEXT,
    commentary TEXT,
    english_translation TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 11. Published Biomedical Research
CREATE TABLE IF NOT EXISTS research_references (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dravya_id UUID REFERENCES dravyas(id) ON DELETE CASCADE,
    pmid TEXT,
    doi TEXT,
    title TEXT NOT NULL,
    authors TEXT[] DEFAULT '{}',
    journal TEXT,
    year INT,
    tier TEXT,
    url TEXT,
    abstract TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 12. Phytochemical Constituents
CREATE TABLE IF NOT EXISTS phytochemical_constituents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dravya_id UUID REFERENCES dravyas(id) ON DELETE CASCADE,
    compound_name TEXT NOT NULL,
    slug TEXT,
    chemical_class TEXT,
    pubchem_cid TEXT,
    bioactivity TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 13. Classical Formulations
CREATE TABLE IF NOT EXISTS formulations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    devanagari TEXT,
    afi_part TEXT,
    entry_number TEXT,
    classical_source TEXT,
    dose TEXT,
    anupana TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 14. Formulation Ingredients Crosswalk
CREATE TABLE IF NOT EXISTS formulation_ingredients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    formulation_id UUID REFERENCES formulations(id) ON DELETE CASCADE,
    dravya_id UUID REFERENCES dravyas(id) ON DELETE SET NULL,
    ingredient_name TEXT NOT NULL,
    part_used TEXT,
    proportion TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 15. Ayurvedic Terminology Lexicon
CREATE TABLE IF NOT EXISTS terminology (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    term TEXT NOT NULL,
    devanagari TEXT,
    iast TEXT,
    category TEXT,
    english_gloss TEXT,
    definition TEXT,
    alternates TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 16. Data Conflicts & Review Ledger
CREATE TABLE IF NOT EXISTS data_conflicts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dravya_id UUID REFERENCES dravyas(id) ON DELETE CASCADE,
    field_name TEXT NOT NULL,
    source_a_value JSONB,
    source_b_value JSONB,
    status TEXT DEFAULT 'flagged', -- 'flagged', 'resolved', 'accepted_divergence'
    resolution_note TEXT,
    resolved_by TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    resolved_at TIMESTAMPTZ
);

-- 17. Import Runs & Audit Logs
CREATE TABLE IF NOT EXISTS import_runs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dataset_code TEXT NOT NULL,
    status TEXT NOT NULL, -- 'running', 'completed', 'failed'
    records_processed INT DEFAULT 0,
    records_created INT DEFAULT 0,
    records_updated INT DEFAULT 0,
    conflicts_found INT DEFAULT 0,
    dry_run BOOLEAN DEFAULT false,
    log_summary TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 18. User Favorites
CREATE TABLE IF NOT EXISTS user_favorites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    dravya_id UUID REFERENCES dravyas(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT now(),
    CONSTRAINT unq_user_favorite UNIQUE (user_id, dravya_id)
);

-- 19. User Collections & Research Notes
CREATE TABLE IF NOT EXISTS user_collections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    is_public BOOLEAN DEFAULT false,
    items JSONB DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- ==========================================
-- INDEXES FOR ULTRA-FAST SEARCH & FILTERING
-- ==========================================

CREATE INDEX IF NOT EXISTS idx_dravyas_slug ON dravyas(slug);
CREATE INDEX IF NOT EXISTS idx_dravyas_botanical ON dravyas(botanical_name);
CREATE INDEX IF NOT EXISTS idx_dravyas_family ON dravyas(family);
CREATE INDEX IF NOT EXISTS idx_dravyas_canonical_trgm ON dravyas USING gin (canonical_name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_dravyas_botanical_trgm ON dravyas USING gin (botanical_name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_dravyas_sanskrit_trgm ON dravyas USING gin (sanskrit_name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_dravya_names_name_trgm ON dravya_names USING gin (name gin_trgm_ops);

-- Full-text search index
CREATE INDEX IF NOT EXISTS idx_dravyas_fts ON dravyas USING gin (
    to_tsvector('english', canonical_name || ' ' || COALESCE(sanskrit_name, '') || ' ' || botanical_name || ' ' || COALESCE(family, ''))
);

CREATE INDEX IF NOT EXISTS idx_dravya_prop_rasa ON dravya_properties USING gin (rasa);
CREATE INDEX IF NOT EXISTS idx_dravya_prop_guna ON dravya_properties USING gin (guna);
CREATE INDEX IF NOT EXISTS idx_dravya_prop_virya ON dravya_properties(virya);
CREATE INDEX IF NOT EXISTS idx_dravya_prop_vipaka ON dravya_properties(vipaka);
CREATE INDEX IF NOT EXISTS idx_dravya_prop_dosha ON dravya_properties USING gin (dosha_karma);

CREATE INDEX IF NOT EXISTS idx_phytochem_dravya ON phytochemical_constituents(dravya_id);
CREATE INDEX IF NOT EXISTS idx_research_dravya ON research_references(dravya_id);
CREATE INDEX IF NOT EXISTS idx_formulations_slug ON formulations(slug);
CREATE INDEX IF NOT EXISTS idx_formulation_ingredients_dravya ON formulation_ingredients(dravya_id);
CREATE INDEX IF NOT EXISTS idx_terminology_slug ON terminology(slug);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

ALTER TABLE source_datasets ENABLE ROW LEVEL SECURITY;
ALTER TABLE dravyas ENABLE ROW LEVEL SECURITY;
ALTER TABLE dravya_names ENABLE ROW LEVEL SECURITY;
ALTER TABLE botanical_taxonomy ENABLE ROW LEVEL SECURITY;
ALTER TABLE dravya_properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE dravya_parts ENABLE ROW LEVEL SECURITY;
ALTER TABLE dravya_indications ENABLE ROW LEVEL SECURITY;
ALTER TABLE source_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE source_assertions ENABLE ROW LEVEL SECURITY;
ALTER TABLE classical_references ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_references ENABLE ROW LEVEL SECURITY;
ALTER TABLE phytochemical_constituents ENABLE ROW LEVEL SECURITY;
ALTER TABLE formulations ENABLE ROW LEVEL SECURITY;
ALTER TABLE formulation_ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE terminology ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_conflicts ENABLE ROW LEVEL SECURITY;
ALTER TABLE import_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_collections ENABLE ROW LEVEL SECURITY;

-- Public read access for knowledge tables
CREATE POLICY "Public read source_datasets" ON source_datasets FOR SELECT USING (true);
CREATE POLICY "Public read dravyas" ON dravyas FOR SELECT USING (true);
CREATE POLICY "Public read dravya_names" ON dravya_names FOR SELECT USING (true);
CREATE POLICY "Public read botanical_taxonomy" ON botanical_taxonomy FOR SELECT USING (true);
CREATE POLICY "Public read dravya_properties" ON dravya_properties FOR SELECT USING (true);
CREATE POLICY "Public read dravya_parts" ON dravya_parts FOR SELECT USING (true);
CREATE POLICY "Public read dravya_indications" ON dravya_indications FOR SELECT USING (true);
CREATE POLICY "Public read classical_references" ON classical_references FOR SELECT USING (true);
CREATE POLICY "Public read research_references" ON research_references FOR SELECT USING (true);
CREATE POLICY "Public read phytochemical_constituents" ON phytochemical_constituents FOR SELECT USING (true);
CREATE POLICY "Public read formulations" ON formulations FOR SELECT USING (true);
CREATE POLICY "Public read formulation_ingredients" ON formulation_ingredients FOR SELECT USING (true);
CREATE POLICY "Public read terminology" ON terminology FOR SELECT USING (true);

-- User favorites: authenticated users can manage their own favorites
CREATE POLICY "Users view own favorites" ON user_favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own favorites" ON user_favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own favorites" ON user_favorites FOR DELETE USING (auth.uid() = user_id);

-- User collections: users manage own collections, public can view public collections
CREATE POLICY "Users view public or own collections" ON user_collections FOR SELECT USING (is_public OR auth.uid() = user_id);
CREATE POLICY "Users create collections" ON user_collections FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own collections" ON user_collections FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users delete own collections" ON user_collections FOR DELETE USING (auth.uid() = user_id);

-- Admin access for data conflicts and import runs
CREATE POLICY "Admin view conflicts" ON data_conflicts FOR SELECT USING (
    (auth.jwt() ->> 'role' = 'admin') OR (auth.jwt() -> 'user_metadata' ->> 'is_admin' = 'true')
);
CREATE POLICY "Admin manage conflicts" ON data_conflicts FOR ALL USING (
    (auth.jwt() ->> 'role' = 'admin') OR (auth.jwt() -> 'user_metadata' ->> 'is_admin' = 'true')
);
CREATE POLICY "Admin view import runs" ON import_runs FOR SELECT USING (
    (auth.jwt() ->> 'role' = 'admin') OR (auth.jwt() -> 'user_metadata' ->> 'is_admin' = 'true')
);
