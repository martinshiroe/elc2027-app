// ELC 2027 - Serveur (local / Render) — voir apiApp.js pour la logique API
// (triple mode Supabase > GitHub > local), partagée avec la fonction
// serverless Vercel (api/index.js). Ce fichier ajoute les fichiers
// statiques, le repli SPA, et app.listen — inutiles sur Vercel, qui gère
// ça via vercel.json.

const express = require('express');
const path = require('path');
const os = require('os');
const { app: apiApp, DATA_MODE, CLOUD_MODE, ADMIN_KEY, ADMIN_KEY_FILE, DATA_DIR, gh } = require('./apiApp');

const app = express();
const PORT = process.env.PORT || 4027;

app.use(apiApp);
app.use(express.static(path.join(__dirname, 'public')));

// --- Repli SPA (vitrine multi-pages) ---
// Les routes client (/, /competition, /classements, /joueurs, /pantheon) n'ont
// pas de fichier physique : on sert index.html et React Router prend le relais.
// /admin.html, /app.html et les fichiers statiques (css/js/img, avec extension)
// sont déjà servis par express.static ci-dessus et ne passent jamais ici.
app.get(/^\/(?!api\/|photos\/).*/, (req, res, next) => {
  if (path.extname(req.path)) return next();
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

function localIPs() {
  const ifaces = os.networkInterfaces();
  const out = [];
  for (const name of Object.keys(ifaces)) {
    for (const iface of ifaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) out.push(iface.address);
    }
  }
  return out;
}

app.listen(PORT, () => {
  console.log('==================================================');
  console.log('  ELC 2027 - Serveur démarré');
  const storageLabel = DATA_MODE === 'supabase' ? 'Supabase (Postgres)'
    : DATA_MODE === 'github' ? `GitHub (${gh.GITHUB_OWNER}/${gh.GITHUB_REPO}@${gh.GITHUB_BRANCH})`
    : 'fichier local';
  console.log(`  Mode de stockage (données) : ${storageLabel}`);
  console.log(`  Mode de stockage (photos) : ${gh.enabled ? `GitHub (${gh.GITHUB_OWNER}/${gh.GITHUB_REPO})` : 'fichier local'}`);
  if (CLOUD_MODE) {
    console.log(`  Port : ${PORT}`);
  } else {
    console.log(`  Vue publique (lecture seule) : http://localhost:${PORT}/`);
    console.log(`  Interface admin : http://localhost:${PORT}/admin.html`);
    console.log(`  Code administrateur : ${ADMIN_KEY}`);
    console.log(`  (Aussi lisible dans : ${ADMIN_KEY_FILE})`);
    const ips = localIPs();
    if (ips.length) {
      console.log('  Pour laisser d\'autres personnes CONSULTER sur le même réseau :');
      ips.forEach(ip => console.log(`    http://${ip}:${PORT}/`));
      console.log('  (Ne partagez PAS le code administrateur avec elles.)');
    }
    console.log(`  Données stockées dans : ${DATA_DIR}`);
  }
  console.log('==================================================');
});
