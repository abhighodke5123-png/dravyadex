# DRAVYADEX 1.0 — Digital Ayurvedic Dravyaguna Knowledge Platform

> **“Explore the Science of Nature.”**

**DRAVYADEX** is an open-source, evidence-driven digital knowledge system that unifies classical Ayurvedic pharmacology (*Dravyaguna Vigyana*), verified botanical taxonomy, pharmacopoeial formulations, and contemporary peer-reviewed biomedical research.

Designed specifically for **BAMS students, Ayurvedic physicians, researchers, ethnobotanists, and pharmacognosists**, DravyaDex bridges centuries of traditional knowledge with modern taxonomic precision and empirical biomedical literature.

---

## 1. Product Architecture & Modules

| Route | Purpose | Key Capabilities |
| :--- | :--- | :--- |
| **`/`** | Cinematic Homepage | 3D interactive botanical leaf & atmospheric particle canvas (Three.js), lexical search discovery, featured benchmarks, Dravyaguna parameter matrix. |
| **`/explore`** | Dravya Explorer | Multi-parameter pharmacological filtering (6 Rasas, 20 Gunas, 2 Viryas, 3 Vipakas, Dosha dynamics, parts used, botanical families). Full-text & fuzzy search across 483 medicinal plant taxa. |
| **`/dravya/[slug]`** | Monograph Details | Comprehensive 13-section botanical monographs: botanical classification, Rasa Panchaka radar matrix, Dosha Shamana/Kopana differentiation, classical indications, AFI formulations, phytochemical constituents, and PubMed biomedical research. |
| **`/compare`** | Tri-Dravya Matrix | Side-by-side comparative analysis of up to 3 medicinal plants simultaneously. Automatic commonality and difference highlighting with shareable persistent URLs. |
| **`/research`** | Research & Corpus | Queryable repository of 3,593 indexed biomedical research papers (PMIDs & DOIs), 106 Ayurvedic Formulary of India (AFI) classical compositions, and 277 classical Sanskrit lexicon definitions. |
| **`/sources`** | Provenance & Ledger | Transparent documentation of all ingested open-source datasets, concept DOIs, Creative Commons Attribution 4.0 licenses, and cryptographic SHA-256 verification hashes. |
| **`/about`** | Epistemology | Foundational methodology of Dravyaguna Vigyana (*Dravya, Guna, Rasa, Virya, Vipaka, Prabhava*), academic guidelines, and non-fabrication guarantees. |
| **`/collections`** | Study Portfolios | Custom study portfolios for grouping herbs into clinical themes with personal notes and one-click Markdown study guide exports. |
| **`/admin`** | Conflict & Quality Console | Real-time monitoring of data import runs, automated attribute completeness audits, and classical conflict resolution ledger. |
| **`/login` & `/signup`** | Scholar Authentication | Supabase Auth integration with role-based profiles (BAMS Student, Clinical Doctor, Researcher, Educator). |

---

## 2. Technology Stack

- **Framework:** Next.js 15 (App Router, Server Components, TypeScript Strict Mode)
- **UI & Styling:** Tailwind CSS, custom design tokens, Lucide icons, responsive drawer modals
- **3D & Creative Motion:** Three.js procedural botanical rendering, ACESFilmic tonemapping, subsurface light transmission, particle physics, mouse-guided parallax, and 2.5D CSS fallback
- **Backend & Database:** Supabase, PostgreSQL 15+, pg_trgm for trigram fuzzy matching, full-text search (tsvector/tsquery), JSONB immutable source records, Row Level Security (RLS)
- **Deployment:** Vercel-ready with zero external dependencies required for local execution

---

## 3. Visual Identity

DravyaDex adopts a **Cinematic Botanical + Apple-Level Minimalism + Premium Scientific Editorial** visual design:

- **Primary Background:** `#07090C` (Atmospheric obsidian black)
- **Midnight Blue:** `#0A1420` (Subtle grounding tone)
- **Elevated Surface:** `#101C2A` (Card & modal background)
- **Botanical Green:** `#6BAA83` (Signature botanical accent)
- **Sage:** `#B5D3BD` (Secondary botanical tint)
- **Sky Blue:** `#83C9F5` (Research & scientific accent)
- **Primary Editorial Text:** `#F4F5F1` (High-contrast ivory white)
- **Secondary Text:** `#929BA7` (Legible muted slate)
- **Typography:** Serif editorial headings (*Playfair Display*), clean UI sans (*Inter*), and native Devanagari script (*Noto Sans Devanagari*).

---

## 4. Open-Source Data Integration & Provenance

DravyaDex ingests and harmonizes three foundational open-source resources under the **Creative Commons Attribution 4.0 International (CC BY 4.0)** license:

### Source A: Amidha Ayurveda Open Herb Database (v2.0.0)
- **Repository:** `https://github.com/sciencewithsaucee-sudo/herb-database`
- **Data File:** `herb.json` (360 canonical records)
- **SHA-256:** `93a7dd1f244b931e5dcf82a9fe37112d549370c05b6c0eefb2b1cd81ae8a4140`
- **Contribution:** Canonical 360 medicinal plants with complete Rasa, Guna, Virya, Vipaka, Prabhava, and Dosha Karma.

### Source B: Ayurvedic Herb Explorer
- **Repository:** `https://github.com/sciencewithsaucee-sudo/ayurvedic-herb-explorer`
- **Zenodo DOI:** `10.5281/zenodo.1085515020`
- **License:** MIT (Application Code) / CC BY 4.0 (Data)
- **Architectural Finding:** Detailed code analysis of `assets/js/app.js` confirmed that Source B dynamically consumes the 360-record `herb.json` from Source A. De-duplication safeguards ensured zero duplicate records were ingested into the unified schema.

### Source C: Age Ayurveda Nighantu Open Datasets
- **Catalog:** `https://nighantu.ageayurveda.com/datasets/`
- **Concept DOI:** `10.5281/zenodo.22805684`
- **License:** CC BY 4.0
- **Contribution:** 246 pharmacological monographs, 284 GBIF botanical taxa, 2,144 AFI ingredient crosswalk rows, 816 phytochemical compounds, 3,593 indexed biomedical research papers, 106 classical formulations, and 277 classical Sanskrit lexicon entries.

---

## 5. PostgreSQL Relational Schema (19 Tables)

The Supabase database architecture is fully normalized and traceable:

1. `source_datasets` — Catalog of data sources with DOIs, licenses, and SHA-256 hashes.
2. `dravyas` — Primary medicinal plant entities with slugs, canonical names, and completeness scores.
3. `dravya_names` — Multilingual synonyms across Sanskrit, Hindi, Marathi, English, and botanical binomials.
4. `botanical_taxonomy` — GBIF keys, IPNI references, families, genera, species, and accepted taxonomic status.
5. `dravya_properties` — Rasa arrays, Guna arrays, Virya, Vipaka, Prabhava, and Dosha Karma JSONB.
6. `dravya_parts` — Classical parts used (*Prayojyanga*).
7. `dravya_indications` — Classical indications (*Rogaghnata*) and modern therapeutic categories.
8. `source_records` — Immutable raw source JSON storage for auditability.
9. `source_assertions` — Field-level assertions linking individual properties to specific source records.
10. `classical_references` — Samhita treatise citations (section, chapter, verse, commentary).
11. `research_references` — Biomedical research literature (PMID, DOI, journal, year, authors, abstract).
12. `phytochemical_constituents` — Isolated chemical compounds and bioactivities.
13. `formulations` — Classical compound formulations from the Ayurvedic Formulary of India (AFI).
14. `formulation_ingredients` — Formulation composition crosswalk linking to dravya records.
15. `terminology` — Classical Ayurvedic terminology lexicon with IAST and Devanagari.
16. `data_conflicts` — Divergent classical assertions flagged and catalogued for editorial review.
17. `import_runs` — Audit logs of data ingestion runs.
18. `user_favorites` — User bookmarked herb records with RLS protection.
19. `user_collections` — Custom research collections with RLS protection.

Full migration file: `supabase/migrations/20261109000000_dravyadex_core_schema.sql`

---

## 6. Data Ingestion & Validation Pipeline

The platform includes dedicated commands for data validation, dry-run testing, and production harmonization:

```bash
# 1. Validate raw datasets, file formats, and SHA-256 checksums
npm run data:validate

# 2. Run ingestion pipeline in dry-run mode (generates reports without database writes)
npm run data:import -- --dry-run

# 3. Execute live data ingestion and seed generation
npm run data:import
```

Generated reports:
- `reports/data-import-report.md` — Complete audit trail, entity counts, and verification checksums.
- `reports/data-conflicts.json` — Catalogue of 15 detected classical property divergences preserved in parallel.
- `reports/data-quality.json` — Machine-readable completeness metrics and attribute audit counts.

---

## 7. Quick Start & Local Development

### Prerequisites
- Node.js 18+ (tested on Node v20 / v22 / v26)
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit `http://localhost:3000` in your browser.

---

## 8. Academic Citation

If you utilize DravyaDex in academic research, clinical studies, or educational curricula, please cite:

```bibtex
@software{dravyadex2026,
  title = {DRAVYADEX: Digital Ayurvedic Dravyaguna Knowledge Platform},
  author = {DravyaDex Research Consortium},
  year = {2026},
  url = {https://dravyadex.org},
  note = {Built on datasets from Amidha Ayurveda (CC BY 4.0) and Age Ayurveda Nighantu (Zenodo: 10.5281/zenodo.22805684)}
}
```

---

## 9. License

- **Software Code:** MIT License
- **Ayurvedic & Botanical Content:** Creative Commons Attribution 4.0 International (CC BY 4.0)
