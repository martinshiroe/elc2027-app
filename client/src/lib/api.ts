// Couche d'accès aux VRAIES données du site (jamais de données inventées).
// Le backend Express sert /api/data en lecture libre — mode Supabase, GitHub
// ou local selon la config serveur (voir server.js), totalement transparent ici.

export type SiteData = {
  meta: {
    organisateur?: string;
    competitionNom?: string;
    saison?: string;
    contact?: { telephone?: string; email?: string };
    reseaux?: Record<string, string>;
    liens?: { statutsTexte?: string };
    derniereMaj?: string;
    googleFormUrl?: string;
    heroImage?: string;
  };
  competition: Record<
    string,
    {
      nom: string;
      family: "MOBA" | "TPS";
      bareme: Record<string, any>;
      roster?: { id: string; nom: string; photo?: string }[];
      bracket?: { equipes: { id: string; nom: string; logo?: string }[] };
    }
  >;
  joueurs: any[];
  pantheon: { curated: any[] };
};

let cache: SiteData | null = null;
let pending: Promise<SiteData> | null = null;

export function loadData(): Promise<SiteData> {
  if (cache) return Promise.resolve(cache);
  if (!pending) {
    pending = fetch("/api/data")
      .then((r) => {
        if (!r.ok) throw new Error("Impossible de charger les données.");
        return r.json();
      })
      .then((d: SiteData) => {
        cache = d;
        return d;
      })
      .catch((err) => {
        pending = null;
        throw err;
      });
  }
  return pending;
}

// IDs réels des disciplines dans les données (competition[id]).
export const DISCIPLINE_IDS = {
  hok: "hok",
  mlbb: "mlbb",
  pubgm: "pubgm",
  ff: "ff",
} as const;
