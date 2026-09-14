// Migration ponctuelle : copie les données existantes (dépôt GitHub elc2027-data,
// ou à défaut le fichier local data/elc2027-data.json) vers Supabase.
//
// À lancer UNE SEULE FOIS, depuis votre propre machine, après avoir créé la table
// site_data dans Supabase (voir DEPLOY.md) et rempli GITHUB_TOKEN/GITHUB_OWNER/
// GITHUB_REPO + SUPABASE_URL/SUPABASE_SERVICE_KEY dans un fichier .env local
// (jamais commité — voir .env.example).
//
// Usage : node scripts/migrate-data-to-supabase.js

try { require('dotenv').config(); } catch (e) { /* dotenv optionnel, ignoré si absent */ }

const fs = require('fs');
const path = require('path');
const gh = require('../githubStore');
const sb = require('../supabaseStore');

async function main() {
  if (!sb.enabled) {
    console.error('ERREUR : SUPABASE_URL et SUPABASE_SERVICE_KEY doivent être définis (fichier .env).');
    process.exit(1);
  }

  let data;
  if (gh.enabled) {
    console.log(`Lecture depuis GitHub (${gh.GITHUB_OWNER}/${gh.GITHUB_REPO}@${gh.GITHUB_BRANCH})…`);
    const file = await gh.getFile('data/elc2027-data.json');
    if (!file) { console.error('ERREUR : data/elc2027-data.json introuvable dans le dépôt GitHub.'); process.exit(1); }
    data = JSON.parse(Buffer.from(file.contentBase64, 'base64').toString('utf-8'));
  } else {
    const localPath = path.join(__dirname, '..', 'data', 'elc2027-data.json');
    if (!fs.existsSync(localPath)) { console.error(`ERREUR : ${localPath} introuvable, et GitHub n'est pas configuré.`); process.exit(1); }
    console.log(`Lecture depuis le fichier local ${localPath}…`);
    data = JSON.parse(fs.readFileSync(localPath, 'utf-8'));
  }

  console.log('Écriture dans Supabase (table site_data)…');
  await sb.putData(data);

  const check = await sb.getData();
  if (!check || !check.meta) { console.error('ERREUR : la relecture après écriture a échoué — vérifiez la table site_data.'); process.exit(1); }
  console.log('✅ Migration terminée. Vérifiez dans le tableau de bord Supabase (Table Editor → site_data) que la ligne id=1 contient bien vos données.');
}

main().catch((err) => { console.error('Échec de la migration :', err); process.exit(1); });
