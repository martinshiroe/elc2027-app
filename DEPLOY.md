# Mettre ELC 2027 en ligne (gratuit, lien public)

Statut : les dépôts GitHub sont déjà créés et le code est poussé.

- Données : [github.com/martinshiroe/elc2027-data](https://github.com/martinshiroe/elc2027-data)
- Code : [github.com/martinshiroe/elc2027-app](https://github.com/martinshiroe/elc2027-app)

Il reste à créer le service sur Render avec les bonnes variables
d'environnement.

## Créer le service sur Render

1. Sur [render.com](https://render.com), **New +** → **Web Service**.
2. Connectez le dépôt GitHub `elc2027-app`.
3. Render détecte `render.yaml` et pré-remplit la configuration (plan Free).
4. Dans **Environment**, renseignez :
   - `GITHUB_TOKEN` : un jeton d'accès (fine-grained) généré sur GitHub
     (Settings → Developer settings → Personal access tokens → Fine-grained
     tokens), limité au dépôt `elc2027-data`, permission **Contents: Read
     and write**.
   - `GITHUB_OWNER` : `martinshiroe`
   - `GITHUB_REPO` : `elc2027-data`
   - `GITHUB_BRANCH` : `main`
   - `ADMIN_KEY` : un code fort que vous choisissez — protège l'admin en
     ligne.
5. **Create Web Service**. Premier déploiement : 1 à 3 minutes.

Le lien public apparaît en haut de la page Render
(`https://elc2027-app.onrender.com` ou le nom choisi).

## Vérifier

- Le lien public charge en lecture seule.
- `<lien>/admin.html` + le `ADMIN_KEY` choisi → connexion admin.
- Une modification enregistrée doit créer un nouveau commit visible dans
  `elc2027-data` sur GitHub.

## À savoir

- **Plan gratuit Render = mise en veille après 15 min d'inactivité.** Le
  premier visiteur après une pause attend ~30-50 secondes ; ensuite c'est
  instantané. Avant un événement important, ouvrez le lien vous-même
  quelques minutes à l'avance.
- **Historique gratuit inclus** : chaque enregistrement admin crée un commit
  dans `elc2027-data` — annulable depuis l'onglet **Code → Commits**.
- **Nom de domaine personnalisé** (ex. `elc2027.com`) : attachable
  gratuitement sur Render une fois acheté chez un registrar. Dites-le-moi le
  moment venu.
- Le mode local (`Démarrer-ELC2027.bat`) continue de fonctionner
  indépendamment de ce déploiement.
