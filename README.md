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
- `src/components` : contient les composants UI reutilisables partages entre plusieurs pages.
- `src/layout` : contient la structure generale de l'application, notamment `page-wrapper.jsx`.
- `src/pages` : contient les pages routees de l'application comme `Game`, `Shop`, `Stats`, `Settings` et `NotFoundPage`.
- `src/router` : contient la configuration des routes dans `router.jsx` et `routes.js`.
- `src/services` : est prevu pour les fonctions d'acces aux donnees et aux futures sources externes.
- `src/states` : est prevu pour l'etat global de l'application et sa logique de gestion.
- `src/styles` : est prevu pour les styles globaux et les fichiers de mise en forme communs.

## Partie 7 - Compréhension du point d'entree

1. L'application est montee dans le DOM dans le fichier `src/main.jsx`.
2. Le composant racine utilise au demarrage est `RouterProvider` dans `src/main.jsx`.
3. Le router est configure dans le fichier `src/router/router.jsx`.
4. Le point d'ancrage HTML est l'element `<div id="root"></div>` dans `index.html`.
