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
- `src/components/atoms` : contient les composants UI simples comme `click-button.jsx`, `money-display.jsx`, `income-display.jsx` et `upgrade.jsx`.
- `src/components/molecules` : contient des composants composes comme `game-stats-cards.jsx`, `game-insight-cards.jsx` et `game-header.jsx`.
- `src/data` : contient les donnees statiques du projet, notamment `upgrades.js`.
- `src/layout` : contient la structure generale de l'application, notamment `page-wrapper.jsx`.
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
