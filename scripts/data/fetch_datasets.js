const https = require('https');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (redirectUrl.startsWith('/')) {
          const u = new URL(url);
          redirectUrl = `${u.origin}${redirectUrl}`;
        }
        return fetchBuffer(redirectUrl).then(resolve).catch(reject);
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

async function inspectSourceBAndC() {
  console.log('--- Inspecting Source B files ---');
  const indexBUrl = 'https://raw.githubusercontent.com/sciencewithsaucee-sudo/ayurvedic-herb-explorer/main/index.html';
  const resIndexB = await fetchBuffer(indexBUrl);
  if (resIndexB.statusCode === 200) {
    fs.writeFileSync('d:/data/raw/source_b/index.html', resIndexB.data);
    const htmlB = resIndexB.data.toString('utf8');
    console.log(`Source B index.html: ${resIndexB.data.length} bytes`);
    // Find script tags or data loads
    const scripts = [...htmlB.matchAll(/src=["']([^"']+)["']/g)].map(m => m[1]);
    console.log('Source B scripts:', scripts);
    const fetches = [...htmlB.matchAll(/fetch\(["']([^"']+)["']/g)].map(m => m[1]);
    console.log('Source B fetches in HTML:', fetches);
  }

  // Check what's inside assets/ directory of Source B
  const resAssetsB = await fetchBuffer('https://api.github.com/repos/sciencewithsaucee-sudo/ayurvedic-herb-explorer/contents/assets');
  try {
    const assetsTree = JSON.parse(resAssetsB.data.toString('utf8'));
    if (Array.isArray(assetsTree)) {
      console.log('Source B assets folder:', assetsTree.map(e => `${e.name} (${e.type})`).join(', '));
      for (const item of assetsTree) {
        if (item.download_url) {
          const fRes = await fetchBuffer(item.download_url);
          fs.writeFileSync(`d:/data/raw/source_b/${item.name}`, fRes.data);
          console.log(`Downloaded Source B asset: ${item.name} (${fRes.data.length} bytes)`);
        }
      }
    }
  } catch (e) {
    console.error('Error fetching Source B assets:', e.message);
  }

  console.log('\n--- Inspecting Source C datasets ---');
  const baseC = 'https://nighantu.ageayurveda.com';
  const datasets = [
    '/MANIFEST.json',
    '/dravyaguna.json',
    '/taxonomy.json',
    '/afi-crosswalk.json',
    '/lexicon.json',
    '/compounds.json',
    '/research.json',
    '/composition.json',
    '/verification.json',
    '/concepts.json',
    '/verse-numbering.json'
  ];

  const sourceCMeta = {};

  for (const ds of datasets) {
    const url = `${baseC}${ds}`;
    const filename = path.basename(ds);
    try {
      const res = await fetchBuffer(url);
      if (res.statusCode === 200) {
        const hash = sha256(res.data);
        fs.writeFileSync(`d:/data/raw/source_c/${filename}`, res.data);
        let recordCount = null;
        try {
          const parsed = JSON.parse(res.data.toString('utf8'));
          recordCount = Array.isArray(parsed) ? parsed.length : (parsed.data && Array.isArray(parsed.data) ? parsed.data.length : Object.keys(parsed).length);
        } catch (e) {}
        sourceCMeta[filename] = {
          size: res.data.length,
          sha256: hash,
          recordCount: recordCount
        };
        console.log(`Source C [${filename}]: ${res.data.length} bytes, SHA-256: ${hash.slice(0, 12)}..., records: ${recordCount}`);
      } else {
        console.log(`Source C [${filename}]: HTTP ${res.statusCode}`);
      }
    } catch (err) {
      console.error(`Source C [${filename}] failed:`, err.message);
    }
  }

  fs.writeFileSync('d:/data/raw/source_c/metadata_summary.json', JSON.stringify(sourceCMeta, null, 2));
}

inspectSourceBAndC().catch(console.error);
