// Service worker minimal — sert uniquement à rendre le site installable
// (icône "Ajouter à l'écran d'accueil" / "Installer l'application").
//
// Aucune donnée n'est mise en cache : /api/* et toutes les pages HTML
// passent toujours par le réseau, pour ne jamais afficher de données
// obsolètes. Seuls les fichiers statiques versionnés (JS/CSS/images)
// profitent d'un cache, sans risque puisqu'un nouveau déploiement change
// leur nom de fichier.

const CACHE_NAME = "elc2027-static-v1";
const CACHEABLE = /\/(app-assets|css|js|img)\//;

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/api/")) return; // toujours réseau, jamais de cache
  if (!CACHEABLE.test(url.pathname)) return; // pages HTML : toujours réseau

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(request, copy));
        }
        return res;
      });
    })
  );
});
