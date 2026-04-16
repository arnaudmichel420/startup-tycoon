import { memo } from "react";

export const Footer = memo(function Footer() {
  return (
    <footer className="pb-6">
      <div className="rounded-4xl border border-border/80 bg-card px-6 py-6 shadow-lg">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Startup Tycoon 2026
            </p>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">
              Un clicker chaleureux, ambitieux et taille pour passer d'une idee
              fragile a une machine a cash bien huilee.
            </p>
          </div>
          <p className="text-sm font-semibold text-secondary-foreground">
            Cashflow, upgrades et croissance continue.
          </p>
        </div>
      </div>
    </footer>
  );
});
