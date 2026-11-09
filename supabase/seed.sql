-- DRAVYADEX 1.0 Production Seed File
-- Generated on: 2026-11-09T09:31:28.431Z

INSERT INTO source_datasets (code, name, version, license, url, concept_doi, sha256_hash, record_count) VALUES
('source_a_amidha', 'Amidha Ayurveda Open Herb Database', '2.0.0', 'CC BY 4.0', 'https://github.com/sciencewithsaucee-sudo/herb-database', NULL, '93a7dd1f244b931e5dcf82a9fe37112d549370c05b6c0eefb2b1cd81ae8a4140', 360),
('source_b_explorer', 'Ayurvedic Herb Explorer', '1.0.0', 'MIT / CC BY 4.0', 'https://github.com/sciencewithsaucee-sudo/ayurvedic-herb-explorer', '10.5281/zenodo.1085515020', NULL, 360),
('source_c_nighantu', 'Age Ayurveda Nighantu Datasets', '1.0.0', 'CC BY 4.0', 'https://nighantu.ageayurveda.com/datasets/', '10.5281/zenodo.22805684', NULL, 246)
ON CONFLICT (code) DO UPDATE SET record_count = EXCLUDED.record_count, sha256_hash = EXCLUDED.sha256_hash;

-- Core Canonical Dravyas Insertions
INSERT INTO dravyas (id, slug, canonical_name, sanskrit_name, english_name, botanical_name, family, summary, image_url, verified, completeness_score) VALUES
('e4d61271-d892-4e4a-b2f6-d8b7b97bc5e2', 'tulsi', 'Tulsi', 'Tulsi', 'Tulsi', 'Ocimum sanctum', 'Lamiaceae', 'Tulsi (Ocimum sanctum) is known as the ''Queen of Herbs'' in Ayurveda. It boosts immunity, combats respiratory disorders, and has adaptogenic properties.', NULL, true, 0.95)
ON CONFLICT (slug) DO UPDATE SET completeness_score = EXCLUDED.completeness_score;

INSERT INTO dravyas (id, slug, canonical_name, sanskrit_name, english_name, botanical_name, family, summary, image_url, verified, completeness_score) VALUES
('9814b208-5161-4a8c-a131-05ec8e7da2b1', 'amla', 'Amla', 'Amla', 'Amla', 'Emblica officinalis', 'Euphorbiaceae', 'Amla (Emblica officinalis) is a potent source of Vitamin C. It rejuvenates tissues, improves digestion, eyesight, and balances all three doshas.', NULL, true, 0.95)
ON CONFLICT (slug) DO UPDATE SET completeness_score = EXCLUDED.completeness_score;

INSERT INTO dravyas (id, slug, canonical_name, sanskrit_name, english_name, botanical_name, family, summary, image_url, verified, completeness_score) VALUES
('d66d6476-f7e3-4f14-9e7d-70700a606b61', 'ashwagandha', 'Ashwagandha', 'Ashwagandha', 'Ashwagandha', 'Withania somnifera', 'Solanaceae', 'Ashwagandha (Withania somnifera) is a powerful adaptogen. It reduces stress, increases strength, and supports reproductive and nervous systems.', NULL, true, 1)
ON CONFLICT (slug) DO UPDATE SET completeness_score = EXCLUDED.completeness_score;

INSERT INTO dravyas (id, slug, canonical_name, sanskrit_name, english_name, botanical_name, family, summary, image_url, verified, completeness_score) VALUES
('c9ab274d-c273-4709-a334-a7b034b15e55', 'giloy', 'Giloy', 'Giloy', 'Giloy', 'Tinospora cordifolia', 'Menispermaceae', 'Giloy (Tinospora cordifolia) is a powerful immunity booster. It acts as an antipyretic, detoxifier, and rejuvenator with anti-inflammatory effects.', NULL, true, 1)
ON CONFLICT (slug) DO UPDATE SET completeness_score = EXCLUDED.completeness_score;

INSERT INTO dravyas (id, slug, canonical_name, sanskrit_name, english_name, botanical_name, family, summary, image_url, verified, completeness_score) VALUES
('0bc6e08e-ebe7-4c42-880b-3af1551b13b2', 'shatavari', 'Shatavari', 'Shatavari', 'Shatavari', 'Asparagus racemosus', 'Asparagaceae', 'Shatavari (Asparagus racemosus) supports female reproductive health, boosts vitality, and is a top Ayurvedic rejuvenator for Pitta and Vata.', NULL, true, 1)
ON CONFLICT (slug) DO UPDATE SET completeness_score = EXCLUDED.completeness_score;

INSERT INTO dravyas (id, slug, canonical_name, sanskrit_name, english_name, botanical_name, family, summary, image_url, verified, completeness_score) VALUES
('76d39a7d-8e56-4ecf-9864-e1ed108175b9', 'nagarmotha', 'Nagarmotha', 'Nagarmotha', 'Nagarmotha', 'Cyperus rotundus', 'Cyperaceae', 'Used to treat indigestion, fever, and obesity through its deepana and pachana actions.', NULL, true, 0.95)
ON CONFLICT (slug) DO UPDATE SET completeness_score = EXCLUDED.completeness_score;

INSERT INTO dravyas (id, slug, canonical_name, sanskrit_name, english_name, botanical_name, family, summary, image_url, verified, completeness_score) VALUES
('ffcfde58-86a0-447b-b524-9c308ff85535', 'agnimantha', 'Agnimantha', 'Agnimantha', 'Agnimantha', 'Premna integrifolia', 'Verbenaceae', 'Part of Dashamoola, used in vata disorders and for promoting digestion.', NULL, true, 0.95)
ON CONFLICT (slug) DO UPDATE SET completeness_score = EXCLUDED.completeness_score;

INSERT INTO dravyas (id, slug, canonical_name, sanskrit_name, english_name, botanical_name, family, summary, image_url, verified, completeness_score) VALUES
('f95c817f-7563-4ebb-8546-2e8dda96e58b', 'rohitaka', 'Rohitaka', 'Rohitaka', 'Rohitaka', 'Tecomella undulata', 'Bignoniaceae', 'Used for treating liver disorders, ascites, and splenomegaly.', NULL, true, 0.95)
ON CONFLICT (slug) DO UPDATE SET completeness_score = EXCLUDED.completeness_score;

INSERT INTO dravyas (id, slug, canonical_name, sanskrit_name, english_name, botanical_name, family, summary, image_url, verified, completeness_score) VALUES
('6b2ac17a-fefb-4477-8154-7559a3fa3cd2', 'chopchini', 'Chopchini', 'Chopchini', 'Chopchini', 'Smilax china', 'Smilacaceae', 'Used in treating joint disorders and skin diseases, known for its anti-inflammatory action.', NULL, true, 0.95)
ON CONFLICT (slug) DO UPDATE SET completeness_score = EXCLUDED.completeness_score;

INSERT INTO dravyas (id, slug, canonical_name, sanskrit_name, english_name, botanical_name, family, summary, image_url, verified, completeness_score) VALUES
('e454ca4f-f68c-468c-861d-f37dae8ad6c4', 'bhringraj', 'Bhringraj', 'Bhringraj', 'Bhringraj', 'Eclipta alba', 'Asteraceae', 'Promotes hair growth, supports liver function, and has rejuvenating qualities.', NULL, false, 0.85)
ON CONFLICT (slug) DO UPDATE SET completeness_score = EXCLUDED.completeness_score;

INSERT INTO dravyas (id, slug, canonical_name, sanskrit_name, english_name, botanical_name, family, summary, image_url, verified, completeness_score) VALUES
('87839689-fc33-43a4-93c9-23fcd78de828', 'jatamansi', 'Jatamansi', 'Jatamansi', 'Jatamansi', 'Nardostachys jatamansi', 'Valerianaceae', 'Calms the mind, supports mental clarity, and acts as a nervine tonic.', NULL, true, 0.95)
ON CONFLICT (slug) DO UPDATE SET completeness_score = EXCLUDED.completeness_score;

INSERT INTO dravyas (id, slug, canonical_name, sanskrit_name, english_name, botanical_name, family, summary, image_url, verified, completeness_score) VALUES
('ff251af6-3b0c-423e-845d-eaf3c8a2bc34', 'chandana', 'Chandana', 'Chandana', 'Chandana', 'Santalum album', 'Santalaceae', 'Cooling herb used in Pitta disorders, urinary tract infections, and skin diseases.', NULL, true, 0.95)
ON CONFLICT (slug) DO UPDATE SET completeness_score = EXCLUDED.completeness_score;

INSERT INTO dravyas (id, slug, canonical_name, sanskrit_name, english_name, botanical_name, family, summary, image_url, verified, completeness_score) VALUES
('e175bf2e-acf6-4e4a-abc3-43bc95a5bc1b', 'kutaj', 'Kutaj', 'Kutaj', 'Kutaj', 'Holarrhena antidysenterica', 'Apocynaceae', 'Treats diarrhea, dysentery and balances kapha and pitta dosha.', NULL, true, 0.9)
ON CONFLICT (slug) DO UPDATE SET completeness_score = EXCLUDED.completeness_score;

INSERT INTO dravyas (id, slug, canonical_name, sanskrit_name, english_name, botanical_name, family, summary, image_url, verified, completeness_score) VALUES
('67ed9e41-c7d9-49b1-b4c0-2dc9c4beed2a', 'rasona-garlic', 'Rasona (Garlic)', 'Rasona (Garlic)', 'Rasona (Garlic)', 'Allium sativum', 'Amaryllidaceae', 'Used for respiratory, digestive, and circulatory disorders. Known for lekhana and deepana properties.', NULL, true, 0.95)
ON CONFLICT (slug) DO UPDATE SET completeness_score = EXCLUDED.completeness_score;

INSERT INTO dravyas (id, slug, canonical_name, sanskrit_name, english_name, botanical_name, family, summary, image_url, verified, completeness_score) VALUES
('7c92e9df-733e-457a-88fa-fc00cd8865e9', 'kanchanar', 'Kanchanar', 'Kanchanar', 'Kanchanar', 'Bauhinia variegata', 'Fabaceae', 'Kanchanar is used to reduce glandular swellings, support thyroid, and treat goiter.', NULL, true, 0.95)
ON CONFLICT (slug) DO UPDATE SET completeness_score = EXCLUDED.completeness_score;

INSERT INTO dravyas (id, slug, canonical_name, sanskrit_name, english_name, botanical_name, family, summary, image_url, verified, completeness_score) VALUES
('57971560-a361-494d-8d6a-ea3c49fbe61a', 'karpura-camphor', 'Karpura (Camphor)', 'Karpura (Camphor)', 'Karpura (Camphor)', 'Cinnamomum camphora', 'Lauraceae', 'Camphor has stimulant, antispasmodic, and antiseptic actions, used in respiratory and skin conditions.', NULL, true, 0.9)
ON CONFLICT (slug) DO UPDATE SET completeness_score = EXCLUDED.completeness_score;

INSERT INTO dravyas (id, slug, canonical_name, sanskrit_name, english_name, botanical_name, family, summary, image_url, verified, completeness_score) VALUES
('9a77e998-36b2-46ff-be1a-c1da24896e08', 'pushkarmool', 'Pushkarmool', 'Pushkarmool', 'Pushkarmool', 'Inula racemosa', 'Asteraceae', 'Effective for asthma, cough, and dyspnea. Acts as a bronchodilator and expectorant.', NULL, true, 0.95)
ON CONFLICT (slug) DO UPDATE SET completeness_score = EXCLUDED.completeness_score;

INSERT INTO dravyas (id, slug, canonical_name, sanskrit_name, english_name, botanical_name, family, summary, image_url, verified, completeness_score) VALUES
('8875d048-87c4-4230-984d-e3a188b14d45', 'bakuchi', 'Bakuchi', 'Bakuchi', 'Bakuchi', 'Psoralea corylifolia', 'Fabaceae', 'Widely used in leucoderma, vitiligo, and other skin disorders. Supports melanin production.', NULL, true, 0.95)
ON CONFLICT (slug) DO UPDATE SET completeness_score = EXCLUDED.completeness_score;

INSERT INTO dravyas (id, slug, canonical_name, sanskrit_name, english_name, botanical_name, family, summary, image_url, verified, completeness_score) VALUES
('2f53e3cb-4e55-42cb-9754-c86bceaa15b6', 'vidarikand', 'Vidarikand', 'Vidarikand', 'Vidarikand', 'Pueraria tuberosa', 'Fabaceae', 'Acts as a nutritive tonic, improves fertility, and strengthens the body.', NULL, true, 0.95)
ON CONFLICT (slug) DO UPDATE SET completeness_score = EXCLUDED.completeness_score;

INSERT INTO dravyas (id, slug, canonical_name, sanskrit_name, english_name, botanical_name, family, summary, image_url, verified, completeness_score) VALUES
('c80bbde8-466d-46ff-9270-ef7b54359555', 'ajmoda', 'Ajmoda', 'Ajmoda', 'Ajmoda', 'Apium graveolens', 'Apiaceae', 'Improves digestion, relieves bloating and abdominal discomfort, and acts as carminative.', NULL, true, 0.9)
ON CONFLICT (slug) DO UPDATE SET completeness_score = EXCLUDED.completeness_score;

INSERT INTO dravyas (id, slug, canonical_name, sanskrit_name, english_name, botanical_name, family, summary, image_url, verified, completeness_score) VALUES
('27a5881e-b49e-464a-9eaa-d73c2a0e92ec', 'patola', 'Patola', 'Patola', 'Patola', 'Trichosanthes dioica', 'Cucurbitaceae', 'Used in fever, liver disorders, and skin diseases. Strong pitta pacifier.', NULL, true, 0.9)
ON CONFLICT (slug) DO UPDATE SET completeness_score = EXCLUDED.completeness_score;

INSERT INTO dravyas (id, slug, canonical_name, sanskrit_name, english_name, botanical_name, family, summary, image_url, verified, completeness_score) VALUES
('c5f0a852-ea9b-42fc-94d6-e12d3fcd1611', 'vrikshamla', 'Vrikshamla', 'Vrikshamla', 'Vrikshamla', 'Garcinia indica', 'Clusiaceae', 'Helps in weight management and digestion. Rich in hydroxycitric acid.', NULL, true, 0.95)
ON CONFLICT (slug) DO UPDATE SET completeness_score = EXCLUDED.completeness_score;

INSERT INTO dravyas (id, slug, canonical_name, sanskrit_name, english_name, botanical_name, family, summary, image_url, verified, completeness_score) VALUES
('a80b1017-aa59-4e78-8675-de156a2087e8', 'kumuda', 'Kumuda', 'Kumuda', 'Kumuda', 'Nymphaea alba', 'Nymphaeaceae', 'Useful in burning sensation, pitta disorders and fever.', NULL, true, 0.95)
ON CONFLICT (slug) DO UPDATE SET completeness_score = EXCLUDED.completeness_score;

INSERT INTO dravyas (id, slug, canonical_name, sanskrit_name, english_name, botanical_name, family, summary, image_url, verified, completeness_score) VALUES
('a2bed483-cdc7-49f4-a0bb-4ee8d1f3724a', 'shigru', 'Shigru', 'Shigru', 'Shigru', 'Moringa oleifera', 'Moringaceae', 'Moringa is rich in nutrients, detoxifies blood, and improves digestion.', NULL, true, 0.95)
ON CONFLICT (slug) DO UPDATE SET completeness_score = EXCLUDED.completeness_score;

INSERT INTO dravyas (id, slug, canonical_name, sanskrit_name, english_name, botanical_name, family, summary, image_url, verified, completeness_score) VALUES
('ac352fb7-9c60-4510-bf1e-a1d133936198', 'parpataka', 'Parpataka', 'Parpataka', 'Parpataka', 'Fumaria indica', 'Papaveraceae', 'Reduces burning sensation, used in fever, acidity and liver ailments.', NULL, true, 0.85)
ON CONFLICT (slug) DO UPDATE SET completeness_score = EXCLUDED.completeness_score;

INSERT INTO dravyas (id, slug, canonical_name, sanskrit_name, english_name, botanical_name, family, summary, image_url, verified, completeness_score) VALUES
('aa9657e9-ed22-4b5f-834e-40eefcc09cca', 'indrayava', 'Indrayava', 'Indrayava', 'Indrayava', 'Holarrhena antidysenterica', 'Apocynaceae', 'Treats diarrhea, dysentery and helps regulate bowel movements.', NULL, true, 0.85)
ON CONFLICT (slug) DO UPDATE SET completeness_score = EXCLUDED.completeness_score;

INSERT INTO dravyas (id, slug, canonical_name, sanskrit_name, english_name, botanical_name, family, summary, image_url, verified, completeness_score) VALUES
('fa56a3f0-e085-4017-9ceb-afe717446dbf', 'kapikachhu', 'Kapikachhu', 'Kapikachhu', 'Kapikachhu', 'Mucuna pruriens', 'Fabaceae', 'Improves fertility, nervous strength and acts as aphrodisiac.', NULL, true, 0.95)
ON CONFLICT (slug) DO UPDATE SET completeness_score = EXCLUDED.completeness_score;

INSERT INTO dravyas (id, slug, canonical_name, sanskrit_name, english_name, botanical_name, family, summary, image_url, verified, completeness_score) VALUES
('6ba627cf-6441-428d-87ae-3fc35e1de459', 'bala', 'Bala', 'Bala', 'Bala', 'Sida cordifolia', 'Malvaceae', 'Improves strength and stamina, useful in vata disorders and nervous weakness.', NULL, true, 0.95)
ON CONFLICT (slug) DO UPDATE SET completeness_score = EXCLUDED.completeness_score;

INSERT INTO dravyas (id, slug, canonical_name, sanskrit_name, english_name, botanical_name, family, summary, image_url, verified, completeness_score) VALUES
('e51b7f32-dec5-406a-8c8d-82d1e70bb59f', 'tamalpatra', 'Tamalpatra', 'Tamalpatra', 'Tamalpatra', 'Cinnamomum tamala', 'Lauraceae', 'Bay leaf improves appetite, respiration and balances kapha dosha.', NULL, true, 0.95)
ON CONFLICT (slug) DO UPDATE SET completeness_score = EXCLUDED.completeness_score;

INSERT INTO dravyas (id, slug, canonical_name, sanskrit_name, english_name, botanical_name, family, summary, image_url, verified, completeness_score) VALUES
('44d54cfc-839a-426c-a7c5-1ff4554621e7', 'chitrak', 'Chitrak', 'Chitrak', 'Chitrak', 'Plumbago zeylanica', 'Plumbaginaceae', 'Ignites digestive fire, used in weight loss and ama digestion.', NULL, true, 0.95)
ON CONFLICT (slug) DO UPDATE SET completeness_score = EXCLUDED.completeness_score;

