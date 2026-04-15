import { createBrowserRouter } from "react-router-dom";
import Game from "../pages/Game";
import NotFoundPage from "../pages/NotFoundPage";
import Settings from "../pages/Settings";
import Shop from "../pages/Shop";
import Stats from "../pages/Stats";
import routes from "./routes";
import PageWrapper from "../layout/page-wrapper";

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
