export function QueryGuard({ children, error, isLoading }) {
  if (isLoading) {
    return (
      <div className="flex min-h-48 items-center justify-center rounded-xl border border-border bg-card p-6">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-5 text-destructive">
        <p className="font-bold">Impossible de charger les donnees.</p>
        <p className="mt-2 text-sm">
          {error.message ?? "Une erreur inconnue est survenue."}
        </p>
      </div>
    );
  }

  return children;
}
