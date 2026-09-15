import { useEffect, useState } from "react";
import { openForm } from "../components/Root";
import { loadData, SiteData } from "../lib/api";

type GameKey = "all" | "hok" | "mlbb" | "pubgm" | "ff";

const GAME_FILTERS: { key: GameKey; label: string; color: string }[] = [
  { key: "all",   label: "Tous",            color: "#14b8a6" },
  { key: "hok",   label: "Honor of Kings",  color: "#3b82f6" },
  { key: "mlbb",  label: "Mobile Legends",  color: "#3b82f6" },
  { key: "pubgm", label: "PUBG Mobile",     color: "#ef4444" },
  { key: "ff",    label: "Free Fire",       color: "#ef4444" },
];

export default function PageJoueurs() {
  const [data, setData] = useState<SiteData | null>(null);
  const [filter, setFilter] = useState<GameKey>("all");

  useEffect(() => {
    document.title = "Joueurs — ELC 2027";
    window.scrollTo(0, 0);
    loadData().then(setData).catch(() => {});
  }, []);

  const joueurs = data?.joueurs || [];
  const filtered = filter === "all" ? joueurs : joueurs.filter((j: any) => j.discipline === filter || j.equipe === filter);

  return (
    <div style={{ background: "#0e0e0e" }}>

      <section style={{ padding: "80px 28px 64px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
          <div>
            <div style={{ fontFamily: "'Roboto Mono:Regular','Roboto Mono',monospace", fontSize: 11, color: "#14b8a6", letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 16 }}>
              Saison 2027 · Inscriptions
            </div>
            <h1 style={{ fontFamily: "'Manrope:Medium','Manrope',sans-serif", fontWeight: 500, fontSize: "clamp(36px,5vw,64px)", letterSpacing: "-2px", color: "#fff", margin: "0 0 16px", lineHeight: 1.05 }}>
              Joueurs
            </h1>
            <p style={{ fontFamily: "'Manrope:Regular','Manrope',sans-serif", fontSize: 17, color: "rgba(255,255,255,0.5)", maxWidth: 500, lineHeight: 1.75, margin: 0 }}>
              Tous les joueurs inscrits à la saison 2027, par discipline.
            </p>
          </div>
          <button
            onClick={openForm}
            style={{ background: "#14b8a6", color: "#0e0e0e", padding: "12px 24px", borderRadius: 6, fontFamily: "'Manrope:Medium',sans-serif", fontSize: 14, fontWeight: 500, border: "none", cursor: "pointer", whiteSpace: "nowrap", transition: "opacity 0.15s", flexShrink: 0 }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            + S'inscrire
          </button>
        </div>
      </section>

      <section style={{ padding: "40px 28px 80px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 36 }}>
            {GAME_FILTERS.map(({ key, label, color }) => {
              const isActive = filter === key;
              return (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  style={{
                    padding: "7px 16px", borderRadius: 7,
                    fontFamily: "'Manrope:Medium',sans-serif", fontSize: 13,
                    background: isActive ? (key === "all" ? "#14b8a6" : color) : "#111",
                    color: isActive ? (key === "all" ? "#0e0e0e" : "#fff") : "rgba(255,255,255,0.45)",
                    border: isActive ? "none" : "1px solid rgba(255,255,255,0.08)",
                    cursor: "pointer", transition: "all 0.15s",
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {filtered.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 16 }}>
              {filtered.map((j: any, i: number) => (
                <div key={j.id || i} style={{ background: "#111", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "20px 18px", textAlign: "center" }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#161616", border: "1px solid rgba(255,255,255,0.08)", margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                    {j.photo ? <img src={j.photo} alt="" loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontFamily: "'Manrope:Medium',sans-serif", fontSize: 18, color: "rgba(255,255,255,0.3)" }}>{(j.pseudo || j.nom || "?")[0]}</span>}
                  </div>
                  <div style={{ fontFamily: "'Manrope:Medium',sans-serif", fontSize: 14, color: "#fff" }}>{j.pseudo || j.nom}</div>
                  {j.equipe && <div style={{ fontFamily: "'Manrope:Regular',sans-serif", fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>{j.equipe}</div>}
                </div>
              ))}
            </div>
          ) : (
            <div style={{ background: "#111", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "80px 24px", textAlign: "center" }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#161616", border: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="9" cy="7" r="4" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
                  <path d="M2 21c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M19 8v6M22 11h-6" stroke="#14b8a6" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <p style={{ fontFamily: "'Manrope:Medium',sans-serif", fontSize: 15, color: "rgba(255,255,255,0.35)", margin: "0 0 8px" }}>
                Les inscriptions sont en cours
              </p>
              <p style={{ fontFamily: "'Manrope:Regular',sans-serif", fontSize: 13, color: "rgba(255,255,255,0.2)", margin: "0 0 28px", lineHeight: 1.7 }}>
                La liste des joueurs inscrits apparaîtra ici dès la clôture des inscriptions.
              </p>
              <button
                onClick={openForm}
                style={{ background: "rgba(20,184,166,0.12)", color: "#14b8a6", border: "1px solid rgba(20,184,166,0.3)", padding: "10px 22px", borderRadius: 7, fontFamily: "'Manrope:Medium',sans-serif", fontSize: 13, cursor: "pointer", transition: "background 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(20,184,166,0.2)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(20,184,166,0.12)")}
              >
                S'inscrire maintenant
              </button>
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16, marginTop: 24 }} className="info-grid">
            {[
              { type: "MOBA", color: "#3b82f6", bg: "rgba(59,130,246,0.08)", border: "rgba(59,130,246,0.2)", title: "Honor of Kings & Mobile Legends", desc: "16 équipes par titre. Format par équipes." },
              { type: "TPS",  color: "#ef4444", bg: "rgba(239,68,68,0.08)",  border: "rgba(239,68,68,0.2)",  title: "PUBG Mobile & Free Fire",        desc: "32 joueurs par titre. Format individuel." },
            ].map((c) => (
              <div key={c.type} style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: 10, padding: "18px 22px", display: "flex", gap: 14, alignItems: "flex-start" }}>
                <span style={{ fontFamily: "'Roboto Mono:Regular',monospace", fontSize: 10, color: c.color, background: c.bg, border: `1px solid ${c.border}`, padding: "3px 8px", borderRadius: 4, letterSpacing: "0.8px", textTransform: "uppercase", flexShrink: 0, marginTop: 2 }}>{c.type}</span>
                <div>
                  <div style={{ fontFamily: "'Manrope:Medium',sans-serif", fontSize: 14, color: "#fff", marginBottom: 4 }}>{c.title}</div>
                  <div style={{ fontFamily: "'Manrope:Regular',sans-serif", fontSize: 12.5, color: "rgba(255,255,255,0.45)" }}>{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <style>{`@media(max-width:600px){.info-grid{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}
