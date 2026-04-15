import { Link, Outlet } from "react-router-dom";
import routes from "../router/routes";

const navLinkClassName =
  "relative text-2xl font-bold after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-current after:transition-all after:duration-300 hover:after:w-full";
export default function PageWrapper() {
  return (
    <div>
      <div className="h-24 bg-secondary flex gap-4 items-center px-4">
        <Link className={navLinkClassName} to={routes.game}>
          Game
        </Link>
        <Link className={navLinkClassName} to={routes.shop}>
          Shop
        </Link>
        <Link className={navLinkClassName} to={routes.stats}>
          Stats
        </Link>
        <Link className={navLinkClassName} to={routes.settings}>
          Settings
        </Link>
      </div>
      <div className="mx-auto py-8 container">
        <Outlet />
      </div>
      <div className="h-52 bg-secondary border-t border-t-primary flex items-center justify-center text-2xl">
        Startup Tyccon 2026
      </div>
    </div>
  );
}
