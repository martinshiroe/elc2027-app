import { createBrowserRouter } from "react-router";
import Root from "./components/Root";
import Home from "./pages/Home";
import PageCompetition from "./pages/PageCompetition";
import PageClassements from "./pages/PageClassements";
import PageJoueurs from "./pages/PageJoueurs";
import PagePantheon from "./pages/PagePantheon";

// Pas de page /admin ici : l'administration réelle (écriture des données,
// protégée par ADMIN_KEY) reste sur /admin.html — voir public/admin.html.
export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "competition", Component: PageCompetition },
      { path: "classements", Component: PageClassements },
      { path: "joueurs", Component: PageJoueurs },
      { path: "pantheon", Component: PagePantheon },
    ],
  },
]);
