// ELC 2027 — vue publique
// Charge les données depuis le serveur local (dossier ./data) et les affiche.
(function () {
  "use strict";

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
    return (name || "?").trim().split(/\s+/).slice(0, 2).map(function (w) { return w[0]; }).join("").toUpperCase();
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
      ? '<div class="avatar' + small + '" style="' + style + '"><img src="' + esc(photo) + '" alt=""></div>'
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
    root.innerHTML = TITLE_IDS.map(function (id) {
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
    else { cp.textContent = "Non communiqué"; cp.classList.add("empty"); }
  }

  function setInfo(id, val) {
    var el = document.getElementById(id);
    if (val && val.trim()) { el.textContent = val; el.classList.add("filled"); }
    else { el.textContent = "Non communiqué"; el.classList.remove("filled"); }
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
    else { pp.textContent = "Non communiqué"; pp.classList.add("empty"); }
    document.getElementById("v4-footerGauche").textContent = v.footerGauche;
    document.getElementById("v4-footerDroite").textContent =
      "Prize Pool : " + (v.prizePool && v.prizePool.trim() ? v.prizePool : "Non communiqué");
  }

  function load() {
    return fetch("/api/data").then(function (r) { return r.json(); }).then(renderAll).catch(function (err) {
      console.error("Impossible de charger les données locales :", err);
    });
  }

  // Nav principale (sections)
  document.getElementById("mainNav").addEventListener("click", function (e) {
    var btn = e.target.closest(".main-nav-btn");
    if (!btn) return;
    document.querySelectorAll(".main-nav-btn").forEach(function (b) { b.classList.remove("active"); });
    btn.classList.add("active");
    document.querySelectorAll(".main-section").forEach(function (s) { s.classList.remove("active"); });
    document.getElementById(btn.dataset.main).classList.add("active");
  });

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

  load();
  // Actualisation périodique pour refléter les modifs faites côté admin (autre onglet)
  setInterval(load, 4000);
})();
