const fs = require('fs');

const dg = JSON.parse(fs.readFileSync('d:/data/raw/source_c/dravyaguna.json', 'utf8'));
console.log('--- Source C dravyaguna entries ---');
console.log('Count:', dg.entries ? dg.entries.length : 'none');
if (dg.entries && dg.entries.length > 0) {
  console.log('Sample entry keys:', Object.keys(dg.entries[0]));
  console.log('Sample entry 0:', JSON.stringify(dg.entries[0], null, 2).slice(0, 500));
}

const tax = JSON.parse(fs.readFileSync('d:/data/raw/source_c/taxonomy.json', 'utf8'));
console.log('\n--- Source C taxonomy taxa ---');
console.log('Count:', tax.taxa ? tax.taxa.length : 'none');
if (tax.taxa && tax.taxa.length > 0) {
  console.log('Sample taxon 0:', JSON.stringify(tax.taxa[0], null, 2).slice(0, 400));
}

const afi = JSON.parse(fs.readFileSync('d:/data/raw/source_c/afi-crosswalk.json', 'utf8'));
console.log('\n--- Source C afi-crosswalk rows ---');
console.log('Count:', afi.rows ? afi.rows.length : 'none');
if (afi.rows && afi.rows.length > 0) {
  console.log('Sample row 0:', JSON.stringify(afi.rows[0], null, 2).slice(0, 300));
}

const lex = JSON.parse(fs.readFileSync('d:/data/raw/source_c/lexicon.json', 'utf8'));
console.log('\n--- Source C lexicon entries ---');
console.log('Lexicon keys:', Object.keys(lex));
const lexEntries = lex.terms || lex.entries || lex.lexicon || (Array.isArray(lex) ? lex : null);
console.log('Lexicon count:', lexEntries ? lexEntries.length : 'check keys');
if (lexEntries && lexEntries.length > 0) {
  console.log('Sample lexicon 0:', JSON.stringify(lexEntries[0], null, 2).slice(0, 300));
}

const comp = JSON.parse(fs.readFileSync('d:/data/raw/source_c/compounds.json', 'utf8'));
console.log('\n--- Source C compounds ---');
console.log('Compounds keys:', Object.keys(comp));
const compList = comp.compounds || comp.constituents || comp.entries || comp.rows;
console.log('Compounds count:', compList ? compList.length : 'check keys');
if (compList && compList.length > 0) {
  console.log('Sample compound 0:', JSON.stringify(compList[0], null, 2).slice(0, 300));
}

const res = JSON.parse(fs.readFileSync('d:/data/raw/source_c/research.json', 'utf8'));
console.log('\n--- Source C research ---');
console.log('Research keys:', Object.keys(res));
const resList = res.citations || res.articles || res.references || res.entries || res.rows;
console.log('Research count:', resList ? resList.length : 'check keys');
if (resList && resList.length > 0) {
  console.log('Sample research 0:', JSON.stringify(resList[0], null, 2).slice(0, 300));
}
