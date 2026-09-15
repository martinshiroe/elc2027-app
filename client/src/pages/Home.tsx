import { useState, useEffect } from "react";
import { openForm } from "../components/Root";
import { loadData, SiteData } from "../lib/api";

// ─── Shared Icons ─────────────────────────────────────────────────────────────

function IconCheck() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8l3.5 3.5L13 4" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconZap() {
  return (
    <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
      <path clipRule="evenodd" fillRule="evenodd" d="M11.5 1.5L3 12.5h7.5L9.5 19.5l9.5-11H11.5L11.5 1.5z" fill="white" />
    </svg>
  );
}
function IconTarget() {
  return (
    <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
      <circle cx="10.5" cy="10.5" r="8" stroke="white" strokeWidth="1.5" />
      <circle cx="10.5" cy="10.5" r="4" stroke="white" strokeWidth="1.5" />
      <circle cx="10.5" cy="10.5" r="1.5" fill="white" />
    </svg>
  );
}
function IconTrophy() {
  return (
    <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
      <path d="M5 2h11v7a5.5 5.5 0 01-11 0V2z" stroke="white" strokeWidth="1.5" />
      <path d="M5 5H2.5a2 2 0 000 4H5M16 5h2.5a2 2 0 010 4H16" stroke="white" strokeWidth="1.5" />
      <path d="M10.5 14.5v3M7.5 19.5h6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function IconBarChart() {
  return (
    <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
      <rect x="2" y="13" width="4" height="6" fill="white" opacity="0.6" />
      <rect x="8.5" y="8" width="4" height="11" fill="white" opacity="0.8" />
      <rect x="15" y="3" width="4" height="16" fill="white" />
    </svg>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero({ onSection, heroImage }: { onSection: (id: string) => void; heroImage?: string }) {
  return (
    <section id="hero" style={{ position: "relative", overflow: "hidden", background: "#0e0e0e", paddingTop: 120, paddingBottom: 80 }}>
      {heroImage ? (
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url("${heroImage}")`, backgroundSize: "cover", backgroundPosition: "center", pointerEvents: "none" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(14,14,14,0.65) 0%, rgba(14,14,14,0.85) 60%, rgba(14,14,14,0.98) 100%)" }} />
        </div>
      ) : (
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(166.77deg, rgba(14,14,14,0) 85%, rgba(14,14,14,0.98) 100%), url("data:image/svg+xml;utf8,<svg viewBox='0 0 1440 900' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(72 90 -72 90 720 450)'><stop stop-color='rgba(20,40,40,0.9)' offset='0'/><stop stop-color='rgba(14,14,14,0.2)' offset='0.14'/><stop stop-color='rgba(14,14,14,0)' offset='0.48'/></radialGradient></defs></svg>"), linear-gradient(90deg, #0e0e0e 0%, #0e0e0e 100%)`, pointerEvents: "none" }} />
      )}
      <div style={{ position: "absolute", top: -200, left: "50%", transform: "translateX(-50%)", width: 800, height: 500, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(20,184,166,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 28px", position: "relative", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(20,184,166,0.12)", border: "1px solid rgba(20,184,166,0.3)", borderRadius: 20, padding: "5px 14px", marginBottom: 32 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#14b8a6", flexShrink: 0, animation: "pulse 2s infinite" }} />
          <span style={{ fontFamily: "'Roboto Mono:Regular', 'Roboto Mono', monospace", fontSize: 11, color: "#14b8a6", letterSpacing: "1.2px", textTransform: "uppercase" }}>East League of Cameroon · Saison 2027</span>
        </div>

        <h1 style={{ fontFamily: "'Inter:Medium', 'Inter', sans-serif", fontWeight: 500, fontSize: "clamp(44px, 7.5vw, 101px)", lineHeight: 1.01, letterSpacing: "clamp(-2px, -0.04em, -4px)", color: "#fff", margin: "0 auto 24px", maxWidth: 900 }}>
          Compétis avec les meilleurs — sans compromis
        </h1>

        <p style={{ fontFamily: "'Inter:Regular', 'Inter', sans-serif", fontSize: 18, color: "rgba(255,255,255,0.6)", lineHeight: 1.9, maxWidth: 640, margin: "0 auto 40px" }}>
          Honor of Kings, Mobile Legends, PUBG Mobile, Free Fire —{" "}
          quatre disciplines, des dizaines d'équipes, une saison qui décide tout.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={openForm}
            style={{ background: "#14b8a6", color: "#0e0e0e", padding: "14px 28px", borderRadius: 6, fontFamily: "'Inter:Medium', sans-serif", fontSize: 15, fontWeight: 500, border: "none", cursor: "pointer", transition: "opacity 0.15s" }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            S'inscrire gratuitement
          </button>
          <button
            onClick={() => onSection("competition")}
            style={{ background: "rgba(255,255,255,0.06)", color: "#fff", padding: "14px 28px", borderRadius: 6, fontFamily: "'Inter:Medium', sans-serif", fontSize: 15, fontWeight: 500, border: "1px solid rgba(255,255,255,0.14)", cursor: "pointer", transition: "background 0.15s" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
          >
            Voir le calendrier
          </button>
        </div>

        {/* Aperçu d'interface — illustration générique, pas des données réelles */}
        <div style={{ marginTop: 64, position: "relative", maxWidth: 1100, margin: "64px auto 0" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(107deg, rgba(20,184,166,0.25) 0%, rgba(34,197,94,0.15) 100%)", filter: "blur(60px)", borderRadius: 16, opacity: 0.5 }} />
          <div style={{ position: "relative", background: "#12192b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, overflow: "hidden" }}>
            <div style={{ background: "#1a2540", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "12px 20px", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444", opacity: 0.7 }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#f59e0b", opacity: 0.7 }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e", opacity: 0.7 }} />
              <span style={{ marginLeft: 12, fontFamily: "'Roboto Mono:Regular', monospace", fontSize: 11, color: "rgba(255,255,255,0.3)" }}>Aperçu — East League of Cameroon</span>
            </div>
            <div style={{ padding: "24px 28px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
              <div style={{ gridColumn: "1 / -1", background: "#0e1528", border: "1px solid rgba(20,184,166,0.2)", borderRadius: 10, padding: "16px 20px", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                <span style={{ fontFamily: "'Roboto Mono:Regular', monospace", fontSize: 10, color: "#14b8a6", letterSpacing: "1px", textTransform: "uppercase" }}>Exemple de match · MOBA</span>
                <div style={{ flex: 1, display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 20 }}>
                  <span style={{ fontFamily: "'Inter:Medium', sans-serif", fontSize: 16, fontWeight: 500 }}>Équipe A</span>
                  <span style={{ fontFamily: "'Roboto Mono:Regular', monospace", fontSize: 18, color: "#14b8a6", fontWeight: 700 }}>VS</span>
                  <span style={{ fontFamily: "'Inter:Medium', sans-serif", fontSize: 16, fontWeight: 500 }}>Équipe B</span>
                </div>
              </div>
              {[{ val: "4", lbl: "Disciplines officielles", color: "#14b8a6" }, { val: "2", lbl: "Formats compétitifs", color: "#22c55e" }, { val: "16", lbl: "Équipes par MOBA", color: "#3b82f6" }].map((s) => (
                <div key={s.lbl} style={{ background: "#0e1528", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, padding: 16 }}>
                  <div style={{ fontFamily: "'Inter:Medium', sans-serif", fontSize: 28, fontWeight: 500, color: s.color, lineHeight: 1 }}>{s.val}</div>
                  <div style={{ fontFamily: "'Inter:Regular', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 6 }}>{s.lbl}</div>
                </div>
              ))}
            </div>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 60, background: "linear-gradient(to top, #12192b, transparent)", pointerEvents: "none" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Benefit Cards ─────────────────────────────────────────────────────────────

function BenefitCards() {
  const cards = [
    { icon: <IconZap />, title: "Inscris-toi en minutes", text: "Rejoins la compétition en quelques clics. Renseigne ton pseudo, ta discipline et c'est parti — sans frais, sans friction." },
    { icon: <IconTarget />, title: "4 disciplines, un seul tournoi", text: "MOBA ou TPS, Honor of Kings, Mobile Legends, PUBG Mobile ou Free Fire — trouve ton terrain de jeu et domine." },
    { icon: <IconTrophy />, title: "Panthéon & distinctions", text: "Grave ton nom dans l'histoire avec GodLike, Demon King, MVP ou G.O.A.T — des cadres reconnaissables au premier coup d'œil." },
    { icon: <IconBarChart />, title: "Classements en direct", text: "Scores, points, victoires et défaites — tout est mis à jour dès la publication des résultats officiels." },
  ];

  return (
    <section style={{ background: "#0e0e0e", padding: "0 28px 100px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 30 }} className="grid-benefit">
        {cards.map((c) => (
          <div key={c.title} style={{ position: "relative", display: "flex", flexDirection: "column", gap: 16, paddingTop: 34, paddingBottom: 9 }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, borderTop: "1px solid rgba(187,187,187,0.35)" }} />
            <div style={{ position: "relative", height: 26 }}>
              <div style={{ position: "absolute", left: 0, top: 2, width: 21 }}>{c.icon}</div>
              <div style={{ position: "absolute", left: 32, right: 0, top: 0, bottom: 0, display: "flex", alignItems: "center" }}>
                <span style={{ fontFamily: "'Inter:Medium', sans-serif", fontWeight: 500, fontSize: 18, color: "#fff", letterSpacing: "-0.36px", lineHeight: "26px" }}>{c.title}</span>
              </div>
            </div>
            <p style={{ fontFamily: "'Inter:Regular', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: "26px", margin: 0 }}>{c.text}</p>
          </div>
        ))}
      </div>
      <style>{`
        @media(max-width:900px){.grid-benefit{grid-template-columns:repeat(2,1fr)!important}}
        @media(max-width:560px){.grid-benefit{grid-template-columns:1fr!important}}
      `}</style>
    </section>
  );
}

// ─── Feature Section (barèmes réels) ──────────────────────────────────────────

function FeatureSection({ data }: { data: SiteData | null }) {
  const moba = data?.competition?.hok?.bareme;
  const tps = data?.competition?.pubgm?.bareme;

  const features = [
    "Bracket officiel pour chaque titre — HoK et Mobile Legends en format équipes, PUBG Mobile et Free Fire en classement individuel.",
    moba && tps
      ? `Barème transparent : ${moba.victoire} pts victoire MOBA, ${tps.places?.[0] ?? "—"} pts 1re place Battle Royale + ${tps.elimination ?? "—"} pt par élimination.`
      : "Barème transparent, identique pour toutes les équipes et tous les joueurs de la saison.",
    "Résultats validés et publiés dès la fin de chaque match.",
    "Espace joueur et espace équipe distincts — chacun gère ses stats, l'autre gère son roster.",
  ];

  return (
    <section id="competition" style={{ position: "relative", overflow: "hidden", background: "#0e0e0e", padding: "120px 28px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="feat-grid">
        <div>
          <div style={{ fontFamily: "'Inter:Medium', sans-serif", fontSize: 13, color: "#14b8a6", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 20 }}>Format compétitif</div>
          <h2 style={{ fontFamily: "'Inter:Medium', sans-serif", fontWeight: 500, fontSize: "clamp(32px, 4.5vw, 56px)", lineHeight: 1.08, letterSpacing: "-1.8px", color: "#fff", margin: "0 0 24px" }}>
            Une compétition<br />structurée pour tous
          </h2>
          <p style={{ fontFamily: "'Inter:Regular', sans-serif", fontSize: 17, color: "rgba(255,255,255,0.55)", lineHeight: 1.8, margin: "0 0 36px" }}>
            Du barème à la remise des distinctions, chaque règle est transparente et appliquée sans exception — pour que le meilleur gagne, toujours.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {features.map((f) => (
              <div key={f} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <span style={{ flexShrink: 0, marginTop: 3 }}><IconCheck /></span>
                <span style={{ fontFamily: "'Inter:Regular', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.65 }}>{f}</span>
              </div>
            ))}
          </div>
          <button
            onClick={openForm}
            style={{ display: "inline-block", marginTop: 40, background: "#14b8a6", color: "#0e0e0e", padding: "12px 24px", borderRadius: 6, fontFamily: "'Inter:Medium', sans-serif", fontSize: 14, fontWeight: 500, border: "none", cursor: "pointer", transition: "opacity 0.15s" }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            S'inscrire à la compétition
          </button>
        </div>

        <div style={{ background: "linear-gradient(to bottom, rgba(187,187,187,0.1), rgba(0,0,0,0))", borderRadius: 14, border: "1px solid rgba(255,255,255,0.08)", padding: 24, overflow: "hidden" }}>
          <div style={{ fontFamily: "'Roboto Mono:Regular', monospace", fontSize: 10, color: "#14b8a6", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 16 }}>Barèmes officiels · Saison 2027</div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.25)", borderRadius: 6, padding: "8px 12px", marginBottom: 10, fontFamily: "'Inter:Medium', sans-serif", fontSize: 12, color: "#3b82f6" }}>MOBA — Honor of Kings · Mobile Legends</div>
            {[["Victoire", moba?.victoire], ["Match nul", moba?.nul], ["Défaite", moba?.defaite]].map(([r, p]) => (
              <div key={r as string} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <span style={{ fontFamily: "'Inter:Regular', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.55)" }}>{r}</span>
                <span style={{ fontFamily: "'Roboto Mono:Regular', monospace", fontSize: 13, color: "#14b8a6", fontWeight: 700 }}>{p != null ? `${p} pt${p === 1 ? "" : "s"}` : "—"}</span>
              </div>
            ))}
          </div>
          <div>
            <div style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 6, padding: "8px 12px", marginBottom: 10, fontFamily: "'Inter:Medium', sans-serif", fontSize: 12, color: "#ef4444" }}>TPS Battle Royale — PUBG Mobile · Free Fire</div>
            {(tps?.places || []).slice(0, 3).map((pts: number, i: number) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <span style={{ fontFamily: "'Inter:Regular', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.55)" }}>{i === 0 ? "1re place" : `${i + 1}e place`}</span>
                <span style={{ fontFamily: "'Roboto Mono:Regular', monospace", fontSize: 13, color: "#14b8a6", fontWeight: 700 }}>{pts} pts</span>
              </div>
            ))}
            {tps?.elimination != null && (
              <div style={{ display: "flex", justifyContent: "space-between", padding: "7px 0" }}>
                <span style={{ fontFamily: "'Inter:Regular', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.55)" }}>Chaque élimination</span>
                <span style={{ fontFamily: "'Roboto Mono:Regular', monospace", fontSize: 13, color: "#14b8a6", fontWeight: 700 }}>+{tps.elimination} pt</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:820px){.feat-grid{grid-template-columns:1fr!important;gap:48px!important}}`}</style>
    </section>
  );
}

// ─── Stats ────────────────────────────────────────────────────────────────────

function StatsSection() {
  const stats = [
    { val: "4",  label: "Disciplines officielles",     color: "#14b8a6" },
    { val: "2",  label: "Formats compétitifs",         color: "#22c55e" },
    { val: "16", label: "Équipes par discipline MOBA", color: "#3b82f6" },
    { val: "32", label: "Joueurs par discipline TPS",  color: "#f59e0b" },
    { val: "2027", label: "Saison en cours",           color: "#a78bfa" },
  ];

  return (
    <section style={{ background: "#0f0f0f", padding: "100px 28px", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ marginBottom: 64 }}>
          <h2 style={{ fontFamily: "'Inter:Medium', sans-serif", fontWeight: 500, fontSize: "clamp(28px,4vw,48px)", letterSpacing: "-1.5px", color: "#fff", margin: "0 0 16px", maxWidth: 600 }}>Une compétition qui prend de l'ampleur</h2>
          <p style={{ fontFamily: "'Inter:Regular', sans-serif", fontSize: 17, color: "rgba(255,255,255,0.5)", maxWidth: 520, lineHeight: 1.7, margin: 0 }}>Chaque saison, l'ELC rassemble plus de joueurs, plus d'équipes, et des rencontres toujours plus serrées.</p>
        </div>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {stats.map((s) => (
            <div key={s.val} style={{ flex: "1 1 200px", minWidth: 180, background: "#151515", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 24, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 80, background: `linear-gradient(to bottom, ${s.color}22, transparent)`, pointerEvents: "none" }} />
              <div style={{ fontFamily: "'Inter:Medium', sans-serif", fontWeight: 500, fontSize: 42, color: s.color, lineHeight: 1, marginBottom: 10 }}>{s.val}</div>
              <div style={{ fontFamily: "'Inter:Regular', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Disciplines ──────────────────────────────────────────────────────────────

const GAMES = {
  hok:  { label: "Honor of Kings", type: "MOBA", color: "#3b82f6", desc: "16 équipes s'affrontent dans un bracket officiel. Chaque victoire vaut 3 pts, chaque nul 1 pt. Les 4 premières accèdent aux demi-finales.", features: ["16 équipes qualifiées", "Format bracket à élimination", "Matchs en BO3 à partir des quarts", "Classement par points"] },
  mlbb: { label: "Mobile Legends", type: "MOBA", color: "#3b82f6", desc: "Même format qu'Honor of Kings — 16 équipes, bracket officiel, barème identique.", features: ["16 équipes qualifiées", "Bracket à élimination", "Classement par points", "Distinctions spéciales MOBA"] },
  pubgm:{ label: "PUBG Mobile",    type: "TPS",  color: "#ef4444", desc: "32 joueurs s'affrontent en battle royale. Le classement est établi par points de placement + éliminations.", features: ["32 joueurs par saison", "Classement placement + éliminations", "Format individuel", "Distinctions Demon King TPS"] },
  ff:   { label: "Free Fire",      type: "TPS",  color: "#ef4444", desc: "Format identique au PUBG Mobile. 32 joueurs, classement dynamique, et une communauté Free Fire très active au Cameroun.", features: ["32 joueurs inscrits", "Classement placement + éliminations", "Format individuel", "Bonus par élimination"] },
} as const;

type GameKey = keyof typeof GAMES;

function DisciplinesSection() {
  const [active, setActive] = useState<GameKey>("hok");
  const game = GAMES[active];

  return (
    <section id="disciplines" style={{ background: "#0c0c0c", padding: "120px 28px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ marginBottom: 60 }}>
          <div style={{ fontFamily: "'Inter:Medium', sans-serif", fontSize: 13, color: "#14b8a6", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 16 }}>Disciplines officielles</div>
          <h2 style={{ fontFamily: "'Inter:Medium', sans-serif", fontWeight: 500, fontSize: "clamp(30px, 4.5vw, 56px)", letterSpacing: "-1.8px", color: "#fff", margin: "0 0 20px" }}>
            Une plateforme conçue<br />pour chaque style de jeu
          </h2>
          <p style={{ fontFamily: "'Inter:Regular', sans-serif", fontSize: 17, color: "rgba(255,255,255,0.5)", maxWidth: 520, lineHeight: 1.7, margin: 0 }}>MOBA ou Battle Royale — deux formats, quatre jeux, un seul tournoi.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "360px 1fr", gap: 40, alignItems: "start" }} className="disc-grid">
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {(Object.entries(GAMES) as [GameKey, typeof GAMES[GameKey]][]).map(([key, g]) => (
              <button key={key} onClick={() => setActive(key)}
                style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 20px", borderRadius: 10, background: active === key ? "rgba(255,255,255,0.06)" : "transparent", border: active === key ? "1px solid rgba(255,255,255,0.1)" : "1px solid transparent", cursor: "pointer", textAlign: "left", transition: "background 0.15s" }}
                onMouseEnter={(e) => { if (active !== key) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)"; }}
                onMouseLeave={(e) => { if (active !== key) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: active === key ? g.color : "rgba(255,255,255,0.15)", flexShrink: 0, transition: "background 0.15s" }} />
                <span>
                  <div style={{ fontFamily: "'Inter:Medium', sans-serif", fontSize: 15, color: active === key ? "#fff" : "rgba(255,255,255,0.5)", marginBottom: 2 }}>{g.label}</div>
                  <div style={{ fontFamily: "'Roboto Mono:Regular', monospace", fontSize: 10, color: g.color, letterSpacing: "0.8px", textTransform: "uppercase", opacity: active === key ? 1 : 0.5 }}>{g.type}</div>
                </span>
              </button>
            ))}
          </div>

          <div style={{ background: "linear-gradient(to bottom, rgba(187,187,187,0.08), rgba(0,0,0,0))", borderRadius: 14, border: "1px solid rgba(255,255,255,0.08)", padding: "36px 40px", minHeight: 320 }}>
            <div style={{ display: "inline-block", background: game.color === "#3b82f6" ? "rgba(59,130,246,0.12)" : "rgba(239,68,68,0.12)", border: `1px solid ${game.color === "#3b82f6" ? "rgba(59,130,246,0.3)" : "rgba(239,68,68,0.3)"}`, color: game.color, borderRadius: 20, padding: "4px 12px", fontFamily: "'Roboto Mono:Regular', monospace", fontSize: 10, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 20 }}>{game.type}</div>
            <h3 style={{ fontFamily: "'Inter:Medium', sans-serif", fontWeight: 500, fontSize: 28, letterSpacing: "-0.8px", color: "#fff", margin: "0 0 16px" }}>{game.label}</h3>
            <p style={{ fontFamily: "'Inter:Regular', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.75, margin: "0 0 32px" }}>{game.desc}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {game.features.map((f) => (
                <div key={f} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <IconCheck />
                  <span style={{ fontFamily: "'Inter:Regular', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.7)" }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:760px){.disc-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────

function CtaSection() {
  return (
    <section style={{ background: "#0e0e0e", padding: "120px 28px", borderTop: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)", borderRadius: 20, padding: "5px 14px", marginBottom: 32 }}>
          <span style={{ fontFamily: "'Roboto Mono:Regular', monospace", fontSize: 11, color: "#22c55e", letterSpacing: "1px", textTransform: "uppercase" }}>
            Inscriptions bientôt disponibles · Saison 2027
          </span>
        </div>
        <h2 style={{ fontFamily: "'Inter:Medium', sans-serif", fontWeight: 500, fontSize: "clamp(34px, 5vw, 64px)", letterSpacing: "-2px", color: "#fff", margin: "0 0 20px" }}>
          Rejoins l'ELC 2027<br />gratuitement
        </h2>
        <p style={{ fontFamily: "'Inter:Regular', sans-serif", fontSize: 17, color: "rgba(255,255,255,0.5)", lineHeight: 1.75, margin: "0 auto 40px", maxWidth: 500 }}>
          Crée ton profil, choisis ta discipline et affronte les meilleurs joueurs de la scène camerounaise.
        </p>
        <button
          onClick={openForm}
          style={{ background: "#22c55e", color: "#06210f", padding: "14px 32px", borderRadius: 6, fontFamily: "'Inter:Medium', sans-serif", fontSize: 15, fontWeight: 500, border: "none", cursor: "pointer", transition: "opacity 0.15s" }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          S'inscrire — c'est gratuit
        </button>
      </div>
    </section>
  );
}

// ─── Home page ────────────────────────────────────────────────────────────────

export default function Home() {
  const [data, setData] = useState<SiteData | null>(null);

  const scrollTo = (id: string) => {
    if (id === "hero") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    document.title = "ELC 2027 — East League of Cameroon";
    loadData().then(setData).catch(() => {});
  }, []);

  return (
    <div style={{ background: "#0e0e0e" }}>
      <Hero onSection={scrollTo} heroImage={data?.meta?.heroImage} />
      <BenefitCards />
      <FeatureSection data={data} />
      <StatsSection />
      <DisciplinesSection />
      <CtaSection />
    </div>
  );
}
