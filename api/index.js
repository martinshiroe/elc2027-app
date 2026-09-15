// Point d'entrée Vercel : une seule fonction serverless gère toutes les
// routes /api/* (voir apiApp.js pour la logique — identique à Render/local).
// Les fichiers statiques (public/, css/js/img, admin.html, app.html) et le
// repli SPA sont gérés par vercel.json, pas par cette fonction.
const { app } = require('../apiApp');
module.exports = app;
