import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";
import { memo } from "react";

const authButtonClassName =
  "rounded-full border border-border bg-background/70 px-4 py-2 text-sm font-semibold uppercase text-secondary-foreground/80 transition hover:bg-background hover:text-foreground";

export const AuthHeaderActions = memo(function AuthHeaderActions() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Show when="signed-out">
        <SignInButton mode="modal">
          <button className={authButtonClassName} type="button">
            Connexion
          </button>
        </SignInButton>
        <SignUpButton mode="modal">
          <button className="btn-primary" type="button">
            Inscription
          </button>
        </SignUpButton>
      </Show>

      <Show when="signed-in">
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: "h-8 w-8",
            },
          }}
        />
      </Show>
    </div>
  );
});
