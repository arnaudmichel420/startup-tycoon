# Startup Tycoon

## Commandes

- `npm install` : installe les dépendances du projet.
- `npm run dev` : lance le serveur de développement Vite.
- `npm run build` : génère la version de production.
- `npm run format` : formate le projet avec Prettier.
- `npm run preview` : lance un aperçu local de la version de production.
- `npm run lint` : vérifie le code avec ESLint.

## Structure

- `src/assets` : contient les ressources statiques du projet comme les images et icones.
- `src/components/atoms` : contient les composants UI simples comme `click-button.jsx`, `money-display.jsx`, `income-display.jsx`, `search-input.jsx` et `upgrade.jsx`.
- `src/components/molecules` : contient des composants composes comme `confirm-modal.jsx`, `game-insight-cards.jsx`, `game-stats-cards.jsx` et `primary-stat-cards.jsx`.
- `src/components/ui` : contient les composants UI reutilisables issus de `shadcn`, comme `button.jsx`, `input.jsx` et `alert-dialog.jsx`.
- `src/data` : contient les donnees statiques du projet, notamment `upgrades.js`.
- `src/hooks` : contient les hooks reutilisables du projet, notamment `use-debounce.jsx`.
- `src/layout` : contient la structure generale de l'application, notamment `page-wrapper.jsx`.
- `src/lib` : contient des utilitaires partages relies a l'UI, notamment `utils.js`.
- `src/pages` : contient les pages routees de l'application comme `Game`, `Shop`, `Stats`, `Settings` et `NotFoundPage`.
- `src/router` : contient la configuration des routes dans `router.jsx` et `routes.js`.
- `src/services` : est prevu pour les fonctions d'acces aux donnees et aux futures sources externes.
- `src/states` : est prevu pour l'etat global de l'application et sa logique de gestion.
- `src/store` : contient le store global Zustand, notamment `gameStore.js`.
- `src/styles` : est prevu pour les styles globaux et les fichiers de mise en forme communs.
- `src/utils` : contient les fonctions utilitaires comme `formatNumber.js` et `stat-cards.jsx`.

## TP-5

1. L'application est montee dans le DOM dans le fichier `src/main.jsx`.
2. Le composant racine utilise au demarrage est `RouterProvider` dans `src/main.jsx`.
3. Le router est configure dans le fichier `src/router/router.jsx`.
4. Le point d'ancrage HTML est l'element `<div id="root"></div>` dans `index.html`.

## TP-7

- L'interval est cree dans le fichier `src/pages/Game/index.jsx`, a l'interieur du `useEffect`, avec `setInterval(...)`.
- Il est nettoye dans le `return` du `useEffect` avec `clearInterval(interval)`, avant un nouvel effet et lors du demontage du composant.
- C'est important pour eviter d'accumuler plusieurs intervalles en meme temps, ce qui provoquerait des mises a jour multiples et des fuites memoire.
- Un interval mal gere peut "accelerer le temps" du jeu : si plusieurs `setInterval` tournent en meme temps, les gains sont ajoutes plusieurs fois par seconde au lieu d'une seule.
- `setInterval` est une fonction fournie par les `Web APIs` du navigateur. Il ne place pas directement son callback dans la `call stack` : le navigateur gere d'abord l'attente du delai, puis envoie le callback dans la `task queue` (macrotask). Le callback n'entre dans la `call stack` que lorsque le thread principal est libre. Si ce thread est occupe, l'execution du timer est retardee.

## TP-8

1. `money` et `incomePerSecond` vivent actuellement dans le fichier `src/layout/page-wrapper.jsx`, dans le composant `PageWrapper`.
2. Oui, `src/pages/Game/index.jsx` et `src/pages/Shop/index.jsx` ont besoin des memes donnees, car les deux affichent l'argent, le revenu passif et l'etat des upgrades.
3. Pour partager ces donnees sans store global, elles sont stockees dans `PageWrapper` puis transmises aux pages enfants avec `<Outlet context={...} />` et recuperees avec `useOutletContext()`.
4. La solution devient fragile car `PageWrapper` commence a contenir trop de state et doit connaitre les besoins de plusieurs pages. Plus l'application grandit, plus il faut faire passer beaucoup de donnees et setters a travers le `context` de `Outlet`.

## TP-9

Schema simple du flux :

```text
View -> dispatch(Action) -> Store -> render(View)
```

## TP-10

1. Le store n'est pas sauvegarde a chaque tick, car cela provoquerait trop d'ecritures dans le `localStorage`. Je n'ai pas mis en place de throttle, car cela allait trop a l'encontre du fonctionnement naturel de la lib utilisee et alourdissait le code pour un gain limite dans le cadre de ce projet.
2. Si le JSON de sauvegarde est corrompu, invalide ou ne respecte pas le format attendu, il est ignore au chargement. Le jeu repart alors sur un etat initial propre plutot que de planter.
3. Le champ `version` sert a identifier le format de la sauvegarde. Il permet de verifier qu'une ancienne sauvegarde est encore compatible avec la structure actuelle du store, et de la refuser si ce n'est plus le cas.
4. Les donnees sauvegardees sont `money`, `clickValue`, `incomePerSecond`, `upgrades`, `totalClicks` et `totalEarned`, car elles suffisent a restaurer la progression du joueur. Les actions et fonctions du store ne sont pas sauvegardees, car elles appartiennent a la logique applicative et sont recreees automatiquement au chargement.

## TP-11

1. Avant optimisation, certaines cartes de stats rerendaient inutilement parce que leur contenu etait reconstruit sous forme de `children` React a chaque render, ce qui faisait rerender `GameStatsCard` meme quand seule une petite partie de l'affichage changeait.
2. Les optimisations qui ont eu un impact reel ont ete la stabilisation des composants de stats avec `memo`, la suppression du JSX reconstruit dans les tableaux de cartes, et le remplacement de certains `useEffect` inutiles par des valeurs derivees calculees avec `useMemo`.
3. L'optimisation la plus rentable a ete de stabiliser le listing des upgrades en memoissant le composant `Upgrade` et en lui passant des props derivees comme `canBuy` et `actualCost` plutot que des valeurs plus instables comme `money`. Cela a limite les rerenders inutiles sur une liste qui peut etre mise a jour tres souvent.
4. Le tick est un bon revelateur de problemes de performance car il declenche des mises a jour regulieres et tres frequentes. Si un composant rerender inutilement, ce comportement devient vite visible quand il se repete a chaque tick.
5. Je n'ai pas mis en place des optimisations plus agressives comme du throttle complexe sur toute la persistance ou une multiplication de memoisations partout, car cela alourdissait le code et allait parfois a l'encontre du fonctionnement naturel des libs utilisees pour un gain limite dans ce projet.

## TP-13

1. Les cookies Clerk observes sur `localhost` sont `__clerk_db_jwt`, `__clerk_db_jwt_V6kMRCRO`, `__session`, `__session_V6kMRCRO`, `__client_uat`, `__client_uat_V6kMRCRO` et `clerk_active_context`. D'autres cookies existent aussi sur les domaines Clerk ou Cloudflare, comme `__cf_bm`, `_cfuvid`, `ajs_anonymous_id` et `ajs_user_id`.
2. Attributs releves :
   - `__clerk_db_jwt` : `HttpOnly=Non`, `Secure=Non`, `SameSite=Lax`, `localhost`, `2027-05`.
   - `__clerk_db_jwt_V6kMRCRO` : `HttpOnly=Non`, `Secure=Non`, `SameSite=Lax`, `localhost`, `2027-05`.
   - `__session` : `HttpOnly=Non`, `Secure=Non`, `SameSite=Lax`, `localhost`, `2027-05`.
   - `__session_V6kMRCRO` : `HttpOnly=Non`, `Secure=Non`, `SameSite=Lax`, `localhost`, `2027-05`.
   - `__client_uat` : `HttpOnly=Non`, `Secure=Non`, `SameSite=Strict`, `localhost`, `2027-05`.
   - `__client_uat_V6kMRCRO` : `HttpOnly=Non`, `Secure=Non`, `SameSite=Strict`, `localhost`, `2027-05`.
   - `clerk_active_context` : `HttpOnly=Non`, `Secure=Oui`, `SameSite=Non renseigne`, `localhost`, `Session`.
   - `__cf_bm` : `HttpOnly=Oui`, `Secure=Oui`, `SameSite=None`, Clerk/Cloudflare, `2026-05`.
   - `_cfuvid` : `HttpOnly=Oui`, `Secure=Oui`, `SameSite=None`, Clerk/Cloudflare, `Session`.
3. Le cookie `__session` contient le JWT de session Clerk. Il permet de representer la session active de l'utilisateur connecte et de maintenir l'authentification entre les pages. Il contient notamment des informations comme l'utilisateur, la session et l'expiration.
4. Avec `document.cookie`, je vois seulement les cookies accessibles par JavaScript sur `localhost`, comme `__clerk_db_jwt`, `__session`, `__client_uat` et `clerk_active_context`. Je ne vois pas les cookies `HttpOnly`, car ils sont proteges contre la lecture JavaScript. Je ne vois pas non plus les cookies des autres domaines, comme `.clerk.com`, car `document.cookie` ne lit que les cookies du domaine courant.

### Analyse du JWT

2. Le JWT contient un `header` avec les metadonnees de signature, un `payload` avec les informations de session, et une `signature` qui permet au serveur de verifier que le token n'a pas ete modifie.
3. L'algorithme utilise est `RS256`.
4. Le payload contient notamment `azp` (`http://localhost:5173`), `exp`, `iat`, `iss`, `nbf`, `sid`, `sts`, `sub` et `v`. Le champ `sub` correspond a l'utilisateur Clerk (`user_3DGJGd1FQ0jyVXN9e0vURjtBPjw`).
5. On ne peut pas modifier le payload cote client pour se faire passer pour un autre utilisateur. Si je modifie `sub`, la signature ne correspond plus au contenu du token, donc le serveur doit refuser le token.
6. La duree de vie du token est de `60` secondes, car `exp - iat = 1777903812 - 1777903752`.

### Network

1. Dans l'onglet Network, j'observe des requetes vers `arriving-troll-42.clerk.accounts.dev`, notamment `POST /v1/environment` et `GET /v1/client`. Elles servent a recuperer la configuration Clerk, l'etat du client, la session active et le dernier token actif.
2. Quand l'application appelle une API backend protegee, le header attendu est `Authorization: Bearer <token>`. Le token est recupere cote client via Clerk, puis envoye au backend pour verification.
3. Cote client, Clerk garde l'etat d'authentification en memoire dans son instance JavaScript et dans le contexte React fourni par `ClerkProvider`. Le token peut etre obtenu via les hooks Clerk, par exemple `useAuth().getToken()`.

### Partie 3 :

1. Le middleware qui verifie le JWT est le middleware d'authentification du serveur. Il lit le header `Authorization`, extrait le token apres `Bearer`, verifie sa signature et laisse passer la requete seulement si le token est valide.
2. Le serveur n'a pas besoin d'appeler Clerk a chaque requete, car le JWT est signe avec `RS256`. Le serveur peut verifier la signature avec la cle publique de Clerk. Si la signature, l'expiration et l'emetteur sont valides, le token est accepte.
3. Une fois le token verifie, le `user_id` est recupere depuis le champ `sub` du payload JWT, puis stocke dans l'objet de requete cote serveur.
4. Si on appelle `/api/games/me` sans header `Authorization`, le serveur doit renvoyer une erreur `401 Unauthorized`, car il ne peut pas identifier l'utilisateur.
5. Non, le serveur ne valide pas vraiment le `score` envoye par le client : il ne verifie pas de plafond, ni la coherence avec la duree de la partie. Le probleme est qu'un joueur peut modifier la requete et envoyer un score enorme, qui serait accepte comme un vrai score. Pour eviter ca, le serveur devrait calculer ou verifier le score lui-meme a partir des actions, du temps de jeu, des upgrades et des revenus autorises.

1. Un state client est un etat gere localement par le navigateur, utile pour l'interface ou une partie locale. Dans le projet, `money` en cours de partie solo et le timer local sont des exemples de state client.
2. Un state serveur est une donnee dont la source de verite est le backend. Dans le projet, le leaderboard et l'historique des parties multijoueur sont des exemples de state serveur.
3. `useState` + `useEffect` + `fetch` est un anti-pattern pour gerer les donnees serveur, car on recode a la main une logique complexe de synchronisation. Le composant doit gerer lui-meme le chargement, les erreurs, le cache, les rechargements et les donnees obsoletes.
4. Cette approche naive ne resout pas bien le cache, la deduplication des requetes et le refetch en arriere-plan. Elle gere aussi mal l'invalidation, les erreurs et les etats de chargement quand l'application grandit.

