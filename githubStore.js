// Stockage persistant via l'API GitHub (Contents API) — utilisé quand l'app
// tourne sur un hébergement à disque non persistant (Render, Railway gratuits...).
//
// Chaque écriture (données ou photo) devient un commit dans un dépôt GitHub
// dédié : ça survit aux redémarrages/redéploiements et donne en prime un
// historique complet, annulable, de toutes les modifications.
//
// Activé uniquement si GITHUB_TOKEN + GITHUB_OWNER + GITHUB_REPO sont définis
// (variables d'environnement) ; sinon le serveur reste en mode fichier local.

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER;
const GITHUB_REPO = process.env.GITHUB_REPO;
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';

const enabled = Boolean(GITHUB_TOKEN && GITHUB_OWNER && GITHUB_REPO);

const API_BASE = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents`;
const RAW_BASE = `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${GITHUB_BRANCH}`;

function headers() {
  return {
    'Authorization': `Bearer ${GITHUB_TOKEN}`,
    'Accept': 'application/vnd.github+json',
    'User-Agent': 'elc2027-app',
    'X-GitHub-Api-Version': '2022-11-28',
  };
}

// Lit un fichier du dépôt. Renvoie { contentBase64, sha } ou null s'il n'existe pas encore.
async function getFile(repoPath) {
  const res = await fetch(`${API_BASE}/${repoPath}?ref=${GITHUB_BRANCH}`, { headers: headers() });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub GET ${repoPath} a échoué (${res.status}) : ${await res.text()}`);
  const json = await res.json();
  return { contentBase64: json.content.replace(/\n/g, ''), sha: json.sha };
}

// Crée ou met à jour un fichier (contentBase64 déjà encodé en base64).
async function putFile(repoPath, contentBase64, message, sha) {
  const body = { message, content: contentBase64, branch: GITHUB_BRANCH };
  if (sha) body.sha = sha;
  const res = await fetch(`${API_BASE}/${repoPath}`, {
    method: 'PUT', headers: { ...headers(), 'Content-Type': 'application/json' }, body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`GitHub PUT ${repoPath} a échoué (${res.status}) : ${await res.text()}`);
  const json = await res.json();
  return json.content.sha;
}

async function deleteFile(repoPath, message, sha) {
  const res = await fetch(`${API_BASE}/${repoPath}`, {
    method: 'DELETE', headers: { ...headers(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, sha, branch: GITHUB_BRANCH }),
  });
  if (!res.ok && res.status !== 404) throw new Error(`GitHub DELETE ${repoPath} a échoué (${res.status}) : ${await res.text()}`);
}

function rawUrl(repoPath) {
  return `${RAW_BASE}/${repoPath}`;
}

module.exports = { enabled, getFile, putFile, deleteFile, rawUrl, GITHUB_OWNER, GITHUB_REPO, GITHUB_BRANCH };
