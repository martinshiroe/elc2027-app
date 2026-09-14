// ELC 2027 — vue publique
// Charge les données depuis le serveur local (dossier ./data) et les affiche.
(function () {
  "use strict";

  var LOGO_DATA_URI = "data:image/png;base64,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";
  document.querySelectorAll(".elc-logo-img").forEach(function (img) { img.src = LOGO_DATA_URI; });


  var state = { data: null };
  var TITLE_IDS = ["hok", "mlbb", "pubgm", "ff"];
  var PANTHEON_TITLES = {
    godlike: { label: "GodLike", cls: "moba" },
    demonking: { label: "Demon King", cls: "tps" },
    mvp: { label: "MVP", cls: "mvp" },
    topfragger: { label: "Top Fraggeur", cls: "tps" },
    goat: { label: "G.O.A.T", cls: "goat" }
  };
  var activeTitleTab = { competition: "hok" };

  function esc(s) {
    return (s == null ? "" : String(s)).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function initials(name) {
    return (name || "?").trim().split(/\s+/).slice(0, 2).map(function (w) { return /^\d+$/.test(w) ? w : w[0]; }).join("").toUpperCase();
  }
  var MEDAL_COLORS = { 1: "#ffd700", 2: "#c9d3e0", 3: "#cd7f32" };
  function medalSvg(rank) {
    var color = MEDAL_COLORS[rank];
    if (!color) return "";
    return '<svg class="medal" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
      '<path fill="' + color + '" stroke="#0a0e17" stroke-width="1" stroke-linejoin="round" ' +
      'd="M3 6l4.5 3L12 3l4.5 6L21 6l-2 11H5L3 6z"/></svg>';
  }
  function avatar(photo, name, size, rank) {
    var small = size && size < 40 ? " avatar-sm" : "";
    var style = size ? "width:" + size + "px;height:" + size + "px;font-size:" + Math.max(9, Math.round(size * 0.38)) + "px" : "";
    var img = photo
      ? '<div class="avatar' + small + '" style="' + style + '"><img src="' + esc(photo) + '" alt="' + esc(name || "") + '"></div>'
      : '<div class="avatar' + small + '" style="' + style + '">' + esc(initials(name)) + '</div>';
    var medal = medalSvg(rank);
    return medal ? '<span class="avatar-wrap">' + img + medal + '</span>' : img;
  }

  function renderAll(d) {
    state.data = d;
    document.getElementById("orgName").textContent = d.meta.organisateur;
    document.getElementById("seasonPill").textContent = "SAISON " + d.meta.saison;
    renderV1(d); renderV2(d); renderV3(d); renderV4(d);
    renderCompetition(d); renderClassements(d); renderJoueurs(d); renderPantheon(d);
    renderInscription(d); renderFooter(d);
  }

  // ---------------- Bouton "S'inscrire" (topbar) ----------------
  function renderInscription(d) {
    var btn = document.getElementById("btnInscription");
    if (!btn) return;
    var url = d.meta && d.meta.googleFormUrl && d.meta.googleFormUrl.trim();
    if (url) { btn.href = url; btn.hidden = false; }
    else { btn.hidden = true; btn.removeAttribute("href"); }
  }

  // ---------------- Footer global ----------------
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

    var navItems = [
      { id: "sec-visuels", label: "Visuels officiels" },
      { id: "sec-competition", label: "Compétition" },
      { id: "sec-classements", label: "Classements" },
      { id: "sec-joueurs", label: "Joueurs" },
      { id: "sec-pantheon", label: "Panthéon" }
    ];
    var navHtml = '<a href="index.html">Accueil</a>' + navItems.map(function (n) {
      return '<button type="button" class="footer-link-btn" data-goto-section="' + n.id + '">' + esc(n.label) + '</button>';
    }).join("");

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
    document.querySelectorAll("#siteFooter .elc-logo-img").forEach(function (img) { img.src = LOGO_DATA_URI; });
  }

  // ---------------- Recherches croisées (logos équipes / fiches joueurs) ----------------
  function teamByNom(comp, nom) {
    return (comp.bracket ? comp.bracket.equipes : []).find(function (t) { return t.nom === nom; }) || null;
  }
  function joueurByPseudo(pseudo) {
    return (state.data.joueurs || []).find(function (j) { return (j.pseudo || j.nom) === pseudo; }) || null;
  }

  // ---------------- Calcul des classements ----------------
  function classementMOBA(comp) {
    var teams = {};
    (comp.bracket ? comp.bracket.equipes : []).forEach(function (t) {
      teams[t.nom] = { equipe: t.nom, logo: t.logo, v: 0, n: 0, d: 0, pts: 0 };
    });
    (comp.manches || []).forEach(function (m) {
      if (!m.equipe1 || !m.equipe2) return;
      [m.equipe1, m.equipe2].forEach(function (t) { if (!teams[t]) teams[t] = { equipe: t, logo: null, v: 0, n: 0, d: 0, pts: 0 }; });
      var s1 = Number(m.score1), s2 = Number(m.score2);
      if (isNaN(s1) || isNaN(s2)) return;
      if (s1 > s2) { teams[m.equipe1].v++; teams[m.equipe2].d++; }
      else if (s2 > s1) { teams[m.equipe2].v++; teams[m.equipe1].d++; }
      else { teams[m.equipe1].n++; teams[m.equipe2].n++; }
    });
    var b = comp.bareme || { victoire: 3, nul: 1, defaite: 0 };
    return Object.values(teams).map(function (t) {
      t.pts = t.v * b.victoire + t.n * b.nul + t.d * b.defaite;
      return t;
    }).sort(function (a, c) { return c.pts - a.pts; });
  }

  function classementTPS(comp, titleId) {
    var players = {};
    function ensure(pseudo) {
      if (players[pseudo]) return players[pseudo];
      var slot = (comp.roster || []).find(function (s) { return s.nom === pseudo; });
      var jo = joueurByPseudo(pseudo);
      return (players[pseudo] = {
        joueur: pseudo,
        photo: (slot && slot.photo) || (jo ? jo.photo : null),
        clan: jo ? jo.equipe : "",
        kills: 0, deaths: 0, manches: 0, pts: 0
      });
    }
    // Préremplit avec les 32 emplacements du roster (classement à 0, calqué sur le bracket MOBA)
    (comp.roster || []).forEach(function (s) { ensure(s.nom); });
    var b = comp.bareme || { places: [15, 12, 10, 8, 6, 4, 2, 1], elimination: 1 };
    (comp.manches || []).forEach(function (m) {
      (m.resultats || []).forEach(function (r) {
        if (!r.joueur) return;
        var p = ensure(r.joueur);
        var place = Number(r.place), kills = Number(r.kills) || 0, deaths = Number(r.deaths) || 0;
        var placePts = (place >= 1 && place <= b.places.length) ? b.places[place - 1] : 0;
        p.kills += kills;
        p.deaths += deaths;
        p.manches += 1;
        p.pts += placePts + kills * (b.elimination || 0);
      });
    });
    return Object.values(players).map(function (p) {
      p.kda = p.deaths > 0 ? (p.kills / p.deaths) : p.kills;
      return p;
    }).sort(function (a, c) { return c.pts - a.pts; });
  }

  function classementFor(titleId) {
    var comp = state.data.competition[titleId];
    return comp.family === "MOBA" ? classementMOBA(comp) : classementTPS(comp, titleId);
  }

  function familyLabel(id) { return state.data.competition[id].family; }
  function titleName(id) { return state.data.competition[id].nom; }

  // ---------------- Section Compétition ----------------
  function renderCompetition(d) {
    var root = document.getElementById("competitionRoot");
    if (!root) return;
    var families = [
      { key: "MOBA", label: "MOBA — Équipes", ids: TITLE_IDS.filter(function (i) { return d.competition[i].family === "MOBA"; }) },
      { key: "TPS", label: "TPS / Battle Royale — Individuel", ids: TITLE_IDS.filter(function (i) { return d.competition[i].family === "TPS"; }) }
    ];
    root.innerHTML = families.map(function (fam) {
      return '<div class="family-group">' +
        '<div class="family-head"><span class="fdot ' + fam.key.toLowerCase() + '"></span><h3>' + fam.label + '</h3>' +
        '<span class="fcount">' + fam.ids.length + ' titre' + (fam.ids.length > 1 ? "s" : "") + '</span></div>' +
        '<div class="title-subtabs" data-fam="' + fam.key + '">' +
        fam.ids.map(function (id) {
          return '<button class="title-subtab' + (id === activeTitleTab.competition ? " active" : "") + '" data-title="' + id + '">' + esc(d.competition[id].nom) + '</button>';
        }).join("") + '</div>' +
        fam.ids.map(function (id) { return renderTitlePane(id, d); }).join("") +
        '</div>';
    }).join("");

    root.querySelectorAll(".title-subtab").forEach(function (btn) {
      btn.addEventListener("click", function () {
        activeTitleTab.competition = btn.dataset.title;
        renderCompetition(state.data);
      });
    });
  }

  function renderTitlePane(id, d) {
    var comp = d.competition[id];
    var isActive = id === activeTitleTab.competition;
    var classement = classementFor(id);
    var html = '<div class="title-pane' + (isActive ? " active" : "") + '" data-pane="' + id + '">';

    html += '<div class="comp-card"><h4>Calendrier — ' + esc(comp.nom) + '</h4>' +
      '<div class="comp-desc">Phases de qualification et de finale propres à ce titre.</div>' +
      '<div class="timeline">' + comp.calendrier.map(function (p) {
        return '<div class="timeline-item"><div><div class="ti-phase">' + esc(p.phase) + '</div><div class="ti-lieu">' + esc(p.lieu) + '</div></div>' +
          '<div class="ti-periode">' + esc(p.periode) + '</div></div>';
      }).join("") + '</div></div>';

    if (comp.family === "MOBA") {
      html += '<div class="comp-card"><h4>Bracket — ' + esc(comp.nom) + '</h4>' +
        '<div class="comp-desc">Arbre de tournoi à 16 équipes.</div>' +
        '<div class="bracket-hint">← Faites glisser pour voir tout le tableau →</div>' +
        '<div class="bracket-wrap"><div class="bracket">' +
        '<div><div class="bcol-title">SÉRIE DE FINALE (BO3)</div><div class="bcol bcol-r16">' +
        comp.bracket.equipes.map(function (t) { return '<div class="bslot bslot-team">' + avatar(t.logo, t.nom, 22) + '<span>' + esc(t.nom) + '</span></div>'; }).join("") + '</div></div>' +
        '<div><div class="bcol-title">QUARTS DE FINALE</div><div class="bcol">' +
        comp.bracket.quarts.map(function (t) { return bracketWinnerSlot(comp, t); }).join("") + '</div></div>' +
        '<div><div class="bcol-title">DEMI-FINALES</div><div class="bcol">' +
        comp.bracket.demis.map(function (t) { return bracketWinnerSlot(comp, t); }).join("") + '</div></div>' +
        '<div><div class="bcol-title">GRANDE FINALE</div><div class="bcol"><div class="bslot champion">' +
        (comp.bracket.champion ? avatar(teamByNom(comp, comp.bracket.champion) ? teamByNom(comp, comp.bracket.champion).logo : null, comp.bracket.champion, 26) + '<span>' + esc(comp.bracket.champion) + '</span>' : '<span class="empty">À déterminer</span>') +
        '</div></div></div>' +
        '</div></div></div>';

      html += '<div class="comp-card"><h4>Classement — ' + esc(comp.nom) + '</h4>' +
        '<div class="comp-desc">Calculé à partir des matchs enregistrés (victoire = ' + comp.bareme.victoire + ' pts, nul = ' + comp.bareme.nul + ', défaite = ' + comp.bareme.defaite + ').</div>' +
        renderClassementTable(classement, "moba") + '</div>';
    } else {
      html += '<div class="comp-card"><h4>Résultats — ' + esc(comp.nom) + '</h4>' +
        '<div class="comp-desc">' + (comp.manches && comp.manches.length ? comp.manches.length + " manche(s) enregistrée(s)." : "Aucune manche enregistrée pour le moment.") + '</div>' +
        (comp.manches || []).map(function (m) {
          return '<div class="sub-card"><h4>' + esc(m.nom || "Manche") + '</h4>' + renderManchePlacementsTable(m.resultats || []) + '</div>';
        }).join("") + '</div>';

      html += '<div class="comp-card"><h4>Classement individuel — ' + esc(comp.nom) + '</h4>' +
        '<div class="comp-desc">Points par place (' + comp.bareme.places.join(" / ") + ') + ' + comp.bareme.elimination + ' pt par élimination.</div>' +
        renderClassementTable(classement, "tps") + '</div>';
    }

    html += '</div>';
    return html;
  }

  function bracketWinnerSlot(comp, nom) {
    if (!nom) return '<div class="bslot bslot-team"><span class="empty">À déterminer</span></div>';
    var t = teamByNom(comp, nom);
    return '<div class="bslot bslot-team">' + avatar(t ? t.logo : null, nom, 22) + '<span>' + esc(nom) + '</span></div>';
  }

  function renderManchePlacementsTable(resultats) {
    if (!resultats.length) return '<div class="empty-state">Aucun résultat saisi.</div>';
    var rows = resultats.slice().sort(function (a, b) { return (Number(a.place) || 99) - (Number(b.place) || 99); });
    return '<div class="table-wrap"><table class="data-table"><thead><tr><th></th><th>Place</th><th>Joueur</th><th>Élim.</th><th>Morts</th></tr></thead><tbody>' +
      rows.map(function (r) {
        var jo = joueurByPseudo(r.joueur);
        return '<tr><td>' + avatar(jo ? jo.photo : null, r.joueur, 24) + '</td><td class="rk">' + esc(r.place) + '</td>' +
          '<td>' + esc(r.joueur) + (jo && jo.equipe ? ' <span class="clan-tag">' + esc(jo.equipe) + '</span>' : '') + '</td>' +
          '<td>' + esc(r.kills || 0) + '</td><td>' + esc(r.deaths || 0) + '</td></tr>';
      }).join("") + '</tbody></table></div>';
  }

  function renderClassementTable(rows, type) {
    if (!rows.length) return '<div class="empty-state">Aucun résultat enregistré pour l\'instant.</div>';
    var head = type === "moba"
      ? '<tr><th>#</th><th></th><th>Équipe</th><th>V</th><th>N</th><th>D</th><th>Pts</th></tr>'
      : '<tr><th>#</th><th></th><th>Joueur</th><th>Clan</th><th>Manches</th><th>KDA</th><th>Pts</th></tr>';
    var body = rows.map(function (r, i) {
      var rankCls = i === 0 ? "rank-1" : i === 1 ? "rank-2" : i === 2 ? "rank-3" : "";
      var cells = type === "moba"
        ? '<td>' + avatar(r.logo, r.equipe, 26, i + 1) + '</td><td>' + esc(r.equipe) + '</td><td>' + r.v + '</td><td>' + r.n + '</td><td>' + r.d + '</td><td class="pts">' + r.pts + '</td>'
        : '<td>' + avatar(r.photo, r.joueur, 26, i + 1) + '</td><td>' + esc(r.joueur) + '</td><td class="clan-cell">' + esc(r.clan || "—") + '</td><td>' + r.manches + '</td><td>' + r.kda.toFixed(2) + '</td><td class="pts">' + r.pts + '</td>';
      return '<tr class="' + rankCls + '"><td class="rk">' + (i + 1) + '</td>' + cells + '</tr>';
    }).join("");
    return '<div class="table-wrap"><table class="data-table"><thead>' + head + '</thead><tbody>' + body + '</tbody></table></div>';
  }

  // ---------------- Section Classements (vue consolidée) ----------------
  function renderClassements(d) {
    var root = document.getElementById("classementsRoot");
    if (!root) return;
    var updated = d.meta && d.meta.derniereMaj ? new Date(d.meta.derniereMaj).toLocaleString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }) : null;
    root.innerHTML = (updated ? '<div class="updated-hint">Mis à jour le ' + esc(updated) + '</div>' : '') + TITLE_IDS.map(function (id) {
      var comp = d.competition[id];
      var rows = classementFor(id);
      return '<div class="comp-card"><h4>' + esc(comp.nom) + ' <span class="badge dim" style="margin-left:6px">' + comp.family + '</span></h4>' +
        renderClassementTable(rows, comp.family === "MOBA" ? "moba" : "tps") + '</div>';
    }).join("");
  }

  // ---------------- Section Joueurs ----------------
  var playersFilter = "all";
  function renderJoueurs(d) {
    var root = document.getElementById("joueursRoot");
    if (!root) return;
    var joueurs = d.joueurs || [];
    var chips = [{ id: "all", label: "Tous (" + joueurs.length + ")" }].concat(TITLE_IDS.map(function (id) {
      var n = joueurs.filter(function (j) { return j.jeu === id; }).length;
      return { id: id, label: titleName(id) + " (" + n + ")" };
    }));
    var filtered = playersFilter === "all" ? joueurs : joueurs.filter(function (j) { return j.jeu === playersFilter; });

    root.innerHTML =
      '<div class="players-toolbar">' + chips.map(function (c) {
        return '<button class="filter-chip' + (c.id === playersFilter ? " active" : "") + '" data-filter="' + c.id + '">' + esc(c.label) + '</button>';
      }).join("") + '</div>' +
      (filtered.length
        ? '<div class="players-grid">' + filtered.map(function (j) {
          return '<div class="player-card">' + avatar(j.photo, j.pseudo || j.nom) +
            '<div class="p-nom">' + esc(j.nom || "—") + '</div>' +
            '<div class="p-pseudo">' + esc(j.pseudo ? "@" + j.pseudo : "") + '</div>' +
            '<div class="p-meta">' + esc(titleName(j.jeu) || "—") + (j.equipe ? " · " + esc(j.equipe) : "") + '</div></div>';
        }).join("") + '</div>'
        : '<div class="empty-state">Aucun joueur inscrit pour ce filtre. Les inscriptions sont importées depuis l\'admin (export du Google Form).</div>');

    root.querySelectorAll("[data-filter]").forEach(function (btn) {
      btn.addEventListener("click", function () { playersFilter = btn.dataset.filter; renderJoueurs(state.data); });
    });
  }

  // ---------------- Section Panthéon ----------------
  function renderPantheon(d) {
    var root = document.getElementById("pantheonRoot");
    if (!root) return;
    var leaders = TITLE_IDS.map(function (id) {
      var rows = classementFor(id);
      if (!rows.length) return null;
      var top = rows[0];
      var isMoba = d.competition[id].family === "MOBA";
      var name = isMoba ? top.equipe : top.joueur;
      return { id: id, nom: name, pts: top.pts, photo: isMoba ? top.logo : top.photo, clan: isMoba ? null : top.clan };
    }).filter(Boolean);

    var curated = (d.pantheon && d.pantheon.curated) || [];

    root.innerHTML =
      '<div class="comp-card"><h4>Leaders de la saison ' + esc(d.meta.saison) + '</h4>' +
      '<div class="comp-desc">Premier de chaque classement, mis à jour automatiquement.</div>' +
      (leaders.length
        ? '<div class="leaders-grid">' + leaders.map(function (l) {
          return '<div class="leader-card"><div class="lc-jeu">' + esc(titleName(l.id).toUpperCase()) + '</div>' +
            avatar(l.photo, l.nom, 52, 1) + '<div class="lc-nom">' + esc(l.nom) + '</div>' +
            (l.clan ? '<div class="clan-tag" style="margin-top:2px">' + esc(l.clan) + '</div>' : '') +
            '<div class="lc-pts">' + l.pts + ' pts</div></div>';
        }).join("") + '</div>'
        : '<div class="empty-state">Aucun résultat enregistré pour l\'instant.</div>') +
      '</div>' +
      '<div class="comp-card"><h4>Panthéon ELC ' + esc(d.meta.saison) + '</h4>' +
      '<div class="comp-desc">GodLike (MOBA) · Demon King (TPS) · MVP · Top Fraggeur (TPS) · G.O.A.T (toutes compétitions confondues).</div>' +
      (curated.length
        ? '<div class="pantheon-grid">' + curated.map(function (p) {
          var t = PANTHEON_TITLES[p.titreKey] || { label: p.titreKey ? p.titreKey : "Distinction", cls: "" };
          var display = p.pseudo || p.nom || "—";
          return '<div class="pantheon-card pc-frame-' + t.cls + '">' +
            '<div class="pc-titre pc-titre-' + t.cls + '">' + esc(t.label) + (p.jeu ? ' <span class="pc-titre-jeu">— ' + esc(titleName(p.jeu)) + '</span>' : '') + '</div>' +
            '<div class="pc-photo-frame pc-frame-' + t.cls + '">' + avatar(p.photo, display, 84) + '</div>' +
            '<div class="pc-pseudo">' + esc(display) + (p.clan ? ' <span class="clan-tag">' + esc(p.clan) + '</span>' : '') + '</div>' +
            (p.nom && p.pseudo ? '<div class="pc-realname">' + esc(p.nom) + '</div>' : '') +
            (p.palmares ? '<div class="pc-palmares">' + esc(p.palmares) + '</div>' : '') +
            '</div>';
        }).join("") + '</div>'
        : '<div class="empty-state">Aucune distinction ajoutée pour l\'instant.</div>') +
      '</div>';
  }

  function renderV1(d) {
    var v = d.visual1;
    document.getElementById("v1-bandeau").textContent = v.bandeau;
    document.getElementById("v1-badgeHaut").textContent = (d.meta.badgeHaut || "").toUpperCase();
    document.getElementById("v1-titreCentral").textContent = v.titreCentral;
    document.getElementById("v1-sousTitreCentral").textContent = v.sousTitreCentral;
    document.getElementById("v1-footer").textContent = "SAISON " + d.meta.saison;
    document.getElementById("v1-footerGauche").textContent = v.footerGauche;
    document.getElementById("v1-grid").innerHTML = v.titres.map(function (t) {
      var openCls = rosterOpen === t.id ? " open" : "";
      return '<div class="title-card' + openCls + '" data-roster-toggle="' + esc(t.id) + '" tabindex="0" role="button" aria-expanded="' + (rosterOpen === t.id) + '" title="Voir les équipes / joueurs de ' + esc(t.nom) + '">' +
        '<div class="top-row"><span class="disc">' + esc(t.discipline) +
        '</span><span class="badge blue">' + esc(t.badge) + '</span></div>' +
        '<div class="nom">' + esc(t.nom) + '</div><div class="sous">' + esc(t.sousTitre) + '</div>' +
        '<div class="meta"><span>Lancement : ' + esc(t.lancement || "—") + '</span><span>' + esc(t.plateforme) + '</span></div>' +
        '<div class="goto-hint">' + (rosterOpen === t.id ? "▲ Masquer équipes / joueurs" : "▼ Voir équipes / joueurs") + '</div></div>';
    }).join("");
    document.getElementById("v1-grid").querySelectorAll("[data-roster-toggle]").forEach(function (card) {
      var toggle = function () {
        rosterOpen = rosterOpen === card.dataset.rosterToggle ? null : card.dataset.rosterToggle;
        rosterSearch = "";
        renderV1(state.data);
        renderV1Roster();
      };
      card.addEventListener("click", toggle);
      card.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } });
    });
    renderV1Roster();
  }

  // ---------------- Panneau déroulant équipes/joueurs (depuis la grille des 4 titres) ----------------
  var rosterOpen = null, rosterSearch = "";
  var rosterFrameFor = null; // id pour lequel l'en-tête + champ de recherche sont déjà construits

  function renderV1Roster() {
    var host = document.getElementById("v1-roster");
    if (!host) return;
    if (!rosterOpen) { host.hidden = true; host.innerHTML = ""; rosterFrameFor = null; return; }
    host.hidden = false;
    var id = rosterOpen;
    var comp = state.data.competition[id];
    var isMoba = comp.family === "MOBA";

    if (rosterFrameFor !== id) {
      rosterFrameFor = id;
      host.innerHTML =
        '<div class="roster-panel">' +
        '<div class="roster-head"><div><strong>' + esc(comp.nom) + '</strong> — ' + (isMoba ? "équipes inscrites" : "joueurs inscrits") + '</div>' +
        '<button type="button" class="mini-btn" data-roster-full="' + id + '">Ouvrir la page complète →</button></div>' +
        '<input type="text" class="roster-search" id="rosterSearchInput" placeholder="Rechercher ' + (isMoba ? "une équipe" : "un joueur") + '…" value="' + esc(rosterSearch) + '">' +
        '<div id="rosterTableWrap"></div>' +
        '</div>';
      document.getElementById("rosterSearchInput").addEventListener("input", function (e) {
        rosterSearch = e.target.value; renderRosterTable();
      });
      host.querySelector("[data-roster-full]").addEventListener("click", function () { gotoTitle(id); });
    }
    renderRosterTable();
  }

  function renderRosterTable() {
    var id = rosterOpen;
    var comp = state.data.competition[id];
    var isMoba = comp.family === "MOBA";
    var rows = classementFor(id);
    var q = rosterSearch.trim().toLowerCase();
    var filtered = q ? rows.filter(function (r) { return ((isMoba ? r.equipe : r.joueur) || "").toLowerCase().indexOf(q) !== -1; }) : rows;
    var wrap = document.getElementById("rosterTableWrap");
    if (!wrap) return;
    wrap.innerHTML = filtered.length
      ? '<div class="table-wrap"><table class="data-table roster-table"><thead><tr><th>#</th><th></th><th>' + (isMoba ? "Équipe" : "Joueur") + '</th>' +
        (isMoba ? "" : '<th>Clan</th>') + '<th>Pts</th></tr></thead><tbody>' +
        filtered.map(function (r, i) {
          var rankCls = i === 0 ? "rank-1" : i === 1 ? "rank-2" : i === 2 ? "rank-3" : "";
          return '<tr class="' + rankCls + '"><td class="rk">' + (i + 1) + '</td><td>' +
            avatar(isMoba ? r.logo : r.photo, isMoba ? r.equipe : r.joueur, 26, i + 1) + '</td><td>' + esc(isMoba ? r.equipe : r.joueur) + '</td>' +
            (isMoba ? "" : '<td class="clan-cell">' + esc(r.clan || "—") + '</td>') +
            '<td class="pts">' + r.pts + '</td></tr>';
        }).join("") + '</tbody></table></div>'
      : '<div class="empty-state">' + (rows.length ? "Aucun résultat pour cette recherche." : "Aucune équipe/joueur inscrit pour ce titre pour l'instant — voir l'onglet « Joueurs » ou « Administration ».") + '</div>';
  }

  function gotoTitle(titleId) {
    if (!TITLE_IDS.includes(titleId)) return;
    activeTitleTab.competition = titleId;
    document.querySelectorAll(".main-nav-btn").forEach(function (b) { b.classList.toggle("active", b.dataset.main === "sec-competition"); });
    document.querySelectorAll(".main-section").forEach(function (s) { s.classList.toggle("active", s.id === "sec-competition"); });
    renderCompetition(state.data);
    document.getElementById("sec-competition").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function renderV2(d) {
    var v = d.visual2;
    document.getElementById("v2-org").textContent = d.meta.organisateur.toUpperCase();
    document.getElementById("v2-bandeauSousTitre").textContent = v.bandeauSousTitre;
    document.getElementById("v2-calendrierLabel").textContent = v.calendrierLabel;
    document.getElementById("v2-calendrierPeriode").textContent = v.calendrierPeriode;
    document.getElementById("v2-plateformes").textContent = v.plateformes;
    document.getElementById("v2-diffusion").textContent = v.diffusion;
    document.getElementById("v2-phases").innerHTML = v.phases.map(function (p) {
      return '<div class="phase-item' + (p.tag ? " finale" : "") + '"><div><div class="phase-titre">' + esc(p.titre) +
        (p.tag ? ' <span class="badge orange" style="margin-left:6px;vertical-align:middle">' + esc(p.tag) + '</span>' : '') +
        '</div><div class="phase-sous">' + esc(p.sousTitre) + '</div></div><div class="phase-periode">' + esc(p.periode) + '</div></div>';
    }).join("");
    var s = v.structure;
    document.getElementById("v2-structure").innerHTML =
      '<div class="side-row"><span>Équipes MOBA</span><span class="val">' + esc(s.equipesMoba) + '</span></div>' +
      '<div class="side-row"><span>Joueurs TPS</span><span class="val">' + esc(s.joueursTps) + '</span></div>' +
      '<div class="side-row"><span>Qualifs / Finales</span><span class="val">' + esc(s.qualifsFinales) + '</span></div>';
    var cp = document.getElementById("v2-cashPrize");
    if (s.cashPrize && s.cashPrize.trim()) { cp.textContent = s.cashPrize; cp.classList.remove("empty"); }
    else { cp.textContent = "Détails à venir"; cp.classList.add("empty"); }
  }

  function setInfo(id, val) {
    var el = document.getElementById(id);
    if (val && val.trim()) { el.textContent = val; el.classList.add("filled"); }
    else { el.textContent = "Détails à venir"; el.classList.remove("filled"); }
  }

  function renderV3(d) {
    var v = d.visual3;
    document.getElementById("v3-sousTitre").textContent = v.sousTitre;
    document.getElementById("v3-badges").innerHTML = v.badges.map(function (b) {
      return '<span class="badge dim">' + esc(b) + '</span>';
    }).join("");
    document.getElementById("v3-divisions").innerHTML = [{ x: v.pubg, id: "pubgm" }, { x: v.ff, id: "ff" }].map(function (o) {
      var x = o.x;
      return '<div class="division-card" data-goto-title="' + o.id + '" tabindex="0" role="button" title="Voir la page ' + esc(x.nom) + '"><span class="badge orange">' + esc(x.lancementBadge) + '</span>' +
        '<div class="dname">' + esc(x.nom) + '</div><div class="dnote">' + esc(x.note) + '</div>' +
        '<div class="places"><span>Places joueurs</span><span class="val">' + esc(x.placesJoueurs) + '</span></div>' +
        '<div class="goto-hint">Voir calendrier &amp; résultats →</div></div>';
    }).join("");
    document.getElementById("v3-divisions").querySelectorAll("[data-goto-title]").forEach(function (card) {
      var go = function () { gotoTitle(card.dataset.gotoTitle); };
      card.addEventListener("click", go);
      card.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
    });
    document.getElementById("v3-titreReglement").textContent = v.titreReglement || "RÈGLEMENT";
    document.getElementById("v3-titreEtapes").textContent = v.titreEtapes || "ÉTAPES DU TOURNOI";
    document.getElementById("v3-titrePrix").textContent = v.titrePrix || "PRIX TOTAL";
    setInfo("v3-reglement", v.reglement);
    setInfo("v3-etapesTournoi", v.etapesTournoi);
    setInfo("v3-prixTotal", v.prixTotal);
    document.getElementById("v3-footerGauche").textContent = v.footerGauche;
    document.getElementById("v3-footerDroite").textContent = v.footerDroite;
  }

  function renderV4(d) {
    var v = d.visual4;
    document.getElementById("v4-org").textContent = d.meta.organisateur.toUpperCase();
    document.getElementById("v4-sousTitre").textContent = v.sousTitre;
    document.getElementById("v4-badges").innerHTML = v.badges.map(function (b) {
      return '<span class="badge blue">' + esc(b) + '</span>';
    }).join("");
    document.getElementById("v4-r16").innerHTML = v.equipes.map(function (t) {
      return '<div class="bslot">' + esc(t) + '</div>';
    }).join("");
    document.getElementById("v4-qf").innerHTML = v.quarts.map(function (t) {
      return '<div class="bslot">' + esc(t) + '</div>';
    }).join("");
    document.getElementById("v4-sf").innerHTML = v.demis.map(function (t) {
      return '<div class="bslot">' + esc(t) + '</div>';
    }).join("");
    document.getElementById("v4-champion").textContent = v.champion;
    var pp = document.getElementById("v4-prizePool");
    if (v.prizePool && v.prizePool.trim()) { pp.textContent = v.prizePool; pp.classList.remove("empty"); }
    else { pp.textContent = "Détails à venir"; pp.classList.add("empty"); }
    document.getElementById("v4-footerGauche").textContent = v.footerGauche;
    document.getElementById("v4-footerDroite").textContent =
      "Prize Pool : " + (v.prizePool && v.prizePool.trim() ? v.prizePool : "Détails à venir");
  }

  var HASH_TO_SECTION = { visuels: "sec-visuels", competition: "sec-competition", classements: "sec-classements", joueurs: "sec-joueurs", pantheon: "sec-pantheon" };
  var hashApplied = false;
  function applyHashSection() {
    if (hashApplied) return;
    var key = (location.hash || "").replace("#", "");
    if (HASH_TO_SECTION[key]) { switchMainSection(HASH_TO_SECTION[key]); hashApplied = true; }
  }

  function load() {
    return fetch("/api/data").then(function (r) { return r.json(); }).then(function (d) {
      renderAll(d);
      applyHashSection();
    }).catch(function (err) {
      console.error("Impossible de charger les données locales :", err);
    });
  }

  // Nav principale (sections)
  function switchMainSection(sectionId) {
    document.querySelectorAll(".main-nav-btn").forEach(function (b) { b.classList.toggle("active", b.dataset.main === sectionId); });
    document.querySelectorAll(".main-section").forEach(function (s) { s.classList.toggle("active", s.id === sectionId); });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  document.getElementById("mainNav").addEventListener("click", function (e) {
    var btn = e.target.closest(".main-nav-btn");
    if (!btn) return;
    switchMainSection(btn.dataset.main);
  });
  // Liens de navigation dans le pied de page (délégation, car le footer est régénéré à chaque rafraîchissement)
  document.addEventListener("click", function (e) {
    var navBtn = e.target.closest("[data-goto-section]");
    if (navBtn) { switchMainSection(navBtn.dataset.gotoSection); return; }
    var legalBtn = e.target.closest("[data-legal]");
    if (legalBtn) { openLegalModal(legalBtn.dataset.legalTitle, legalBtn.dataset.legalText); return; }
  });

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
  var legalOverlayEl = document.getElementById("legalModalOverlay");
  if (legalOverlayEl) {
    legalOverlayEl.addEventListener("click", function (e) { if (e.target === legalOverlayEl) closeLegalModal(); });
  }
  var legalCloseBtn = document.getElementById("legalModalClose");
  if (legalCloseBtn) legalCloseBtn.addEventListener("click", closeLegalModal);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeLegalModal(); });

  // Tabs (visuels officiels)
  document.getElementById("tabs").addEventListener("click", function (e) {
    var btn = e.target.closest(".tab-btn");
    if (!btn) return;
    document.querySelectorAll(".tab-btn").forEach(function (b) { b.classList.remove("active"); });
    btn.classList.add("active");
    document.querySelectorAll(".visual-section").forEach(function (s) { s.classList.remove("active"); });
    document.getElementById(btn.dataset.target).classList.add("active");
  });

  // Export PNG -> généré et téléchargé entièrement dans le navigateur (aucune écriture serveur)
  document.querySelectorAll("[data-export]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var card = document.getElementById("card-" + btn.dataset.export);
      var orig = btn.textContent;
      btn.disabled = true; btn.textContent = "Génération…";
      html2canvas(card, { backgroundColor: "#0a0e17", scale: 2 }).then(function (canvas) {
        var a = document.createElement("a");
        a.href = canvas.toDataURL("image/png");
        a.download = "ELC2027_" + btn.dataset.export + ".png";
        document.body.appendChild(a); a.click(); a.remove();
        btn.textContent = "✓ Téléchargé";
      }).catch(function () {
        btn.textContent = "Erreur";
      }).finally(function () {
        setTimeout(function () { btn.textContent = orig; btn.disabled = false; }, 2000);
      });
    });
  });

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

  load();
  // Actualisation périodique pour refléter les modifs faites côté admin (autre onglet)
  setInterval(load, 4000);
})();
