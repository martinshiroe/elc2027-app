import { useEffect, useState } from "react";
import { loadData } from "../lib/api";

export default function LegalModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    loadData()
      .then((d) => setText(d.meta?.liens?.statutsTexte || ""))
      .finally(() => setLoading(false));
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, maxWidth: 640, width: "100%", maxHeight: "80vh", display: "flex", flexDirection: "column" }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <span style={{ fontFamily: "'Manrope:Medium',sans-serif", fontSize: 16, color: "#fff" }}>Mentions légales & statuts</span>
          <button
            onClick={onClose}
            aria-label="Fermer"
            style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: 20, cursor: "pointer", lineHeight: 1, padding: 4 }}
          >
            ✕
          </button>
        </div>
        <div style={{ padding: "22px 24px", overflowY: "auto", fontFamily: "'Manrope:Regular',sans-serif", fontSize: 13.5, color: "rgba(255,255,255,0.65)", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>
          {loading ? "Chargement…" : text || "Aucun texte légal renseigné pour le moment."}
        </div>
      </div>
    </div>
  );
}
