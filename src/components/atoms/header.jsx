import routes from "@/router/routes";
import { memo } from "react";
import { NavLink } from "react-router-dom";

export const Header = memo(function Header() {
  const navLinkClassName = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-semibold tracking-[0.18em] uppercase transition ${
      isActive
        ? "bg-primary text-primary-foreground shadow-sm"
        : "text-secondary-foreground/80 hover:bg-background/70 hover:text-foreground"
    }`;
  return (
    <header className="sticky top-0 z-20 pt-4">
      <div className="overflow-hidden rounded-4xl border border-border/80 bg-card/85 shadow-lg backdrop-blur">
        <div className="flex flex-col gap-5 px-5 py-5 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              Startup Tycoon
            </p>
            <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
              Build, automate, scale.
            </h1>
          </div>

          <nav className="flex flex-wrap gap-2">
            <NavLink className={navLinkClassName} to={routes.game}>
              Game
            </NavLink>
            <NavLink className={navLinkClassName} to={routes.shop}>
              Shop
            </NavLink>
            <NavLink className={navLinkClassName} to={routes.stats}>
              Stats
            </NavLink>
            <NavLink className={navLinkClassName} to={routes.settings}>
              Settings
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
});
