// ELC 2027 — interface d'administration
// Charge /api/data, permet l'édition de tous les blocs, enregistre via POST /api/data
// Protégé par un code admin (voir server.js / data/admin-code.txt).
(function () {
  "use strict";

  var LOGO_DATA_URI = "data:image/png;base64,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";
  document.querySelectorAll(".elc-logo-img").forEach(function (img) { img.src = LOGO_DATA_URI; });

  var ADMIN_KEY_STORAGE = "elc2027-admin-key";
  var state = { data: null, dirty: false, adminKey: localStorage.getItem(ADMIN_KEY_STORAGE) || "" };
  var TITLE_IDS = ["hok", "mlbb", "pubgm", "ff"];

  // Titres officiels du Panthéon ELC — catégories figées, pas de saisie libre.
  var PANTHEON_TITLES = [
    { key: "godlike", label: "GodLike", hint: "MOBA — meilleur joueur MOBA de la saison" },
    { key: "demonking", label: "Demon King", hint: "TPS — meilleur joueur TPS de la saison" },
    { key: "mvp", label: "MVP", hint: "MOBA ou TPS — joueur le plus déterminant, au choix" },
    { key: "topfragger", label: "Top Fraggeur", hint: "TPS — total d'éliminations le plus élevé" },
    { key: "goat", label: "G.O.A.T", hint: "Toutes compétitions confondues — champion avec le plus de trophées ELC ; ne s'utilise vraiment qu'à partir d'un éventuel double titre en édition 2+" }
  ];

  // ================= Helpers =================
  function get(obj, path) {
    return path.split(".").reduce(function (o, k) { return (o == null) ? o : o[k]; }, obj);
  }
  function set(obj, path, val) {
    var parts = path.split(".");
    var o = obj;
    for (var i = 0; i < parts.length - 1; i++) {
      var k = /^\d+$/.test(parts[i]) ? Number(parts[i]) : parts[i];
      if (!o[k]) o[k] = {};
      o = o[k];
    }
    var last = parts[parts.length - 1];
    o[/^\d+$/.test(last) ? Number(last) : last] = val;
  }
  function esc(s) {
    return (s == null ? "" : String(s)).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function field(label, path, placeholder) {
    return '<div class="field-group"><label>' + esc(label) + '</label><input type="text" data-path="' + path + '"' +
      (placeholder ? ' placeholder="' + esc(placeholder) + '"' : '') + '></div>';
  }
  function uid(prefix) { return prefix + "_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
  function initials(name) { return (name || "?").trim().split(/\s+/).slice(0, 2).map(function (w) { return /^\d+$/.test(w) ? w : w[0]; }).join("").toUpperCase(); }
  function apiHeaders() { return { "Content-Type": "application/json", "x-admin-key": state.adminKey }; }

  // ================= Connexion (code admin) =================
  var loginScreen = document.getElementById("loginScreen");
  var adminApp = document.getElementById("adminApp");

  function tryEnter(code) {
    var err = document.getElementById("loginErr");
    err.textContent = "";
    fetch("/api/admin/check", { headers: { "x-admin-key": code } }).then(function (r) {
      if (!r.ok) throw new Error("bad");
      state.adminKey = code;
      localStorage.setItem(ADMIN_KEY_STORAGE, code);
      loginScreen.hidden = true; adminApp.hidden = false;
      boot();
    }).catch(function () {
      err.textContent = "Code incorrect. Vérifiez le terminal du serveur ou data/admin-code.txt.";
    });
  }
  document.getElementById("loginBtn").addEventListener("click", function () {
    tryEnter(document.getElementById("loginCode").value.trim());
  });
  document.getElementById("loginCode").addEventListener("keydown", function (e) {
    if (e.key === "Enter") tryEnter(e.target.value.trim());
  });
  document.getElementById("logoutBtn").addEventListener("click", function () {
    localStorage.removeItem(ADMIN_KEY_STORAGE);
    location.reload();
  });

  if (state.adminKey) {
    fetch("/api/admin/check", { headers: { "x-admin-key": state.adminKey } }).then(function (r) {
      if (!r.ok) throw new Error();
      loginScreen.hidden = true; adminApp.hidden = false;
      boot();
    }).catch(function () {
      localStorage.removeItem(ADMIN_KEY_STORAGE);
    });
  }

  // ================= Boot (une fois connecté) =================
  function boot() {

  function buildDynamicFields() {
    var wrap = document.getElementById("v1-titres-cards");
    wrap.innerHTML = "";
    state.data.visual1.titres.forEach(function (t, i) {
      var box = document.createElement("div");
      box.className = "sub-card";
      box.innerHTML = "<h4>" + esc(t.nom) + "</h4><div class=\"field-row three\">" +
        field("Nom", "visual1.titres." + i + ".nom") +
        field("Sous-titre", "visual1.titres." + i + ".sousTitre") +
        field("Lancement", "visual1.titres." + i + ".lancement") +
        "</div><div class=\"field-row three\">" +
        field("Discipline", "visual1.titres." + i + ".discipline") +
        field("Badge", "visual1.titres." + i + ".badge") +
        field("Plateforme", "visual1.titres." + i + ".plateforme") +
        "</div>";
      wrap.appendChild(box);
    });

    var phases = document.getElementById("v2-phases-cards");
    phases.innerHTML = "";
    state.data.visual2.phases.forEach(function (p, i) {
      var box = document.createElement("div");
      box.className = "sub-card";
      box.innerHTML = "<h4>Phase " + (i + 1) + "</h4>" +
        field("Titre", "visual2.phases." + i + ".titre") +
        "<div class=\"field-row three\">" +
        field("Sous-titre", "visual2.phases." + i + ".sousTitre") +
        field("Période", "visual2.phases." + i + ".periode") +
        field("Étiquette", "visual2.phases." + i + ".tag") +
        "</div>";
      phases.appendChild(box);
    });

    document.getElementById("v4-equipes-fields").innerHTML = state.data.visual4.equipes.map(function (_, i) {
      return field("Équipe " + (i + 1), "visual4.equipes." + i);
    }).join("");
    document.getElementById("v4-qf-fields").innerHTML = state.data.visual4.quarts.map(function (_, i) {
      return field("Vainqueur QF" + (i + 1), "visual4.quarts." + i);
    }).join("");
    document.getElementById("v4-sf-fields").innerHTML = state.data.visual4.demis.map(function (_, i) {
      return field("Vainqueur Demi " + (i + 1), "visual4.demis." + i);
    }).join("");
  }

  // ---------------- Compétition & Points ----------------
  function buildCompCards() {
    var wrap = document.getElementById("comp-cards");
    wrap.innerHTML = TITLE_IDS.map(function (id) {
      var comp = state.data.competition[id];
      var html = '<div class="sub-card"><h4>' + esc(comp.nom) + ' — <span style="color:var(--text-dim)">' + comp.family + '</span></h4>';

      html += '<div class="field-group"><label>Image hero — bannière de la discipline</label>' +
        '<input type="text" data-path="competition.' + id + '.heroImage" placeholder="URL publique d\'une image (JPG, PNG, WebP). Laisser vide pour garder le fond par défaut."></div>';

      html += '<div style="font-size:11.5px;font-weight:700;color:var(--text-dim);margin:10px 0 6px">Calendrier</div>';
      comp.calendrier.forEach(function (_, i) {
        html += '<div class="field-row three">' +
          field("Phase", "competition." + id + ".calendrier." + i + ".phase") +
          field("Période", "competition." + id + ".calendrier." + i + ".periode") +
          field("Lieu / format", "competition." + id + ".calendrier." + i + ".lieu") + '</div>';
      });

      html += '<div style="font-size:11.5px;font-weight:700;color:var(--text-dim);margin:14px 0 6px">Barème de points</div>';
      if (comp.family === "MOBA") {
        html += '<div class="field-row three">' +
          field("Points victoire", "competition." + id + ".bareme.victoire") +
          field("Points nul", "competition." + id + ".bareme.nul") +
          field("Points défaite", "competition." + id + ".bareme.defaite") + '</div>';
      } else {
        html += '<div class="field-group"><label>Points par place (1ère, 2e, 3e… séparés par des virgules)</label>' +
          '<input type="text" data-array-path="competition.' + id + '.bareme.places"></div>' +
          field("Points par élimination", "competition." + id + ".bareme.elimination");
      }

      if (comp.family === "MOBA") {
        html += '<div style="font-size:11.5px;font-weight:700;color:var(--text-dim);margin:14px 0 6px">Bracket — 16 équipes (nom + logo)</div>' +
          '<div id="teams-' + id + '"></div>' +
          '<div style="font-size:11.5px;font-weight:700;color:var(--text-dim);margin:14px 0 6px">Progression</div>' +
          '<div class="field-row three" id="progression-' + id + '"></div>';
      } else {
        html += '<div style="font-size:11.5px;font-weight:700;color:var(--text-dim);margin:14px 0 6px">Roster — 32 joueurs (pseudo + photo)</div>' +
          '<div class="admin-desc" style="margin-top:0">Renommez chaque emplacement avec le pseudo réel — c\'est ce nom qu\'il faut choisir en saisissant les résultats de manche.</div>' +
          '<div id="roster-' + id + '"></div>';
      }

      html += '</div>';
      return html;
    }).join("");

    TITLE_IDS.forEach(function (id) {
      var comp = state.data.competition[id];
      if (comp.family === "MOBA") { renderSlotRows(id, "bracket.equipes", "team", "Nom de l'équipe", "Logo de l'équipe"); renderProgression(id); }
      else { renderSlotRows(id, "roster", "roster", "Pseudo du joueur", "Photo du joueur"); }
    });
  }

  // Générique : liste d'emplacements {id,nom,logo|photo} éditables (équipes MOBA ou roster TPS)
  function renderSlotRows(id, arrayPath, kind, namePlaceholder, photoTitle) {
    var host = document.getElementById((kind === "team" ? "teams-" : "roster-") + id);
    if (!host) return;
    var arr = get(state.data.competition[id], arrayPath) || [];
    var imgKey = kind === "team" ? "logo" : "photo";
    host.innerHTML = arr.map(function (t, i) {
      var key = id + "::" + arrayPath + "::" + i;
      return '<div class="player-row" style="grid-template-columns:44px 1fr">' +
        '<label class="photo-upload-label" title="' + esc(photoTitle) + '">' +
        (t[imgKey] ? '<div class="avatar" style="width:36px;height:36px"><img src="' + esc(t[imgKey]) + '"></div>' : '<div class="avatar" style="width:36px;height:36px;font-size:11px">' + esc(initials(t.nom)) + '</div>') +
        '<input type="file" accept="image/png,image/jpeg,image/webp" data-slot-photo="' + key + '"></label>' +
        '<input type="text" placeholder="' + esc(namePlaceholder) + '" value="' + esc(t.nom) + '" data-slot-name="' + key + '">' +
        '</div>';
    }).join("");
    host.querySelectorAll("[data-slot-name]").forEach(function (inp) {
      inp.addEventListener("input", function () {
        var p = inp.dataset.slotName.split("::");
        get(state.data.competition[p[0]], p[1])[Number(p[2])].nom = inp.value;
        markDirty();
      });
    });
    host.querySelectorAll("[data-slot-photo]").forEach(function (inp) {
      inp.addEventListener("change", function () {
        var p = inp.dataset.slotPhoto.split("::");
        var file = inp.files[0];
        if (!file) return;
        var slot = get(state.data.competition[p[0]], p[1])[Number(p[2])];
        uploadPhoto(slot.id, file, function (url) {
          slot[imgKey] = url; markDirty(); renderSlotRows(p[0], p[1], kind, namePlaceholder, photoTitle);
        });
      });
    });
  }

  function renderProgression(id) {
    var host = document.getElementById("progression-" + id);
    var comp = state.data.competition[id];
    function teamSelect(label, value, onPick) {
      var opts = '<option value="">— à déterminer —</option>' + comp.bracket.equipes.map(function (t) {
        return '<option value="' + esc(t.nom) + '"' + (t.nom === value ? " selected" : "") + '>' + esc(t.nom) + '</option>';
      }).join("");
      return { label: label, opts: opts, onPick: onPick };
    }
    var items = [];
    comp.bracket.quarts.forEach(function (v, i) { items.push({ label: "Vainqueur QF" + (i + 1), path: "competition." + id + ".bracket.quarts." + i, value: v }); });
    comp.bracket.demis.forEach(function (v, i) { items.push({ label: "Vainqueur Demi " + (i + 1), path: "competition." + id + ".bracket.demis." + i, value: v }); });
    items.push({ label: "Champion", path: "competition." + id + ".bracket.champion", value: comp.bracket.champion });

    host.innerHTML = items.map(function (it) {
      var opts = '<option value="">— à déterminer —</option>' + comp.bracket.equipes.map(function (t) {
        return '<option value="' + esc(t.nom) + '"' + (t.nom === it.value ? " selected" : "") + '>' + esc(t.nom) + '</option>';
      }).join("");
      return '<div class="field-group"><label>' + esc(it.label) + '</label><select data-path="' + it.path + '">' + opts + '</select></div>';
    }).join("");
  }

  // ---------------- Manches & Résultats ----------------
  function buildManchesCards() {
    var wrap = document.getElementById("manches-cards");
    wrap.innerHTML = TITLE_IDS.map(function (id) {
      var comp = state.data.competition[id];
      var html = '<div class="sub-card" data-manches-for="' + id + '"><h4>' + esc(comp.nom) + '</h4>';
      if (comp.family === "MOBA") {
        html += '<div id="manches-rows-' + id + '"></div>' +
          '<button type="button" class="btn secondary" data-add-match="' + id + '" style="margin-top:6px">+ Ajouter un match</button>';
      } else {
        html += '<div id="manches-rounds-' + id + '"></div>' +
          '<button type="button" class="btn secondary" data-add-round="' + id + '" style="margin-top:6px">+ Ajouter une manche</button>';
      }
      html += '</div>';
      return html;
    }).join("");

    TITLE_IDS.forEach(function (id) {
      var comp = state.data.competition[id];
      if (comp.family === "MOBA") renderMatchRows(id); else renderRounds(id);
    });

    wrap.querySelectorAll("[data-add-match]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.dataset.addMatch;
        state.data.competition[id].manches.push({ equipe1: "", equipe2: "", score1: "", score2: "" });
        markDirty(); renderMatchRows(id);
      });
    });
    wrap.querySelectorAll("[data-add-round]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.dataset.addRound;
        var comp = state.data.competition[id];
        comp.manches.push({ nom: "Manche " + (comp.manches.length + 1), resultats: [] });
        markDirty(); renderRounds(id);
      });
    });
  }

  function renderMatchRows(id) {
    var host = document.getElementById("manches-rows-" + id);
    var manches = state.data.competition[id].manches;
    var teams = state.data.competition[id].bracket.equipes;
    function teamOptions(selected) {
      return '<option value="">— choisir —</option>' + teams.map(function (t) {
        return '<option value="' + esc(t.nom) + '"' + (t.nom === selected ? " selected" : "") + '>' + esc(t.nom) + '</option>';
      }).join("");
    }
    if (!manches.length) { host.innerHTML = '<div class="empty-state">Aucun match saisi.</div>'; return; }
    host.innerHTML = manches.map(function (m, i) {
      return '<div class="field-row" style="grid-template-columns:1fr 70px 70px 1fr auto;align-items:end;gap:8px;margin-bottom:8px">' +
        '<div class="field-group" style="margin:0"><label>Équipe 1</label><select data-match="' + id + '.' + i + '.equipe1">' + teamOptions(m.equipe1) + '</select></div>' +
        '<div class="field-group" style="margin:0"><label>Score</label><input type="text" value="' + esc(m.score1) + '" data-match="' + id + '.' + i + '.score1"></div>' +
        '<div class="field-group" style="margin:0"><label>Score</label><input type="text" value="' + esc(m.score2) + '" data-match="' + id + '.' + i + '.score2"></div>' +
        '<div class="field-group" style="margin:0"><label>Équipe 2</label><select data-match="' + id + '.' + i + '.equipe2">' + teamOptions(m.equipe2) + '</select></div>' +
        '<button type="button" class="icon-btn" data-del-match="' + id + '.' + i + '" title="Supprimer">✕</button></div>';
    }).join("");
    host.querySelectorAll("[data-match]").forEach(function (inp) {
      inp.addEventListener("input", function () {
        var parts = inp.dataset.match.split(".");
        state.data.competition[parts[0]].manches[Number(parts[1])][parts[2]] = inp.value;
        markDirty();
      });
    });
    host.querySelectorAll("[data-del-match]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var parts = btn.dataset.delMatch.split(".");
        state.data.competition[parts[0]].manches.splice(Number(parts[1]), 1);
        markDirty(); renderMatchRows(parts[0]);
      });
    });
  }

  function renderRounds(id) {
    var host = document.getElementById("manches-rounds-" + id);
    var manches = state.data.competition[id].manches;
    var roster = state.data.competition[id].roster || [];
    function playerOptions(selected) {
      var opts = '<option value="">— choisir —</option>' + roster.map(function (s) {
        return '<option value="' + esc(s.nom) + '"' + (s.nom === selected ? " selected" : "") + '>' + esc(s.nom) + '</option>';
      }).join("");
      if (selected && !roster.some(function (s) { return s.nom === selected; })) {
        opts += '<option value="' + esc(selected) + '" selected>' + esc(selected) + ' (introuvable)</option>';
      }
      return opts;
    }
    if (!manches.length) { host.innerHTML = '<div class="empty-state">Aucune manche saisie.</div>'; return; }
    host.innerHTML = manches.map(function (m, ri) {
      var rows = (m.resultats || []).map(function (r, pi) {
        return '<div class="field-row" style="grid-template-columns:60px 1.3fr 60px 60px auto;align-items:end;gap:8px;margin-bottom:6px">' +
          '<div class="field-group" style="margin:0"><label>Place</label><input type="text" value="' + esc(r.place) + '" data-round="' + id + '.' + ri + '.' + pi + '.place"></div>' +
          '<div class="field-group" style="margin:0"><label>Joueur</label><select data-round="' + id + '.' + ri + '.' + pi + '.joueur">' + playerOptions(r.joueur) + '</select></div>' +
          '<div class="field-group" style="margin:0"><label>Élim.</label><input type="text" value="' + esc(r.kills) + '" data-round="' + id + '.' + ri + '.' + pi + '.kills"></div>' +
          '<div class="field-group" style="margin:0"><label>Morts</label><input type="text" value="' + esc(r.deaths) + '" data-round="' + id + '.' + ri + '.' + pi + '.deaths"></div>' +
          '<button type="button" class="icon-btn" data-del-result="' + id + '.' + ri + '.' + pi + '" title="Supprimer">✕</button></div>';
      }).join("");
      return '<div class="sub-card" style="background:var(--panel)">' +
        '<div class="field-group" style="max-width:220px"><label>Nom de la manche</label><input type="text" value="' + esc(m.nom) + '" data-round-name="' + id + '.' + ri + '"></div>' +
        rows +
        '<button type="button" class="btn secondary" data-add-result="' + id + '.' + ri + '">+ Ajouter un joueur</button>' +
        '<button type="button" class="icon-btn" style="float:right" data-del-round="' + id + '.' + ri + '" title="Supprimer la manche">✕ Supprimer la manche</button>' +
        '</div>';
    }).join("");

    host.querySelectorAll("[data-round-name]").forEach(function (inp) {
      inp.addEventListener("input", function () {
        var p = inp.dataset.roundName.split(".");
        state.data.competition[p[0]].manches[Number(p[1])].nom = inp.value;
        markDirty();
      });
    });
    host.querySelectorAll("[data-round]").forEach(function (inp) {
      inp.addEventListener("input", function () {
        var p = inp.dataset.round.split(".");
        state.data.competition[p[0]].manches[Number(p[1])].resultats[Number(p[2])][p[3]] = inp.value;
        markDirty();
      });
    });
    host.querySelectorAll("[data-add-result]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var p = btn.dataset.addResult.split(".");
        state.data.competition[p[0]].manches[Number(p[1])].resultats.push({ place: "", joueur: "", kills: "", deaths: "" });
        markDirty(); renderRounds(p[0]);
      });
    });
    host.querySelectorAll("[data-del-result]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var p = btn.dataset.delResult.split(".");
        state.data.competition[p[0]].manches[Number(p[1])].resultats.splice(Number(p[2]), 1);
        markDirty(); renderRounds(p[0]);
      });
    });
    host.querySelectorAll("[data-del-round]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var p = btn.dataset.delRound.split(".");
        state.data.competition[p[0]].manches.splice(Number(p[1]), 1);
        markDirty(); renderRounds(p[0]);
      });
    });
  }

  // ---------------- Joueurs ----------------
  var joueursFilter = "all";

  function renderJoueursAdmin() {
    var joueurs = state.data.joueurs || [];
    var filterHost = document.getElementById("joueursFilterAdmin");
    var chips = [{ id: "all", label: "Tous (" + joueurs.length + ")" }].concat(TITLE_IDS.map(function (id) {
      var n = joueurs.filter(function (j) { return j.jeu === id; }).length;
      return { id: id, label: state.data.competition[id].nom + " (" + n + ")" };
    }));
    filterHost.innerHTML = chips.map(function (c) {
      return '<button type="button" class="filter-chip' + (c.id === joueursFilter ? " active" : "") + '" data-jfilter="' + c.id + '">' + esc(c.label) + '</button>';
    }).join("");
    filterHost.querySelectorAll("[data-jfilter]").forEach(function (btn) {
      btn.addEventListener("click", function () { joueursFilter = btn.dataset.jfilter; renderJoueursAdmin(); });
    });

    var list = document.getElementById("joueursListAdmin");
    var filtered = joueurs.map(function (j, i) { return { j: j, i: i }; }).filter(function (o) { return joueursFilter === "all" || o.j.jeu === joueursFilter; });
    if (!filtered.length) { list.innerHTML = '<div class="empty-state">Aucun joueur. Importez un CSV ou ajoutez-en un manuellement.</div>'; return; }

    list.innerHTML = filtered.map(function (o) {
      var j = o.j, i = o.i;
      var jeuOptions = TITLE_IDS.map(function (id) {
        return '<option value="' + id + '"' + (j.jeu === id ? " selected" : "") + '>' + esc(state.data.competition[id].nom) + '</option>';
      }).join("");
      return '<div class="player-row" data-player-row="' + i + '">' +
        '<label class="photo-upload-label" title="Changer la photo">' +
        (j.photo ? '<div class="avatar" style="width:36px;height:36px"><img src="' + esc(j.photo) + '"></div>' : '<div class="avatar" style="width:36px;height:36px;font-size:11px">' + esc(initials(j.pseudo || j.nom)) + '</div>') +
        '<input type="file" accept="image/png,image/jpeg,image/webp" data-photo-for="' + i + '"></label>' +
        '<input type="text" placeholder="Nom" value="' + esc(j.nom) + '" data-jf="' + i + '.nom">' +
        '<input type="text" placeholder="Pseudo" value="' + esc(j.pseudo) + '" data-jf="' + i + '.pseudo">' +
        '<select data-jf="' + i + '.jeu" style="background:var(--panel);border:1px solid var(--border-soft);color:var(--text);border-radius:5px;padding:6px;font-size:12px">' + jeuOptions + '</select>' +
        '<input type="text" placeholder="Équipe / Clan" value="' + esc(j.equipe || "") + '" data-jf="' + i + '.equipe">' +
        '<button type="button" class="icon-btn" data-del-player="' + i + '" title="Supprimer">✕</button>' +
        '</div>';
    }).join("");

    list.querySelectorAll("[data-jf]").forEach(function (inp) {
      inp.addEventListener("input", function () {
        var p = inp.dataset.jf.split(".");
        state.data.joueurs[Number(p[0])][p[1]] = inp.value;
        markDirty();
      });
    });
    list.querySelectorAll("[data-del-player]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (!confirm("Supprimer ce joueur ?")) return;
        state.data.joueurs.splice(Number(btn.dataset.delPlayer), 1);
        markDirty(); renderJoueursAdmin();
      });
    });
    list.querySelectorAll("[data-photo-for]").forEach(function (inp) {
      inp.addEventListener("change", function () {
        var idx = Number(inp.dataset.photoFor);
        var file = inp.files[0];
        if (!file) return;
        uploadPhoto(state.data.joueurs[idx].id, file, function (url) {
          state.data.joueurs[idx].photo = url;
          markDirty(); renderJoueursAdmin();
        });
      });
    });
  }

  function uploadPhoto(entityId, file, onDone) {
    var reader = new FileReader();
    reader.onload = function () {
      fetch("/api/photo/" + entityId, {
        method: "POST", headers: apiHeaders(), body: JSON.stringify({ dataUrl: reader.result })
      }).then(function (r) { return r.json(); }).then(function (res) {
        if (res.error) throw new Error(res.error);
        onDone(res.url);
      }).catch(function (err) { alert("Échec de l'envoi de la photo : " + err.message); });
    };
    reader.readAsDataURL(file);
  }

  document.getElementById("addPlayerBtn").addEventListener("click", function () {
    state.data.joueurs = state.data.joueurs || [];
    state.data.joueurs.push({ id: uid("j"), nom: "", pseudo: "", jeu: "hok", equipe: "", contact: "", photo: "" });
    markDirty(); renderJoueursAdmin();
  });

  // ---- Import CSV ----
  function parseCSV(text) {
    var rows = []; var row = []; var field = ""; var inQuotes = false;
    for (var i = 0; i < text.length; i++) {
      var c = text[i];
      if (inQuotes) {
        if (c === '"') { if (text[i + 1] === '"') { field += '"'; i++; } else inQuotes = false; }
        else field += c;
      } else if (c === '"') inQuotes = true;
      else if (c === ',') { row.push(field); field = ""; }
      else if (c === '\n' || c === '\r') {
        if (c === '\r' && text[i + 1] === '\n') i++;
        row.push(field); field = ""; rows.push(row); row = [];
      } else field += c;
    }
    if (field.length || row.length) { row.push(field); rows.push(row); }
    return rows.filter(function (r) { return r.some(function (c) { return c.trim() !== ""; }); });
  }

  var csvRows = null, csvHeaders = null;
  var EXPECTED_FIELDS = [
    { key: "nom", label: "Nom complet" },
    { key: "pseudo", label: "Pseudo / gamer tag" },
    { key: "jeu", label: "Jeu (texte libre → sera à ajuster)" },
    { key: "equipe", label: "Équipe / Clan" },
    { key: "contact", label: "Contact (email / téléphone)" }
  ];

  function guessColumn(header) {
    var h = header.toLowerCase();
    if (/nom|name/.test(h) && !/pseudo|tag/.test(h)) return "nom";
    if (/pseudo|tag|gamer/.test(h)) return "pseudo";
    if (/jeu|titre|game/.test(h)) return "jeu";
    if (/equipe|team|équipe/.test(h)) return "equipe";
    if (/mail|contact|t[ée]l/.test(h)) return "contact";
    return "";
  }

  document.getElementById("csvParseBtn").addEventListener("click", function () {
    var text = "";
    var file = document.getElementById("csvFile").files[0];
    var afterText = function (t) {
      var rows = parseCSV(t);
      if (rows.length < 2) { alert("Le CSV doit contenir un en-tête et au moins une ligne."); return; }
      csvHeaders = rows[0]; csvRows = rows.slice(1);
      var mapWrap = document.getElementById("csvMapWrap");
      mapWrap.hidden = false;
      document.getElementById("csvMapRows").innerHTML = EXPECTED_FIELDS.map(function (f) {
        var options = '<option value="">— ignorer —</option>' + csvHeaders.map(function (h, i) {
          return '<option value="' + i + '"' + (guessColumn(h) === f.key ? " selected" : "") + '>' + esc(h) + '</option>';
        }).join("");
        return '<div class="csv-map-row"><span>' + esc(f.label) + '</span><select data-csv-field="' + f.key + '">' + options + '</select></div>';
      }).join("");
      document.getElementById("csvCount").textContent = "(" + csvRows.length + ")";
    };
    if (file) { var r = new FileReader(); r.onload = function () { afterText(r.result); }; r.readAsText(file, "utf-8"); }
    else { text = document.getElementById("csvPaste").value; if (!text.trim()) { alert("Choisissez un fichier ou collez le contenu du CSV."); return; } afterText(text); }
  });

  document.getElementById("csvImportBtn").addEventListener("click", function () {
    var mapping = {};
    document.querySelectorAll("[data-csv-field]").forEach(function (sel) { mapping[sel.dataset.csvField] = sel.value; });
    var imported = csvRows.map(function (row) {
      var p = { id: uid("j"), nom: "", pseudo: "", jeu: "hok", equipe: "", contact: "", photo: "" };
      EXPECTED_FIELDS.forEach(function (f) {
        if (mapping[f.key] !== "" && mapping[f.key] != null) p[f.key] = (row[Number(mapping[f.key])] || "").trim();
      });
      // normalise le champ "jeu" en id de titre si reconnaissable
      var jl = p.jeu.toLowerCase();
      var found = TITLE_IDS.find(function (id) {
        return state.data.competition[id].nom.toLowerCase().indexOf(jl) !== -1 || jl.indexOf(id) !== -1;
      });
      p.jeu = found || "hok";
      return p;
    });
var invalides = imported.filter(function (p) { return !p.nom.trim() && !p.pseudo.trim(); }).length;
    state.data.joueurs = (state.data.joueurs || []).concat(imported);
    markDirty();
    document.getElementById("csvMapWrap").hidden = true;
    document.getElementById("csvFile").value = ""; document.getElementById("csvPaste").value = "";
    renderJoueursAdmin();
    if (invalides > 0) {
      setStatus(imported.length + " joueur(s) importé(s), dont " + invalides + " sans nom ni pseudo (vérifiez le mapping des colonnes) — puis Enregistrer.", "err");
    } else {
      setStatus(imported.length + " joueur(s) importé(s) avec succès — vérifiez le jeu attribué à chacun, puis Enregistrer.", "ok");
    }
 });

  // ---------------- Panthéon ----------------
  function renderPantheonAdmin() {
    var host = document.getElementById("pantheonListAdmin");
    var curated = (state.data.pantheon && state.data.pantheon.curated) || [];
    if (!curated.length) { host.innerHTML = '<div class="empty-state">Aucune distinction ajoutée.</div>'; }
    else {
      host.innerHTML = curated.map(function (p, i) {
        var jeuOptions = '<option value="">— (toutes / G.O.A.T) —</option>' + TITLE_IDS.map(function (id) {
          return '<option value="' + id + '"' + (p.jeu === id ? " selected" : "") + '>' + esc(state.data.competition[id].nom) + '</option>';
        }).join("");
        var titreOptions = '<option value="">— choisir un titre —</option>' + PANTHEON_TITLES.map(function (t) {
          return '<option value="' + t.key + '"' + (p.titreKey === t.key ? " selected" : "") + '>' + esc(t.label) + '</option>';
        }).join("");
        var selectedTitle = PANTHEON_TITLES.find(function (t) { return t.key === p.titreKey; });
        return '<div class="sub-card">' +
          '<div style="display:flex;gap:14px;align-items:flex-start;flex-wrap:wrap">' +
          '<label class="photo-upload-label" title="Changer la photo" style="width:56px;height:56px">' +
          (p.photo ? '<div class="avatar" style="width:56px;height:56px"><img src="' + esc(p.photo) + '"></div>' : '<div class="avatar" style="width:56px;height:56px;font-size:16px">' + esc(initials(p.pseudo || p.nom)) + '</div>') +
          '<input type="file" accept="image/png,image/jpeg,image/webp" data-pantheon-photo="' + i + '"></label>' +
          '<div style="flex:1;min-width:260px">' +
          '<div class="field-row three">' +
          '<div class="field-group" style="margin:0"><label>Titre</label><select data-pf="' + i + '.titreKey" title="' + (selectedTitle ? esc(selectedTitle.hint) : "") + '">' + titreOptions + '</select></div>' +
          '<div class="field-group" style="margin:0"><label>Jeu concerné</label><select data-pf="' + i + '.jeu">' + jeuOptions + '</select></div>' +
          '<div class="field-group" style="margin:0"><label>Clan / équipe</label><input type="text" placeholder="ex. Les Lions" value="' + esc(p.clan) + '" data-pf="' + i + '.clan"></div>' +
          '</div>' +
          '<div class="field-row">' +
          '<div class="field-group" style="margin:0"><label>Pseudo</label><input type="text" placeholder="Pseudo du joueur" value="' + esc(p.pseudo) + '" data-pf="' + i + '.pseudo"></div>' +
          '<div class="field-group" style="margin:0"><label>Nom complet (optionnel)</label><input type="text" placeholder="Nom complet" value="' + esc(p.nom) + '" data-pf="' + i + '.nom"></div>' +
          '</div>' +
          '<div class="field-group" style="margin-top:12px"><label>Palmarès</label><textarea placeholder="ex. Champion ELC 2027 · Finaliste Coupe de l\'Est · MVP Phase 3" data-pf="' + i + '.palmares">' + esc(p.palmares) + '</textarea></div>' +
          '</div>' +
          '<button type="button" class="icon-btn" data-del-pantheon="' + i + '" title="Supprimer">✕</button>' +
          '</div></div>';
      }).join("");
    }
    host.querySelectorAll("[data-pf]").forEach(function (inp) {
      inp.addEventListener("input", function () {
        var p = inp.dataset.pf.split(".");
        state.data.pantheon.curated[Number(p[0])][p[1]] = inp.value;
        markDirty();
        if (p[1] === "titreKey" || p[1] === "pseudo") renderPantheonAdmin();
      });
    });
    host.querySelectorAll("[data-del-pantheon]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        state.data.pantheon.curated.splice(Number(btn.dataset.delPantheon), 1);
        markDirty(); renderPantheonAdmin();
      });
    });
    host.querySelectorAll("[data-pantheon-photo]").forEach(function (inp) {
      inp.addEventListener("change", function () {
        var idx = Number(inp.dataset.pantheonPhoto);
        var file = inp.files[0];
        if (!file) return;
        var entry = state.data.pantheon.curated[idx];
        if (!entry.id) entry.id = uid("p");
        uploadPhoto(entry.id, file, function (url) {
          entry.photo = url; markDirty(); renderPantheonAdmin();
        });
      });
    });
  }
  document.getElementById("addPantheonBtn").addEventListener("click", function () {
    state.data.pantheon = state.data.pantheon || { curated: [] };
    state.data.pantheon.curated.push({ id: uid("p"), titreKey: "", nom: "", pseudo: "", clan: "", jeu: "", palmares: "", photo: "" });
    markDirty(); renderPantheonAdmin();
  });

  // ---------------- Champs simples (data-path / data-badges / data-array-path) ----------------
  function syncFieldsFromState() {
    document.querySelectorAll("[data-path]").forEach(function (el) {
      if (document.activeElement === el) return;
      var v = get(state.data, el.dataset.path);
      el.value = (v == null) ? "" : v;
    });
    document.querySelectorAll("[data-badges]").forEach(function (el) {
      if (document.activeElement === el) return;
      var arr = get(state.data, el.dataset.badges + ".badges") || [];
      el.value = arr.join(" · ");
    });
    document.querySelectorAll("[data-array-path]").forEach(function (el) {
      if (document.activeElement === el) return;
      var arr = get(state.data, el.dataset.arrayPath) || [];
      el.value = arr.join(", ");
    });
  }

  function setStatus(msg, cls) {
    var el = document.getElementById("saveStatus");
    el.textContent = msg;
    el.className = "status-msg " + (cls || "");
  }
  function markDirty() { state.dirty = true; setStatus("Modifications non enregistrées.", ""); }

  function load() {
    setStatus("Chargement…", "");
    return fetch("/api/data").then(function (r) { return r.json(); }).then(function (d) {
      state.data = d; state.data.joueurs = state.data.joueurs || []; state.data.pantheon = state.data.pantheon || { curated: [] };
      state.dirty = false;
      buildDynamicFields(); buildCompCards(); buildManchesCards(); renderJoueursAdmin(); renderPantheonAdmin();
      syncFieldsFromState();
      setStatus("Données à jour.", "ok");
    }).catch(function (err) {
      setStatus("Impossible de charger les données : " + err.message, "err");
    });
  }

  document.addEventListener("input", function (e) {
    var el = e.target;
    if (el.matches("[data-path]")) {
      set(state.data, el.dataset.path, el.value);
      markDirty();
    } else if (el.matches("[data-badges]")) {
      var arr = el.value.split("·").map(function (s) { return s.trim(); }).filter(Boolean);
      set(state.data, el.dataset.badges + ".badges", arr);
      markDirty();
    } else if (el.matches("[data-array-path]")) {
      var nums = el.value.split(",").map(function (s) { return Number(s.trim()); }).filter(function (n) { return !isNaN(n); });
      set(state.data, el.dataset.arrayPath, nums);
      markDirty();
    }
  });

  document.getElementById("saveBtn").addEventListener("click", function () {
    setStatus("Enregistrement…", "");
    fetch("/api/data", { method: "POST", headers: apiHeaders(), body: JSON.stringify(state.data) })
      .then(function (r) { return r.json(); }).then(function (res) {
        if (res.error) throw new Error(res.error);
        state.dirty = false;
        setStatus("Enregistré à " + new Date().toLocaleTimeString("fr-FR"), "ok");
      }).catch(function (err) {
        setStatus("Échec de l'enregistrement : " + err.message, "err");
      });
  });

  document.getElementById("reloadBtn").addEventListener("click", function () {
    if (state.dirty && !confirm("Des modifications non enregistrées seront perdues. Recharger quand même ?")) return;
    load();
  });

  document.getElementById("railTabs").addEventListener("click", function (e) {
    var btn = e.target.closest(".tab-btn");
    if (!btn) return;
    document.querySelectorAll("#railTabs .tab-btn").forEach(function (b) { b.classList.remove("active"); });
    btn.classList.add("active");
    document.querySelectorAll(".admin-panel").forEach(function (p) { p.classList.remove("active"); });
    document.getElementById(btn.dataset.panel).classList.add("active");
  });

  window.addEventListener("beforeunload", function (e) {
    if (state.dirty) { e.preventDefault(); e.returnValue = ""; }
  });

  load();
  } // fin boot()
})();
