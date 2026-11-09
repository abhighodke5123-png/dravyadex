const fs = require('fs');

console.log('=== ANALYZING SOURCE B ===');
const appJs = fs.readFileSync('d:/data/raw/source_b/app.js', 'utf8');
const fetchMatches = appJs.match(/fetch\([^)]+\)/g);
console.log('Fetches in app.js:', fetchMatches);
const urlMatches = appJs.match(/https?:\/\/[^\s"'`]+/g);
console.log('URLs in app.js:', [...new Set(urlMatches)]);

const readmeB = fs.readFileSync('d:/data/raw/source_b/README.md', 'utf8');
console.log('README B mentions of records/herbs:');
const linesB = readmeB.split('\n').filter(l => l.toLowerCase().includes('herb') || l.toLowerCase().includes('data') || l.toLowerCase().includes('dataset'));
console.log(linesB.slice(0, 10).join('\n'));

console.log('\n=== ANALYZING SOURCE C MANIFEST ===');
const manifestC = JSON.parse(fs.readFileSync('d:/data/raw/source_c/MANIFEST.json', 'utf8'));
console.log('Manifest keys:', Object.keys(manifestC));
if (manifestC.datasets) {
  console.log('Datasets listed in manifest:');
  for (const [k, v] of Object.entries(manifestC.datasets)) {
    console.log(`- ${k}: records=${v.record_count || v.count || 'N/A'}, sha256=${v.sha256 ? v.sha256.slice(0, 16) + '...' : 'N/A'}`);
  }
} else {
  console.log('Manifest content sample:', JSON.stringify(manifestC, null, 2).slice(0, 800));
}

console.log('\n=== ANALYZING SOURCE C dravyaguna.json ===');
const dgC = JSON.parse(fs.readFileSync('d:/data/raw/source_c/dravyaguna.json', 'utf8'));
console.log('dravyaguna.json top-level keys:', Object.keys(dgC));
if (dgC.data && Array.isArray(dgC.data)) {
  console.log('dravyaguna data length:', dgC.data.length);
  console.log('dravyaguna data[0] keys:', Object.keys(dgC.data[0]));
  console.log('dravyaguna data[0] sample:', JSON.stringify(dgC.data[0], null, 2).slice(0, 400));
} else if (Array.isArray(dgC)) {
  console.log('dravyaguna array length:', dgC.length);
  console.log('dravyaguna[0] keys:', Object.keys(dgC[0]));
}

console.log('\n=== ANALYZING SOURCE C taxonomy.json ===');
const taxC = JSON.parse(fs.readFileSync('d:/data/raw/source_c/taxonomy.json', 'utf8'));
console.log('taxonomy.json top-level keys:', Object.keys(taxC));
if (taxC.data && Array.isArray(taxC.data)) {
  console.log('taxonomy data length:', taxC.data.length);
  console.log('taxonomy data[0] sample:', JSON.stringify(taxC.data[0], null, 2).slice(0, 300));
}

console.log('\n=== ANALYZING SOURCE C afi-crosswalk.json ===');
const afiC = JSON.parse(fs.readFileSync('d:/data/raw/source_c/afi-crosswalk.json', 'utf8'));
console.log('afi top keys:', Object.keys(afiC));
if (afiC.data) {
  console.log('afi data length:', afiC.data.length);
  console.log('afi data[0] sample:', JSON.stringify(afiC.data[0], null, 2).slice(0, 300));
}
