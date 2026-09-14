// ELC 2027 — page d'accueil (vitrine publique)
// Charge les données réelles depuis /api/data — aucune donnée fictive n'est affichée.
(function () {
  "use strict";

  var LOGO_DATA_URI = "data:image/png;base64,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";
  document.querySelectorAll(".elc-logo-img").forEach(function (img) { img.src = LOGO_DATA_URI; });

  var TITLE_IDS = ["hok", "mlbb", "pubgm", "ff"];
  var PANTHEON_TITLES = {
    godlike: { label: "GodLike", cls: "moba", color: "var(--blue)" },
    demonking: { label: "Demon King", cls: "tps", color: "var(--red)" },
    mvp: { label: "MVP", cls: "mvp", color: "var(--teal)" },
    topfragger: { label: "Top Fraggeur", cls: "tps", color: "var(--red)" },
    goat: { label: "G.O.A.T", cls: "goat", color: "#ffd700" }
  };
  var GAME_COPY = {
    hok: { desc: "16 équipes s'affrontent dans un bracket officiel. Chaque victoire vaut des points, chaque nul un demi-succès. Les meilleures équipes accèdent aux phases finales.", features: ["16 équipes qualifiées", "Format bracket officiel", "Stats par équipe et par joueur"] },
    mlbb: { desc: "Même format qu'Honor of Kings — 16 équipes, bracket officiel, barème identique. La discipline accueille un grand nombre de joueurs.", features: ["16 équipes qualifiées", "Bracket officiel", "Stats complètes par joueur"] },
    pubgm: { desc: "32 joueurs s'affrontent en battle royale. Le classement est établi par points de placement + éliminations.", features: ["32 joueurs par saison", "Classement placement + kills", "Distinctions Demon King TPS"] },
    ff: { desc: "Format identique au PUBG Mobile. 32 joueurs, classement dynamique, et une communauté Free Fire très active au Cameroun.", features: ["32 joueurs inscrits", "Classement placement + kills", "Bonus par élimination"] }
  };

  function esc(s) {
    return (s == null ? "" : String(s)).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function initials(name) {
    return (name || "?").trim().split(/\s+/).slice(0, 2).map(function (w) { return /^\d+$/.test(w) ? w : w[0]; }).join("").toUpperCase();
  }
  function avatarCircle(name, color, size) {
    size = size || 40;
    return '<div style="width:' + size + 'px;height:' + size + 'px;border-radius:50%;background:' + color + '22;border:1.5px solid ' + color + '55;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:' + Math.round(size * 0.32) + 'px;color:' + color + ';flex:none">' + esc(initials(name)) + '</div>';
  }

  // ---------------- Classements (mêmes règles que l'app) ----------------
  function joueurByPseudo(d, pseudo) {
    return (d.joueurs || []).find(function (j) { return (j.pseudo || j.nom) === pseudo; }) || null;
  }
  function classementMOBA(comp) {
    var teams = {};
    (comp.bracket ? comp.bracket.equipes : []).forEach(function (t) { teams[t.nom] = { equipe: t.nom, v: 0, n: 0, d: 0, pts: 0 }; });
    (comp.manches || []).forEach(function (m) {
      if (!m.equipe1 || !m.equipe2) return;
      [m.equipe1, m.equipe2].forEach(function (t) { if (!teams[t]) teams[t] = { equipe: t, v: 0, n: 0, d: 0, pts: 0 }; });
      var s1 = Number(m.score1), s2 = Number(m.score2);
      if (isNaN(s1) || isNaN(s2)) return;
      if (s1 > s2) { teams[m.equipe1].v++; teams[m.equipe2].d++; }
      else if (s2 > s1) { teams[m.equipe2].v++; teams[m.equipe1].d++; }
      else { teams[m.equipe1].n++; teams[m.equipe2].n++; }
    });
    var b = comp.bareme || { victoire: 3, nul: 1, defaite: 0 };
    return Object.values(teams).map(function (t) { t.pts = t.v * b.victoire + t.n * b.nul + t.d * b.defaite; return t; }).sort(function (a, c) { return c.pts - a.pts; });
  }
  function classementTPS(d, comp) {
    var players = {};
    function ensure(pseudo) {
      if (players[pseudo]) return players[pseudo];
      var jo = joueurByPseudo(d, pseudo);
      return (players[pseudo] = { joueur: pseudo, clan: jo ? jo.equipe : "", kills: 0, deaths: 0, pts: 0 });
    }
    (comp.roster || []).forEach(function (s) { ensure(s.nom); });
    var b = comp.bareme || { places: [15, 12, 10, 8, 6, 4, 2, 1], elimination: 1 };
    (comp.manches || []).forEach(function (m) {
      (m.resultats || []).forEach(function (r) {
        if (!r.joueur) return;
        var p = ensure(r.joueur);
        var place = Number(r.place), kills = Number(r.kills) || 0;
        var placePts = (place >= 1 && place <= b.places.length) ? b.places[place - 1] : 0;
        p.kills += kills; p.pts += placePts + kills * (b.elimination || 0);
      });
    });
    return Object.values(players).sort(function (a, c) { return c.pts - a.pts; });
  }
  function classementFor(d, id) {
    var comp = d.competition[id];
    return comp.family === "MOBA" ? classementMOBA(comp) : classementTPS(d, comp);
  }

  function render(d) {
    var meta = d.meta || {};
    document.getElementById("orgName").textContent = meta.organisateur || "";
    document.getElementById("seasonPill").textContent = "SAISON " + (meta.saison || "");

    // ---- Bouton(s) S'inscrire ----
    var formUrl = meta.googleFormUrl && meta.googleFormUrl.trim();
    ["btnInscription", "heroInscription", "featureInscription", "ctaInscription"].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      if (formUrl) { el.href = formUrl; el.hidden = false; }
      else {
        el.hidden = id === "btnInscription"; el.removeAttribute("href");
        el.addEventListener("click", function (e) { e.preventDefault(); alert("Les inscriptions ne sont pas encore ouvertes. Revenez bientôt !"); });
      }
    });
    var pill = document.getElementById("ctaPill");
    if (pill) pill.innerHTML = '<span class="pulse"></span>' + (formUrl ? "Inscriptions ouvertes · Saison " + esc(meta.saison) : "Inscriptions bientôt disponibles · Saison " + esc(meta.saison));

    // ---- Mock panel : prochaine phase réelle + 3 repères structurels ----
    var nextPhase = null;
    TITLE_IDS.forEach(function (id) {
      (d.competition[id].calendrier || []).forEach(function (p) {
        if (!nextPhase) nextPhase = { titre: p.phase, periode: p.periode, jeu: d.competition[id].nom };
      });
    });
    document.getElementById("lpMockNext").innerHTML = '<span class="dot"></span><span class="lbl">' +
      (nextPhase ? esc(nextPhase.titre) + " · " + esc(nextPhase.periode) + " · " + esc(nextPhase.jeu) : "Calendrier à venir") + '</span>';
    var joueursCount = (d.joueurs || []).length;
    var mobaTeamsSlots = TITLE_IDS.filter(function (id) { return d.competition[id].family === "MOBA"; }).reduce(function (s, id) { return s + ((d.competition[id].bracket && d.competition[id].bracket.equipes) || []).length; }, 0);
    [
      { v: joueursCount, l: "joueurs inscrits", color: "var(--teal)" },
      { v: "4", l: "disciplines officielles", color: "var(--green)" },
      { v: mobaTeamsSlots, l: "places équipes MOBA", color: "var(--blue)" }
    ].forEach(function (t, i) {
      var el = document.createElement("div");
      el.className = "lp-mock-tile";
      el.innerHTML = '<div class="v" style="color:' + t.color + '">' + t.v + '</div><div class="l">' + t.l + '</div>';
      document.getElementById("lpMockBody").appendChild(el);
    });

    // ---- Barèmes réels ----
    var mobaId = TITLE_IDS.find(function (id) { return d.competition[id].family === "MOBA"; });
    var tpsId = TITLE_IDS.find(function (id) { return d.competition[id].family === "TPS"; });
    if (mobaId) {
      var bm = d.competition[mobaId].bareme;
      document.getElementById("baremeMoba").innerHTML =
        '<div class="lp-bareme-tag moba">MOBA — Honor of Kings · Mobile Legends</div>' +
        [["Victoire", bm.victoire], ["Match nul", bm.nul], ["Défaite", bm.defaite]].map(function (r) {
          return '<div class="lp-bareme-row"><span>' + r[0] + '</span><span>' + r[1] + ' pt' + (r[1] > 1 ? "s" : "") + '</span></div>';
        }).join("");
    }
    if (tpsId) {
      var bt = d.competition[tpsId].bareme;
      document.getElementById("baremeTps").innerHTML =
        '<div class="lp-bareme-tag tps">TPS Battle Royale — PUBG Mobile · Free Fire</div>' +
        bt.places.slice(0, 4).map(function (p, i) {
          return '<div class="lp-bareme-row"><span>' + (i + 1) + (i === 0 ? "re" : "e") + ' place</span><span>' + p + ' pts</span></div>';
        }).join("") +
        '<div class="lp-bareme-row"><span>Chaque élimination</span><span>+' + bt.elimination + ' pt</span></div>';
    }

    // ---- Bande de chiffres (faits structurels réels, jamais inventés) ----
    document.getElementById("lpStats").innerHTML = [
      { v: joueursCount, l: "Joueurs inscrits", color: "var(--teal)" },
      { v: "4", l: "Disciplines officielles", color: "var(--green)" },
      { v: "2", l: "Formats compétitifs", color: "var(--blue)" },
      { v: "16", l: "Équipes par discipline MOBA", color: "var(--orange)" },
      { v: "32", l: "Joueurs par discipline TPS", color: "var(--purple)" }
    ].map(function (s) {
      return '<div class="lp-stat"><div class="v" style="color:' + s.color + '">' + s.v + '</div><div class="l">' + s.l + '</div></div>';
    }).join("");

    // ---- Disciplines (liste + détail) ----
    var activeDisc = TITLE_IDS[0];
    function renderDisc() {
      document.getElementById("discList").innerHTML = TITLE_IDS.map(function (id) {
        var comp = d.competition[id];
        var color = comp.family === "MOBA" ? "var(--blue)" : "var(--red)";
        return '<button type="button" class="lp-disc-item' + (id === activeDisc ? " active" : "") + '" data-disc="' + id + '" style="color:' + color + '">' +
          '<span class="dot" style="background:' + (id === activeDisc ? color : "var(--border-soft)") + '"></span>' +
          '<span><span class="nm" style="display:block">' + esc(comp.nom) + '</span><span class="ty">' + comp.family + '</span></span></button>';
      }).join("");
      var comp = d.competition[activeDisc];
      var color = comp.family === "MOBA" ? "var(--blue)" : "var(--red)";
      var copy = GAME_COPY[activeDisc] || { desc: "", features: [] };
      document.getElementById("discDetail").innerHTML =
        '<span class="lp-bareme-tag ' + (comp.family === "MOBA" ? "moba" : "tps") + '">' + comp.family + '</span>' +
        '<h3>' + esc(comp.nom) + '</h3><p>' + esc(copy.desc) + '</p>' +
        '<div style="display:flex;flex-direction:column;gap:10px">' + copy.features.map(function (f) {
          return '<div style="display:flex;gap:10px;align-items:center;font-size:13.5px;color:var(--text-dim)"><i class="fa-solid fa-check" style="color:' + color + '"></i>' + esc(f) + '</div>';
        }).join("") + '</div>';
      document.querySelectorAll("[data-disc]").forEach(function (btn) {
        btn.addEventListener("click", function () { activeDisc = btn.dataset.disc; renderDisc(); });
      });
    }
    renderDisc();

    // ---- Aperçu classements (top 6 tous titres confondus) ----
    var merged = [];
    TITLE_IDS.forEach(function (id) {
      var rows = classementFor(d, id).filter(function (r) { return r.pts > 0; });
      var isMoba = d.competition[id].family === "MOBA";
      rows.forEach(function (r) { merged.push({ nom: isMoba ? r.equipe : r.joueur, clan: isMoba ? null : r.clan, jeu: id, pts: r.pts, color: isMoba ? "var(--blue)" : "var(--red)" }); });
    });
    merged.sort(function (a, b) { return b.pts - a.pts; });
    var top = merged.slice(0, 6);
    var classementsHost = document.getElementById("classementsPreview");
    if (top.length) {
      classementsHost.innerHTML =
        '<div class="hd"><span>#</span><span>Joueur / Équipe</span><span>Jeu</span><span>Pts</span></div>' +
        top.map(function (p, i) {
          return '<div class="lp-preview-row"><span style="color:var(--text-dim)">' + (i + 1) + '</span>' +
            '<div style="display:flex;align-items:center;gap:10px">' + avatarCircle(p.nom, p.color, 28) +
            '<div><div style="color:var(--text)">' + esc(p.nom) + '</div>' + (p.clan ? '<div style="font-size:10.5px;color:var(--text-dim)">' + esc(p.clan) + '</div>' : '') + '</div></div>' +
            '<span style="font-family:monospace;font-size:10px;color:' + p.color + '">' + esc(d.competition[p.jeu].nom).toUpperCase() + '</span>' +
            '<span style="font-family:monospace;color:var(--teal);font-weight:800">' + p.pts + '</span></div>';
        }).join("");
    } else {
      classementsHost.innerHTML = '<div class="lp-empty">Aucun résultat enregistré pour l\'instant — la saison démarre bientôt.</div>';
    }

    // ---- Aperçu joueurs (6 premiers inscrits) ----
    var joueurs = (d.joueurs || []).slice(0, 6);
    var joueursHost = document.getElementById("joueursPreview");
    if (joueurs.length) {
      joueursHost.innerHTML = joueurs.map(function (j) {
        var comp = d.competition[j.jeu];
        var color = comp && comp.family === "MOBA" ? "var(--blue)" : "var(--red)";
        return '<div class="lp-joueur-card">' + avatarCircle(j.pseudo || j.nom, color, 44) +
          '<div><div style="color:var(--text);font-weight:700;font-size:14px">' + esc(j.pseudo || j.nom || "—") + '</div>' +
          '<div style="font-size:11.5px;color:var(--text-dim)">' + esc(j.equipe || "") + (j.equipe && comp ? " · " : "") + esc(comp ? comp.nom : "") + '</div></div></div>';
      }).join("");
    } else {
      joueursHost.innerHTML = '<div class="lp-empty">Aucun joueur inscrit pour l\'instant. Les inscriptions ouvrent bientôt.</div>';
    }

    // ---- Aperçu Panthéon (distinctions configurées) ----
    var curated = ((d.pantheon && d.pantheon.curated) || []).slice(0, 4);
    var panHost = document.getElementById("pantheonPreview");
    if (curated.length) {
      panHost.innerHTML = curated.map(function (p) {
        var t = PANTHEON_TITLES[p.titreKey] || { label: p.titreKey || "Distinction", color: "var(--teal)" };
        var display = p.pseudo || p.nom || "—";
        return '<div class="lp-pan-card" style="border-color:' + t.color + '">' +
          '<div class="t" style="color:' + t.color + '">' + esc(t.label) + '</div>' +
          avatarCircle(display, t.color, 60) +
          '<div class="n">' + esc(display) + '</div>' + (p.clan ? '<div class="c">' + esc(p.clan) + '</div>' : '') + '</div>';
      }).join("");
    } else {
      panHost.innerHTML = '<div class="lp-empty" style="grid-column:1/-1">Aucune distinction attribuée pour l\'instant — rendez-vous en fin de saison.</div>';
    }

    // ---- Pied de page (identique à l'app, liens vers app.html) ----
    renderFooter(d);
  }

  function renderFooter(d) {
    var host = document.getElementById("siteFooter");
    if (!host) return;
    var meta = d.meta || {};
    var reseaux = meta.reseaux || {};
    var contact = meta.contact || {};
    var liens = meta.liens || {};

    var socialIcons = {
      facebook: { label: "Facebook", icon: "fa-brands fa-facebook-f" },
      instagram: { label: "Instagram", icon: "fa-brands fa-instagram" },
      tiktok: { label: "TikTok", icon: "fa-brands fa-tiktok" },
      youtube: { label: "YouTube", icon: "fa-brands fa-youtube" },
      discord: { label: "Discord", icon: "fa-brands fa-discord" },
      linkedin: { label: "LinkedIn", icon: "fa-brands fa-linkedin-in" }
    };
    var socialHtml = Object.keys(socialIcons).map(function (k) {
      var url = reseaux[k] && reseaux[k].trim();
      if (!url) return "";
      var ic = socialIcons[k];
      return '<a class="social-icon" href="' + esc(url) + '" target="_blank" rel="noopener" title="' + esc(ic.label) + '" aria-label="' + esc(ic.label) + '"><i class="' + ic.icon + '"></i></a>';
    }).filter(Boolean).join("");

    var navHtml = '<a href="app.html#visuels">Visuels officiels</a><a href="app.html#competition">Compétition</a>' +
      '<a href="app.html#classements">Classements</a><a href="app.html#joueurs">Joueurs</a><a href="app.html#pantheon">Panthéon</a>';

    function legalEntry(label, texte, url) {
      var t = texte && texte.trim();
      var u = url && url.trim();
      if (t) return '<button type="button" class="footer-link-btn" data-legal="1" data-legal-title="' + esc(label) + '" data-legal-text="' + esc(t) + '">' + esc(label) + '</button>';
      if (u) return '<a href="' + esc(u) + '" target="_blank" rel="noopener">' + esc(label) + '</a>';
      return "";
    }
    var legalHtml = [
      legalEntry("CGU / Règlement", liens.cguTexte, liens.cgu),
      legalEntry("Statuts & homologation", liens.statutsTexte, liens.statuts)
    ].filter(Boolean).join("");

    var contactHtml = [
      contact.telephone && contact.telephone.trim() ? '<span>📞 ' + esc(contact.telephone) + '</span>' : "",
      contact.email && contact.email.trim() ? '<a href="mailto:' + esc(contact.email) + '">✉ ' + esc(contact.email) + '</a>' : ""
    ].filter(Boolean).join("");

    host.innerHTML =
      '<div class="footer-wrap">' +
        '<div class="footer-col footer-brand-col">' +
          '<div class="footer-brand"><div class="footer-logo-badge"><img src="img/logo-league.png" alt="Ligue Esport Est Cameroun"></div>' +
            '<div><div class="footer-title">EAST LEAGUE OF CAMEROUN</div><div class="footer-sub">' + esc(meta.organisateur || "") + '</div></div></div>' +
          (socialHtml ? '<div class="footer-social">' + socialHtml + '</div>' : "") +
        '</div>' +
        '<div class="footer-col"><h4>Navigation</h4>' + navHtml + '</div>' +
        (legalHtml ? '<div class="footer-col"><h4>Informations légales</h4>' + legalHtml + '</div>' : "") +
        (contactHtml ? '<div class="footer-col"><h4>Contact</h4>' + contactHtml + '</div>' : "") +
      '</div>' +
      '<div class="footer-bottom">Saison ' + esc(meta.saison || "") + ' · © ' + new Date().getFullYear() + ' Ligue Esport Est Cameroun</div>';
  }

  // ---------------- Fenêtre documents légaux ----------------
  function openLegalModal(title, text) {
    var overlay = document.getElementById("legalModalOverlay");
    if (!overlay) return;
    document.getElementById("legalModalTitle").textContent = title;
    document.getElementById("legalModalBody").textContent = text;
    overlay.hidden = false;
  }
  function closeLegalModal() {
    var overlay = document.getElementById("legalModalOverlay");
    if (overlay) overlay.hidden = true;
  }
  document.addEventListener("click", function (e) {
    var legalBtn = e.target.closest("[data-legal]");
    if (legalBtn) { openLegalModal(legalBtn.dataset.legalTitle, legalBtn.dataset.legalText); return; }
  });
  var legalOverlayEl = document.getElementById("legalModalOverlay");
  if (legalOverlayEl) legalOverlayEl.addEventListener("click", function (e) { if (e.target === legalOverlayEl) closeLegalModal(); });
  var legalCloseBtn = document.getElementById("legalModalClose");
  if (legalCloseBtn) legalCloseBtn.addEventListener("click", closeLegalModal);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeLegalModal(); });

  // ---------------- Mode clair / sombre ----------------
  var THEME_STORAGE = "elc2027-theme";
  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    var btn = document.getElementById("themeToggle");
    if (btn) btn.textContent = t === "light" ? "🌙" : "☀️";
  }
  (function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem(THEME_STORAGE); } catch (e) {}
    var theme = saved || ((window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) ? "light" : "dark");
    applyTheme(theme);
  })();
  var themeToggleBtn = document.getElementById("themeToggle");
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", function () {
      var next = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
      applyTheme(next);
      try { localStorage.setItem(THEME_STORAGE, next); } catch (e) {}
    });
  }

  fetch("/api/data").then(function (r) { return r.json(); }).then(render).catch(function (err) {
    console.error("Impossible de charger les données :", err);
  });
})();
