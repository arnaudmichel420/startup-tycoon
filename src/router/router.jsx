/* eslint-disable react-refresh/only-export-components */
import Accueil from "@/pages/Accueil";
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import MultiPageWrapper from "@/layout/multi-page-wrapper";
import PublicMultiPageWrapper from "@/layout/public-multi-page-wrapper";
import { RequireAuth } from "@/components/providers/require-auth";
import SoloPageWrapper from "../layout/solo-page-wrapper";
import routes from "./routes";

const Settings = lazy(
  () => import(/* webpackChunkName: "settings" */ "../pages/Solo/settings"),
);
const Shop = lazy(
  () => import(/* webpackChunkName: "shop" */ "../pages/Solo/shop"),
);
const Stats = lazy(
  () => import(/* webpackChunkName: "stats" */ "../pages/Solo/stats"),
);
const Leaderboard = lazy(
  () =>
    import(
      /* webpackChunkName: "leaderboard" */ "../pages/Multijoueur/leaderboard"
    ),
);
const NotFoundPage = lazy(
  () => import(/* webpackChunkName: "notFoundPage" */ "../pages/NotFoundPage"),
);
const Multijoueur = lazy(
  () =>
    import(/* webpackChunkName: "multijoueur" */ "../pages/Multijoueur/game"),
);
const MultiShop = lazy(
  () =>
    import(
      /* webpackChunkName: "multijoueur-shop" */ "../pages/Multijoueur/shop"
    ),
);
const Solo = lazy(
  () => import(/* webpackChunkName: "multijoueur" */ "../pages/Solo/game"),
);

const router = createBrowserRouter([
  {
    element: <SoloPageWrapper />,
    children: [
      {
        path: routes.solo,
        element: <Solo />,
      },
      {
        path: routes.settings,
        element: <Settings />,
      },
      {
        path: routes.shop,
        element: <Shop />,
      },
      {
        path: routes.stats,
        element: (
          <RequireAuth>
            <Stats />
          </RequireAuth>
        ),
      },
    ],
  },
  {
    element: <MultiPageWrapper />,
    children: [
      {
        path: routes.multijoueur,
        element: <Multijoueur />,
      },
      {
        path: routes.multiShop,
        element: <MultiShop />,
      },
    ],
  },
  {
    element: <PublicMultiPageWrapper />,
    children: [
      {
        path: routes.leaderboard,
        element: <Leaderboard />,
      },
    ],
  },
  {
    element: <Accueil />,
    path: routes.accueil,
  },
  {
    element: <Accueil />,
    path: "*",
  },
]);
export default router;
