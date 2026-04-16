import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";

export const SearchInput = function SearchInput({
  id,
  label = "Recherche",
  placeholder = "Rechercher...",
  className = "",
  onChange,
  value,
  ...props
}) {
  return (
    <div className={className}>
      <label
        className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground"
        htmlFor={id}
      >
        {label}
      </label>
      <div className="relative">
        <MagnifyingGlassIcon
          className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          weight="bold"
        />
        <Input
          className="h-11 rounded-2xl border-primary/20 bg-card pl-10 pr-4 text-sm shadow-sm shadow-primary/5 transition focus-visible:border-primary focus-visible:ring-primary/20"
          id={id}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          {...props}
        />
      </div>
    </div>
  );
};
