import { useEffect, useState } from "react";
import { loadData, SiteData } from "../lib/api";

type GameKey = "hok" | "mlbb" | "pubgm" | "ff";

const GAMES: Record<GameKey, { label: string; type: "MOBA" | "TPS"; color: string; accentBg: string; accentBorder: string }> = {
  hok:   { label: "Honor of Kings", type: "MOBA", color: "#3b82f6", accentBg: "rgba(59,130,246,0.1)",  accentBorder: "rgba(59,130,246,0.25)" },
  mlbb:  { label: "Mobile Legends", type: "MOBA", color: "#3b82f6", accentBg: "rgba(59,130,246,0.1)",  accentBorder: "rgba(59,130,246,0.25)" },
  pubgm: { label: "PUBG Mobile",    type: "TPS",  color: "#ef4444", accentBg: "rgba(239,68,68,0.1)",   accentBorder: "rgba(239,68,68,0.25)"  },
  ff:    { label: "Free Fire",      type: "TPS",  color: "#ef4444", accentBg: "rgba(239,68,68,0.1)",   accentBorder: "rgba(239,68,68,0.25)"  },
};

// Même calcul que l'outil complet (public/js/main.js) — une seule vérité pour les classements.
function classementMOBA(comp: any) {
  const teams: Record<string, any> = {};
  (comp.bracket?.equipes || []).forEach((t: any) => { teams[t.nom] = { equipe: t.nom, v: 0, n: 0, d: 0, pts: 0 }; });
  (comp.manches || []).forEach((m: any) => {
    if (!m.equipe1 || !m.equipe2) return;
    [m.equipe1, m.equipe2].forEach((t: string) => { if (!teams[t]) teams[t] = { equipe: t, v: 0, n: 0, d: 0, pts: 0 }; });
    const s1 = Number(m.score1), s2 = Number(m.score2);
    if (isNaN(s1) || isNaN(s2)) return;
    if (s1 > s2) { teams[m.equipe1].v++; teams[m.equipe2].d++; }
    else if (s2 > s1) { teams[m.equipe2].v++; teams[m.equipe1].d++; }
    else { teams[m.equipe1].n++; teams[m.equipe2].n++; }
  });
  const b = comp.bareme || { victoire: 3, nul: 1, defaite: 0 };
  return Object.values(teams).map((t: any) => { t.pts = t.v * b.victoire + t.n * b.nul + t.d * b.defaite; return t; })
    .sort((a: any, c: any) => c.pts - a.pts);
}

function classementTPS(comp: any) {
  const players: Record<string, any> = {};
  const ensure = (pseudo: string) => {
    if (players[pseudo]) return players[pseudo];
    return (players[pseudo] = { joueur: pseudo, kills: 0, pts: 0 });
  };
  (comp.roster || []).forEach((s: any) => ensure(s.nom));
  const b = comp.bareme || { places: [15, 12, 10, 8, 6, 4, 2, 1], elimination: 1 };
  (comp.manches || []).forEach((m: any) => {
    (m.resultats || []).forEach((r: any) => {
      if (!r.joueur) return;
      const p = ensure(r.joueur);
      const place = Number(r.place), kills = Number(r.kills) || 0;
      const placePts = place >= 1 && place <= b.places.length ? b.places[place - 1] : 0;
      p.kills += kills;
      p.pts += placePts + kills * (b.elimination || 0);
    });
  });
  return Object.values(players).sort((a: any, c: any) => c.pts - a.pts);
}

export default function PageClassements() {
  const [data, setData] = useState<SiteData | null>(null);
  const [activeGame, setActiveGame] = useState<GameKey>("hok");

  useEffect(() => {
    document.title = "Classements — ELC 2027";
    window.scrollTo(0, 0);
    loadData().then(setData).catch(() => {});
  }, []);

  const game = GAMES[activeGame];
  const isMoba = game.type === "MOBA";
  const comp = data?.competition?.[activeGame];
  const rows = comp ? (isMoba ? classementMOBA(comp) : classementTPS(comp)) : [];
  const hasResults = rows.some((r: any) => r.pts > 0);
  const displayRows = hasResults ? rows.filter((r: any) => r.pts > 0) : [];

  return (
    <div style={{ background: "#0e0e0e" }}>

      <section style={{ padding: "80px 28px 64px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ fontFamily: "'Roboto Mono:Regular','Roboto Mono',monospace", fontSize: 11, color: "#14b8a6", letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 16 }}>
            Saison 2027 · Temps réel
          </div>
          <h1 style={{ fontFamily: "'Inter:Medium','Inter',sans-serif", fontWeight: 500, fontSize: "clamp(36px,5vw,64px)", letterSpacing: "-2px", color: "#fff", margin: "0 0 20px", lineHeight: 1.05 }}>
            Classements
          </h1>
          <p style={{ fontFamily: "'Inter:Regular','Inter',sans-serif", fontSize: 17, color: "rgba(255,255,255,0.5)", maxWidth: 540, lineHeight: 1.75, margin: 0 }}>
            Standings officiels mis à jour après chaque match. Sélectionne une discipline pour voir le classement en cours.
          </p>
        </div>
      </section>

      <section style={{ padding: "40px 28px 0", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {(Object.entries(GAMES) as [GameKey, typeof GAMES[GameKey]][]).map(([key, g]) => {
            const isActive = activeGame === key;
            return (
              <button
                key={key}
                onClick={() => setActiveGame(key)}
                style={{
                  padding: "9px 20px", borderRadius: 8,
                  fontFamily: "'Inter:Medium',sans-serif", fontSize: 13,
                  background: isActive ? g.color : "#111",
                  color: isActive ? "#fff" : "rgba(255,255,255,0.5)",
                  border: isActive ? "none" : "1px solid rgba(255,255,255,0.08)",
                  cursor: "pointer", transition: "all 0.15s",
                  display: "flex", alignItems: "center", gap: 8,
                }}
              >
                <span style={{ fontFamily: "'Roboto Mono:Regular',monospace", fontSize: 9, letterSpacing: "0.8px", textTransform: "uppercase", opacity: isActive ? 1 : 0.6 }}>{g.type}</span>
                {g.label}
              </button>
            );
          })}
        </div>
      </section>

      <section style={{ padding: "32px 28px 80px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>

          <div style={{ background: "#111", border: `1px solid ${game.accentBorder}`, borderRadius: 14, overflow: "hidden" }}>
            <div style={{ background: game.accentBg, borderBottom: `1px solid ${game.accentBorder}`, padding: "14px 24px", display: "grid", gridTemplateColumns: isMoba ? "48px 1fr 80px 80px 80px 80px" : "48px 1fr 100px 100px", gap: 12, alignItems: "center" }}>
              {(isMoba ? ["#", "Équipe", "V", "N", "D", "Pts"] : ["#", "Joueur", "Pts", "Kills"]).map((h) => (
                <span key={h} style={{ fontFamily: "'Roboto Mono:Regular',monospace", fontSize: 10, color: game.color, letterSpacing: "0.6px", textTransform: "uppercase", textAlign: (h === "#" ? "center" : ["Pts", "V", "N", "D", "Kills"].includes(h) ? "right" : "left") as any }}>{h}</span>
              ))}
            </div>

            {displayRows.length > 0 ? (
              displayRows.map((r: any, i: number) => (
                <div key={isMoba ? r.equipe : r.joueur} style={{ padding: "14px 24px", display: "grid", gridTemplateColumns: isMoba ? "48px 1fr 80px 80px 80px 80px" : "48px 1fr 100px 100px", gap: 12, alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <span style={{ textAlign: "center", fontFamily: "'Roboto Mono:Regular',monospace", fontSize: 13, color: "rgba(255,255,255,0.4)" }}>{i + 1}</span>
                  <span style={{ fontFamily: "'Inter:Medium',sans-serif", fontSize: 14, color: "#fff" }}>{isMoba ? r.equipe : r.joueur}</span>
                  {isMoba ? (
                    <>
                      <span style={{ textAlign: "right", fontFamily: "'Roboto Mono:Regular',monospace", fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{r.v}</span>
                      <span style={{ textAlign: "right", fontFamily: "'Roboto Mono:Regular',monospace", fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{r.n}</span>
                      <span style={{ textAlign: "right", fontFamily: "'Roboto Mono:Regular',monospace", fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{r.d}</span>
                    </>
                  ) : (
                    <span style={{ textAlign: "right", fontFamily: "'Roboto Mono:Regular',monospace", fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{r.kills}</span>
                  )}
                  <span style={{ textAlign: "right", fontFamily: "'Roboto Mono:Regular',monospace", fontSize: 14, fontWeight: 700, color: game.color }}>{r.pts}</span>
                </div>
              ))
            ) : (
              <div style={{ padding: "64px 24px", textAlign: "center" }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#161616", border: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 4v6l4 2" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="10" cy="10" r="8.5" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                  </svg>
                </div>
                <p style={{ fontFamily: "'Inter:Medium',sans-serif", fontSize: 15, color: "rgba(255,255,255,0.35)", margin: "0 0 6px" }}>Classement disponible dès le début de la saison</p>
                <p style={{ fontFamily: "'Inter:Regular',sans-serif", fontSize: 13, color: "rgba(255,255,255,0.2)", margin: 0 }}>Aucun match n'a encore été joué pour {game.label}.</p>
              </div>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
