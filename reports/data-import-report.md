# DRAVYADEX 1.0 — Data Ingestion & Quality Audit Report

**Execution Mode:** LIVE SEED GENERATION  
**Execution Timestamp:** 2026-11-09T09:31:28.432Z  
**Elapsed Time:** 1.19s  

---

## 1. Executive Summary

The DravyaDex Data Harmonization Pipeline systematically ingested, validated, and normalized 3 distinct open-source Ayurvedic datasets into a high-integrity, evidence-backed relational schema.

| Metric | Measured Value | Standard / Target | Status |
| :--- | :--- | :--- | :--- |
| **Source A Canonical Herbs** | 360 | 360 | PASS |
| **Source B Relationship** | Consumer of Source A (v2.0) | Zero duplicate ingestion | PASS |
| **Source C Monograph Records** | 246 | 246 | PASS |
| **Source C Botanical Taxa** | 284 | 284 | PASS |
| **Total Consolidated Dravyas** | **483** | > 400 | PASS |
| **Biomedical Research Papers** | 3593 | > 3,000 | PASS |
| **Phytochemical Compounds** | 816 | > 800 | PASS |
| **Classical Formulations (AFI)** | 106 | > 100 | PASS |
| **Terminology Lexicon Terms** | 277 | > 250 | PASS |
| **Property Conflicts Flagged** | **15** | Divergences preserved | PASS |

---

## 2. Dataset Attribution & Integrity Ledger

### Source A: Amidha Ayurveda Open Herb Database
- **Repository:** `https://github.com/sciencewithsaucee-sudo/herb-database`
- **Dataset File:** `herb.json` (Version 2.0.0)
- **SHA-256 Checksum:** `93a7dd1f244b931e5dcf82a9fe37112d549370c05b6c0eefb2b1cd81ae8a4140`
- **License:** Creative Commons Attribution 4.0 International (CC BY 4.0)
- **Canonical Count:** 360 records
- **Data Completeness:** 100% indications coverage, full Rasa Panchaka and Dosha Karma attributes.

### Source B: Ayurvedic Herb Explorer
- **Repository:** `https://github.com/sciencewithsaucee-sudo/ayurvedic-herb-explorer`
- **DOI:** `10.5281/zenodo.1085515020`
- **License:** MIT (Application Code) / CC BY 4.0 (Data)
- **Architectural Finding:** Detailed code analysis of `assets/js/app.js` reveals that Source B dynamically fetches the identical `herb.json` from Source A (`sciencewithsaucee-sudo/herb-database/refs/heads/main/herb.json`). The README notation of "700+ herbs" describes an overarching taxonomy target; the real data payload contains the 360 canonical records. De-duplication safeguards ensured no duplicate records were ingested.

### Source C: Age Ayurveda Nighantu Open Datasets
- **Catalog:** `https://nighantu.ageayurveda.com/datasets/`
- **Concept DOI:** `10.5281/zenodo.22805684`
- **License:** Creative Commons Attribution 4.0 International (CC BY 4.0)
- **Monographs:** 246 in-depth pharmacological monographs (`dravyaguna.json`)
- **Taxonomy Crosswalk:** 284 botanical taxa with GBIF keys (`taxonomy.json`)
- **Phytochemical Network:** 816 isolated chemical compounds with plant links (`compounds.json`)
- **Research Index:** 3,593 indexed biomedical publications with PMIDs & DOIs (`research.json`)
- **Formulation Compositions:** 106 classical preparations with Ayurvedic Formulary of India (AFI) parts and classical verses (`composition.json`)
- **Lexicon:** 277 classical Sanskrit and Ayurvedic terms (`lexicon.json`)

---

## 3. Classical Conflict & Divergence Taxonomy

In classical Dravyaguna Vigyana, property assertions frequently vary across classical traditions (e.g. *Bhavaprakasha Nighantu* vs. *Dhanvantari Nighantu* vs. *Charaka Samhita*). Rather than performing destructive or arbitrary overrides, DravyaDex preserves both assertions in `source_assertions` and flags the divergence in `data_conflicts`.

### Summary of Detected Divergences:
- **Total Flagged Property Divergences:** 15
- **Rasa Discrepancies:** 7 instances (e.g. secondary Rasas recorded in Nighantu tradition).
- **Virya Discrepancies:** 6 instances.
- **Vipaka Discrepancies:** 2 instances.

All divergences are formally catalogued in `reports/data-conflicts.json`.

---

## 4. Verification Checksum Manifest

| File | SHA-256 Digest |
| :--- | :--- |
| `source_a/herb.json` | `93a7dd1f244b931e5dcf82a9fe37112d549370c05b6c0eefb2b1cd81ae8a4140` |
| `source_c/dravyaguna.json` | `eddb157733eb369bea70a7c7faee2e817b4d0451daa2f1f0c7e961274e944796` |
| `source_c/taxonomy.json` | `a48ec2864bf851efd10bd18feadd77c8c9d74e12877f1392091d9dd6c5822635` |
| `source_c/compounds.json` | `98e2c14fec719b9d50d0872f3e2b72af978a3c4eea679a4fc36f63161d6c6e06` |
| `source_c/research.json` | `6f3332f8bc22f772bc1491cfd3a85a9e80636e678b0bbdda2f2ce65cbb83404e` |
| `source_c/composition.json` | `0fb052046210208219c834d0e1432f5487d92c76da166b28f64827d3576166c2` |
| `source_c/lexicon.json` | `186e8c50f0e7b2407c1887859abf1ea76ba44c93e62b98676a316836f42c84a0` |

*Report generated automatically by the DravyaDex Data Pipeline.*
