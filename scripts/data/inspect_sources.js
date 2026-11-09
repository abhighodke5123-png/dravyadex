const https = require('https');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchBuffer(res.headers.location).then(resolve).catch(reject);
      }
      const chunks = [];
      res.on('data', d => chunks.push(d));
      res.on('end', () => resolve({ statusCode: res.statusCode, data: Buffer.concat(chunks) }));
    }).on('error', reject);
  });
}

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

async function main() {
  console.log('=== DRAVYADEX SOURCE INSPECTION ===\n');

  // 1. SOURCE A: Herb Database
  console.log('--- 1. Inspecting SOURCE A: herb-database ---');
  const srcAUrl = 'https://raw.githubusercontent.com/sciencewithsaucee-sudo/herb-database/main/herb.json';
  const readmeAUrl = 'https://raw.githubusercontent.com/sciencewithsaucee-sudo/herb-database/main/README.md';
  const licenseAUrl = 'https://raw.githubusercontent.com/sciencewithsaucee-sudo/herb-database/main/LICENSE';

  const resA = await fetchBuffer(srcAUrl);
  console.log(`Source A Status: ${resA.statusCode}, Size: ${resA.data.length} bytes`);
  const hashA = sha256(resA.data);
  console.log(`Source A SHA-256: ${hashA}`);
  fs.writeFileSync('d:/data/raw/source_a/herb.json', resA.data);

  const resReadmeA = await fetchBuffer(readmeAUrl);
  if (resReadmeA.statusCode === 200) {
    fs.writeFileSync('d:/data/raw/source_a/README.md', resReadmeA.data);
    console.log(`Source A README saved (${resReadmeA.data.length} bytes)`);
  }

  const resLicenseA = await fetchBuffer(licenseAUrl);
  if (resLicenseA.statusCode === 200) {
    fs.writeFileSync('d:/data/raw/source_a/LICENSE', resLicenseA.data);
    console.log(`Source A LICENSE saved`);
  }

  try {
    const jsonA = JSON.parse(resA.data.toString('utf8'));
    console.log(`Source A records count: ${Array.isArray(jsonA) ? jsonA.length : Object.keys(jsonA).length}`);
    if (Array.isArray(jsonA) && jsonA.length > 0) {
      console.log('Sample record keys:', Object.keys(jsonA[0]));
      console.log('Sample record 0 name:', jsonA[0].name, 'botanical:', jsonA[0].botanical_name);
    }
  } catch (err) {
    console.error('Failed to parse Source A JSON:', err.message);
  }

  // 2. SOURCE B: ayurvedic-herb-explorer
  console.log('\n--- 2. Inspecting SOURCE B: ayurvedic-herb-explorer ---');
  const repoBUrl = 'https://api.github.com/repos/sciencewithsaucee-sudo/ayurvedic-herb-explorer/contents';
  const resBContents = await fetchBuffer(repoBUrl);
  let treeB = [];
  try {
    treeB = JSON.parse(resBContents.data.toString('utf8'));
    console.log('Source B root entries:', treeB.map(e => `${e.name} (${e.type})`).join(', '));
  } catch (e) {
    console.log('Could not list tree via API, checking direct endpoints...');
  }

  // Check common data paths in Source B
  const possiblePathsB = [
    'https://raw.githubusercontent.com/sciencewithsaucee-sudo/ayurvedic-herb-explorer/main/README.md',
    'https://raw.githubusercontent.com/sciencewithsaucee-sudo/ayurvedic-herb-explorer/main/LICENSE',
    'https://raw.githubusercontent.com/sciencewithsaucee-sudo/ayurvedic-herb-explorer/main/package.json',
    'https://raw.githubusercontent.com/sciencewithsaucee-sudo/ayurvedic-herb-explorer/main/src/data/herbs.json',
    'https://raw.githubusercontent.com/sciencewithsaucee-sudo/ayurvedic-herb-explorer/main/public/data/herbs.json',
    'https://raw.githubusercontent.com/sciencewithsaucee-sudo/ayurvedic-herb-explorer/main/data/herbs.json',
    'https://raw.githubusercontent.com/sciencewithsaucee-sudo/ayurvedic-herb-explorer/main/herb.json'
  ];

  for (const p of possiblePathsB) {
    const res = await fetchBuffer(p);
    const filename = path.basename(p);
    if (res.statusCode === 200) {
      console.log(`Found Source B file: ${p} (${res.data.length} bytes)`);
      fs.writeFileSync(`d:/data/raw/source_b/${filename}`, res.data);
    }
  }

  // Also query GitHub API for src/ directory if available
  const resBSrc = await fetchBuffer('https://api.github.com/repos/sciencewithsaucee-sudo/ayurvedic-herb-explorer/contents/src');
  try {
    const srcTree = JSON.parse(resBSrc.data.toString('utf8'));
    if (Array.isArray(srcTree)) {
      console.log('Source B /src directory:', srcTree.map(e => e.name).join(', '));
      // check if data folder exists
      const dataFolder = srcTree.find(e => e.name === 'data');
      if (dataFolder) {
        const resData = await fetchBuffer(dataFolder.url);
        const dataEntries = JSON.parse(resData.data.toString('utf8'));
        console.log('Source B /src/data directory:', dataEntries.map(e => e.name).join(', '));
        for (const entry of dataEntries) {
          if (entry.download_url) {
            const fileRes = await fetchBuffer(entry.download_url);
            fs.writeFileSync(`d:/data/raw/source_b/${entry.name}`, fileRes.data);
            console.log(`Downloaded Source B data: ${entry.name} (${fileRes.data.length} bytes)`);
          }
        }
      }
    }
  } catch (e) {}

  // 3. SOURCE C: Age Ayurveda Nighantu
  console.log('\n--- 3. Inspecting SOURCE C: Age Ayurveda Nighantu ---');
  const resC = await fetchBuffer('https://nighantu.ageayurveda.com/datasets/');
  fs.writeFileSync('d:/data/raw/source_c/datasets_index.html', resC.data);
  const htmlC = resC.data.toString('utf8');
  console.log(`Source C HTML fetched: ${resC.data.length} bytes`);

  // Parse links
  const hrefRegex = /href=["']([^"']+)["']/g;
  let match;
  const foundLinks = new Set();
  while ((match = hrefRegex.exec(htmlC)) !== null) {
    foundLinks.add(match[1]);
  }
  const datasetLinks = [...foundLinks].filter(l => l.includes('.json') || l.includes('.csv') || l.includes('dataset') || l.includes('manifest'));
  console.log('Source C links found:', datasetLinks);

  console.log('\nSource inspection complete.');
}

main().catch(console.error);
