// ELC 2027 — API seule (données + photos), sans fichiers statiques ni SPA.
//
// Exporte une app Express montée par server.js (Render/local, toujours
// active) ET par api/index.js (fonction serverless Vercel). La logique de
// stockage (Supabase > GitHub > local) est identique dans les deux cas —
// voir server.js pour le détail des trois modes.

const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const gh = require('./githubStore');
const sb = require('./supabaseStore');

const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'elc2027-data.json');
const PHOTOS_DIR = path.join(DATA_DIR, 'photos');
const ADMIN_KEY_FILE = path.join(DATA_DIR, 'admin-code.txt');
const DATA_REPO_PATH = 'data/elc2027-data.json';
const PHOTOS_REPO_PREFIX = 'data/photos';

const DATA_MODE = sb.enabled ? 'supabase' : (gh.enabled ? 'github' : 'local');
const CLOUD_MODE = DATA_MODE !== 'local';

if (!CLOUD_MODE) {
  for (const dir of [DATA_DIR, PHOTOS_DIR]) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  }
}

let ADMIN_KEY = process.env.ADMIN_KEY;
if (!ADMIN_KEY) {
  if (CLOUD_MODE) {
    console.error('ERREUR : la variable d\'environnement ADMIN_KEY est requise en mode hébergement cloud.');
  } else {
    if (fs.existsSync(ADMIN_KEY_FILE)) {
      ADMIN_KEY = fs.readFileSync(ADMIN_KEY_FILE, 'utf-8').trim();
    } else {
      ADMIN_KEY = String(crypto.randomInt(100000, 999999));
      fs.writeFileSync(ADMIN_KEY_FILE, ADMIN_KEY, 'utf-8');
    }
  }
}

function requireAdminKey(req, res, next) {
  const provided = req.get('x-admin-key') || req.query.key;
  if (provided && ADMIN_KEY && provided === ADMIN_KEY) return next();
  res.status(401).json({ error: 'Code administrateur invalide ou manquant.', code: 'unauthorized' });
}

const app = express();
app.use(express.json({ limit: '15mb' }));
if (!gh.enabled && !CLOUD_MODE) {
  app.use('/photos', express.static(PHOTOS_DIR));
}

let cache = { data: null, sha: null };

async function loadData() {
  if (DATA_MODE === 'supabase') {
    const data = await sb.getData();
    if (!data) throw new Error("Aucune donnée trouvée dans Supabase (table site_data vide). Lancez l'import initial — voir scripts/migrate-data-to-supabase.js.");
    cache.data = data;
  } else if (DATA_MODE === 'github') {
    const file = await gh.getFile(DATA_REPO_PATH);
    if (!file) throw new Error(`Fichier de données introuvable dans le dépôt GitHub (${DATA_REPO_PATH}). Importez-le une première fois — voir README.`);
    cache.sha = file.sha;
    cache.data = JSON.parse(Buffer.from(file.contentBase64, 'base64').toString('utf-8'));
  } else {
    cache.data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  }
  return cache.data;
}

async function saveData(incoming) {
  incoming.meta = incoming.meta || {};
  incoming.meta.derniereMaj = new Date().toISOString();
  if (DATA_MODE === 'supabase') {
    await sb.putData(incoming);
  } else if (DATA_MODE === 'github') {
    const base64 = Buffer.from(JSON.stringify(incoming, null, 2), 'utf-8').toString('base64');
    cache.sha = await gh.putFile(DATA_REPO_PATH, base64, `Mise à jour des données — ${incoming.meta.derniereMaj}`, cache.sha);
  } else {
    fs.writeFileSync(DATA_FILE, JSON.stringify(incoming, null, 2), 'utf-8');
  }
  cache.data = incoming;
  return incoming.meta.derniereMaj;
}

// --- Lecture des données (libre — vue publique / consultation) ---
app.get('/api/data', async (req, res) => {
  try {
    if (!cache.data) await loadData();
    res.json(cache.data);
  } catch (err) {
    res.status(500).json({ error: 'Impossible de lire les données.', details: String(err.message || err) });
  }
});

// --- Vérification du code admin (utilisé par l'écran de connexion admin) ---
app.get('/api/admin/check', requireAdminKey, (req, res) => {
  res.json({ ok: true, storage: DATA_MODE });
});

// --- Écriture des données (protégée) ---
app.post('/api/data', requireAdminKey, async (req, res) => {
  try {
    if (!cache.data) await loadData(); // récupère le sha courant avant d'écrire, en mode GitHub
    const savedAt = await saveData(req.body);
    res.json({ ok: true, savedAt });
  } catch (err) {
    res.status(500).json({ error: "Impossible d'enregistrer les données.", details: String(err.message || err) });
  }
});

// --- Photo joueur / équipe (protégé) ---
const PHOTO_MIME_EXT = { 'image/jpeg': 'jpg', 'image/jpg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' };

app.post('/api/photo/:entityId', requireAdminKey, async (req, res) => {
  try {
    const entityId = String(req.params.entityId || '').replace(/[^a-z0-9_-]/gi, '');
    const { dataUrl } = req.body;
    if (!entityId) return res.status(400).json({ error: 'Identifiant manquant.' });
    if (!dataUrl) return res.status(400).json({ error: 'Image manquante.' });
    const match = /^data:(image\/[a-z]+);base64,/.exec(dataUrl);
    const ext = match && PHOTO_MIME_EXT[match[1]];
    if (!ext) return res.status(400).json({ error: "Format d'image non supporté (jpg, png ou webp uniquement)." });
    const base64 = dataUrl.slice(match[0].length);
    const fileName = `${entityId}.${ext}`;

    if (gh.enabled) {
      for (const e of new Set(Object.values(PHOTO_MIME_EXT))) {
        if (e === ext) continue;
        const old = await gh.getFile(`${PHOTOS_REPO_PREFIX}/${entityId}.${e}`).catch(() => null);
        if (old) await gh.deleteFile(`${PHOTOS_REPO_PREFIX}/${entityId}.${e}`, `Suppression ancienne photo ${entityId}`, old.sha).catch(() => {});
      }
      const existing = await gh.getFile(`${PHOTOS_REPO_PREFIX}/${fileName}`).catch(() => null);
      await gh.putFile(`${PHOTOS_REPO_PREFIX}/${fileName}`, base64, `Photo ${entityId}`, existing ? existing.sha : null);
      res.json({ ok: true, url: gh.rawUrl(`${PHOTOS_REPO_PREFIX}/${fileName}`) + `?v=${Date.now()}` });
    } else {
      for (const e of new Set(Object.values(PHOTO_MIME_EXT))) {
        const old = path.join(PHOTOS_DIR, `${entityId}.${e}`);
        if (fs.existsSync(old)) fs.unlinkSync(old);
      }
      fs.writeFileSync(path.join(PHOTOS_DIR, fileName), base64, 'base64');
      res.json({ ok: true, url: `/photos/${fileName}?v=${Date.now()}` });
    }
  } catch (err) {
    res.status(500).json({ error: "Impossible d'enregistrer la photo.", details: String(err.message || err) });
  }
});

app.delete('/api/photo/:entityId', requireAdminKey, async (req, res) => {
  try {
    const entityId = String(req.params.entityId || '').replace(/[^a-z0-9_-]/gi, '');
    for (const e of new Set(Object.values(PHOTO_MIME_EXT))) {
      if (gh.enabled) {
        const existing = await gh.getFile(`${PHOTOS_REPO_PREFIX}/${entityId}.${e}`).catch(() => null);
        if (existing) await gh.deleteFile(`${PHOTOS_REPO_PREFIX}/${entityId}.${e}`, `Suppression photo ${entityId}`, existing.sha);
      } else {
        const p = path.join(PHOTOS_DIR, `${entityId}.${e}`);
        if (fs.existsSync(p)) fs.unlinkSync(p);
      }
    }
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "Impossible de supprimer la photo.", details: String(err.message || err) });
  }
});

module.exports = { app, DATA_MODE, CLOUD_MODE, ADMIN_KEY, ADMIN_KEY_FILE, DATA_DIR, gh };
