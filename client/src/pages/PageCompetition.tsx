import { useEffect, useState } from "react";
import { openForm } from "../components/Root";
import { loadData, SiteData } from "../lib/api";

function IconCheck() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2.5 7l3 3 6-6" stroke="#14b8a6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const DISCIPLINE_STATIC: Record<string, { title: string; type: "MOBA" | "TPS"; color: string; format: string; details: string[] }> = {
  hok:  { title: "Honor of Kings", type: "MOBA", color: "#3b82f6", format: "Équipes", details: ["Bracket officiel à élimination", "Matchs en BO1 phase de groupes, BO3 en playoffs", "Classement final déterminé par le barème officiel"] },
  mlbb: { title: "Mobile Legends", type: "MOBA", color: "#3b82f6", format: "Équipes", details: ["Même format qu'Honor of Kings", "Matchs en BO1 phase de groupes, BO3 playoffs", "Classement final déterminé par le barème officiel"] },
  pubgm:{ title: "PUBG Mobile",    type: "TPS",  color: "#ef4444", format: "Individuel", details: ["Classement par points de placement + éliminations", "Cumul des points sur l'ensemble des sessions", "Barème détaillé ci-dessus"] },
  ff:   { title: "Free Fire",      type: "TPS",  color: "#ef4444", format: "Individuel", details: ["Même barème que PUBG Mobile", "Cumul des points sur l'ensemble des sessions", "Barème détaillé ci-dessus"] },
};

const DISCIPLINE_ORDER = ["hok", "mlbb", "pubgm", "ff"];

export default function PageCompetition() {
  const [data, setData] = useState<SiteData | null>(null);

  useEffect(() => {
    document.title = "Compétition — ELC 2027";
    window.scrollTo(0, 0);
    loadData().then(setData).catch(() => {});
  }, []);

  const moba = data?.competition?.hok?.bareme;
  const tps = data?.competition?.pubgm?.bareme;

  const mobaRows = [
    { result: "Victoire", pts: moba?.victoire, color: "#22c55e" },
    { result: "Match nul", pts: moba?.nul, color: "#f59e0b" },
    { result: "Défaite", pts: moba?.defaite, color: "#ef4444" },
  ];
  const tpsRows = (tps?.places || []).map((pts: number, i: number) => ({
    result: i === 0 ? "1re place" : `${i + 1}e place`,
    pts,
    color: i === 0 ? "#ffd700" : i < 3 ? "#22c55e" : i < 6 ? "#f59e0b" : "#8b96ab",
  }));

  return (
    <div style={{ background: "#0e0e0e" }}>

      <section style={{ padding: "80px 28px 64px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ fontFamily: "'Roboto Mono:Regular','Roboto Mono',monospace", fontSize: 11, color: "#14b8a6", letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 16 }}>
            Saison 2027 · Format officiel
          </div>
          <h1 style={{ fontFamily: "'Inter:Medium','Inter',sans-serif", fontWeight: 500, fontSize: "clamp(36px,5vw,64px)", letterSpacing: "-2px", color: "#fff", margin: "0 0 20px", lineHeight: 1.05 }}>
            Compétition
          </h1>
          <p style={{ fontFamily: "'Inter:Regular','Inter',sans-serif", fontSize: 17, color: "rgba(255,255,255,0.5)", maxWidth: 560, lineHeight: 1.75, margin: 0 }}>
            Calendrier, barèmes et format pour chaque discipline de la saison 2027 de la Ligue Esport Est Cameroun.
          </p>
        </div>
      </section>

      {/* ── Barèmes (données réelles) ── */}
      <section style={{ padding: "80px 28px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Inter:Medium',sans-serif", fontWeight: 500, fontSize: 26, letterSpacing: "-0.6px", color: "#fff", margin: "0 0 8px" }}>Barèmes officiels</h2>
          <p style={{ fontFamily: "'Inter:Regular',sans-serif", fontSize: 14, color: "rgba(255,255,255,0.4)", margin: "0 0 40px" }}>Points attribués selon le format de la discipline.</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="bareme-grid">
            <div style={{ background: "#111", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 14, overflow: "hidden" }}>
              <div style={{ background: "rgba(59,130,246,0.08)", borderBottom: "1px solid rgba(59,130,246,0.2)", padding: "18px 24px", display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#3b82f6" }} />
                <span style={{ fontFamily: "'Inter:Medium',sans-serif", fontSize: 14, color: "#3b82f6" }}>MOBA — Honor of Kings · Mobile Legends</span>
              </div>
              <div style={{ padding: "8px 0" }}>
                {mobaRows.map((row) => (
                  <div key={row.result} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 24px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <span style={{ fontFamily: "'Inter:Regular',sans-serif", fontSize: 14, color: "rgba(255,255,255,0.6)" }}>{row.result}</span>
                    <span style={{ fontFamily: "'Roboto Mono:Regular',monospace", fontSize: 15, fontWeight: 700, color: row.color }}>{row.pts != null ? `${row.pts} pt${row.pts === 1 ? "" : "s"}` : "—"}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "#111", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 14, overflow: "hidden" }}>
              <div style={{ background: "rgba(239,68,68,0.08)", borderBottom: "1px solid rgba(239,68,68,0.2)", padding: "18px 24px", display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444" }} />
                <span style={{ fontFamily: "'Inter:Medium',sans-serif", fontSize: 14, color: "#ef4444" }}>TPS Battle Royale — PUBG Mobile · Free Fire</span>
              </div>
              <div style={{ padding: "8px 0" }}>
                {tpsRows.length ? tpsRows.map((row: any) => (
                  <div key={row.result} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 24px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <span style={{ fontFamily: "'Inter:Regular',sans-serif", fontSize: 14, color: "rgba(255,255,255,0.6)" }}>{row.result}</span>
                    <span style={{ fontFamily: "'Roboto Mono:Regular',monospace", fontSize: 15, fontWeight: 700, color: row.color }}>{row.pts} pts</span>
                  </div>
                )) : (
                  <div style={{ padding: "12px 24px", fontFamily: "'Inter:Regular',sans-serif", fontSize: 13, color: "rgba(255,255,255,0.3)" }}>Chargement…</div>
                )}
                {tps?.elimination != null && (
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 24px" }}>
                    <span style={{ fontFamily: "'Inter:Regular',sans-serif", fontSize: 14, color: "rgba(255,255,255,0.6)" }}>Chaque élimination</span>
                    <span style={{ fontFamily: "'Roboto Mono:Regular',monospace", fontSize: 15, fontWeight: 700, color: "#14b8a6" }}>+{tps.elimination} pt</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <style>{`@media(max-width:640px){.bareme-grid{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* ── Disciplines ── */}
      <section style={{ padding: "80px 28px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Inter:Medium',sans-serif", fontWeight: 500, fontSize: 26, letterSpacing: "-0.6px", color: "#fff", margin: "0 0 8px" }}>Disciplines</h2>
          <p style={{ fontFamily: "'Inter:Regular',sans-serif", fontSize: 14, color: "rgba(255,255,255,0.4)", margin: "0 0 40px" }}>Format détaillé pour chacun des quatre jeux officiels.</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }} className="disc-grid">
            {DISCIPLINE_ORDER.map((id) => {
              const d = DISCIPLINE_STATIC[id];
              const real = data?.competition?.[id];
              const teams = real?.bracket?.equipes?.length ?? real?.roster?.length ?? (d.type === "MOBA" ? 16 : 32);
              return (
                <div key={id} style={{ background: "#111", border: `1px solid ${d.color === "#3b82f6" ? "rgba(59,130,246,0.18)" : "rgba(239,68,68,0.18)"}`, borderRadius: 14, overflow: "hidden" }}>
                  {real?.heroImage && (
                    <div style={{ height: 120, backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(17,17,17,0.9)), url("${real.heroImage}")`, backgroundSize: "cover", backgroundPosition: "center" }} />
                  )}
                  <div style={{ padding: "24px 28px 20px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                      <span style={{ fontFamily: "'Roboto Mono:Regular',monospace", fontSize: 10, color: d.color, background: d.color === "#3b82f6" ? "rgba(59,130,246,0.1)" : "rgba(239,68,68,0.1)", border: `1px solid ${d.color === "#3b82f6" ? "rgba(59,130,246,0.25)" : "rgba(239,68,68,0.25)"}`, padding: "2px 8px", borderRadius: 4, letterSpacing: "0.8px", textTransform: "uppercase" }}>{d.type}</span>
                      <span style={{ fontFamily: "'Roboto Mono:Regular',monospace", fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: "0.5px" }}>{d.format} · {teams} participants</span>
                    </div>
                    <h3 style={{ fontFamily: "'Inter:Medium',sans-serif", fontWeight: 500, fontSize: 20, color: "#fff", margin: 0, letterSpacing: "-0.4px" }}>{real?.nom || d.title}</h3>
                  </div>
                  <div style={{ padding: "20px 28px", display: "flex", flexDirection: "column", gap: 10 }}>
                    {d.details.map((line) => (
                      <div key={line} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <span style={{ flexShrink: 0, marginTop: 2 }}><IconCheck /></span>
                        <span style={{ fontFamily: "'Inter:Regular',sans-serif", fontSize: 13.5, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>{line}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <style>{`@media(max-width:680px){.disc-grid{grid-template-columns:1fr!important}}`}</style>
      </section>

      <section style={{ padding: "80px 28px", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Inter:Medium',sans-serif", fontWeight: 500, fontSize: "clamp(26px,4vw,42px)", letterSpacing: "-1.2px", color: "#fff", margin: "0 0 16px" }}>
            Prêt à concourir ?
          </h2>
          <p style={{ fontFamily: "'Inter:Regular',sans-serif", fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.75, margin: "0 0 36px" }}>
            Inscris-toi via le formulaire officiel de la saison 2027.
          </p>
          <button
            onClick={openForm}
            style={{ background: "#14b8a6", color: "#0e0e0e", padding: "13px 28px", borderRadius: 6, fontFamily: "'Inter:Medium',sans-serif", fontSize: 14, fontWeight: 500, border: "none", cursor: "pointer", transition: "opacity 0.15s" }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            S'inscrire à l'ELC 2027
          </button>
        </div>
      </section>

    </div>
  );
}
