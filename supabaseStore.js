// Stockage persistant via Supabase (Postgres géré) — vraie base de données pour
// les données du site (compétition, joueurs, classements, Panthéon). Les photos
// restent sur GitHub (voir githubStore.js) : aucune raison de les migrer.
//
// Activé uniquement si SUPABASE_URL + SUPABASE_SERVICE_KEY sont définis (variables
// d'environnement) ; sinon le serveur retombe sur le mode GitHub, puis fichier local.
//
// Table attendue (à créer une fois dans l'éditeur SQL Supabase) :
//   create table site_data (
//     id int primary key default 1,
//     data jsonb not null,
//     updated_at timestamptz default now()
//   );
//
// La clé utilisée est la "service_role" key (jamais l'"anon" key) : elle bypasse
// les policies RLS et n'est utilisée que côté serveur, jamais exposée au navigateur.

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

const enabled = Boolean(SUPABASE_URL && SUPABASE_SERVICE_KEY);

const REST_BASE = SUPABASE_URL ? `${SUPABASE_URL.replace(/\/$/, '')}/rest/v1` : null;
const ROW_ID = 1;

function headers(extra) {
  return {
    'apikey': SUPABASE_SERVICE_KEY,
    'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
    'Content-Type': 'application/json',
    ...extra,
  };
}

// Lit le document unique. Renvoie l'objet JS (déjà parsé) ou null s'il n'existe pas encore.
async function getData() {
  const res = await fetch(`${REST_BASE}/site_data?id=eq.${ROW_ID}&select=data`, { headers: headers() });
  if (!res.ok) throw new Error(`Supabase GET a échoué (${res.status}) : ${await res.text()}`);
  const rows = await res.json();
  if (!rows.length) return null;
  return rows[0].data;
}

// Crée ou remplace le document unique (upsert sur id=1).
async function putData(data) {
  const res = await fetch(`${REST_BASE}/site_data`, {
    method: 'POST',
    headers: headers({ 'Prefer': 'resolution=merge-duplicates,return=minimal' }),
    body: JSON.stringify({ id: ROW_ID, data, updated_at: new Date().toISOString() }),
  });
  if (!res.ok) throw new Error(`Supabase PUT a échoué (${res.status}) : ${await res.text()}`);
}

module.exports = { enabled, getData, putData };
