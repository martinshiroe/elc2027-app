import { useEffect, useState } from "react";
import { loadData, SiteData } from "../lib/api";

const DISTINCTIONS = [
  { key: "goat", title: "G.O.A.T", subtitle: "Greatest Of All Time", desc: "Décerné au joueur le plus dominant de la saison, toutes disciplines confondues. Une seule attribution par saison.", border: "#ffd700", text: "#ffd700", glow: "rgba(255,215,0,0.1)", gradient: "rgba(255,215,0,0.06)" },
  { key: "godlike", title: "GodLike", subtitle: "Meilleur joueur MOBA", desc: "Performance exceptionnelle dans les disciplines MOBA (Honor of Kings, Mobile Legends). Élu sur les stats de la saison entière.", border: "#3b82f6", text: "#3b82f6", glow: "rgba(59,130,246,0.1)", gradient: "rgba(59,130,246,0.06)" },
  { key: "demonking", title: "Demon King", subtitle: "Meilleur joueur TPS", desc: "Domination absolue dans les disciplines Battle Royale (PUBG Mobile, Free Fire). Calculé sur le cumul des points saison.", border: "#ef4444", text: "#ef4444", glow: "rgba(239,68,68,0.1)", gradient: "rgba(239,68,68,0.06)" },
  { key: "mvp", title: "MVP", subtitle: "Most Valuable Player", desc: "Élu par les pairs et les organisateurs pour son impact en jeu et son fair-play exemplaire tout au long de la saison.", border: "#14b8a6", text: "#14b8a6", glow: "rgba(20,184,166,0.1)", gradient: "rgba(20,184,166,0.06)" },
];

function DistinctionCard({ d, laureat }: { d: typeof DISTINCTIONS[0]; laureat: any }) {
  return (
    <div style={{ background: "#111", border: `2px solid ${d.border}`, borderRadius: 16, overflow: "hidden", display: "flex", flexDirection: "column", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 120, background: `radial-gradient(ellipse at 50% 0%, ${d.glow}, transparent 70%)`, pointerEvents: "none" }} />
      <div style={{ padding: "32px 28px 0", textAlign: "center", position: "relative" }}>
        <div style={{ fontFamily: "'Roboto Mono:Regular','Roboto Mono',monospace", fontSize: 10, letterSpacing: "1px", textTransform: "uppercase", color: d.text, marginBottom: 20 }}>{d.title}</div>
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: d.gradient, border: `2px solid ${d.border}`, margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
          {laureat?.photo ? (
            <img src={laureat.photo} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" stroke={d.border} strokeWidth="1.5" strokeOpacity="0.5"/>
              <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" stroke={d.border} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5"/>
            </svg>
          )}
        </div>
        <div style={{ fontFamily: "'Manrope:Medium',sans-serif", fontSize: 16, color: laureat ? "#fff" : "rgba(255,255,255,0.25)", marginBottom: 6 }}>{laureat?.nom || "— à désigner —"}</div>
        <div style={{ fontFamily: "'Roboto Mono:Regular',monospace", fontSize: 10, color: "rgba(255,255,255,0.15)", marginBottom: 28, letterSpacing: "0.5px" }}>SAISON 2027 EN COURS</div>
      </div>
      <div style={{ borderTop: `1px solid ${d.border}22`, padding: "20px 28px 28px" }}>
        <div style={{ fontFamily: "'Manrope:Medium',sans-serif", fontSize: 13, color: d.text, marginBottom: 8 }}>{d.subtitle}</div>
        <p style={{ fontFamily: "'Manrope:Regular',sans-serif", fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.65, margin: 0 }}>{d.desc}</p>
      </div>
    </div>
  );
}

export default function PagePantheon() {
  const [data, setData] = useState<SiteData | null>(null);

  useEffect(() => {
    document.title = "Panthéon — ELC 2027";
    window.scrollTo(0, 0);
    loadData().then(setData).catch(() => {});
  }, []);

  const curated: any[] = data?.pantheon?.curated || [];
  const laureatFor = (key: string) => curated.find((c) => c.distinction === key) || null;

  return (
    <div style={{ background: "#0e0e0e" }}>

      <section style={{ padding: "80px 28px 64px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ fontFamily: "'Roboto Mono:Regular','Roboto Mono',monospace", fontSize: 11, color: "#14b8a6", letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 16 }}>
            Distinctions officielles · Saison 2027
          </div>
          <h1 style={{ fontFamily: "'Manrope:Medium','Manrope',sans-serif", fontWeight: 500, fontSize: "clamp(36px,5vw,64px)", letterSpacing: "-2px", color: "#fff", margin: "0 0 20px", lineHeight: 1.05 }}>
            Panthéon
          </h1>
          <p style={{ fontFamily: "'Manrope:Regular','Manrope',sans-serif", fontSize: 17, color: "rgba(255,255,255,0.5)", maxWidth: 560, lineHeight: 1.75, margin: 0 }}>
            Les distinctions qui gravent le nom d'un joueur dans l'histoire de l'ELC. Chaque cadre a une couleur fixe, reconnaissable au premier coup d'œil.
          </p>
        </div>
      </section>

      <section style={{ padding: "80px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }} className="pan-grid">
            {DISTINCTIONS.map((d) => <DistinctionCard key={d.key} d={d} laureat={laureatFor(d.key)} />)}
          </div>
        </div>
        <style>{`
          @media(max-width:900px){.pan-grid{grid-template-columns:repeat(2,1fr)!important}}
          @media(max-width:520px){.pan-grid{grid-template-columns:1fr!important}}
        `}</style>
      </section>

      <section style={{ padding: "0 28px 80px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ background: "#111", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "40px 48px" }}>
            <h2 style={{ fontFamily: "'Manrope:Medium',sans-serif", fontWeight: 500, fontSize: 22, letterSpacing: "-0.5px", color: "#fff", margin: "0 0 28px" }}>Comment sont-elles attribuées ?</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 24 }} className="attrib-grid">
              {[
                { step: "01", title: "Fin de saison",      desc: "Les distinctions sont décernées à l'issue de la dernière journée de compétition, une fois tous les résultats validés." },
                { step: "02", title: "Calcul des stats",   desc: "G.O.A.T, GodLike et Demon King sont calculés automatiquement à partir du cumul des points saison par discipline." },
                { step: "03", title: "Vote MVP",           desc: "Le MVP est élu par les joueurs participants et les organisateurs via un formulaire de vote interne." },
                { step: "04", title: "Annonce officielle", desc: "Les lauréats sont annoncés sur les réseaux sociaux de l'ELC et leur profil est mis en avant sur cette page." },
              ].map((s) => (
                <div key={s.step} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <span style={{ fontFamily: "'Roboto Mono:Regular',monospace", fontSize: 11, color: "#14b8a6", flexShrink: 0, marginTop: 3 }}>{s.step}</span>
                  <div>
                    <div style={{ fontFamily: "'Manrope:Medium',sans-serif", fontSize: 14, color: "#fff", marginBottom: 6 }}>{s.title}</div>
                    <div style={{ fontFamily: "'Manrope:Regular',sans-serif", fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.65 }}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`@media(max-width:640px){.attrib-grid{grid-template-columns:1fr!important}}`}</style>
      </section>

    </div>
  );
}
