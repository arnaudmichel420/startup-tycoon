import { memo } from "react";

export const ClickButton = memo(function ClickButton({ clickValue, onClick }) {
  return (
    <div className="flex items-center gap-3">
      <button className="btn-primary" onClick={onClick}>
        Développer
      </button>
      <span className="text-sm font-semibold tracking-[0.08em] text-muted-foreground">
        +{clickValue}$ / clic
      </span>
    </div>
  );
});
