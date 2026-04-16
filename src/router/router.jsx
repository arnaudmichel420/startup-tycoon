import { createBrowserRouter } from "react-router-dom";
import Game from "../pages/Game";
import routes from "./routes";
import PageWrapper from "../layout/page-wrapper";
import { lazy } from "react";

const Settings = lazy(
  () => import(/* webpackChunkName: "settings" */ "../pages/Settings"),
);
const Shop = lazy(() => import(/* webpackChunkName: "shop" */ "../pages/Shop"));
const Stats = lazy(
  () => import(/* webpackChunkName: "stats" */ "../pages/Stats"),
);
const NotFoundPage = lazy(
  () => import(/* webpackChunkName: "notFoundPage" */ "../pages/NotFoundPage"),
);

const router = createBrowserRouter([
  {
    element: <PageWrapper />,
    children: [
      {
        path: routes.game,
        element: <Game />,
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
        element: <Stats />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
export default router;
