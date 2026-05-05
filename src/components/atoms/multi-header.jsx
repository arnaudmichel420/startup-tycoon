import { AuthHeaderActions } from "@/components/atoms/auth-header-actions";
import routes from "@/router/routes";
import { memo } from "react";
import { NavLink } from "react-router-dom";

export const MultiHeader = memo(function MultiHeader() {
  const navLinkClassName = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-semibold uppercase transition ${
      isActive
        ? "bg-primary text-primary-foreground shadow-sm"
        : "text-secondary-foreground/80 hover:bg-background/70 hover:text-foreground"
    }`;

  return (
    <header className="sticky top-0 z-20 pt-4">
      <div className="overflow-hidden rounded-xl border border-border/80 bg-card/85 shadow-lg backdrop-blur">
        <div className="flex flex-col gap-5 px-5 py-5 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <NavLink to={routes.accueil}>
            <p className="text-xs font-semibold uppercase text-primary">
              Startup Tycoon
            </p>
            <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
              Mode multijoueur
            </h1>
          </NavLink>

          <nav className="flex flex-wrap items-center gap-2">
            <NavLink className={navLinkClassName} to={routes.multijoueur}>
              Round
            </NavLink>
            <NavLink className={navLinkClassName} to={routes.multiShop}>
              Shop multi
            </NavLink>
            <NavLink className={navLinkClassName} to={routes.leaderboard}>
              Leaderboard
            </NavLink>
            <NavLink className={navLinkClassName} to={routes.solo}>
              Solo
            </NavLink>
            <AuthHeaderActions />
          </nav>
        </div>
      </div>
    </header>
  );
});
