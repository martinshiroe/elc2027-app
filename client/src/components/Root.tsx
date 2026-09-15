import { Outlet, NavLink, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { loadData } from "../lib/api";
import LegalModal from "./LegalModal";

// Ouvre le formulaire d'inscription réel s'il est renseigné dans les données,
// sinon informe honnêtement que les inscriptions ne sont pas encore ouvertes
// (aucune URL de formulaire n'existe encore dans les données réelles).
export async function openForm() {
  try {
    const d = await loadData();
    const url = (d as any).meta?.googleFormUrl || "";
    if (url) { window.open(url, "_blank", "noopener,noreferrer"); return; }
  } catch {
    // ignore — on retombe sur le message ci-dessous
  }
  alert("Les inscriptions ne sont pas encore ouvertes. Revenez bientôt !");
}

const NAV_LINKS = [
  { label: "Compétition", to: "/competition" },
  { label: "Classements", to: "/classements" },
  { label: "Joueurs",     to: "/joueurs" },
  { label: "Panthéon",   to: "/pantheon" },
];

const SOCIAL_DEFS: { key: string; label: string; icon: JSX.Element }[] = [
  { key: "facebook",  label: "Facebook",  icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047v-2.66c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.874v2.277h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg> },
  { key: "instagram", label: "Instagram", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> },
  { key: "youtube",   label: "YouTube",   icon: <svg width="17" height="12" viewBox="0 0 24 17" fill="currentColor"><path d="M23.495 2.194a3.054 3.054 0 00-2.148-2.152C19.37 0 12 0 12 0S4.63 0 2.653.528a3.054 3.054 0 00-2.148 2.166C0 4.697 0 8.5 0 8.5s0 3.818.505 5.306a3.054 3.054 0 002.148 2.152C4.63 16.5 12 16.5 12 16.5s7.37 0 9.347-.528a3.054 3.054 0 002.148-2.152C24 12.318 24 8.5 24 8.5s0-3.803-.505-6.306zM9.6 12.14V4.86L15.818 8.5 9.6 12.14z"/></svg> },
  { key: "tiktok",    label: "TikTok",    icon: <svg width="13" height="15" viewBox="0 0 24 27" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34l-.01-8.44a8.19 8.19 0 004.79 1.53V5.03a4.85 4.85 0 01-1.01-.34z"/></svg> },
  { key: "discord",   label: "Discord",   icon: <svg width="17" height="13" viewBox="0 0 24 18" fill="currentColor"><path d="M20.317 1.492a19.825 19.825 0 00-4.885-1.515.074.074 0 00-.079.037 13.84 13.84 0 00-.609 1.252 18.303 18.303 0 00-5.487 0 12.7 12.7 0 00-.617-1.252.077.077 0 00-.079-.037A19.736 19.736 0 003.677 1.49a.07.07 0 00-.032.028C.533 6.093-.32 10.555.099 14.961a.08.08 0 00.031.055 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 12.278c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg> },
];

function Nav() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 100, background: scrolled ? "rgba(14,14,14,0.95)" : "rgba(14,14,14,0.88)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.08)", transition: "background 0.2s" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 28px", height: 60, display: "flex", alignItems: "center", gap: 8 }}>
        <button onClick={() => navigate("/")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 8, marginRight: 16 }}>
          <img src="/img/logo-elc-wordmark.png" alt="ELC" style={{ height: 22, width: "auto", flexShrink: 0 }} />
          <span style={{ fontFamily: "'Inter:Medium', sans-serif", fontWeight: 500, fontSize: 15, color: "#14b8a6", letterSpacing: "-0.2px", whiteSpace: "nowrap" }}>2027</span>
        </button>

        <div style={{ display: "flex", gap: 2, flex: 1, overflowX: "auto" }}>
          {NAV_LINKS.map((l) => (
            <NavLink key={l.to} to={l.to}
              style={({ isActive }) => ({
                padding: "6px 14px", borderRadius: 6,
                fontFamily: "'Inter:Regular', sans-serif", fontSize: 14,
                color: isActive ? "#fff" : "rgba(255,255,255,0.55)",
                background: isActive ? "rgba(255,255,255,0.07)" : "transparent",
                textDecoration: "none", whiteSpace: "nowrap",
                transition: "color 0.15s, background 0.15s",
              })}
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: 8, flexShrink: 0 }}>
          <button onClick={openForm}
            style={{ background: "#14b8a6", color: "#0e0e0e", padding: "7px 18px", borderRadius: 6, fontFamily: "'Inter:Medium', sans-serif", fontSize: 13, fontWeight: 500, border: "none", cursor: "pointer", transition: "opacity 0.15s" }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            S'inscrire
          </button>
        </div>
      </div>
    </nav>
  );
}

function Footer({ onOpenLegal }: { onOpenLegal: () => void }) {
  const [socials, setSocials] = useState<Record<string, string>>({});
  const [contact, setContact] = useState<{ telephone?: string; email?: string }>({});

  useEffect(() => {
    loadData().then((d) => {
      setSocials(d.meta?.reseaux || {});
      setContact(d.meta?.contact || {});
    }).catch(() => {});
  }, []);

  const activeSocials = SOCIAL_DEFS.filter((s) => socials[s.key]);

  const cols = [
    { title: "Compétition",  links: [{ label: "Calendrier", to: "/competition" }, { label: "Classements", to: "/classements" }, { label: "Joueurs", to: "/joueurs" }, { label: "Panthéon", to: "/pantheon" }] },
    { title: "Disciplines",  links: [{ label: "Honor of Kings", to: "/competition" }, { label: "Mobile Legends", to: "/competition" }, { label: "PUBG Mobile", to: "/competition" }, { label: "Free Fire", to: "/competition" }] },
  ];

  return (
    <footer style={{ background: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "72px 28px 40px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "220px 1fr 1fr 1fr", gap: 48, marginBottom: 56 }} className="footer-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <img src="/img/logo-league.png" alt="ELC" style={{ width: 26, height: 26, borderRadius: "50%", objectFit: "cover", background: "#fff" }} />
              <span style={{ fontFamily: "'Inter:Medium',sans-serif", fontSize: 14, color: "#fff" }}>ELC <span style={{ color: "#14b8a6" }}>2027</span></span>
            </div>
            <p style={{ fontFamily: "'Inter:Regular',sans-serif", fontSize: 12.5, color: "rgba(255,255,255,0.38)", lineHeight: 1.7, margin: "0 0 22px" }}>Ligue Esport Est Cameroun — la compétition esport qui fait vibrer le Cameroun.</p>
            {activeSocials.length > 0 && (
              <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
                {activeSocials.map(({ icon, label, key }) => (
                  <a key={key} href={socials[key]} target="_blank" rel="noopener noreferrer" title={label}
                    style={{ width: 33, height: 33, borderRadius: 8, background: "#161616", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "color 0.15s, border-color 0.15s" }}
                    onMouseEnter={(e) => { (e.currentTarget.style.color = "#14b8a6"); (e.currentTarget.style.borderColor = "rgba(20,184,166,0.4)"); }}
                    onMouseLeave={(e) => { (e.currentTarget.style.color = "rgba(255,255,255,0.4)"); (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"); }}
                  >{icon}</a>
                ))}
              </div>
            )}
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <div style={{ fontFamily: "'Inter:Medium',sans-serif", fontSize: 12, color: "#fff", marginBottom: 14 }}>{col.title}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {col.links.map((l) => (
                  <NavLink key={l.label} to={l.to}
                    style={{ fontFamily: "'Inter:Regular',sans-serif", fontSize: 13, color: "rgba(255,255,255,0.38)", textDecoration: "none", transition: "color 0.15s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.38)")}
                  >{l.label}</NavLink>
                ))}
              </div>
            </div>
          ))}
          <div>
            <div style={{ fontFamily: "'Inter:Medium',sans-serif", fontSize: 12, color: "#fff", marginBottom: 14 }}>Contact</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {contact.email && (
                <a href={`mailto:${contact.email}`} style={{ fontFamily: "'Inter:Regular',sans-serif", fontSize: 13, color: "rgba(255,255,255,0.38)", textDecoration: "none" }}>{contact.email}</a>
              )}
              {contact.telephone && (
                <a href={`tel:${contact.telephone.replace(/\s/g, "")}`} style={{ fontFamily: "'Inter:Regular',sans-serif", fontSize: 13, color: "rgba(255,255,255,0.38)", textDecoration: "none" }}>{contact.telephone}</a>
              )}
              <button onClick={onOpenLegal} style={{ background: "none", border: "none", padding: 0, textAlign: "left", cursor: "pointer", fontFamily: "'Inter:Regular',sans-serif", fontSize: 13, color: "rgba(255,255,255,0.38)" }}>Mentions légales</button>
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 22, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <span style={{ fontFamily: "'Inter:Regular',sans-serif", fontSize: 12, color: "rgba(255,255,255,0.28)" }}>© 2027 Ligue Esport Est Cameroun · Tous droits réservés</span>
        </div>
      </div>
      <style>{`
        @media(max-width:860px){.footer-grid{grid-template-columns:1fr 1fr!important}}
        @media(max-width:520px){.footer-grid{grid-template-columns:1fr!important}}
      `}</style>
    </footer>
  );
}

export default function Root() {
  const [legalOpen, setLegalOpen] = useState(false);
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div style={{ background: "#0e0e0e", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Nav />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer onOpenLegal={() => setLegalOpen(true)} />
      <LegalModal open={legalOpen} onClose={() => setLegalOpen(false)} />
    </div>
  );
}
